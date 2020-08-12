import { createServer, Server } from 'http';
import * as express from 'express';
import * as parser from 'body-parser'

export class MockServer {
    private handler: express.Express = express();
    private server: Server | undefined;
    private hostname = 'localhost';
    private port = 3000;
    private routes: Route[];

    /**
     * The constructor of the Mock Server
     * @param parameters The parameters of the mock server
     * @param parameters.hostname Optional. The hostname of the server, default is localhost
     * @param parameters.port Optional. The port the server listens to, default is 3000
     * @param parameters.routes Required. An array of the routes the server will mock
     * @param parameters.routes.method Required. The request method, for example: get
     * @param parameters.routes.path Required. The path of the url, for example: /user
     * @param parameters.routes.statusCode Optional. The status code of the response
     * @param parameters.routes.headers Optional. The response headers
     * @param parameters.routes.response Required. The response body, for example: { id: 1 }
     */
    constructor(parameters: ServerParameters) {
        if(parameters.hostname !== undefined) this.hostname = parameters.hostname;
        if(parameters.port !== undefined) this.port = parameters.port;
        if(typeof parameters.routes === 'string') 
            this.routes = require(`${process.env.INIT_CWD}/${parameters.routes}`);
        else this.routes = parameters.routes;
    }

    /**
     * Starting the mock server
     */
    start(): void {
        this.handler.use(parser.urlencoded({ extended: true }));
        this.handler.use(parser.json());
        for(const route of this.routes) {
            if(route.method === 'get') this.handler.get(route.path, (req, res) => this.handleResponse(req, res, route));
            else if(route.method === 'post') this.handler.post(route.path, (req, res) => this.handleResponse(req, res, route));
            else if(route.method === 'put') this.handler.put(route.path, (req, res) => this.handleResponse(req, res, route));
            else if(route.method === 'delete') this.handler.delete(route.path, (req, res) => this.handleResponse(req, res, route));
            else if(route.method === 'patch') this.handler.patch(route.path, (req, res) => this.handleResponse(req, res, route));
            else if(route.method === 'options') this.handler.options(route.path, (req, res) => this.handleResponse(req, res, route));
            else if(route.method === 'head') this.handler.head(route.path, (req, res) => this.handleResponse(req, res, route));
        }
        this.server = createServer(this.handler).listen(this.port, this.hostname);
    }
    
    /**
     * Handling the response
     * @param request The request object
     * @param response The response object
     * @param route The route object
     */
    private handleResponse(request: express.Request, response: express.Response, route: Route) {
        for(const header in route.headers) response.set(header, route.headers[header]);
        response.status((route.statusCode !== undefined) ? route.statusCode: 200)
        response.send((typeof route.response === 'function') ? route.response(request, response): route.response)        
    }

    /**
     * Stopping the mock server
     */
    stop(): void {
        if(this.server !== undefined) this.server.close();
    }

    /**
     * Returning the mock server object
     */
    getServer(): Server | undefined { return this.server; }
}

/**
 * The parameters of the mock server that are passed over in the constructor
 * @param hostname Optional. The hostname of the server, default is localhost
 * @param port Optional. The port the server listens to, default is 3000
 * @param routes Required. An array of the routes the server will mock / A string of the json file path.
 */
export type ServerParameters = {
    hostname?: string,
    port?: number, 
    routes: Route[] | string
}

/**
 * A type for each route defined and passed over to the mock server.
 * @param method Required. The request method, for example: get
 * @param path Required. The path of the url, for example: /user
 * @param statusCode Optional. The status code of the response
 * @param headers Optional. The response headers
 * @param response Required. The response body, for example: { id: 1 }
 */
export type Route = {
    method: RequestMethod,
    path: string
    statusCode?: number,
    headers?: {[key: string]: any},
    response: {[key: string]: any} | ResponseFunction;
}

/**
 * Available request methods
 */
type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

/**
 * A generic flexible function for function response handling
 */
type ResponseFunction = (request: Request, response: Response) => void;

/**
 * The request object
 */
export type Request = express.Request;

/**
 * The response object
 */
export type Response = express.Response;