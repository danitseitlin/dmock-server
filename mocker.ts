import { MockServer } from './src/mocker-server';

const server = new MockServer({
    routes: [{
       path: '/x',
       method: 'get',
       response: {
           accounts: {}
       }
    }]
});
server.start();
console.log('started');
// server.stop();
// console.log('stopped')