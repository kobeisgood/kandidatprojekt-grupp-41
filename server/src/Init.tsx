import { Server } from 'socket.io';

const useHTTPS = false; // Only enable this if you know what it means

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
        cors = require('cors');

    const app = express();
    app.use(cors()); // For avoiding CORS errors

    dotenv.config(); // For reading .env file


    let server: any;
    if (useHTTPS)
        server = https.createServer(app).listen(4000);
    else
        server = http.createServer(app).listen(4000);

    return new Server(server, { cors: { origin: '*' } });
};

export const RedirectServer = () => {
    if (useHTTPS) {
        const app2 = require('express')();
        app2.listen(80);
    
        app2.get("/", (req, res) => {
            res.status(301).redirect("https://ringupp.site");
        })
    }
};