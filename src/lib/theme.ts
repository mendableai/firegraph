export interface Theme {
    name: string;
    gradient: string;
    color: "slate" | "gray" | "zinc" | "neutral" | "stone" | "red" | "orange" | "amber" | "yellow" | "lime" | "green" | "emerald" | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet" | "purple" | "fuchsia" | "pink" | "rose";
}

export const allThemes = {
    "sunset":{
        "name": "sunset",
        "gradient": "linear-gradient(135deg, #fdba74, #f97316)",
        "color": "orange",
    },
    "ocean":{
        "name": "ocean",
        "gradient": "linear-gradient(135deg, #61a5c2, #1a2980)",
        "color": "blue",
    },
    "forest":{
        "name": "forest",
        "gradient": "linear-gradient(135deg, #a8d8ea, #021c1e)",
        "color": "teal",
    },
    "fire":{
        "name": "fire",
        "gradient": "linear-gradient(135deg, #f9d423, #ff4e50)",
        "color": "red",
    },
    "space":{
        "name": "space",
        "gradient": "linear-gradient(135deg, #000428, #004e92)",
        "color": "indigo",
    },
    "sky":{
        "name": "sky",
        "gradient": "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
        "color": "sky",
    },
    "night":{
        "name": "night",
        "gradient": "linear-gradient(135deg, #000000, #434343)",
        "color": "gray",
    },
}
