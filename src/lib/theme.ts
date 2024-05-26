export interface Theme {
    name: string;
    gradient: string;
    color: "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose";
}

export const allThemes = {
    "firecrawl": {
        "name": "firecrawl",
        "gradient": "linear-gradient(135deg, #fdba74, #f97316)",
        "color": "orange",
    },
    "ocean": {
        "name": "ocean",
        "gradient": "linear-gradient(135deg, #61a5c2, #1a2980)",
        "color": "blue",
    },
    "forest": {
        "name": "forest",
        "gradient": "linear-gradient(135deg, #a8d8ea, #021c1e)",
        "color": "teal",
    },
    "sunset": {
        "name": "sunset",
        "gradient": "linear-gradient(135deg, #f9d423, #ff4e50)",
        "color": "red",
    },
    "space": {
        "name": "space",
        "gradient": "linear-gradient(135deg, #000428, #004e92)",
        "color": "indigo",
    },
    "sky": {
        "name": "sky",
        "gradient": "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
        "color": "sky",
    },
    "night": {
        "name": "night",
        "gradient": "linear-gradient(135deg, #000000, #434343)",
        "color": "gray",
    },
    "dawn": {
        "name": "dawn",
        "gradient": "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        "color": "pink",
    },
    "aurora": {
        "name": "aurora",
        "gradient": "linear-gradient(135deg, #00c6ff, #0072ff)",
        "color": "cyan",
    },
    "meadow": {
        "name": "meadow",
        "gradient": "linear-gradient(135deg, #a8e063, #56ab2f)",
        "color": "green",
    },
    "galaxy": {
        "name": "galaxy",
        "gradient": "linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)",
        "color": "purple",
    },
    "sunrise": {
        "name": "sunrise",
        "gradient": "linear-gradient(135deg, #ff512f, #dd2476)",
        "color": "rose",
    },
    "twilight": {
        "name": "twilight",
        "gradient": "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        "color": "slate",
    },
}

