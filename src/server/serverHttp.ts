import express from 'express';
import parser from 'body-parser';
import router from './routers/index';

const app = express();
const port : number = 3000;

export default class ServerHttp {

    middleware(){
        app.use(parser.urlencoded({extended: true}));
        app.use(parser.json());
    }

    router(){   
        app.use('/api', router);
        app.get('/', (req, res) => { res.redirect('/api') });
    }

    pipelines(){
        this.middleware();
        this.router();
    }

    createServer(){

        this.pipelines();

        app.listen(port, () => 
            console.log(`rodando: http://localhost:${port}/api`));
    }    
}