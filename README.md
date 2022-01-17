[toc]

# # Technology Stack

---

编程语言：[TypeScript 4.x](https://www.typescriptlang.org/) + JavaScript

构建工具：[Vite 2.x](https://vitejs.dev/)

前端框架：[Vue 3.x](https://v3.vuejs.org/)

路由工具：[Vue Router 4.x](https://next.router.vuejs.org/)

状态管理：[Vuex 4.x](https://next.vuex.vuejs.org/)

UI 框架：[Bootstrap 5](https://getbootstrap.com/) / [Element Plus](https://element-plus.org/en-US/)
/ [TailwindCSS 3](https://tailwindcss.com/)

CSS 预编译：~~Stylus~~ / [Sass](https://sass-lang.com/) / ~~Less~~

HTTP 工具：[Axios](https://axios-http.com/)

Git Hook 工具：[husky](https://typicode.github.io/husky/#/) + [lint-staged](https://github.com/okonet/lint-staged)

代码规范：[EditorConfig](https://editorconfig.org/) + [Prettier](https://prettier.io/) +
[ESLint](https://eslint.org/) + [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

~~单元测试：vue-test-utils + jest + vue-jest + ts-jest~~

~~自动部署：GitHub Actions~~

# # Build Vue Framework

---

Refer to [this guid](https://jishuin.proginn.com/p/763bfbd5b344).

## ## Updating Node.js

> **Compatibility Note**
>
> Vite requires Node.js version >=12.0.0.

Check your Node.js version:

```shell
$ node -v
```

Update your Node.js to the latest stable version.

```shell
$ nvm install stable
```

## ## Scaffolding Project with Vite

### ### Initialise Vite Project

1. Run `npm init @vitejs/app`
1. Project name: some-name
1. Select a framework: vue
1. Select a variant: vue-ts
1. Install dependencies: Run `npm install`
1. Boot project: Run `npm run dev`

### ### Config `vite.config.ts`

See more Vite config options at [Vite official website](https://vitejs.dev/config/).

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  base: './', // 设置打包路径
  server: {
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true // 允许跨域

    // 设置代理，根据我们项目实际情况配置
    // proxy: {
    //   '/api': {
    //     target: 'http://xxx.xxx.xxx.xxx:8000',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace('/api/', '/')
    //   }
    // }
  }
})
```

Config `tsconfig.json` for TypeScript support

```text
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
  },

  // ...
}
```

## ## EditorConfig

Create file `.editorconfig`

```editorconfig
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
max_line_length = off
trim_trailing_whitespace = false
```

See more config options at [http://editorconfig.org](http://editorconfig.org).

## ## .gitignore

Visit [gitignore.io](https://www.toptal.com/developers/gitignore) to generate `.gitignore` file.

## ## Prettier

### ### Install

```shell
$ npm install --save-dev --save-exact prettier
```

### ### Config `.prettierrc`

Create config file `.prettierrc` at root path

```yaml
{ 'useTabs': false, 'tabWidth': 2, 'printWidth': 200, 'singleQuote': true, 'trailingComma': 'none', 'bracketSpacing': true, 'semi': false }
```

See more config options at [Prettier official website](https://prettier.io/docs/en/options.html).

> Set `printWidth` with a large number to avoid ESLint error (prettier/prettier) when it's working with ESLint. This error often happens when you wrap a long code (HTML attributes at most of the time).
>
> At Prettier v2.6 (next), a new option `singleAttributePerLine` is added, which may effectively resolve this problem. Still waiting for it to be supported by `eslint-plugin-prettier` & `eslint-config-prettier`.

### ### Enable auto format with Prettier on save

Search How to enable with WebStorm / VSCode.

Add Prettier script in `package.json`: Format all files (. means all files)

```json
{
  "scripts": {
    "prettier": "npx prettier --write ."
  }
}
```

## ## ESLint

### ### Install Locally

```shell
$ npm install eslint --save-dev
```

### ### Initialise ESLint

```shell
$ npx eslint --init
```

1. How would you like to use ESLint?

- \> **To check syntax, find problems, and enforce code style**

2. What type of modules does your project use?

- \> **JavaScript modules (import/export)**

3. Which framework does your project use?

- \> **Vue.js**

4. Does your project use TypeScript?

- \> **Yes**

5. Where does your code run?

- \> **Browser**
- \> **Node**

6. How would you like to define a style for your project?

- \> **Use a popular style guide**

7. Which style guide do you want to follow?

- \> **Airbnb: https://github.com/airbnb/javascript**

8. What format do you want your config file to be in?

- \> **JavaScript**

9. Would you like to install them now with npm?

- \> **Yes**

### ### Config `.eslintrc.js`

As we use Vue.js 3, replace extends:

```text
extends:
  [
    'plugin:vue/essential',
    'airbnb-base'
  ],
```

with

```text
extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base'
  ],
```

### ### Enable ESLint in WebStorm

1. Go to **Preferences > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint**
2. Check **Automatic ESLint Configuration**
3. Check **Run eslint --fix on save**
4. Apply and OK
5. Have a test

### ### Add NPM Scripts

App eslint scripts in `pakage.jason`

```json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx,.vue",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx,.vue --fix"
  }
}
```

### ### Update `.gitignore`

```gitignore
# ...
# Ignore cache generated by 'eslint --cache' option.
.eslintcache
# ...
```

## ## Resolve Conflicts between Prettier and ESLint

### ### Install & Config Plugins

Install plugins:

```shell
$ npm i eslint-plugin-prettier eslint-config-prettier -D
```

Add plugins in `.eslntrc.js`:

```javascript
module.exports = {
  // ...
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'plugin:prettier/recommended' // Add prettier plugin
  ]
  // ...
}
```

### ### Resolve Other Unexpected Errors

If you run `npm run lint`, you can still see some ESLint errors. Let's resolve them one by one!

#### # `ESLint: 'vite' should be listed in the project's dependencies, not devDependencies (import/no-extraneous-dependencies)`

<details>
   <summary>See Solution</summary>

Add rule:

```javascript
// .eslintrc.js

module.exports = {
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
  }
}
```

</details>

#### # Does not work well with `<script setup>`

See solutions at [eslint-plugin-vue guide](https://eslint.vuejs.org/user-guide/#faq)

#### # Unable to resolve path to Vue modules

Sample error: `ESLint: Unable to resolve path to module '@/components/HelloWorld.vue'. (import/no-unresolved)`

<details>
<summary>See Solution</summary>

Install package `eslint-import-resolver-typescript`:

```shell
$ npm install eslint-import-resolver-typescript
```

Config `.eslintrc.js`:

```javascript
module.exports = {
  // ...
  settings: {
    'import/resolver': {
      typescript: {} // this loads <rootdir> / tsconfig.json to eslint
    }
  }
}
```

Config `tsconfig.json` if necessary

</details>

#### # file extension missing errors

Sample error: `ESLint: Missing file extension "ts"; for '@/hooks/useSomeHook'; (import/extensions)`

<details>
<summary>See Solution</summary>

Config `.eslintrc.js`

```javascript
module.exports = {
  // ...
  rules: {
    // ...
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]

    // ...
  }
}
```

</details>

## ## Integrate husky and lint-staged

### ### Config husky

Use `husky-init` command to initialise configuration:

```shell
$ npx husky-init && npm install
```

See more details at [husky official website](https://typicode.github.io/husky/#/).

### ### Config lint-staged

The fastest way to start using lint-staged is to run the following command in your terminal:

```shell
$ npx mrm@2 lint-staged
```

Then config `.husky/pre-commit`:

```text
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

## ## Add Type Declaration Folder

### ### File Structure

Store type declaration files into directory `./scr/typings` and export them in `index.d.ts`.

```text
|-- src/
    |-- typings/
        |-- index.d.ts
        |-- modules/
            |-- user.d.ts
            |-- post.d.ts
        |-- components/
            |-- form.d.ts
            |-- header.d.ts
```

### ### Declare and Use Global Types / Interfaces

#### #### What is A Global Type / Interface?

A global type / interface is a type declaration shared with **multiple** files (Globally).

If one of the standardised (i.e. shared) interface changes no matter where we put it we will have to change all the
components which are implementing it, whether that interface is in a common assembly or in a component one. Then it is a
global type.

> **Note:**
>
> You should think very carefully before setting a global type / interface. If a type is not standardised (not for sharing), or has special ad hoc merely for a specific vue component / typescript file, then it should not be exposed to other files who have access to the common assembly.

#### #### Set Global Types / Interfaces

Global types and interfaces are stored and categorised in `*.ts` files under `./src/types` directory. Export them and
use globally via `import`.

> **Note:**
>
> It is NOT encouraged to export types as an entire module via `index.ts`, because this may cause error by interface merging of duplicate-declared interfaces.

**Example:**

<details>
<summary>Expand example</summary>

Declare a global `User` interface:

```typescript
// @/types/moduels/user.ts

export interface User {
  name: string
  age: number
}
```

Then we can import the type and use it anywhere:

```typescript
// somefile.ts

import { User } from '@/types/moduels/user.ts'

const newUser: User = {
  name: 'Abigale',
  age: 26
}
```

Or use it in a Vue component:

```vue
<!-- someComponent.vue -->

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { User } from '@/types/moduels/user.ts'

export default defineComponent({
  props: {
    currentUser: Object as PropType<User>
  },
  setup() {
    const newUser: User = {
      name: 'Abigale',
      age: 26
    }

    return { newUser }
  }
})
</script>
```

</details>

#### #### Global Enums

Create `./src/types/enums` directory to store enums.

```typescript
// @/types/enums/index.ts

export enum AppMode {
  Local = 'local',
  Development = 'development',
  Staging = 'staging',
  UAT = 'uat',
  Production = 'production'
}
```

#### #### Expand type declarations of packages under `./src/typings`

> These declaration files are always end with `.d.ts`.

Move `env.d.ts` into `./src/typings`.

You can see an example in section: **## Integrate Vue Router**.

## ## Config Environment

It is often helpful to have different configuration values based on the environment where the application is running.
Here is an example: As we all know, an environment variable can only be set as a string (or boolean). When we would like
to set a variable called `VITE_IP_WHITELIST` presenting a list of IP addresses to control the access to some web pages,
then there would be a bit of troubles - we have to set it as a string in .env files, and parse it into an array anywhere
we use it. This obviously waste our time and causes a lot of duplicated code that is hard to maintain,

Inspired by [Laravel](https://laravel.com/docs/8.x/configuration), we use **configuration** files acting as a middleware
to pre-process all the environment variables, and make them accessible via a helper function `config()`.

All the configuration files are stored in the `config` directory. Each option is documented, so feel free to look
through the files and get familiar with the options available to you.

> Configuration file acts as a pre-process for environment settings, so do not set static variables as global variables (e.g. `direction_up: 'up'`). There is a better solution in TypeScript (enum or global variables).

> Note:
>
> As `config()` helper function is a better and safer way to access environment variables, so never use `import.meta.env` to get env settings in file outside `config` directory.

**Example:**

<details>
<summary>Expand example</summary>

Set configs

```typescript
// @/configs/app.ts

interface AppConfig {
  readonly name: string // !!App name must not be changed, so it should be *readonly*!!
  readonly mode: string
  readonly dev: boolean
  readonly prod: boolean
  readonly baseUrl: string
}

const app: AppConfig = {
  // App name.
  name: import.meta.env.VITE_APP_NAME,

  // App current mode (running environment).
  mode: import.meta.env.VITE_APP_MODE.trim(),

  // Whether the app is running in production.
  prod: import.meta.env.PROD,

  // Whether the app is running in development (always the opposite of import.meta.env.PROD)
  dev: import.meta.env.DEV,

  // The base url the app is being served from. This is determined by the base config option.
  baseUrl: import.meta.env.BASE_URL.trim()
}

export default app
```

Export config module

```typescript
// @/configs/index.ts

import app from '@/configs/app'

export default { app }
```

`config()` helper function

```typescript
// @/utils/config.ts

import configs from '@/configs'

const appConfig = () => {
  return configs
}

// App mode checking is frenquently used, so we also build a function for it.
const appMode = (mode?: string): string | boolean => {
  if (!mode) {
    // If there is no argument passed, return current App mode.
    return appConfig().app.mode
  } else {
    // If argument is passed, check whether current App mode is given App mode.
    return appConfig().app.mode === mode
  }
}

export { appConfig, appMode }
```

</details>

## ## Integrate Vue Router

### ### Installation

```shell
$ npm install vue-router@4
```

### ### Encapsulation

#### #### Move logic to `./src/router` directory

Here is a recommended file structure for a medium / large scale project. More details of each fold will be explained in
followings.

```text
|-- src/
    |-- router/
        |-- index.ts
        |-- middlewares/
            |-- authMiddlewares.ts    // e.g. requiresAuth, redirectAuthed
            |-- postMiddlewares.ts    // e.g. requiresEditor
            |-- ...
        |-- routes/
            |-- appRoutes.ts    // // Routes for App static pages: Home, About, ContactUs...
            |-- authRoutes.ts   // Auth routes: Login, SignUp, ResetPassword...
            |-- postRouts.ts    // Routes for module Post: CreatePost, EditPost, ShowPost, IndexPosts...
            |-- ...
```

Config and export router in `./src/router/index.ts`

```typescript
// ./src/router/index.ts

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
  // ...
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```

Use router config in `./src/main.ts`

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

const app = createApp(App)

// Use router config.
app.use(router)

app.mount('#app')
```

#### #### Move route settings from `./src/router/index.ts` into `./src/router/routes` folder.

1. Categorise routes in needed

```typescript
// ./src/router/routes/appRoutes.ts

import { RouteRecordRaw } from 'vue-router'

const appRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'app.home',
    component: () => import('@/views/HomePage.vue')
  }
]

export default appRoutes
```

```typescript
// ./src/router/routes/authRoutes.ts

import { RouteRecordRaw } from 'vue-router'

const authRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'auth.login',
    component: () => import('@/views/LoginPage.vue'),
    meta: { redirectAuthed: true }
  }
]

export default authRoutes
```

> In general, it's a good idea to always use dynamic imports for all your routes.
>
> Do not use Async components for routes. Async components can still be used inside route components but route component themselves are just dynamic imports.

2. Export all routes via `./src/router/route/index.ts`

```typescript
// ./src/router/route/index.ts

import appRoutes from '@/router/routes/appRoutes'
import authRoutes from '@/router/routes/authRoutes'
import postRoutes from '@/router/routes/postRoutes'

const routes = [...appRoutes, ...authRoutes, ...postRoutes]

export default routes
```

3. Import grouped routes and config

```typescript
// ./src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

#### #### Enable TypeScript support

- Route Meta Fields
  - Expand RouteMeta interface in file `./src/typings/vue-router.d.ts`.
  - See more at [TypeScript Support](https://next.router.vuejs.org/zh/guide/advanced/meta.html).

#### #### Use Vue Router

Render router views by `<router-view>` (normally at `App.vue` or `Layout.vue`)

See more at [official website](https://next.router.vuejs.org/guide/).

## ## Integrate Vuex

### ### Installation

```shell
$ npm install vuex@next --save
```

### ### Encapsulation

#### #### Move logic to `./src/store` directory

Config Vuex in `./src/store/index.ts`

```typescript
import { createStore } from 'vuex'

const defaultState: State = {
  // Some default states
}

export const store = createStore({
  state() {
    return defaultState
  },
  mutations: {},
  actions: {},
  getters: {}
})
```

Use Config in `./src/main.ts`:

```typescript
import store from './store/index'

const app = createApp(App)

// Use Vuex
app.use(store)

app.mount('#app')
```

#### #### TypeScript Support

Please follow [the official guide](https://next.vuex.vuejs.org/guide/typescript-support.html).

> As we will not use `this.$store` property in Vue 3 (we use `useStore()` hook function instead), there is no need to type `$store` property.
>
> If you need to expand other type declarations relative to Vuex, please put them in `./src/typeings/vuex.d.ts`.

#### #### File structure

Vuex doesn't really restrict how you structure your code. Rather, it enforces a set of high-level principles:

1. Application-level state is centralized in the store.

2. The only way to mutate the state is by committing mutations, which are synchronous transactions.

3. Asynchronous logic should be encapsulated in, and can be composed with actions.

As long as you follow these rules, it's up to you how to structure your project. If your store file gets too big, simply
start splitting the actions, mutations and getters into separate files.

For any non-trivial app, we will likely need to leverage modules. Here's an example project structure:

```text
|-- src/
    |-- store/
        ├── index.js          # where we assemble modules and export the store
        ├── actions.js        # root actions
        ├── mutations.js      # root mutations
        └── modules/
            ├── cart.js       # cart module
            └── products.js   # products module
```

## ## Integrate Axios

### ### Installation

```shell
$ npm install axios
```

### ### Encapsulation

#### #### Config Axios in `./src/http` directory

// Encapsulate axios configs in `index.ts`: base URL, headers, timeout, interceptors, etc.

```typescript
// ./src/http/index.ts

import axios from '@/http/axios'
import { AxiosRequestConfig } from 'axios'

const get = async (url: string, configs?: AxiosRequestConfig) => {
  try {
    const response = await axios.get(url, configs)

    // Define global GET response handler here.

    return response
  } catch (error) {
    // Define global GET error handler here.

    throw error
  }
}

const post = async (url: string, data?: any, configs?: AxiosRequestConfig) => {
  // Return Axios request directly if you have neither global response nor error handler.
  return axios.post(url, data, configs)
}

export default {
  get,
  post
}

```

// Packing request methods in `requests.ts`: get, post, delete, uploader, etc.

```typescript
// ./src/http/axios.ts

import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://apis.imooc.com/api',
  timeout: 3000,
  headers: {}
})

// Define Interceptors ...

export default instance
```

#### #### Define APIs in `./src/apis` directory.

File structure:

```text
|-- src/
    |-- apis/
        |-- index.ts
        |-- authApis.ts
        |-- postApis.ts
        |-- ...
```

Define apis by model / service in `*Api.ts`:

```typescript
// ./src/types/plugins/api.ts

// Declare API-relative types.

export interface ApiService {
  description?: string
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  url: string
  function: Function
}

export type ApiServices = ApiService[]

```

```typescript
// ./src/apis/postApi.ts

import http from '@/http'
import { ApiServices } from '@/types/plugins/api'

const getPostList = async () => {
  try {
    const response = await http.get(`/posts/index`)

    // Define API-level response handler here ...

    return response
  } catch (error) {
    // Define API-level error handler here ...

    throw error
  }
}

export const postServices: ApiServices = [
  {
    description: 'Get the list of post',
    url: `/posts/index`,
    method: 'get',
    function: getPostList
  }
]

export default {
  getPostList
}
```

```typescript
// ./src/apis/authApi.ts

import http from '@/http'
import { ApiServices } from '@/types/plugins/api'

const login = (data: { username: string; password: string }) => {
  // Return post async request function directly if there is neither API-level response hendler or error handler.
  return http.post(`/login`, data)
}

export const authServices: ApiServices = [
  {
    description: 'Login user by username and password',
    url: `/login`,
    method: 'post',
    function: login
  }
]

export default {
  login
}

```

Config API module in `./src/apps/index.ts`:

```typescript
import authApis, { authServices } from '@/api/authApis'
import postApis, { postServices } from '@/api/postApis'

// A list of all API services details.
const services = [...authServices, ...postServices]

const requests = {
  auth: authApis,
  post: postApis
}

// Define more configs

// Define a composition function for Vue components.
export const useApi = () => {
  return requests
}

export default {
  requests,
  services
  // export more configs
}
```

Now we are ready to request APIs in `.ts` files or Vue components, easy and clean!

- Use `useApi()` composition function in Vue components.

```vue
// ./src/views/post/PostListPage.vue
<template>
  <!-- Page view -->
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import useApi from "@/api";
import { onMounted } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    const api = useApi()

    onMounted(() => {
      api.post
        .getPostList()
        .then((response) => {
          const postList = response?.data
          // Handle postList
        })
        .catch((error) => {
          // Handle error
        })
    })
  }
})
</script>
```

- Use `api.requests` property in `.ts` files. You can use these asynchronous API requests with async / await.

```typescript
// someFile.ts

import api from '@/api'

const asyncFunction = async () => {
  try {
    const response = await api.requests.post.getPostList()
    const postList = response?.data
    // Handle postList ...
    
    return postList
    
  } catch (error) {
    // Handle error ...
  }
}

asyncFunction()
```

## ## Integrate CSS Pre-processor

// TODO
