class Diver {
    name: string;
    depth: number;
    air: number;

    constructor(name: string, depth: number, air: number) {
        this.name = name;
        this.depth = depth;
        this.air = air;
    }

    pressure(): number {
        return 1 + this.depth / 10;
    }

    useAir(amount: number): void {
        this.air -= amount;
    }
}

// 2 разных дайвера
let diver1 = new Diver("Anna", 10, 200);
let diver2 = new Diver("Mark", 20, 180);

// управление
console.log(diver1.pressure());
console.log(diver2.pressure());

diver1.useAir(20);
diver2.useAir(30);

console.log(diver1.air);
console.log(diver2.air);

