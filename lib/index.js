"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_1 = require("http");
class MockServer {
    /**
     * The constructor of the Mock Server
     * @param parameters The parameters of the mock server
     */
    constructor(parameters) {
        this.handler = express();
        this.hostname = 'localhost';
        this.port = 3000;
        if (parameters.hostname !== undefined)
            this.hostname = parameters.hostname;
        if (parameters.port !== undefined)
            this.port = parameters.port;
        this.routes = parameters.routes;
    }
    /**
     * Starting the mock server
     */
    start() {
        for (const route of this.routes) {
            if (route.method === 'get')
                this.handler.get(route.path, function (req, res) { res.send(route.response); });
            if (route.method === 'post')
                this.handler.post(route.path, function (req, res) { res.send(route.response); });
            if (route.method === 'put')
                this.handler.put(route.path, function (req, res) { res.send(route.response); });
            if (route.method === 'delete')
                this.handler.delete(route.path, function (req, res) { res.send(route.response); });
        }
        this.server = http_1.createServer(this.handler).listen(this.port, this.hostname);
    }
    /**
     * Stopping the mock server
     */
    stop() {
        this.server.close();
    }
    /**
     * Returning the mock server object
     */
    getServer() {
        return this.server;
    }
}
exports.MockServer = MockServer;
