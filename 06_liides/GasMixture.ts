interface GasMixture {
    getName(): string;
    getOxygenPercent(): number;
    getInfo(): string;
}

class Air implements GasMixture {
    getName(): string {
        return "Air";
    }

    getOxygenPercent(): number {
        return 21;
    }

    getInfo(): string {
        return `Gas: ${this.getName()}, Oxygen: ${this.getOxygenPercent()}%`;
    }
}

class Nitrox implements GasMixture {
    oxygenPercent: number;

    constructor(oxygenPercent: number) {
        this.oxygenPercent = oxygenPercent;
    }

    getName(): string {
        return "Nitrox";
    }

    getOxygenPercent(): number {
        return this.oxygenPercent;
    }

    getInfo(): string {
        return `Gas: ${this.getName()}, Oxygen: ${this.getOxygenPercent()}%`;
    }
}


// Näitprogramm

const gas1: GasMixture = new Air();
const gas2: GasMixture = new Nitrox(32);
const gas3: GasMixture = new Nitrox(36);

console.log(gas1.getInfo());
console.log(gas2.getInfo());
console.log(gas3.getInfo());