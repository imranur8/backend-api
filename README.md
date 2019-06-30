# Backend API
Express REST API and Apollo graphQL server with typescript

## Technology Stack
- Node.js
- Express
- MongoDB
- TypeScript
- Apollo

## Requirements

[NodeJS](https://nodejs.org/en/)


[Yarn](https://yarnpkg.com/en/)
Yarn is what we use to manage API server dependencies, so we're going to need that. You can install it using Homebrew (or any of the other methods mentioned in [the install docs](https://yarnpkg.com/lang/en/docs/install/)):



## Getting Started

You should install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) on your local machine, or use other services such as [mLab](https://mlab.com/) or [Compose](https://www.compose.com/compare/mongodb)

After that, you will have to replace the mongoURL with your MongoDB address in *lib/app.ts*

## Clone this repository

```
git clone git@github.com:imranur8/backend-api.git
```

Then install the dependencies

```
yarn install
```

## Start server

Run in development mode

```
yarn dev
```
Run in development mode with node inspect

```
yarn dev-debug

```


## API documentations
Build api documentations

```
yarn apidoc
```
Open /docs/index.html in browser for api documentations details.

## TODO
### Testing
