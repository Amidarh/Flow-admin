import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                blob: {
                    primary: "hsl(var(--blob-primary))",
                    secondary: "hsl(var(--blob-secondary))",
                    highlight: "hsl(var(--blob-highlight))",
                    shadow: "hsl(var(--blob-shadow))",
                    coral: "hsl(var(--blob-coral))",
                    "coral-light": "hsl(var(--blob-coral-light))",
                    lavender: "hsl(var(--blob-lavender))",
                    "lavender-light": "hsl(var(--blob-lavender-light))",
                    peach: "hsl(var(--blob-peach))",
                    "peach-light": "hsl(var(--blob-peach-light))",
                },
            },
        },
    },
    plugins: [],
};
export default config;