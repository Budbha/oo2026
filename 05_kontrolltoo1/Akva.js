var Aquarium = /** @class */ (function () {
    function Aquarium(length, width, height, g) {
        this.length = length;
        this.width = width;
        this.height = height;
        this.g = g;
        this.water = 0;
        this.volume = this.length * this.width * this.height;
        this.draw();
    }
    Aquarium.prototype.getVolume = function () {
        return this.volume;
    };
    Aquarium.prototype.getWater = function () {
        return this.water;
    };
    Aquarium.prototype.addWater = function (amount) {
        this.water += amount;
        if (this.water > this.volume) {
            this.water = this.volume;
            this.draw();
            return "Warning: aquarium is full!";
        }
        this.draw();
        return "Water added.";
    };
    Aquarium.prototype.removeWater = function (amount) {
        this.water -= amount;
        if (this.water <= 0) {
            this.water = 0;
            this.draw();
            return "Warning: aquarium is empty!";
        }
        this.draw();
        return "Water removed.";
    };
    Aquarium.prototype.draw = function () {
        var x = 80;
        var y = 50;
        var w = 220;
        var h = 250;
        this.g.clearRect(0, 0, 400, 350);
        // frame
        this.g.beginPath();
        this.g.rect(x, y, w, h);
        this.g.stroke();
        // water level
        var percent = this.water / this.volume;
        var waterHeight = h * percent;
        this.g.fillStyle = "darkblue";
        this.g.fillRect(x, y + h - waterHeight, w, waterHeight);
    };
    return Aquarium;
}());
