var Tank = /** @class */ (function () {
    function Tank(type, pressure, volume, oxygen) {
        this.type = type;
        this.pressure = pressure;
        this.volume = volume;
        this.oxygen = oxygen;
    }
    Tank.prototype.getAirAmount = function () {
        return this.pressure * this.volume;
    };
    Tank.prototype.getInfo = function () {
        return "Type: ".concat(this.type, ", Pressure: ").concat(this.pressure, " bar, Volume: ").concat(this.volume, " L, Oxygen: ").concat(this.oxygen, "%");
    };
    return Tank;
}());
var TankStorage = /** @class */ (function () {
    function TankStorage(name) {
        this.name = name;
        this.tanks = [];
    }
    TankStorage.prototype.addTank = function (tank) {
        this.tanks.push(tank);
    };
    TankStorage.prototype.printAllTanks = function () {
        console.log("Storage:", this.name);
        for (var _i = 0, _a = this.tanks; _i < _a.length; _i++) {
            var tank = _a[_i];
            console.log(tank.getInfo());
        }
    };
    TankStorage.prototype.getTotalAirAmount = function () {
        var sum = 0;
        for (var _i = 0, _a = this.tanks; _i < _a.length; _i++) {
            var tank = _a[_i];
            sum += tank.getAirAmount();
        }
        return sum;
    };
    return TankStorage;
}());
// Näitrakendus
var t1 = new Tank("air", 200, 12, 21);
var t2 = new Tank("nitrox", 180, 10, 32);
var storage = new TankStorage("Dive Storage");
storage.addTank(t1);
storage.addTank(t2);
storage.printAllTanks();
console.log("Total air amount:", storage.getTotalAirAmount());
