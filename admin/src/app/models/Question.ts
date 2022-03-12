import {Answer} from './Answer';
export class Question{

  
    constructor(
        public id: number,
        public question: string,
        public answers:Array<Answer>,
    ) { 
       
     }

}
