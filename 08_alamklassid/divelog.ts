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
        return "Deep diver";
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

function createDiver(): void {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const depth = (document.getElementById("depth") as HTMLInputElement).valueAsNumber;
    const air = (document.getElementById("air") as HTMLInputElement).valueAsNumber;
    const type = (document.getElementById("type") as HTMLSelectElement).value;

    let diver: Diver;

    if (type === "deep") {
        diver = new DeepDiver(name, depth, air);
    }
    else if (type === "instructor") {
        diver = new Instructor(name, depth, air);
    }
    else {
        diver = new Diver(name, depth, air);
    }

    divers.push(diver);

    updatePage();
}

function updatePage(): void {
    let text = "";

    for (const diver of divers) {
        text += diver.getInfo() + "<br>";
    }

    document.getElementById("result")!.innerHTML = text;
}