import { createServer, Server } from 'http';
import * as express from 'express';
import * as core from 'express-serve-static-core';
import * as parser from 'body-parser'

export class MockServer {
    private handler: express.Express = express();
    private server: Server | any;
    private hostname: string = 'localhost';
    private port: number = 3000;
    private routes: Route[];

    /**
     * The constructor of the Mock Server
     * @param parameters The parameters of the mock server
     * @param parameters.hostname The hostname of the server, default is localhost
     * @param parameters.port The port the server listens to, default is 3000
     * @param parameters.routes An array of the routes the server will mock
     * @param parameters.routes.method The request method, for example: get
     * @param parameters.routes.path The path of the url, for example: /user
     * @param parameters.routes.response The response body, for example: { id: 1 }
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
        this.handler.use(parser.urlencoded({ extended: true }));
        this.handler.use(parser.json());
        for(const route of this.routes) {
            const scope = this;
            if(route.method === 'get') this.handler.get(route.path, function (req, res) { scope.handleRequest(req, res, route) });
            else if(route.method === 'post') this.handler.post(route.path, function (req, res) { scope.handleRequest(req, res, route) });
            else if(route.method === 'put') this.handler.put(route.path, function (req, res) { scope.handleRequest(req, res, route) });
            else if(route.method === 'delete') this.handler.delete(route.path, function (req, res) { scope.handleRequest(req, res, route) });
            else if(route.method === 'patch') this.handler.patch(route.path, function (req, res) { scope.handleRequest(req, res, route) });
            else if(route.method === 'options') this.handler.options(route.path, function (req, res) { scope.handleRequest(req, res, route) });
            else if(route.method === 'head') this.handler.head(route.path, function (req, res) { scope.handleRequest(req, res, route) });
        }
        this.server = createServer(this.handler).listen(this.port, this.hostname);
    }

    /**
     * Handling the response
     * @param req The request parameters
     * @param res The response parameters
     * @param route The route object
     */
    private handleRequest(req: core.Request<core.ParamsDictionary, any, any, core.Query>, res: core.Response<any>, route: Route) {
        const response = (typeof route.response === 'function') ? route.response(req, res): route.response;
        res.status((route.statusCode !== undefined) ? route.statusCode: 200).send(response);
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
 * @param statusCode The status code of the response
 * @param response The response body, for example: { id: 1 }
 */
type Route = {
    method: RequestMethod,
    path: string
    statusCode?: number,
    response: {[key: string]: any} | GenericFunction;
}

/**
 * Available request methods
 */
type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

/**
 * A generic flexible function for function response handling
 */
type GenericFunction = (request: core.Request<core.ParamsDictionary, any, any, core.Query>, response: core.Response<any>) => void;