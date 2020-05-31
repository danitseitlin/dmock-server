import Axios from 'axios';
import { expect } from 'chai';
import { MockServer } from '../src/index';

const httpClient = Axios.create({
    baseURL: 'http://localhost:3000',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
});
const server = new MockServer({
    hostname: 'localhost',
    port: 3000,
    routes: [{
        method: 'get',
        path: '/users',
        response: {
            username: 'wonderwoman@yahoo.com'
        }
    },{
        method: 'post',
        path: '/users',
        response: {
            username: 'newwonderwoman@yahoo.com'
        } 
    },{
        method: 'put',
        path: '/users/:id',
        response: {
            username: 'xwonderwoman@yahoo.com'
        } 
    },{
        method: 'delete',
        path: '/users/2',
        response: { 'exists': false }
    }]
});

describe('Mock server testing', async function() {
    this.timeout(10 * 60 * 60);
    before(async () => {
        server.start();
    });

    after(async () => {
        server.stop();
    });

    it('JS Object based mock response', async () => {
        let response = await httpClient.get('/users');
        expect(response.data.username).to.eql('wonderwoman@yahoo.com');
        response = await httpClient.post('/users', {
            name: 'user-name-x'
        });
        expect(response.data.username).to.eql('newwonderwoman@yahoo.com');
        response = await httpClient.put('/users/1', {
            name: 'user-name-x'
        });
        expect(response.data.username).to.eql('xwonderwoman@yahoo.com');
        response = await httpClient.delete('/users/2');
        expect(response.data.exists).to.eql(false);
    });
});