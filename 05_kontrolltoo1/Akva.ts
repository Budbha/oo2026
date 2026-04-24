class Aquarium {
    private volume: number; //cm3 = ml
    private water: number = 0;

    constructor(
        private length: number,
        private width: number,
        private height: number,
        private g: CanvasRenderingContext2D
    ) {
        this.volume = this.length * this.width * this.height;
        this.draw();
    }

    getVolume(): number {
        return this.volume;
    }

    getWater(): number {
        return this.water;
    }

    addWater(amount: number): string {
        this.water += amount;

        if (this.water > this.volume) {
            this.water = this.volume;
            this.draw();
            return "Warning: aquarium is full!";
        }

        this.draw();
        return "Water added.";
    }

    removeWater(amount: number): string {
        this.water -= amount;

        if (this.water <= 0) {
            this.water = 0;
            this.draw();
            return "Warning: aquarium is empty!";
        }

        this.draw();
        return "Water removed.";
    }

    draw(): void {
        const x = 80;
        const y = 50;
        const w = 220;
        const h = 250;

        this.g.clearRect(0, 0, 400, 350);

        // frame
        this.g.beginPath();
        this.g.rect(x, y, w, h);
        this.g.stroke();

        // water level
        const percent = this.water / this.volume;
        const waterHeight = h * percent;

        this.g.fillStyle = "darkblue";
        this.g.fillRect(x, y + h - waterHeight, w, waterHeight);

       
    }
}