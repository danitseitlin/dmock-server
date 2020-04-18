/// <reference types="node" />
import { Server } from 'http';
export declare class MockServer {
    private handler;
    private server;
    private hostname;
    private port;
    private routes;
    /**
     * The constructor of the Mock Server
     * @param parameters The parameters of the mock server
     */
    constructor(parameters: MockServerParameters);
    /**
     * Starting the mock server
     */
    start(): void;
    /**
     * Stopping the mock server
     */
    stop(): void;
    /**
     * Returning the mock server object
     */
    getServer(): Server;
}
/**
 * The parameters of the mock server that are passed over in the constructor
 * @param hostname The hostname of the server, default is localhost
 * @param port The port the server listens to, default is 3000
 * @param routes An array of the routes the server will mock
 */
declare type MockServerParameters = {
    hostname?: string;
    port?: number;
    routes: Route[];
};
/**
 * A type for each route defined and passed over to the mock server.
 * @param method The request method, for example: get
 * @param path The path of the url, for example: /user
 * @param response The response body, for example: { id: 1 }
 */
declare type Route = {
    method: RequestMethod;
    path: string;
    response: {
        [key: string]: any;
    };
};
/**
 * Available request methods
 */
declare type RequestMethod = 'get' | 'post' | 'put' | 'delete';
export {};
