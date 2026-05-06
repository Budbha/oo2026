class Car {
    constructor(
        protected length: number,
        protected weight: number,
        protected make: string
    ) {}

    getType(): string {
        return "Car";
    }

    getMake(): string {
        return this.make;
    }

    getInfo(): string {
        return `${this.getType()} | ${this.make} | ${this.length} m | ${this.weight} t`;
    }
}

class PassengerCar extends Car {
    getType(): string {
        return "Passenger car";
    }
}

class DrivingLogRecord {
    constructor(
        private distance: number,
        private steps: number
    ) {}

    getInfo(): string {
        return `Distance: ${this.distance} km | time: ${this.steps} steps`;
    }
}

class Truck extends Car {
    private drivingLog: DrivingLogRecord[] = [];

    getType(): string {
        return "Truck";
    }

    addDrivingLog(distance: number, steps: number): void {
        this.drivingLog.push(new DrivingLogRecord(distance, steps));
    }

    getDrivingLog(): string[] {
        return this.drivingLog.map(record => record.getInfo());
    }
}

class MovingCar {
    private x: number = 300;
    private y: number = 120;
    private vx: number = 0;
    private distance: number = 0;
    private steps: number = 0;

    constructor(
        private car: Car,
        private g: CanvasRenderingContext2D
    ) {
        this.draw();
    }

    setSpeed(vx: number): void {
        this.vx = vx;
    }

    move(): void {
        const oldX = this.x;
        let newX = this.x + this.vx;

        if (newX < 50) newX = 50;
        if (newX > 550) newX = 550;

        this.x = newX;

        const moved = Math.abs(this.x - oldX);

        if (moved > 0) {
            this.distance += moved;
            this.steps++;
        }

        this.draw();
    }

    addDrivingLog(): void {
        if (this.car instanceof Truck && this.distance > 0) {
            this.car.addDrivingLog(this.distance, this.steps);
            this.distance = 0;
            this.steps = 0;
        }
    }

    draw(): void {
        this.g.clearRect(0, 0, 600, 250);

        this.g.strokeRect(50, 60, 500, 120);

        this.g.beginPath();
        this.g.arc(this.x, this.y, 8, 0, Math.PI * 2);
        if (this.car instanceof Truck) {
            this.g.fillStyle = "red";
        } else {
            this.g.fillStyle = "blue";
        }
        this.g.fill();
        this.g.stroke();
    }

    getCar(): Car {
        return this.car;
    }

    getInfo(): string {
        return `${this.car.getInfo()} | x: ${this.x} | speed: ${this.vx}`;
    }
}

let movingCar: MovingCar;
let timerId: number | null = null;

function startPage(): void {
    const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

  
    updatePage();
}

function createCar(): void {
    const length = (document.getElementById("length") as HTMLInputElement).valueAsNumber;
    const weight = (document.getElementById("weight") as HTMLInputElement).valueAsNumber;
    const make = (document.getElementById("make") as HTMLInputElement).value;

    let car: Car;
    if (weight <= 3.5) {
        car = new PassengerCar(length, weight, make);
    } else {
        car = new Truck(length, weight, make);
    }
    const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;

    movingCar = new MovingCar(car, ctx);
    updatePage();
}

function setSpeedFromRange(input: HTMLInputElement): void {
    movingCar.setSpeed(input.valueAsNumber);
    document.getElementById("speedValue")!.innerText = input.value;
    updatePage();
}

function moveCar(): void {
    movingCar.move();
    updatePage();
}

function automatic(): void {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        return;
    }

    timerId = window.setInterval(() => {
        movingCar.move();
        updatePage();
    }, 100);
}

function addDrivingLogRecord(): void {
    movingCar.addDrivingLog();
    updatePage();
}

function updatePage(): void {
    const car = movingCar.getCar();

    document.getElementById("carInfo")!.innerText = movingCar.getInfo();

    const logBlock = document.getElementById("drivingLogBlock")!;
    const log = document.getElementById("drivingLog")!;

    if (car instanceof Truck) {
        logBlock.style.display = "block";
        log.innerHTML = car.getDrivingLog().join("<br>");
    } else {
        logBlock.style.display = "none";
        log.innerHTML = "";
    }
}