# Description

TranslinkMaster Recruitment Task - Backend
Nest.js + MongoDB

Tomasz Jurek

## Running the app

Create .env file and paste there content from .env.example

### Docker

```bash
# first run only
$ docker-compose build

# to run
$ docker-compose up
```

### Yarn

```bash
# first run only
$ yarn install

# to run
$ yarn start:dev
```

## Connect to MongoDB locally

Only if docker image 'mongo' is running

```env
DATABASE_HOST=localhost
DATABASE_PORT=28017
DATABASE_USERNAME=root
DATABASE_PASSWORD=example
DATABASE_NAME=translinkmaster
DATABASE_URI=mongodb://root:example@localhost:28017/translinkmaster
```
