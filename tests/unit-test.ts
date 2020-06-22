import Axios from 'axios';
import { expect } from 'chai';
import { Application } from './mock'
const httpClient = Axios.create({
    baseURL: 'http://localhost:3000',
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
});

const application = new Application();

describe('Mock server testing', async function() {
    this.timeout(10 * 60 * 60);
    before(async () => {
        application.start();
    });

    after(async () => {
        application.stop();
    });

    it('JS Object based mock response', async () => {
        let response = await httpClient.get('/users');
        expect(response.data.length).eql(0, 'Users count');
        await httpClient.post('/users', {
            name: 'user1',
            email: 'user1@gmail.com'
        });
        await httpClient.post('/users', {
            name: 'user2',
            email: 'user2@gmail.com'
        });
        response = await httpClient.get('/users');
        expect(response.headers.cookie).to.equal('my-key', 'The cookie of the response')
        expect(response.data.length).eql(2, 'Users count');
        response = await httpClient.get('/users/1');
        expect(response.data.name).eql('user1', 'User name');
        expect(response.data.email).eql('user1@gmail.com', 'User email address');
        expect(response.headers.cookie).not.to.equal('my-key', 'The cookie of the response')
        await httpClient.put('/users/1', {
            name: 'user1-updated',
            email: 'user1-updated@gmail.com'
        });
        response = await httpClient.get('/users/1');
        expect(response.data.name).eql('user1-updated', 'User updated name');
        expect(response.data.email).eql('user1-updated@gmail.com', 'User updated email address');
        await httpClient.delete('/users/1');
        response = await httpClient.get('/users');
        expect(response.data.length).eql(1, 'Users count');
    });
});