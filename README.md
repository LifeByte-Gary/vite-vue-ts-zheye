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

## ## Docker Support

### ### Initialise docker compose
Create *docker-compose.yml* under project root path
```yaml
version: "3"
services:
  app:
    container_name: your-container-name
    user: "root"
    image: node:16
    working_dir: /var/www/html/app/
    entrypoint: /bin/bash
    environment:
      - NODE_ENV=development
    volumes:
      - .:/var/www/html/app
    ports:
      - "80:80"
    tty: true
```

Config *vite.config.ts*: set **host** option
```typescript
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 80
  }
})
```

Custom docker compose project name in *.env*
```dotenv
COMPOSE_PROJECT_NAME=project-name
```

> To avoid portal conflict, don't forget to set back-end URL port different from 80.
> 
> In Laravel, set ```APP_PORT``` in *.env*.

### ### Run project in Docker
1. Got to the root path
2. Start docker container: ```$ docker compose up -d```
3. Open container's bash: ```$ docker exec -it [container-name] /bin/bash```


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

### Use airbnb-typescript instead of airbnb
1. Install ```eslint-config-airbnb-typescript``` & ```vue-eslint-parser```
```shell
$ npm i -D eslint-config-airbnb-typescript vue-eslint-parser
```

2. Create ```tsconfig.eslint.json``` for ESLint
```json
{
  "extends": "./tsconfig.json",
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "./**/*.ts",
    "./.*.js",
  ]
}
```

3. Exclude ```.eslintrc.js``` from ESLint via ```.eslintignore```
```text
// .eslintignore

.eslintrc.js
```

4. Config ```.eslintrc.js```
```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: ['plugin:vue/vue3-essential', 'airbnb-typescript/base', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    extraFileExtensions: ['.vue']
  },
  plugins: ['vue', '@typescript-eslint', 'import'],
  settings: {
    'import/resolver': {
      typescript: {} // this loads <rootdir> / tsconfig.json to eslint,
    }
  },
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'vue/script-setup-uses-vars': 'error',
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
  }
}
```

> It is important to set ```parser: 'vue-eslint-parser'``` and ```parserOptions: { project: ['./tsconfig.eslint.json'], extraFileExtensions: ['.vue'] }``` and ```plugins: ['vue', '@typescript-eslint', 'import']``` to enable ESLint to work with Vue.

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
> If you have multiple sites(Vue projects) in a same repository or put your Vue project in a sub-folder, then you need to direct to the sub-folder and run ```npx lint-staged```

For example: your repository file structure looks like this:
```text
|-- my-repo
    |-- .husky
    |-- site-1
        |-- .eslintrc.js
        |-- ...
    |-- site-2
        |-- .eslintrc.js
        |-- ...    
```

> According to ESLint's [Cascading and Hierarchy](https://eslint.org/docs/user-guide/configuring/configuration-files#cascading-and-hierarchy), it is very important to set ```root: true``` in *.eslintrc.js*, if you don's want ESLint searches up the directory structure.

```typescript
// .eslintrc.js

module.exports = {
  root: true,
  // ...
}
```

Then your ```.husky/pre-commit``` should be like this:

```text
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

cd site-1 && npx lint-staged && cd ../site-2 && npx lint-staged
```

## ## Add Type Declaration Folder

### ### File Structure

Store type declaration files into directory `./scr/typings` and export them in `index.d.ts`.

```text
|-- src/
    |-- types/
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

### ### File Structure

```text
|-- src/
    |-- configs/
        |-- app.ts      // App configs: name, mode, baseUrl etc.
        |-- services    // Back-end API service configs and other third-party services configs: Back-end API sever url, Google reCaptcha site key & site secret
        |-- ...
```

### ### Encapsulation

#### #### Set environment variables in `.env` files

See more details at [Vite official website](https://vitejs.dev/guide/env-and-mode.html).

```.dotenv
# ./src/.env.development

## Do not forget to set environment key in other .env.[mode] files and .env.[mode].local files.

VITE_APP_MODE=development

# API settings
VITE_API_BASE_URL=http://backend-url/api

###
# !!! Set sensitive variables in .env.[mode].local file so that they will not be uploaded by git.
###
VITE_API_GOOGLE_RECAPTCHA_SITE_KEY=   # Should always be empty here!!
```

```.dotenv
# ./src/.env.development.local

VITE_APP_MODE=development

VITE_API_BASE_URL=http://backend-url/api

# !!! Set sensitive variables in .env.[mode].local file so that they will not be uploaded by git.
VITE_API_GOOGLE_RECAPTCHA_SITE_KEY=XXXXXXX   # Should always be empty here!!
```

**IntelliSense for TypeScript**

```typescript
// ./src/typings/env.d.ts

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_MODE: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_GOOGLE_RECAPTCHA_SITE_KEY: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

#### #### Parse environment variables in config files under `./src/configs/.

```typescript
// ./src/configs/app.ts

interface AppConfig {
  name: string
  mode: string
  dev: boolean
  prod: boolean
  baseUrl: string
}

const app: Readonly<AppConfig> = {
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

#### #### Create utility module and functions in `./src/utils/config.ts`

```typescript
// ./src/utils/configs.ts

// App mode checking is frequently used, so we also build a function for it.
import app from '@/config/app'

const configs = {
  app,
  services
}

export const appMode = (mode?: string): string | boolean => {
  // If there is no argument passed, return current App mode.
  // If mode argument is passed, check whether current App mode is given App mode.
  return mode ? configs.app.mode === mode : configs.app.mode
}

export default configs
```

#### #### Usage

- Use `config` utility module and its functions in your code.

```vue

<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import config, { appMode } from '@/utils/config'

export default defineComponent({
  setup() {
    const appName = config.app.name
    const appMode = appMode()
    const isDevMode = appMode('development')
  }
})
</script>
```

> Note:
>
> **NEVER** use `import.meta.env` to get env settings outside `config` directory. Instead, use `config` utility module and its functions instead.

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
            |-- auth.middleware.ts    // e.g. requiresAuth, redirectAuthed
            |-- post.middleware.ts    // e.g. requiresEditor
            |-- ...
        |-- routes/
            |-- app.route.ts    // Routes for App static pages: Home, About, ContactUs...
            |-- auth.route.ts   // Auth routes: Login, SignUp, ResetPassword...
            |-- post.route.ts   // Routes for module Post: CreatePost, EditPost, ShowPost, IndexPosts...
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
// ./src/router/routes/appRoute.ts

import { RouteRecordRaw } from 'vue-router'

const appRoute: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'app.home',
    component: () => import('@/views/HomePage.vue')
  }
]

export default appRoute
```

```typescript
// ./src/router/routes/auth.route.ts

import { RouteRecordRaw } from 'vue-router'

const authRoute: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'auth.login',
    component: () => import('@/views/LoginPage.vue'),
    meta: { redirectAuthed: true }
  }
]

export default authRoute
```

> In general, it's a good idea to always use dynamic imports for all your routes.
>
> Do not use Async components for routes. Async components can still be used inside route components but route component themselves are just dynamic imports.

2. Export all routes via `./src/router/route/index.ts`

```typescript
// ./src/router/route/index.ts

import appRoute from '@/router/routes/appRoute'
import authRoute from '@/router/routes/authRoute'
import postRoute from '@/router/routes/postRoute'

const routes = [...appRoute, ...authRoute, ...postRoute]

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

export const store = createStore({})
```

Use Config in `./src/main.ts`:

```typescript
import store from './store/index'

const app = createApp(App)

// Use Vuex
app.use(store)

app.mount('#app')
```

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
        ├── index.ts          # where we assemble modules and export the store
        ├── actions.ts        # root actions
        ├── mutations.ts      # root mutations
        └── modules/
            ├── cart.module.ts       # cart module
            └── products.module.ts   # products module
```

#### #### Encapsulation by modules with TypeScrip

As mentioned before, it is recommended to separate store features (state, getters, mutations and actions) by module.
Here is an example to show how to implement it with TypeScript.

Imagine that we are working on an online blog system, and there is a **Column / Topic** module that handles all services
relative to columns (including get column list, get column details, create a new column, delete a column, etc.). Now
let's get started!

- Declare type `RootState`: It is the root of all module states. Initially, it is empty if there is no module created,
  though you can also define some keys outside modules (e.g. `version: 1`). In this case, we have type `ColumnState`.

```typescript
// ./src/types/vuex/root.ts

/**
 *  Define Vuex root types.
 */
import { ColumnState } from '@/types/vuex/column'

export interface RootState {
  column: ColumnState
  // ... Other module state types
}
```

- Then we need to declare all types for `post` module.

```typescript
// ./src/types/vuex/column.ts

/**
 *  Define Vuex types of module: column.
 */
import { Column, Columns } from '@/types/modules/column'
import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'
import { RootState } from '@/types/vuex/root'

export interface ColumnState {
  columnList: Columns
  currentColumn: Column | undefined
}

export interface ColumnGetterTree extends GetterTree<ColumnState, RootState> {
  getColumnById: (state: ColumnState) => (id: string) => Column | undefined
}

export interface ColumnMutationTree extends MutationTree<ColumnState> {
  setColumnList: (state: ColumnState, newColumn: Columns) => void
}

export interface ColumnActionTree extends ActionTree<ColumnState, RootState> {
  fetchColumnList: ({ commit }: ActionContext<ColumnState, RootState>) => Promise<void>
}
```

> There are a lot of Vuex types included in this file, Learn more to see their declarations in vux source typing file. It would be very helpful to learn deeper of Vuex and TypeScript.

- Now we are ready to build the `column` module. Create it under `./src/store/modules` directory.

```typescript
// ./src/store/modules/column.ts

import { ColumnActionTree, ColumnGetterTree, ColumnMutationTree, ColumnState } from '@/types/vuex/column'
import { Module } from 'vuex'
import { RootState } from '@/types/vuex/root'
import api from '@/api'
import defaultAvatar from '@/assets/column.jpg'

const state: ColumnState = {
  columnList: [],
  currentColumn: undefined
}

const getters: ColumnGetterTree = {
  getColumnById: (columnState) => (id: string) => {
    return columnState.columnList.find((col) => col._id === id)
  }
}

const mutations: ColumnMutationTree = {
  setColumnList: (columnState, newColumnList) => {
    columnState.columnList = newColumnList
  }
}

const actions: ColumnActionTree = {
  fetchColumnList: async ({ commit }) => {
    const response = await api.column.getColumnList()   // Call API request. This will be covered in the following section: 'Axios'
    const columnList = response?.data.data.list

    commit('setColumnList', columnList)
  }
}

const module: Module<ColumnState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default module
```

- Import `column` module in store `index.ts` file.

```typescript
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import { RootState } from '@/types/vuex/root'
import config from '@/utils/config'
import column from '@/store/modules/column'


// Define injection key.
export const key: InjectionKey<Store<RootState>> = Symbol('injection key')

// Create store.
export const store = createStore({
  modules: { auth, column, post },
  strict: config.app.dev
})

// Simplifying usage of useStore() composition function.
export function useStore() {
  return baseUseStore(key)
}
```

> We also defined the typed `InjectionKey` for TypeScript support. See more details at [official guide](https://next.vuex.vuejs.org/guide/typescript-support.html).

- Next, install the store to the Vue app in `main.ts`

```typescript
// ./src/main.ts

import { createApp } from 'vue'
import { store, key } from './store'

const app = createApp({ ... })

// pass the injection key
app.use(store, key)

app.mount('#app')
```

- Finally, we can use `column` module in the project.

```vue

<template>
<!-- // ... -->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  // ...
  
  setup() {
    const store = useStore()

    const columnList = computed(() => store.state.column.columnList)

    onMounted(() => {
      store.dispatch('column/fetchColumnList')
    })

    return { columnList }
  }
})
</script>
```

## ## Integrate Axios

### ### Installation

```shell
$ npm install axios
```

### ### Encapsulation

#### #### Encapsulate Axios

```typescript
// ./src/http/index.ts

import axios from 'axios'

/** Request error handler. */
const handleError = (status: number, message: any) => {
  console.error(`[TMGM] Request error: [${status}] ${message}`)
}

/** Initialise Axios instance. */
const instance = axios.create({
  headers: {
    'Access-Control-Allow-Origin-Type': '*'
  },
  timeout: 1000 * 30,
  baseURL: '',
  withCredentials: false
})

/** Use request interceptor. */
instance.interceptors.request.use(
  (requestConfig) => {
    return requestConfig
  },
  (error) => {
    return Promise.reject(error)
  }
)

/** Use response interceptor. */
instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error && error.response) {
      // Construct error response
      error.response.data = {
        status: error.response.status,
        success: false,
        message: error.response.data?.message,
        errors: error.response.data?.errors,
        ...error.response.data
      }

      handleError(error.response)

      return Promise.reject(error)
    } else {
      //TODO: Global failed response handler
      alert('Failed to response')
    }
  }
)

export default instance
```

#### #### Encapsulate HTTP requests

```typescript
// ./src/http/request.ts

/** Encapsulate Axios requests. */
import { AxiosRequestConfig } from 'axios'
import http from '@/http'

export class Request {
  /** GET request. */
  static get = async (url: string, params?: any, config?: AxiosRequestConfig) => {
    try {
      return await http.get(url, { params: params, ...config })
    } catch (error) {
      console.error('[TMGM] Request error: ', error)
      throw error
    }
  }

  /** POST request. */
  static post = async (url: string, data?: any, config?: AxiosRequestConfig) => {
    try {
      return await http.post(url, data, { ...config })
    } catch (error) {
      console.error('[TMGM] Response error: ', error)
      throw error
    }
  }
}

```

#### #### Work with API requests

- Create `./src/http/apis` directory to group APIs by model / services.

File structure:

```text
|-- src/
    |-- http/
        |-- index.ts
        |-- request.ts
        |-- apis
            |-- auth.apis.ts
            |-- user.apis.ts
            |-- ...
```

- Config APIs at where they belong to

```typescript
// ./src/apis/auth.apis.ts

import requests from '@/http/requests'

const serviceApis = {
  signUp: async (data: object) => {
    const response = await requests.post('/register', data)
    return response?.data
  }
}

export default serviceApis
```

- Export group APIs in `./src/http/apis/index.ts`

```typescript
// ./src/apis/index.ts

import appApis from '@/http/apis/app.apis'
import serviceApis from '@/http/apis/service.apis'

export default {
  app: appApis,
  service: serviceApis
}
```

Now we are ready to request APIs in `.ts` files or Vue components, easy and clean!

```vue
// ./src/views/user/UserListPage.vue
<template>
  <!-- Page view -->
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import apis from "@/http/apis";
import { onMounted } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    onMounted(() => {
      apis.user
        .getUserList()
        .then((response) => {
          const userList = response?.data
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

- You can also use these asynchronous API requests with async / await.

```typescript
// someFile.ts

import apis from '@/http/apis'

const asyncFunction = async () => {
  try {
    const response = await apis.user.getUserList()
    const userList = response?.data
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
