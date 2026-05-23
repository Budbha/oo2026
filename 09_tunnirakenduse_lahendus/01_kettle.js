var Water = /** @class */ (function () {
    //constructor runs when a new water object is created.
    function Water(waterAmount, temprature) {
        this.heatingPower = 0; //starts at 0 means is heater is switch off. Heating power =0 watts
        this.specialHeatCapacity = 4200;
        this.waterAmount = waterAmount;
        this.temprature = temprature;
    }
    Water.prototype.setHeatingPower = function (newPower) {
        //power= joules per second
        this.heatingPower = newPower;
    };
    Water.prototype.getTemprature = function () {
        return this.temprature;
    };
    //This method simulate heating water for 1 second
    //It is going to increase the temprature based on power; wateramount , spcial heat capacity.
    Water.prototype.heatAsecond = function () {
        //energy added in 1 second (since power = joules per second)
        var joules = this.heatingPower;
        //calculate how much temprature increases
        // Formula: ΔT = energy / (specific heat capacity × mass)
        //how much stuff (water) something contain
        var deltaTemprature = joules / (this.specialHeatCapacity * (this.waterAmount / 1000)); //converted grams to kg
        this.temprature += deltaTemprature;
    };
    Water.prototype.calculateHeatingTime = function (targetTemprature) {
        //time =energy/power;
        //power= this.heatingpower
        var tempratureDifference = targetTemprature - this.temprature;
        var jouleRequired = tempratureDifference * this.specialHeatCapacity * (this.waterAmount / 1000);
        var timeinSeconds = jouleRequired / this.heatingPower;
        return timeinSeconds;
    };
    return Water;
}());
var w = new Water(800, 20);
console.log(w.getTemprature());
w.setHeatingPower(1500);
console.log("after setting the heating power: " + w.getTemprature());
w.heatAsecond();
console.log("after heating for 1 second: " + w.getTemprature());
var heatingtime = w.calculateHeatingTime(80);
console.log(heatingtime);