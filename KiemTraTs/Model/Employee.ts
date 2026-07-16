import{v4 as uuidv4} from 'uuid'
export class Employee{
    public id:string
    public name:string
    constructor(name:string){
        this.id=uuidv4();
        this.name=name;
    }
    public receiveNoti(message: string): void{
        console.log(`  ${this.id}-${this.name} received notification: ${message}`)
    }


}
