var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MaterialAmount = /** @class */ (function () {
    //create constructor
    function MaterialAmount(mass, specificHeatCapacity, temperature) {
        this.mass = mass;
        this.specificHeatCapacity = specificHeatCapacity;
        this.temperature = temperature;
    }
    //take the temperature
    MaterialAmount.prototype.getTemperature = function () {
        return this.temperature;
    };
    MaterialAmount.prototype.changeEnergy = function (joules) {
        this.temperature += joules / (this.mass * this.specificHeatCapacity);
    };
    //Addenergy
    //temerature change = energy/ (mass* heat capacity)
    //This method tells how much energy is needed to raise the temperature by 1 degree in other words
    //how many joules needed to raise this object by `1 degree
    MaterialAmount.prototype.getJoulesPerKelvin = function () {
        //Q = m · c · ΔT
        //Q/ΔT =m.c
        //m.c is heat capcity of the object
        return this.mass * this.specificHeatCapacity;
    };
    return MaterialAmount;
}());
var waterPot = new MaterialAmount(3, 4200, 20);
console.log(waterPot.getTemperature());
waterPot.changeEnergy(10000);
console.log(waterPot.getTemperature());
var ironRadiator = new MaterialAmount(10, 412, 20);
console.log(ironRadiator.getTemperature());
ironRadiator.changeEnergy(10000);
console.log(ironRadiator.getTemperature());
if (ironRadiator.getTemperature() > waterPot.getTemperature()) {
    var changeAmount = 1000;
    ironRadiator.changeEnergy(-changeAmount);
    waterPot.changeEnergy(changeAmount);
}
console.log("water pot Temperature after transfering 1000: " + waterPot.getTemperature().toFixed(2), "iron radiator temperature after transfering 1000: " + ironRadiator.getTemperature().toFixed(2));
var AirAmount = /** @class */ (function (_super) {
    __extends(AirAmount, _super);
    function AirAmount(length, width, height, temperature) {
        return _super.call(this, length * width * height * 1.23, 1012, temperature) || this;
    }
    return AirAmount;
}(MaterialAmount));
//write a function to find the one final temeprature for all the objects.
//Imaging mixing them together untill they all become the same temperature.
function getEqualTemperature(m) {
    //how much energy is needed to increase all the objects by 1 degree
    var jouleKelvinSum = 0;
    //total heat energy. This is different different from the previousone because this includes temperature too.
    var jouleSum = 0;
    //Go through each object one by one
    for (var i = 0; i < m.length; i++) {
        //add how much this object affects temperature
        jouleKelvinSum += m[i].getJoulesPerKelvin();
        //add this object's heat (size * temperature)
        jouleSum += m[i].getJoulesPerKelvin() * m[i].getTemperature();
    }
    //divde the total heat by total size to get the final temperature
    return jouleSum / jouleKelvinSum;
}
var waterPot1 = new MaterialAmount(3, 4200, 21);
var ironRadiator1 = new MaterialAmount(10, 412, 55);
var airInroom = new AirAmount(3, 2, 2.5, 20);
console.log("euqal temperature is :", getEqualTemperature([waterPot1, ironRadiator1, airInroom]));