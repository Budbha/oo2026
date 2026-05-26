var WallPaint = /** @class */ (function () {
    function WallPaint(wallWidth, wallHeight, windowWidth, windowHeight, paintCoverage) {
        this.wallWidth = wallWidth;
        this.wallHeight = wallHeight;
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.paintCoverage = paintCoverage;
    }
    WallPaint.prototype.wallArea = function () {
        return this.wallWidth * this.wallHeight;
    };
    WallPaint.prototype.windowArea = function () {
        return this.windowWidth * this.windowHeight;
    };
    WallPaint.prototype.paintArea = function () {
        return this.wallArea() - this.windowArea();
    };
    WallPaint.prototype.paintLiters = function () {
        return this.paintArea() / this.paintCoverage;
    };
    WallPaint.prototype.draw = function (ctx) {
        ctx.clearRect(0, 0, 500, 350);
        var wallX = 80;
        var wallY = 50;
        var wallDrawWidth = 340;
        var wallDrawHeight = 220;
        // Wall
        ctx.fillStyle = "#f2d6b3";
        ctx.fillRect(wallX, wallY, wallDrawWidth, wallDrawHeight);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.strokeRect(wallX, wallY, wallDrawWidth, wallDrawHeight);
        // Window size on canvas
        var windowDrawWidth = (this.windowWidth / this.wallWidth) * wallDrawWidth;
        var windowDrawHeight = (this.windowHeight / this.wallHeight) * wallDrawHeight;
        var windowX = wallX + wallDrawWidth / 2 - windowDrawWidth / 2;
        var windowY = wallY + wallDrawHeight / 2 - windowDrawHeight / 2;
        // Window
        ctx.fillStyle = "#bde7ff";
        ctx.fillRect(windowX, windowY, windowDrawWidth, windowDrawHeight);
        ctx.strokeStyle = "#1d4e89";
        ctx.lineWidth = 2;
        ctx.strokeRect(windowX, windowY, windowDrawWidth, windowDrawHeight);
        // Window cross
        ctx.beginPath();
        ctx.moveTo(windowX + windowDrawWidth / 2, windowY);
        ctx.lineTo(windowX + windowDrawWidth / 2, windowY + windowDrawHeight);
        ctx.moveTo(windowX, windowY + windowDrawHeight / 2);
        ctx.lineTo(windowX + windowDrawWidth, windowY + windowDrawHeight / 2);
        ctx.stroke();
        // Text
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText("Wall with window", wallX, 30);
    };
    return WallPaint;
}());
function getNumberValue(id) {
    var input = document.getElementById(id);
    return input.valueAsNumber;
}
function round2(value) {
    return Math.round(value * 100) / 100;
}
function showMessage(text) {
    var message = document.getElementById("message");
    message.innerText = text;
}
function calculatePaint() {
    var wallWidth = getNumberValue("wallWidth");
    var wallHeight = getNumberValue("wallHeight");
    var windowWidth = getNumberValue("windowWidth");
    var windowHeight = getNumberValue("windowHeight");
    var paintCoverage = getNumberValue("paintCoverage");
    if (isNaN(wallWidth) ||
        isNaN(wallHeight) ||
        isNaN(windowWidth) ||
        isNaN(windowHeight) ||
        isNaN(paintCoverage)) {
        showMessage("Please fill all fields.");
        return;
    }
    if (wallWidth <= 0 ||
        wallHeight <= 0 ||
        windowWidth < 0 ||
        windowHeight < 0 ||
        paintCoverage <= 0) {
        showMessage("Sizes and paint coverage must be positive numbers.");
        return;
    }
    if (windowWidth > wallWidth || windowHeight > wallHeight) {
        showMessage("Window cannot be bigger than the wall.");
        return;
    }
    var wallPaint = new WallPaint(wallWidth, wallHeight, windowWidth, windowHeight, paintCoverage);
    var result = document.getElementById("result");
    result.innerHTML = "\n        <p><b>Wall area:</b> ".concat(round2(wallPaint.wallArea()), " m\u00B2</p>\n        <p><b>Window area:</b> ").concat(round2(wallPaint.windowArea()), " m\u00B2</p>\n        <p><b>Area that needs paint:</b> ").concat(round2(wallPaint.paintArea()), " m\u00B2</p>\n        <p><b>Paint needed:</b> ").concat(round2(wallPaint.paintLiters()), " liters</p>\n    ");
    var canvas = document.getElementById("wallCanvas");
    var ctx = canvas.getContext("2d");
    wallPaint.draw(ctx);
    showMessage("Calculation done.");
}
function startPage() {
    showMessage("Enter wall data and press Calculate.");
    var canvas = document.getElementById("wallCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 350);
}
// Make functions visible for HTML buttons
window.calculatePaint = calculatePaint;
window.startPage = startPage;
