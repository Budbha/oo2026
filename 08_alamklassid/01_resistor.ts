// Абстрактный класс
abstract class AbstractResistor {
   

    abstract getResistance(): number;

    getCurrent(u:number):number{
        return u / this.getResistance(); // I = U / R
    }
}

// Класс резистора
class Resistor extends AbstractResistor {

    
    r: number;
    
    constructor(r: number) {
        super();
        this.r=r;
    }

    getResistance(): number {
        return this.r;
    }
}

// Создание объекта
let resistor1 = new Resistor(220);
console.log("The resistance value of resistor 01: " + resistor1.getResistance());

// Класс переключателя
class Switch extends AbstractResistor {
    on: boolean = false;

    constructor() {
        super(); // сопротивление можно задать 0
    }

    setOn(state: boolean) {
        this.on = state;
    }

    //getResistance(): number {
    //if(this.on){
    //     return 0;
    // }    
    //else{
    //     return 1000000000;
    //  }
    //}

    getResistance(): number{
        return(this.on ? 0:1000000000)
    }
  
    getCurrent(u: number): number {
        if (u>0){
            if(this.on){
                throw new Error("Short Circuit");
            }
        }
        return super.getCurrent(u);
    }
}

let s1=new Switch();
console.log("The initial resistance valur it is off" + s1.getResistance());
s1.setOn(true);
console.log("The resistance value when the switch is on" + s1.getResistance());
console.log(s1.getCurrent(5));
//Current =u/resistance value
//current=5/0=infinite
s1.setOn(false);
//current =5/1000000000= 5e-9
console.log(s1.getCurrent(5));

s1.setOn(false);
//printResistance(s1);

abstract class MultpleConnection extends AbstractResistor{
    resistors: AbstractResistor[]=[]

    addResistor(r:AbstractResistor){
        this.resistors.push(r);
    }
}
//This class should finally return total value of the resitars in the connection
class SeriesConnection extends MultpleConnection{
    getResistance(): number {
        let totalResistance:number=0;

        for(let resistor of this.resistors){
            //get the resitance value of each resistor and add to the total
            totalResistance += resistor.getResistance()
            
        }

        return totalResistance;
    }
}
let s:SeriesConnection= new SeriesConnection();