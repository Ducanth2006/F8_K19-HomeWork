import{v4 as uuidv4} from 'uuid'
export class Employee{
    private id:string
    private name:string
    constructor(name:string){
        this.id=uuidv4();
        this.name=name;
    }
    public getId(){
        return this.id
    }
    public setName(name:string){
        this.name=name;
    }
    public getName(){
        return this.name;
    }
    public receiveNoti(message: string): void{
        console.log(`${this.id}-${this.name} received notification: ${message}`)
    }


}
