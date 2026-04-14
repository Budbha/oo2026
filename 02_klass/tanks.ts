class Balloon {
    type: string;     // "air" | "nitrox"
    pressure: number; // bar
    volume: number;   // liters
    oxygen: number;   // %

    constructor(type: string, pressure: number, volume: number, oxygen: number) {
        this.type = type;
        this.pressure = pressure;
        this.volume = volume;
        this.oxygen = oxygen;
    }

    getAirAmount(): number {
        return this.pressure * this.volume;
    }

    maxDepth(): number {
        if (this.type === "nitrox") {
            const ppO2 = 1.4;
            const fo2 = this.oxygen / 100;
            return ((ppO2 / fo2) - 1) * 10;
        }
        return 40; // для воздуха
    }

    printInfo(): void {
        console.log("Type:", this.type);
        console.log("Pressure:", this.pressure);
        console.log("Volume:", this.volume);

        if (this.type === "nitrox") {
            console.log("Oxygen:", this.oxygen + "%");
        }

        console.log("Air amount:", this.getAirAmount());
        console.log("Max depth:", this.maxDepth());
        console.log("--------------------");
    }
}

const b1 = new Balloon("air", 200, 12, 21);
const b2 = new Balloon("nitrox", 200, 12, 32);

b1.printInfo();
b2.printInfo();