import ServerHttp from '../server/serverHttp';
import System from './system'

export default class Framework extends System {
    
    public server?: ServerHttp
    //public static ServerHtml?: ServerHttp 

    constructor(){
        super()    
    }
}