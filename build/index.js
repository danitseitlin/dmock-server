"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var MockServer = /** @class */ (function () {
    /**
     * The constructor of the Mock Server
     * @param parameters The parameters of the mock server
     */
    function MockServer(parameters) {
        this.handler = express_1.default();
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
    MockServer.prototype.start = function () {
        var _loop_1 = function (route) {
            if (route.method === 'get')
                this_1.handler.get(route.path, function (req, res) { res.send(route.response); });
            if (route.method === 'post')
                this_1.handler.post(route.path, function (req, res) { res.send(route.response); });
            if (route.method === 'put')
                this_1.handler.put(route.path, function (req, res) { res.send(route.response); });
            if (route.method === 'delete')
                this_1.handler.delete(route.path, function (req, res) { res.send(route.response); });
        };
        var this_1 = this;
        for (var _i = 0, _a = this.routes; _i < _a.length; _i++) {
            var route = _a[_i];
            _loop_1(route);
        }
        this.server = http_1.createServer(this.handler).listen(this.port, this.hostname);
    };
    /**
     * Stopping the mock server
     */
    MockServer.prototype.stop = function () {
        this.server.close();
    };
    /**
     * Returning the mock server object
     */
    MockServer.prototype.getServer = function () {
        return this.server;
    };
    return MockServer;
}());
exports.MockServer = MockServer;
