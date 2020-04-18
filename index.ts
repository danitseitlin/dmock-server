import * as express from 'express';
import { createServer, Server } from 'http';

export class MockServer {
    private handler: express.Express = express();
    private server: Server | any;
    private hostname: string = 'localhost';
    private port: number = 3000;
    private routes: Route[];

    /**
     * The constructor of the Mock Server
     * @param parameters The parameters of the mock server
     */
    constructor(parameters: MockServerParameters) {
        if(parameters.hostname !== undefined) this.hostname = parameters.hostname;
        if(parameters.port !== undefined) this.port = parameters.port;
        this.routes = parameters.routes;
    }

    /**
     * Starting the mock server
     */
    start(): void {
        for(const route of this.routes) {
            if(route.method === 'get') this.handler.get(route.path, function (req, res) { res.send(route.response); });
            if(route.method === 'post') this.handler.post(route.path, function (req, res) { res.send(route.response); });
            if(route.method === 'put') this.handler.put(route.path, function (req, res) { res.send(route.response); });
            if(route.method === 'delete') this.handler.delete(route.path, function (req, res) { res.send(route.response); });
        }
        this.server = createServer(this.handler).listen(this.port, this.hostname);
    }


    /**
     * Stopping the mock server
     */
    stop(): void {
        this.server.close();
    }

    /**
     * Returning the mock server object
     */
    getServer(): Server {
        return this.server;
    }
}

/**
 * The parameters of the mock server that are passed over in the constructor
 * @param hostname The hostname of the server, default is localhost
 * @param port The port the server listens to, default is 3000
 * @param routes An array of the routes the server will mock
 */
type MockServerParameters = {
    hostname?: string,
    port?: number, 
    routes: Route[]
}

/**
 * A type for each route defined and passed over to the mock server.
 * @param method The request method, for example: get
 * @param path The path of the url, for example: /user
 * @param response The response body, for example: { id: 1 }
 */
type Route = {
    method: RequestMethod,
    path: string
    response: {[key: string]: any}
}

/**
 * Available request methods
 */
type RequestMethod = 'get' | 'post' | 'put' | 'delete';