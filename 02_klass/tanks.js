var Balloon = /** @class */ (function () {
    function Balloon(type, pressure, volume, oxygen) {
        this.type = type;
        this.pressure = pressure;
        this.volume = volume;
        this.oxygen = oxygen;
    }
    Balloon.prototype.getAirAmount = function () {
        return this.pressure * this.volume;
    };
    Balloon.prototype.maxDepth = function () {
        if (this.type === "nitrox") {
            var ppO2 = 1.4;
            var fo2 = this.oxygen / 100;
            return ((ppO2 / fo2) - 1) * 10;
        }
        return 40; // для воздуха
    };
    Balloon.prototype.printInfo = function () {
        console.log("Type:", this.type);
        console.log("Pressure:", this.pressure);
        console.log("Volume:", this.volume);
        if (this.type === "nitrox") {
            console.log("Oxygen:", this.oxygen + "%");
        }
        console.log("Air amount:", this.getAirAmount());
        console.log("Max depth:", this.maxDepth());
        console.log("--------------------");
    };
    return Balloon;
}());
var b1 = new Balloon("air", 200, 12, 21);
var b2 = new Balloon("nitrox", 200, 12, 32);
b1.printInfo();
b2.printInfo();
