class WallPaint {
    constructor(
        public wallWidth: number,
        public wallHeight: number,
        public windowWidth: number,
        public windowHeight: number,
        public paintCoverage: number
    ) {}

    wallArea(): number {
        return this.wallWidth * this.wallHeight;
    }

    windowArea(): number {
        return this.windowWidth * this.windowHeight;
    }

    paintArea(): number {
        return this.wallArea() - this.windowArea();
    }

    paintLiters(): number {
        return this.paintArea() / this.paintCoverage;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.clearRect(0, 0, 500, 350);

        const wallX = 80;
        const wallY = 50;
        const wallDrawWidth = 340;
        const wallDrawHeight = 220;

        // Wall
        ctx.fillStyle = "#f2d6b3";
        ctx.fillRect(wallX, wallY, wallDrawWidth, wallDrawHeight);

        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.strokeRect(wallX, wallY, wallDrawWidth, wallDrawHeight);

        // Window size on canvas
        const windowDrawWidth = (this.windowWidth / this.wallWidth) * wallDrawWidth;
        const windowDrawHeight = (this.windowHeight / this.wallHeight) * wallDrawHeight;

        const windowX = wallX + wallDrawWidth / 2 - windowDrawWidth / 2;
        const windowY = wallY + wallDrawHeight / 2 - windowDrawHeight / 2;

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
    }
}


function getNumberValue(id: string): number {
    const input = document.getElementById(id) as HTMLInputElement;
    return input.valueAsNumber;
}


function round2(value: number): number {
    return Math.round(value * 100) / 100;
}


function showMessage(text: string): void {
    const message = document.getElementById("message") as HTMLElement;
    message.innerText = text;
}


function calculatePaint(): void {
    const wallWidth = getNumberValue("wallWidth");
    const wallHeight = getNumberValue("wallHeight");
    const windowWidth = getNumberValue("windowWidth");
    const windowHeight = getNumberValue("windowHeight");
    const paintCoverage = getNumberValue("paintCoverage");

    if (
        isNaN(wallWidth) ||
        isNaN(wallHeight) ||
        isNaN(windowWidth) ||
        isNaN(windowHeight) ||
        isNaN(paintCoverage)
    ) {
        showMessage("Please fill all fields.");
        return;
    }

    if (
        wallWidth <= 0 ||
        wallHeight <= 0 ||
        windowWidth < 0 ||
        windowHeight < 0 ||
        paintCoverage <= 0
    ) {
        showMessage("Sizes and paint coverage must be positive numbers.");
        return;
    }

    if (windowWidth > wallWidth || windowHeight > wallHeight) {
        showMessage("Window cannot be bigger than the wall.");
        return;
    }

    const wallPaint = new WallPaint(
        wallWidth,
        wallHeight,
        windowWidth,
        windowHeight,
        paintCoverage
    );

    const result = document.getElementById("result") as HTMLElement;

    result.innerHTML = `
        <p><b>Wall area:</b> ${round2(wallPaint.wallArea())} m²</p>
        <p><b>Window area:</b> ${round2(wallPaint.windowArea())} m²</p>
        <p><b>Area that needs paint:</b> ${round2(wallPaint.paintArea())} m²</p>
        <p><b>Paint needed:</b> ${round2(wallPaint.paintLiters())} liters</p>
    `;

    const canvas = document.getElementById("wallCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    wallPaint.draw(ctx);

    showMessage("Calculation done.");
}


function startPage(): void {
    showMessage("Enter wall data and press Calculate.");

    const canvas = document.getElementById("wallCanvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    ctx.clearRect(0, 0, 500, 350);
}


// Make functions visible for HTML buttons
(window as any).calculatePaint = calculatePaint;
(window as any).startPage = startPage;