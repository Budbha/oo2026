class Diver {
    name: string;
    depth: number;
    air: number;

    constructor(name: string, depth: number, air: number) {
        this.name = name;
        this.depth = depth;
        this.air = air;
    }

    maxDepth(): number {
        return 18;
    }

    hasEnoughAir(): boolean {
        return this.air > 200;
    }

    isSafe(): boolean {
        return this.depth <= this.maxDepth() && this.hasEnoughAir();
    }
}

class DeepDiver extends Diver {
    maxDepth(): number {
        return 40;
    }
}

class Instructor extends Diver {
    maxDepth(): number {
        return 40; // можно оставить или больше
    }
}

let d1 = new Diver("Anna", 25, 300);
let d2 = new DeepDiver("Mark", 35, 300);
let d3 = new DeepDiver("Tom", 45, 300);

console.log(d1.isSafe()); // false
console.log(d2.isSafe()); // true
console.log(d3.isSafe()); // false 