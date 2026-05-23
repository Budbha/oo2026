class Water {
    waterAmount: number;
    temprature:number;
    heatingPower:number =0; //starts at 0 means is heater is switch off. Heating power =0 watts
    readonly specialHeatCapacity: number= 4200;

    //constructor runs when a new water object is created.
    constructor(waterAmount: number, temprature: number){
        this.waterAmount =waterAmount;
        this.temprature=temprature;

    }
    setHeatingPower(newPower: number): void{
        //power= joules per second
        this.heatingPower =newPower;
    }
    getTemprature():number{
        return this.temprature;
    }
    //This method simulate heating water for 1 second
    //It is going to increase the temprature based on power; wateramount , spcial heat capacity.
    heatAsecond(): void{
        //energy added in 1 second (since power = joules per second)
        let joules = this.heatingPower;
        //calculate how much temprature increases
        // Formula: ΔT = energy / (specific heat capacity × mass)
        //how much stuff (water) something contain
        let deltaTemprature = joules/(this.specialHeatCapacity* (this.waterAmount/1000)); //converted grams to kg
        this.temprature += deltaTemprature;
    }

    calculateHeatingTime(targetTemprature: number): number{
        //time =energy/power;
        //power= this.heatingpower
        let tempratureDifference=targetTemprature-this.temprature;
        let jouleRequired= tempratureDifference * this.specialHeatCapacity * (this.waterAmount/1000)
        let timeinSeconds = jouleRequired/this.heatingPower;
        return timeinSeconds;
    }
}
let w = new Water(800, 20);
console.log(w.getTemprature());
w.setHeatingPower(1500);
console.log("after setting the heating power: "+ w.getTemprature());
w.heatAsecond();
console.log("after heating for 1 second: " + w.getTemprature())
let heatingtime = w.calculateHeatingTime(80);
console.log(heatingtime)