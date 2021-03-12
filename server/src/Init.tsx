import { Server } from 'socket.io';

/**
 * Initializes all basic server requirements. Running this will provide the front-end with an endpoint.
 * 
 * @returns The socket.io connection, used for listening and emitting messages to the front-end
 */
export const InitServer = () => {
    const
        dotenv = require('dotenv'),
        express = require('express'),
        https = require('https'),
        http = require('http'),
        fs = require('fs'),
        cors = require('cors'),
        useHTTPS = false; // Only enable this if you know what it means

    const app = express();
    app.use(cors()); // For avoiding CORS errors

    dotenv.config(); // For reading .env file


    let server: any;
    if (useHTTPS)
        server = https.createServer({
            key: fs.readFileSync('src/certs/key.key'),
            cert: fs.readFileSync('src/certs/cert.crt')
        }, app).listen(4000);
    else
        server = http.createServer(app).listen(4000);

    return new Server(server, { cors: { origin: '*' } });
};