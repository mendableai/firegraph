// pages/api/getRepoStars.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const DEFAULT_PER_PAGE = 100;

interface StarRecord {
  starred_at: string;
}

interface StarRecordResponse {
  Date: string;
  Stars: number | null;
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


const Spline = require('cubic-spline');

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

  // Interpolation logic
  const sortedDates = Array.from(starRecordsMap.keys()).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  const dates = sortedDates.map(date => new Date(date).getTime());
  const stars = sortedDates.map(date => starRecordsMap.get(date)!);
  //console.log(sortedDates);
  //console.log(stars);

  const nonInterpolatedRecords: { Date: string, Stars: number | null }[] = [];
  const startDate1 = new Date(sortedDates[0]);
  const endDate1 = new Date(sortedDates[sortedDates.length - 1]);
  const daysBetween1 = (endDate1.getTime() - startDate1.getTime()) / (1000 * 60 * 60 * 24);

  let currentIndex = 0;
  for (let i = 0; i <= daysBetween1; i++) {
    const currentDate = new Date(startDate1);
    currentDate.setDate(startDate1.getDate() + i);
    const formattedDate = utils.getFormattedDate(currentDate.toISOString());

    if (currentIndex < sortedDates.length && formattedDate === utils.getFormattedDate(sortedDates[currentIndex])) {
      nonInterpolatedRecords.push({
        Date: formattedDate,
        Stars: stars[currentIndex],
      });
      currentIndex++;
    } else {
      nonInterpolatedRecords.push({
        Date: formattedDate,
        Stars: null,
      });
    }
  }

  return nonInterpolatedRecords;

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { repo: rawRepo } = req.query as { repo: string };

  let repo = rawRepo;
  if (repo.startsWith('https://github.com/')) {
    repo = repo.replace('https://github.com/', '');
  } else if (repo.startsWith('http://github.com/')) {
    repo = repo.replace('http://github.com/', '');
  } else if (repo.startsWith('www.github.com/')) {
    repo = repo.replace('www.github.com/', '');
  } else if (repo.startsWith('github.com/')) {
    repo = repo.replace('github.com/', '');
  }
 
  const maxRequestAmount = 20;
  //random number between 1 and 4
  const randomNumber = Math.floor(Math.random() * 4) + 1;
  const token = process.env[`G${randomNumber}`];
  //console.log(`Select G${randomNumber}`);
  //console.log(token);

  try {
    const starRecords = await getRepoStarRecords(repo, token!, maxRequestAmount);
    //console.log(starRecords);
    res.status(200).json(starRecords);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

