class MaterialAmount{
    //Mass is simply how much stuff something contains
    mass: number;
    specificHeatCapacity: number;
    temperature: number;

    //create constructor
    constructor(mass: number, specificHeatCapacity: number, temperature:number){
        this.mass=mass;
        this.specificHeatCapacity=specificHeatCapacity;
        this.temperature=temperature;
    }
    //take the temperature
    getTemperature(): number{
        return this.temperature;
    }

    changeEnergy(joules:number): void{
        this.temperature += joules/ (this.mass*this.specificHeatCapacity);
    }
    //Addenergy
    //temerature change = energy/ (mass* heat capacity)
    
    //This method tells how much energy is needed to raise the temperature by 1 degree in other words
    //how many joules needed to raise this object by `1 degree
    getJoulesPerKelvin():number{
        //Q = m · c · ΔT
        //Q/ΔT =m.c
        //m.c is heat capcity of the object
        return this.mass * this.specificHeatCapacity;
    }

}

let waterPot: MaterialAmount=new MaterialAmount(3, 4200, 20);
console.log(waterPot.getTemperature());
waterPot.changeEnergy(10000);
console.log(waterPot.getTemperature());
let ironRadiator: MaterialAmount=new MaterialAmount(10, 412, 20);
console.log(ironRadiator.getTemperature());
ironRadiator.changeEnergy(10000);
console.log(ironRadiator.getTemperature());

if(ironRadiator.getTemperature()>waterPot.getTemperature()){
    let changeAmount:number=1000;
    ironRadiator.changeEnergy(-changeAmount);
    waterPot.changeEnergy(changeAmount);
}
console.log("water pot Temperature after transfering 1000: "+ waterPot.getTemperature().toFixed(2), 
"iron radiator temperature after transfering 1000: "+ ironRadiator.getTemperature().toFixed(2));

class AirAmount extends MaterialAmount{
    constructor(length:number, width:number, height:number, temperature:number){
        super(length*width*height*1.23, 1012, temperature)
    }
}

//write a function to find the one final temeprature for all the objects.
//Imaging mixing them together untill they all become the same temperature.
function getEqualTemperature(m: Array<MaterialAmount>):number{
    //how much energy is needed to increase all the objects by 1 degree
    let jouleKelvinSum=0;
    //total heat energy. This is different different from the previousone because this includes temperature too.
    let jouleSum=0;

    //Go through each object one by one
    for(let i=0; i<m.length; i++){
        //add how much this object affects temperature
        jouleKelvinSum +=m[i].getJoulesPerKelvin();
        //add this object's heat (size * temperature)
        jouleSum+=m[i].getJoulesPerKelvin()*m[i].getTemperature();
    }
    //divde the total heat by total size to get the final temperature
    return jouleSum/jouleKelvinSum;
}

let waterPot1 = new MaterialAmount(3, 4200, 21);
let ironRadiator1=new MaterialAmount(10, 412, 55);
let airInroom = new AirAmount(3,2,2.5,20);
console.log("euqal temperature is :", getEqualTemperature([waterPot1, ironRadiator1, airInroom]))