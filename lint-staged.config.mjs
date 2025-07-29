const config = {
  'src/**/*.{js,jsx,ts,tsx}': ['pnpm eslint', 'pnpm format:check'],
  'src/**/*.{json,css,md}': ['pnpm format:check'],
};

export default config;
