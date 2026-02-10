# Currency Converter

Live demo: https://arilenol.github.io/Tims-Technical-Project/

## Overview

This is a small currency converter web application built with React and TypeScript. It fetches exchange rates from an external API to perform real-time conversions, caches rates locally to reduce network calls (cached for 30 minutes), supports multiple languages via i18next, and saves conversion history in LocalStorage.

## Features

- Real-time currency conversion using an external rates API
- Local caching of rates (30 minute expiry) to improve performance
- Multi-language support (i18n) — currency names and dates adapt to the active locale
- Save and view conversion history (stored in LocalStorage)

## Technologies

- React
- TypeScript
- Vite
- React Router
- i18next
- LocalStorage

## Quick Start

Open a terminal and run:

```bash
cd part2/currency-converter-project/
npm install
npm run dev
```

To create a production build and preview it locally:

```bash
npm run build
npm run preview
```

## Project structure (important folders)

- `src/assets/styles` - styles for components
- `src/components` - main UI components
- `src/services/api` - API and caching logic (rates fetch)
- `src/i18n` - internationalization setup and translation files
- `public` - static assets and demo-friendly files

## Configuration

- API: The app uses a public exchange rates API (see `src/services/api/currency.ts`). If you need to change the provider or add an API key, update the service file.
- Locale: Languages live under `src/i18n/locales/` — add or modify translations there.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
