import { format } from 'date-fns';
import { Response, Request } from 'express';
import Log from '../../modules/log';
import Util from '../util';
import Autentication from '../../modules/autentication';

export default class Login { 

    async index(req: Request, res: Response) {
        
        let aut = new Autentication();
        let log = new Log();

        let { token, user } = req.body
        let date = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`;

        await log.saveLog(`[ data log: ${date} ]\tmethod: ${req.method}\taction: login/index`)

        if(await aut.getToken(token, user)){ 
            let json: any = { dtConsulta: date };
            await Util.Ok(res, json);
        }
        else{
            res.redirect("/")
        }

    }   

    async list(req: Request, res: Response) {
        
        let aut = new Autentication();
        let log = new Log();
        let { token, user} = req.body;
        let date = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`;

        await log.saveLog(`[ data log: ${date} ]\tmethod: ${req.method}\taction: login/index`)

        if(await aut.getToken(token, user)){ 
            let json: any = { Result: await aut.getall(), dtConsulta: date };
            await Util.Ok(res, json);
        }
        else{
            res.redirect("/")
        }

    }   

    async add(req: Request, res: Response) {
        
        let aut = new Autentication();
        let log = new Log();

        let { token, user, User } = req.body
        let date = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`;

        await log.saveLog(`[ data log: ${date} ]\tmethod: ${req.method}\taction: login/add`)

        if(await aut.getToken(token, user)){ 
            let json: any = { Add: aut.set(User.user, User.token, date), dtConsulta: date };
            await Util.Ok(res, json);
        }
        else{
            res.redirect("/")
        }

    }   

}