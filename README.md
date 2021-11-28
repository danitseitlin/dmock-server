<p align='center'>
  <a href='https://www.npmjs.com/package/dmock-server'>
    <img src='https://img.shields.io/npm/v/dmock-server/latest?style=plastic' target='_blank' />
  </a>
  <a href='https://npmjs.org/package/dmock-server' style='width:25px;height:20px;'>
    <img src='https://img.shields.io/npm/dm/dmock-server.svg?color=blue&style=plastic' target='_blank' />
  </a>
  <a href='https://github.com/danitseitlin/dmock-server/issues' style='width:25px;height:20px;'>
    <img src='https://img.shields.io/github/issues/danitseitlin/dmock-server?style=plastic' target='_blank' />
  </a>
  <a href='https://npmjs.org/package/dmock-server' style='width:25px;height:20px;'>
    <img src='https://img.shields.io/bundlephobia/min/dmock-server/latest?style=plastic' target='_blank' />
  </a>
  <a href='https://github.com/danitseitlin/dmock-server/commits/master'>
    <img src='https://img.shields.io/github/last-commit/danitseitlin/dmock-server?style=plastic' />
  </a>
  <a href='https://github.com/danitseitlin/dmock-server/blob/master/LICENSE'>
    <img src='https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=plastic' target='_blank' />
  </a>
</p></p>

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
