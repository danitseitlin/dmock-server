import { MockServer, Response } from '../index';

export class Application {
    server: MockServer
    users: User[];
    constructor() {
        this.users = [];
        this.server = new MockServer({
            hostname: 'localhost',
            port: 3000,
            routes: [{
                method: 'post',
                path: '/users',
                response: (req) => this.createUser(req.body) 
            },{
                method: 'put',
                path: '/users/:id',
                response: (req, res) => this.updateUser(parseInt(req.params.id), req.body, res) 
            },{
                method: 'get',
                path: '/users',
                headers: {'cookie': 'my-key'},
                response: this.users
            },{
                method: 'delete',
                path: '/users/:id',
                response: (req, res) => this.deleteUser(parseInt(req.params.id), res)
            },{
                method: 'get',
                path: '/users/:id',
                response: (req, res) => this.getUser(parseInt(req.params.id), res)
            }]
        });
    }
    /**
     * Retrieving a user
     * @param id The id of the user
     * @param res The response of the request
     */
    getUser(id: number, res: Response) {
        const user = this.users.find((user: User) => user.id == id);
        if(user === undefined) res.status(404).send(this.generateError(id, 'user'))
        else return user;
    }

    /**
     * Creating a user
     * @param details The parameters used to create the user
     */
    createUser(details: UserInformation){
        this.users.push({
            id: this.users.length+1,
            name: details.name,
            email: details.email
        });
    }

    /**
     * Updating a user
     * @param id The if of the user
     * @param details The parameters used to update the user
     * @param res The response of the request
     */
    updateUser(id: number, details: UserInformation, res: Response){
        const user = this.users.find((user: User) => user.id == id);
        if(user === undefined) res.status(404).send(this.generateError(id, 'user'))
        else if(user !== undefined) {
            if(details.email !== undefined) user.email = details.email;
            if(details.name !== undefined) user.name = details.name;
            const index = this.users.indexOf(user);
            this.users[index] = user;
        }
    }

    /**
     * Deleting a user
     * @param id The id of the user
     * @param res The response of the request
     */
    deleteUser(id: number, res: Response){
        const user = this.users.find((user: User) => user.id === id);
        if(user === undefined) res.status(404).send(this.generateError(id, 'user'))
        else this.users.splice(this.users.indexOf(user), 1);
    }

    /**
     * Generating an error message
     * @param id The id of the entity
     * @param entity The entity type
     */
    private generateError(id: number, entity: string){
        return {
            code: 404,
            message: `Cannot find ${entity} with ${id}`
        }
    }
    
    /**
     * Starting the application
     */
    start() { this.server.start(); }
    
    /**
     * Stopping the application
     */
    stop() { this.server.stop(); }
}

/**
 * The user object
 * @param id The id of the user
 * @param name The name of the user
 * @param email The email of the user
 */
export interface User extends UserInformation {
    id: number
};

/**
 * The user information object
 * @param name The name of the user
 * @param email The email of the user
 */
export type UserInformation = {
    name?: string,
    email?: string
};