// pages/api/getRepoStars.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const DEFAULT_PER_PAGE = 100;

interface StarRecord {
  starred_at: string;
}

interface StarRecordResponse {
  date: string;
  Stars: number;
}

const utils = {
  getDateString: (date: string | number | Date): string => new Date(date).toISOString().split('T')[0],
  getFormattedDate: (date: string): string => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  range: (start: number, end: number): number[] => Array.from({ length: end - start + 1 }, (_, i) => start + i),
};

async function getRepoStargazers(repo: string, token?: string, page?: number) {
  let url = `https://api.github.com/repos/${repo}/stargazers?per_page=${DEFAULT_PER_PAGE}`;

  if (page !== undefined) {
    url = `${url}&page=${page}`;
  }
  return axios.get(url, {
    headers: {
      Accept: 'application/vnd.github.v3.star+json',
      Authorization: token ? `token ${token}` : '',
    },
  });
}

async function getRepoStargazersCount(repo: string, token?: string) {
  const { data } = await axios.get(`https://api.github.com/repos/${repo}`, {
    headers: {
      Accept: 'application/vnd.github.v3.star+json',
      Authorization: token ? `token ${token}` : '',
    },
  });

  return data.stargazers_count;
}

async function getRepoStarRecords(repo: string, token: string, maxRequestAmount: number): Promise<StarRecordResponse[]> {
  const patchRes = await getRepoStargazers(repo, token);

  const headerLink = patchRes.headers['link'] || '';

  let pageCount = 1;
  const regResult = /next.*&page=(\d*).*last/.exec(headerLink);

  if (regResult) {
    if (regResult[1] && Number.isInteger(Number(regResult[1]))) {
      pageCount = Number(regResult[1]);
    }
  }

  if (pageCount === 1 && patchRes?.data?.length === 0) {
    throw {
      status: patchRes.status,
      data: [],
    };
  }

  const requestPages: number[] = [];
  if (pageCount < maxRequestAmount) {
    requestPages.push(...utils.range(1, pageCount));
  } else {
    utils.range(1, maxRequestAmount).map((i) => {
      requestPages.push(Math.round((i * pageCount) / maxRequestAmount) - 1);
    });
    if (!requestPages.includes(1)) {
      requestPages[0] = 1;
    }
  }

  const resArray = await Promise.all(
    requestPages.map((page) => {
      return getRepoStargazers(repo, token, page);
    })
  );

  const starRecordsMap: Map<string, number> = new Map();

  if (requestPages.length < maxRequestAmount) {
    const starRecordsData: StarRecord[] = [];
    resArray.map((res) => {
      const { data } = res;
      starRecordsData.push(...data);
    });
    for (let i = 0; i < starRecordsData.length; ) {
      starRecordsMap.set(
        utils.getDateString(starRecordsData[i].starred_at),
        i + 1
      );
      i += Math.floor(starRecordsData.length / maxRequestAmount) || 1;
    }
  } else {
    resArray.map(({ data }, index) => {
      if (data.length > 0) {
        const starRecord = data[0];
        starRecordsMap.set(
          utils.getDateString(starRecord.starred_at),
          DEFAULT_PER_PAGE * (requestPages[index] - 1)
        );
      }
    });
  }

  const starAmount = await getRepoStargazersCount(repo, token);
  starRecordsMap.set(utils.getDateString(Date.now()), starAmount);

  const starRecords: StarRecordResponse[] = [];

  starRecordsMap.forEach((v, k) => {
    starRecords.push({
      date: utils.getFormattedDate(k),
      Stars: v,
    });
  });

  return starRecords;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { repo, token } = req.query as { repo: string, token: string };
  const maxRequestAmount = 15;

  try {
    const starRecords = await getRepoStarRecords(repo, token, maxRequestAmount);
    res.status(200).json(starRecords);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

