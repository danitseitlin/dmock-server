# dmock server
A typescript based mock server NPM module

# How to use
```
import { MockServer } from 'dmock-server';

//Initializing the mock server
const server = new MockServer({
    routes: [{
        path: '/accounts',
        method: 'get',
        response: {
            accounts: [{
                id: 1,
                username: 'user-1'
            }]
        }
    }]
});

//Starting the mock server
server.start();
```
You're all set.

