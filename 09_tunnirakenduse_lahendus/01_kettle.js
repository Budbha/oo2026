var Water = /** @class */ (function () {
    // constructor runs when a new water object is created.
    function Water(waterAmount, temprature) {
        this.heatingPower = 0; // starts at 0 means heater is switched off. Heating power = 0 watts
        this.specialHeatCapacity = 4200;
        this.waterAmount = waterAmount;
        this.temprature = temprature;
    }
    Water.prototype.setHeatingPower = function (newPower) {
        // power = joules per second
        this.heatingPower = newPower;
    };
    Water.prototype.getTemprature = function () {
        return this.temprature;
    };
    // This method simulates heating water for 1 second
    // It is going to increase the temprature based on power, water amount, special heat capacity.
    Water.prototype.heatAsecond = function () {
        // energy added in 1 second, since power = joules per second
        var joules = this.heatingPower;
        // calculate how much temprature increases
        // Formula: ΔT = energy / (specific heat capacity × mass)
        var deltaTemprature = joules / (this.specialHeatCapacity * (this.waterAmount / 1000)); // converted grams to kg
        this.temprature += deltaTemprature;
    };
    // This method simulates cooling water for 1 second
    Water.prototype.coolAsecond = function () {
        var roomTemprature = 20;
        // water cannot cool below room temprature
        if (this.temprature <= roomTemprature) {
            return;
        }
        // cooling power in joules per second
        var coolingPower = 100;
        // Formula: ΔT = energy / (specific heat capacity × mass)
        var deltaTemprature = coolingPower / (this.specialHeatCapacity * (this.waterAmount / 1000));
        this.temprature -= deltaTemprature;
        // prevent water from going below room temprature
        if (this.temprature < roomTemprature) {
            this.temprature = roomTemprature;
        }
    };
    Water.prototype.calculateHeatingTime = function (targetTemprature) {
        // time = energy / power
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
w.coolAsecond();
console.log("after cooling for 1 second: " + w.getTemprature());
var heatingtime = w.calculateHeatingTime(80);
console.log(heatingtime);
