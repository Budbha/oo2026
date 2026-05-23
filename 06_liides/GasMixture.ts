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
        return "Gas: " + this.getName() + ", Oxygen: " + this.getOxygenPercent() + "%";
    }
}

class Nitrox implements GasMixture {
    constructor(private oxygenPercent: number) {}

    getName(): string {
        return "Nitrox";
    }

    getOxygenPercent(): number {
        return this.oxygenPercent;
    }

    getInfo(): string {
        return "Gas: " + this.getName() + ", Oxygen: " + this.getOxygenPercent() + "%";
    }
}

let gas: GasMixture;

function chooseAir(): void {
    gas = new Air();
    showGas();
}

function chooseNitrox(): void {
    const oxygen = (document.getElementById("oxygen") as HTMLInputElement).valueAsNumber;
    gas = new Nitrox(oxygen);
    showGas();
}

function showGas(): void {
    document.getElementById("result")!.innerText = gas.getInfo();
}