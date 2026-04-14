type GasType = "air" | "nitrox";

class Tank {
    type: GasType;
    pressure: number;
    volume: number;
    oxygen: number;

    constructor(type: GasType, pressure: number, volume: number, oxygen: number) {
        this.type = type;
        this.pressure = pressure;
        this.volume = volume;
        this.oxygen = oxygen;
    }

    getAirAmount(): number {
        return this.pressure * this.volume;
    }

    getInfo(): string {
        return `Type: ${this.type}, Pressure: ${this.pressure} bar, Volume: ${this.volume} L, Oxygen: ${this.oxygen}%`;
    }
}

class TankStorage {
    name: string;
    tanks: Tank[];

    constructor(name: string) {
        this.name = name;
        this.tanks = [];
    }

    addTank(tank: Tank): void {
        this.tanks.push(tank);
    }

    printAllTanks(): void {
        console.log("Storage:", this.name);
        for (const tank of this.tanks) {
            console.log(tank.getInfo());
        }
    }

    getTotalAirAmount(): number {
        let sum = 0;
        for (const tank of this.tanks) {
            sum += tank.getAirAmount();
        }
        return sum;
    }
}


// Näitrakendus

const t1 = new Tank("air", 200, 12, 21);
const t2 = new Tank("nitrox", 180, 10, 32);

const storage = new TankStorage("Dive Storage");

storage.addTank(t1);
storage.addTank(t2);

storage.printAllTanks();
console.log("Total air amount:", storage.getTotalAirAmount());