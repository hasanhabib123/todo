import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import Connection from './database/db.js';
import Routes from './routes/route.js';

const app = express();
dotenv.config();


app.use(cors());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', Routes);

//step 3: Heroku

if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"));
    app.get("*",(request,response)=>{
        response.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const URL = process.env.MONGODB_URI || `mongodb://${USERNAME}:${PASSWORD}@ac-yqayaet-shard-00-00.ijqetza.mongodb.net:27017,ac-yqayaet-shard-00-01.ijqetza.mongodb.net:27017,ac-yqayaet-shard-00-02.ijqetza.mongodb.net:27017/crud-todo?ssl=true&replicaSet=atlas-z86nwm-shard-0&authSource=admin&retryWrites=true&w=majority`;

Connection(URL);

app.listen(PORT, () => console.log(`Your server is running successfully on PORT ${PORT}`));