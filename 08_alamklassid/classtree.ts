class GasTank {
    pressure: number;
    volume: number;

    constructor(pressure: number, volume: number) {
        this.pressure = pressure;
        this.volume = volume;
    }

    getGasAmount(): number {
        return this.pressure * this.volume;
    }

    getInfo(): string {
        return `Pressure: ${this.pressure} bar, Volume: ${this.volume} L`;
    }
}

class AirTank extends GasTank {
    constructor(pressure: number, volume: number) {
        super(pressure, volume);
    }

    getInfo(): string {
        return `Air tank | ${super.getInfo()} | O2: 21%`;
    }
}

class NitroxTank extends GasTank {
    oxygen: number;

    constructor(pressure: number, volume: number, oxygen: number) {
        super(pressure, volume);
        this.oxygen = oxygen;
    }

    getInfo(): string {
        return `Nitrox tank | ${super.getInfo()} | O2: ${this.oxygen}%`;
    }
}

const t1 = new AirTank(200, 12);
const t2 = new NitroxTank(180, 10, 32);
const t3 = new NitroxTank(220, 15, 36);

const tanks: GasTank[] = [t1, t2, t3];

for (const tank of tanks) {
    console.log(tank.getInfo());
    console.log("Gas amount:", tank.getGasAmount());
    console.log("-------------------");
}