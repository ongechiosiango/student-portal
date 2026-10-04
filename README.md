# Student Portal

[![CI](https://github.com/ongechiosiango/student-portal/actions/workflows/ci.yml/badge.svg)](https://github.com/ongechiosiango/student-portal/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A small multi-tenant student portal REST API and web UI.

**Status:** Early development. Currently serves a `/health` endpoint.

## Requirements

- Node.js >= 22 (see `.nvmrc`)

## Install

    npm install

## Run

    npm start

Server listens on http://localhost:3000 by default.
Set `PORT` to change:

    PORT=4000 npm start

## Health check

    curl http://localhost:3000/health

## Test

    npm test

## License

MIT - see LICENSE.
