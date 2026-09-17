# Freight Load Board Application

This is a demo app as part of my application to a Senior Frontend Software Engineer role at DAT Freight & Analytics.

## Quick start guide

### 1. unzip or clone this repo:

```bash
git clone git@github.com:jblossomweb/dat-freight-demo.git
```

### 2. install dependencies:

```bash
npm install
```

### 3. copy env file:

```bash
cp .env.local.example .env.local
```

optional:

- You can keep the default to point at the local Docker stack for the API
- Or you can point it at a production API deployment (see [dat-freight-demo-go-api](https://github.com/jblossomweb/dat-freight-demo-go-api))

### 4. start the dev server:

```bash
npm run dev
```

### 5. open your browser:

http://localhost:5173/

## Production build

To make a production build locally:

### 1. make a build:

```bash
npm run build
```

### 2. serve it up:

```bash
npm run preview
```

### 3. open your browser:

http://localhost:4173/

## Sample Deployment

I have set up pipelines to deploy this application and its component library to the following URLs:

- Application: https://dat-freight-demo.jblossom.io/
- Storybook: http://dat-freight-demo-storybook.s3-website-us-west-2.amazonaws.com/

Note: I have yet to setup https for the Storybook deployment, so for now just use the above S3 website URLs via http.

## Overview

### Key Functionality:

1. **View all available freight loads**

2. **Search across loads**

3. **Sort the load list**

4. **Filter loads**

5. **Navigate through large datasets**

6. **Use keyboard-only navigation**

7. **Access all functionality with assistive technologies**

### Extra Features:

1. **Map source and destination** (without highway routing)
2. **Some Pie Charts** with aggregate data.

### Approach:

My approach to this project is outlined [here](src/spec/TODO.md).

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

# Tools used

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
