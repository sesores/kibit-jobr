# kibit-jobr

This test project demonstrates my capabilities as a VU.JS developer for Kibit's selection process.

## Running the Project

### Dependencies

The project uses the [VueJS 3](https://vuejs.org/guide/quick-start.html) framework as it's core.

I've chosen the [Vuetify 3](https://vuetifyjs.com/en/getting-started/installation/#existing-projects) plugin as it implements [Google's Material Design](https://m3.material.io/), a responsive and well estabileshed UI framework with many useful components.

For communication with the backend API I've used [axios](https://www.npmjs.com/package/axios), and to mock it I went straight to [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter).

In the mock backend i've used [uuid](https://www.npmjs.com/package/uuid) and [@types/uuid](https://www.npmjs.com/package/@types/uuid), because UUID generation should happen there.

### Clone Git repository

```sh
git clone https://github.com/sesores/kibit-jobr.git
cd kibit-jobr
  ```

### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```
Based on `vite.config.ts` the project runs on `http://localhost:7777/`

> :warning: **and also listens on: `http://0.0.0.0:7777/`** in order to test on mobile devices on local network

#### Type-Check, Compile and Minify for Production

```sh
npm run build
```

#### Run End-to-End Tests with [Playwright](https://playwright.dev)

Would be pretty nice, but in this timeframe I was only able to complete the base project. :(

## Story

### The Model

The two models from the p


## It would have been nice

 - Tests, tests and tests
 - `Remember Me`
 - Proper planning and implementation of API usage instead of brute-force-reloaded lists
 - Custom theme with at least a bit of CSS magic
 - Transitions
