import { format } from 'date-fns';
import { Response, Request } from 'express';
import { Business } from '../../app/business';
import { Log } from '../../modules/log';
import { Util } from '../util';
import { Autentication } from '../../modules/autentication';
import { Email } from '../../modules/email';

export class Home { 

    async index(req: Request, res: Response) {
        
        let aut = new Autentication();
        let bll = new Business();
        let log = new Log();
        let email = new Email();

        let { token, user } = req.body
        let date = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`;

        await log.saveLog(`[ data log: ${date} ]\tmethod: ${req.method}\taction: index`)

        if(await aut.getToken(token, user)){
            let json: any = { Usuario: bll.get(user), dtConsulta: date };
            let info = await email.MailSend('celso.almeida.leite@hotmail.com', 'Vista', 'Você teve uma visita!');
            await Util.Ok(res, json);
        }
        else{
            let json: any = { Falha: 'falha de token!', dtConsulta: date };
            await Util.Fail(res, json);
        }

    }   

}
