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
var Diver = /** @class */ (function () {
    function Diver(name, depth, air) {
        this.name = name;
        this.depth = depth;
        this.air = air;
    }
    Diver.prototype.maxDepth = function () {
        return 18;
    };
    Diver.prototype.hasEnoughAir = function () {
        return this.air > 200;
    };
    Diver.prototype.isSafe = function () {
        return this.depth <= this.maxDepth() && this.hasEnoughAir();
    };
    Diver.prototype.getType = function () {
        return "Diver";
    };
    Diver.prototype.getInfo = function () {
        return this.getType() +
            " | " +
            this.name +
            " | depth: " + this.depth +
            " m | air: " + this.air +
            " | safe: " + this.isSafe();
    };
    return Diver;
}());
var DeepDiver = /** @class */ (function (_super) {
    __extends(DeepDiver, _super);
    function DeepDiver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeepDiver.prototype.maxDepth = function () {
        return 40;
    };
    DeepDiver.prototype.getType = function () {
        return "DeepDiver";
    };
    return DeepDiver;
}(Diver));
var Instructor = /** @class */ (function (_super) {
    __extends(Instructor, _super);
    function Instructor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Instructor.prototype.maxDepth = function () {
        return 40;
    };
    Instructor.prototype.getType = function () {
        return "Instructor";
    };
    return Instructor;
}(Diver));
var divers = [];
function getName() {
    return document.getElementById("name").value;
}
function getDepth() {
    return Number(document.getElementById("depth").value);
}
function getAir() {
    return Number(document.getElementById("air").value);
}
function addDiverToList(diver) {
    divers.push(diver);
    showList();
}
function showList() {
    var text = "";
    for (var i = 0; i < divers.length; i++) {
        text += (i + 1) + ". " + divers[i].getInfo() + "<br>";
    }
    document.getElementById("result").innerHTML = text;
}
function chooseDiver() {
    var diver = new Diver(getName(), getDepth(), getAir());
    addDiverToList(diver);
}
function chooseDeepDiver() {
    var diver = new DeepDiver(getName(), getDepth(), getAir());
    addDiverToList(diver);
}
function chooseInstructor() {
    var diver = new Instructor(getName(), getDepth(), getAir());
    addDiverToList(diver);
}
