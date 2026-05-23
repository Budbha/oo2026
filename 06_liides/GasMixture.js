var Air = /** @class */ (function () {
    function Air() {
    }
    Air.prototype.getName = function () {
        return "Air";
    };
    Air.prototype.getOxygenPercent = function () {
        return 21;
    };
    Air.prototype.getInfo = function () {
        return "Gas: " + this.getName() + ", Oxygen: " + this.getOxygenPercent() + "%";
    };
    return Air;
}());
var Nitrox = /** @class */ (function () {
    function Nitrox(oxygenPercent) {
        this.oxygenPercent = oxygenPercent;
    }
    Nitrox.prototype.getName = function () {
        return "Nitrox";
    };
    Nitrox.prototype.getOxygenPercent = function () {
        return this.oxygenPercent;
    };
    Nitrox.prototype.getInfo = function () {
        return "Gas: " + this.getName() + ", Oxygen: " + this.getOxygenPercent() + "%";
    };
    return Nitrox;
}());
var gas;
function chooseAir() {
    gas = new Air();
    showGas();
}
function chooseNitrox() {
    var oxygen = document.getElementById("oxygen").valueAsNumber;
    gas = new Nitrox(oxygen);
    showGas();
}
function showGas() {
    document.getElementById("result").innerText = gas.getInfo();
}
