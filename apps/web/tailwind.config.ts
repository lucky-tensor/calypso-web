import type { Config } from 'tailwindcss';

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#0a0a0a',
                foreground: '#ededed',
                primary: {
                    DEFAULT: '#3b82f6',
                    dark: '#2563eb',
                },
                slate: {
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                }
            },
        },
    },
    plugins: [],
} satisfies Config;
