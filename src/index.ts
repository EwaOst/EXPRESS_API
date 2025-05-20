import express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';

const app = express();

const allowedOrigins = ['http://localhost:5500', 'http://127.0.0.1:5500']

const options: cors.CorsOptions = {
    origin: allowedOrigins,
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    optionsSuccessStatus: 204

};

app.use(cors(options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/api', routes)

const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`Listening on http://localhost:${port}`);
})