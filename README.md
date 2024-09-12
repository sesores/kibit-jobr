# kibit-jobr

This test project demonstrates my capabilities as a VU.JS developer for Kibit's selection process.

## Running the Project

### Dependencies

The project uses the [VueJS 3](https://vuejs.org/guide/quick-start.html) framework as it's core.

The global state managament is served by [pinia](https://pinia.vuejs.org/introduction.html) and to be persistent across reloads [pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate) came to the rescue.

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

### The Mock

To let the mocking regenerate the entire mock 'database', set the **constructor parameter** to **true** in

``` 
@/main.ts
```
at [line](https://github.com/sesores/kibit-jobr/blob/958ea87c617971b319d716489c1a33b70743c7c4/src/main.ts#L20):
```ts
const mock = new Mock(false)
```

### The Model

The two models from the project description were

```
type User = {
    username: string
    type: 'employer' | 'applicant'
	id: string 
}
```
and
```
type Job = {
    id: string
    title: string
    description: string
    tags: string[]
    created: number
    salary: {
        amount: number
        currency: string
    }
}
```

The only thing I've modified is the **requirement** of the **`id`** property of the **`Job`** type. This way I could use it for temporary models across the application, as well as an API model.

They're wrapped in an Offer and a Session type to extend them as I needed.

In a real world scenario I would create **separate API models** for **Requests** and **Responses**.


## It would have been nice

 - Tests, tests and tests
 - A working `Remember Me`
 - Working pagination and sorting
 - Proper planning and implementation of API usage instead of brute-force-reloaded lists
 - Custom theme with at least a bit of CSS magic
 - Transitions
