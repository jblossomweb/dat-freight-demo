# Freight Load Board Application

## Business Context

Build a web application for logistics coordinators to manage freight shipments. Dispatchers need to quickly find and assign available loads to drivers throughout their day.

## Acceptance Criteria

### As a dispatcher, I need to:

1. **View all available freight loads** with complete information including company, locations, weight, equipment type, date, price, distance, and current status

2. **Search across loads** to quickly find shipments matching specific criteria, with results updating as I type

3. **Sort the load list** by any field in ascending or descending order to prioritize based on business needs

4. **Filter loads** using multiple criteria simultaneously to narrow down to exactly what I need

5. **Navigate through large datasets** efficiently without performance degradation

6. **Use keyboard-only navigation** to work efficiently without switching between keyboard and mouse

7. **Access all functionality with assistive technologies** as some of our dispatchers rely on screen readers

## Constraints

- Must be a web application
- Must handle large datasets efficiently
- Must meet WCAG 2.1 Level AA accessibility standards
- Mock Data is provided (`src/data/mockLoads.json`)

## Deliverables

1. Working application
2. Setup instructions
3. Brief document explaining your architecture decisions (add to `src/spec` folder)

> AI assistance is allowed and expected - we want to see how you work with modern tools.

---

We're interested in seeing how you approach this problem and the technical decisions you make.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
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
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
