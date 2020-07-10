# dMock Server &middot; [![GitHub license](https://img.shields.io/badge/license-BSD%203%20Clause-blue.svg)](https://github.com/danitseitlin/dmock-server/blob/master/LICENSE) [![npm version](http://img.shields.io/npm/v/dmock-server.svg?style=flat)](https://npmjs.org/package/dmock-server "View this project on npm") ![CI](https://github.com/danitseitlin/dmock-server/workflows/CI/badge.svg)
## About
This NodeJS module is a delightful mock server built for automation and ongoing development
## Quick Start

### Install the module
Run the following command in your terminal:

`npm i dmock-server`

### Setup your mock
```
import { MockServer } from 'dmock-server';

//Initializing the mock server
const server = new MockServer({
    hostname: 'localhost',
    port: 3000,
    routes: [{
        method: 'get',
        path: '/users',
        response: this.users
    },{
        method: 'get',
        path: '/users/:id',
        response: (req) => this.getUser(req.params.id)
    }]
});
```
You can setup a function or a simple JS object as a response for a URL.<br>
Once ready, you will need to run `server.start()` to start the server and `server.stop()` to stop it.
