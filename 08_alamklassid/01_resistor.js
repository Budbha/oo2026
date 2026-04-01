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
// Абстрактный класс
var AbstractResistor = /** @class */ (function () {
    function AbstractResistor() {
    }
    AbstractResistor.prototype.getCurrent = function (u) {
        return u / this.getResistance(); // I = U / R
    };
    return AbstractResistor;
}());
// Класс резистора
var Resistor = /** @class */ (function (_super) {
    __extends(Resistor, _super);
    function Resistor(r) {
        var _this = _super.call(this) || this;
        _this.r = r;
        return _this;
    }
    Resistor.prototype.getResistance = function () {
        return this.r;
    };
    return Resistor;
}(AbstractResistor));
// Создание объекта
var resistor1 = new Resistor(220);
console.log("The resistance value of resistor 01: " + resistor1.getResistance());
// Класс переключателя
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        var _this = _super.call(this) || this; // сопротивление можно задать 0
        _this.on = false;
        return _this;
    }
    Switch.prototype.setOn = function (state) {
        this.on = state;
    };
    //getResistance(): number {
    //if(this.on){
    //     return 0;
    // }    
    //else{
    //     return 1000000000;
    //  }
    //}
    Switch.prototype.getResistance = function () {
        return (this.on ? 0 : 1000000000);
    };
    Switch.prototype.getCurrent = function (u) {
        if (u > 0) {
            if (this.on) {
                throw new Error("Short Circuit");
            }
        }
        return _super.prototype.getCurrent.call(this, u);
    };
    return Switch;
}(AbstractResistor));
var s1 = new Switch();
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
var MultpleConnection = /** @class */ (function (_super) {
    __extends(MultpleConnection, _super);
    function MultpleConnection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.resistors = [];
        return _this;
    }
    MultpleConnection.prototype.addResistor = function (r) {
        this.resistors.push(r);
    };
    return MultpleConnection;
}(AbstractResistor));
//This class should finally return total value of the resitars in the connection
var SeriesConnection = /** @class */ (function (_super) {
    __extends(SeriesConnection, _super);
    function SeriesConnection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeriesConnection.prototype.getResistance = function () {
        var totalResistance = 0;
        for (var _i = 0, _a = this.resistors; _i < _a.length; _i++) {
            var resistor = _a[_i];
            //get the resitance value of each resistor and add to the total
            totalResistance += resistor.getResistance();
        }
        return totalResistance;
    };
    return SeriesConnection;
}(MultpleConnection));
var s = new SeriesConnection();
s.addResistor(new Resistor(220));
s.addResistor(new Resistor(220));
console.log("Resistance of series connection" + s.getResistance() + "ohms");
