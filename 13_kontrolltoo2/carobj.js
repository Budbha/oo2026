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
var Car = /** @class */ (function () {
    function Car(length, weight, make) {
        this.length = length;
        this.weight = weight;
        this.make = make;
    }
    Car.prototype.getType = function () {
        return "Car";
    };
    Car.prototype.getMake = function () {
        return this.make;
    };
    Car.prototype.getInfo = function () {
        return "".concat(this.getType(), " | ").concat(this.make, " | ").concat(this.length, " m | ").concat(this.weight, " t");
    };
    return Car;
}());
var PassengerCar = /** @class */ (function (_super) {
    __extends(PassengerCar, _super);
    function PassengerCar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PassengerCar.prototype.getType = function () {
        return "Passenger car";
    };
    return PassengerCar;
}(Car));
var DrivingLogRecord = /** @class */ (function () {
    function DrivingLogRecord(distance, steps) {
        this.distance = distance;
        this.steps = steps;
    }
    DrivingLogRecord.prototype.getInfo = function () {
        return "Distance: ".concat(this.distance, " km | time: ").concat(this.steps, " steps");
    };
    return DrivingLogRecord;
}());
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.drivingLog = [];
        return _this;
    }
    Truck.prototype.getType = function () {
        return "Truck";
    };
    Truck.prototype.addDrivingLog = function (distance, steps) {
        this.drivingLog.push(new DrivingLogRecord(distance, steps));
    };
    Truck.prototype.getDrivingLog = function () {
        return this.drivingLog.map(function (record) { return record.getInfo(); });
    };
    return Truck;
}(Car));
var MovingCar = /** @class */ (function () {
    function MovingCar(car, g) {
        this.car = car;
        this.g = g;
        this.x = 300;
        this.y = 120;
        this.vx = 0;
        this.distance = 0;
        this.steps = 0;
        this.draw();
    }
    MovingCar.prototype.setSpeed = function (vx) {
        this.vx = vx;
    };
    MovingCar.prototype.move = function () {
        var oldX = this.x;
        var newX = this.x + this.vx;
        if (newX < 50)
            newX = 50;
        if (newX > 550)
            newX = 550;
        this.x = newX;
        var moved = Math.abs(this.x - oldX);
        if (moved > 0) {
            this.distance += moved;
            this.steps++;
        }
        this.draw();
    };
    MovingCar.prototype.addDrivingLog = function () {
        if (this.car instanceof Truck && this.distance > 0) {
            this.car.addDrivingLog(this.distance, this.steps);
            this.distance = 0;
            this.steps = 0;
        }
    };
    MovingCar.prototype.draw = function () {
        this.g.clearRect(0, 0, 600, 250);
        this.g.strokeRect(50, 60, 500, 120);
        this.g.beginPath();
        this.g.arc(this.x, this.y, 8, 0, Math.PI * 2);
        if (this.car instanceof Truck) {
            this.g.fillStyle = "red";
        }
        else {
            this.g.fillStyle = "blue";
        }
        this.g.fill();
        this.g.stroke();
    };
    MovingCar.prototype.getCar = function () {
        return this.car;
    };
    MovingCar.prototype.getInfo = function () {
        return "".concat(this.car.getInfo(), " | x: ").concat(this.x, " | speed: ").concat(this.vx);
    };
    return MovingCar;
}());
var movingCar;
var timerId = null;
function startPage() {
    var canvas = document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");
    updatePage();
}
function createCar() {
    var length = document.getElementById("length").valueAsNumber;
    var weight = document.getElementById("weight").valueAsNumber;
    var make = document.getElementById("make").value;
    var car;
    if (weight <= 3.5) {
        car = new PassengerCar(length, weight, make);
    }
    else {
        car = new Truck(length, weight, make);
    }
    var canvas = document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");
    movingCar = new MovingCar(car, ctx);
    updatePage();
}
function setSpeedFromRange(input) {
    movingCar.setSpeed(input.valueAsNumber);
    document.getElementById("speedValue").innerText = input.value;
    updatePage();
}
function moveCar() {
    movingCar.move();
    updatePage();
}
function automatic() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        return;
    }
    timerId = window.setInterval(function () {
        movingCar.move();
        updatePage();
    }, 100);
}
function addDrivingLogRecord() {
    movingCar.addDrivingLog();
    updatePage();
}
function updatePage() {
    var car = movingCar.getCar();
    document.getElementById("carInfo").innerText = movingCar.getInfo();
    var logBlock = document.getElementById("drivingLogBlock");
    var log = document.getElementById("drivingLog");
    if (car instanceof Truck) {
        logBlock.style.display = "block";
        log.innerHTML = car.getDrivingLog().join("<br>");
    }
    else {
        logBlock.style.display = "none";
        log.innerHTML = "";
    }
}
