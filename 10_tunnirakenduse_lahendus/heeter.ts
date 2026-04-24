class MaterialAmount {
    protected mass: number; // kg
    protected specificHeatCapacity: number; // J / (kg * °C)
    protected temperature: number; // °C

    constructor(mass: number, specificHeatCapacity: number, temperature: number) {
        this.mass = mass;
        this.specificHeatCapacity = specificHeatCapacity;
        this.temperature = temperature;
    }

    public getTemperature(): number {
        return this.temperature;
    }

    public getMass(): number {
        return this.mass;
    }

    public getSpecificHeatCapacity(): number {
        return this.specificHeatCapacity;
    }

    // Насколько сильно материал влияет на итоговую температуру
    public getHeatInfluence(): number {
        return this.mass * this.specificHeatCapacity;
    }

    public changeEnergy(energy: number): void {
        const deltaT = energy / (this.mass * this.specificHeatCapacity);
        this.temperature += deltaT;
    }
}

class AirAmount extends MaterialAmount {
    private static readonly AIR_DENSITY = 1.23; // kg/m^3
    private static readonly AIR_SPECIFIC_HEAT = 1012; // J / (kg * °C)

    constructor(length: number, width: number, height: number, temperature: number) {
        const volume = length * width * height; // m^3
        const mass = volume * AirAmount.AIR_DENSITY;

        super(mass, AirAmount.AIR_SPECIFIC_HEAT, temperature);
    }
}

// Функция вычисления общей равновесной температуры
function equalTemperature(materials: MaterialAmount[]): number {
    let totalInfluence = 0;
    let weightedTemperatureSum = 0;

    for (const material of materials) {
        const influence = material.getHeatInfluence();
        totalInfluence += influence;
        weightedTemperatureSum += influence * material.getTemperature();
    }

    return weightedTemperatureSum / totalInfluence;
}


// ----------------------
// Part 3: Test the class
// ----------------------

const water = new MaterialAmount(3, 4200, 20);
const iron = new MaterialAmount(10, 412, 20);

water.changeEnergy(10000);
iron.changeEnergy(10000);

console.log("After adding 10,000 J:");
console.log("Water temperature:", water.getTemperature().toFixed(2), "°C");
console.log("Iron temperature:", iron.getTemperature().toFixed(2), "°C");


// ----------------------
// Part 4: Transfer Energy
// ----------------------

if (iron.getTemperature() > water.getTemperature()) {
    iron.changeEnergy(-1000); // забираем у железа
    water.changeEnergy(1000); // отдаём воде
    console.log("\nAfter transferring 1000 J from iron to water:");
    console.log("Water temperature:", water.getTemperature().toFixed(2), "°C");
    console.log("Iron temperature:", iron.getTemperature().toFixed(2), "°C");
} else {
    console.log("\nIron is not hotter than water, so no transfer is made.");
}


// ----------------------
// Part 5: Air in a Room
// ----------------------

const roomAir = new AirAmount(5, 4, 2.5, 18); // room: 5m x 4m x 2.5m
console.log("\nRoom air:");
console.log("Air temperature:", roomAir.getTemperature().toFixed(2), "°C");
console.log("Air mass:", roomAir.getMass().toFixed(2), "kg");


// ----------------------
// Part 6: Equal Temperature
// ----------------------

const finalTemp = equalTemperature([water, iron, roomAir]);
console.log("\nEqual temperature of water, iron, and room air:");
console.log(finalTemp.toFixed(2), "°C");