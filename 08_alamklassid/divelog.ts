class Diver {
    constructor(
        public name: string,
        public depth: number,
        public air: number
    ) {}

    maxDepth(): number {
        return 18;
    }

    hasEnoughAir(): boolean {
        return this.air > 200;
    }

    isSafe(): boolean {
        return this.depth <= this.maxDepth() && this.hasEnoughAir();
    }

    getType(): string {
        return "Diver";
    }

    getInfo(): string {
        return this.getType() +
            " | " +
            this.name +
            " | depth: " + this.depth +
            " m | air: " + this.air +
            " | safe: " + this.isSafe();
    }
}

class DeepDiver extends Diver {
    maxDepth(): number {
        return 40;
    }

    getType(): string {
        return "DeepDiver";
    }
}

class Instructor extends Diver {
    maxDepth(): number {
        return 40;
    }

    getType(): string {
        return "Instructor";
    }
}

let divers: Diver[] = [];

function getName(): string {
    return (document.getElementById("name") as HTMLInputElement).value;
}

function getDepth(): number {
    return Number((document.getElementById("depth") as HTMLInputElement).value);
}

function getAir(): number {
    return Number((document.getElementById("air") as HTMLInputElement).value);
}

function addDiverToList(diver: Diver): void {
    divers.push(diver);
    showList();
}

function showList(): void {
    let text = "";

    for (let i = 0; i < divers.length; i++) {
        text += (i + 1) + ". " + divers[i].getInfo() + "<br>";
    }

    document.getElementById("result")!.innerHTML = text;
}

function chooseDiver(): void {
    let diver = new Diver(getName(), getDepth(), getAir());
    addDiverToList(diver);
}

function chooseDeepDiver(): void {
    let diver = new DeepDiver(getName(), getDepth(), getAir());
    addDiverToList(diver);
}

function chooseInstructor(): void {
    let diver = new Instructor(getName(), getDepth(), getAir());
    addDiverToList(diver);
}