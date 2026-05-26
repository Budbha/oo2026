class Water {
    waterAmount: number;
    temprature: number;
    heatingPower: number = 0; // starts at 0 means heater is switched off. Heating power = 0 watts
    readonly specialHeatCapacity: number = 4200;

    // constructor runs when a new water object is created.
    constructor(waterAmount: number, temprature: number){
        this.waterAmount = waterAmount;
        this.temprature = temprature;
    }

    setHeatingPower(newPower: number): void{
        // power = joules per second
        this.heatingPower = newPower;
    }

    getTemprature(): number{
        return this.temprature;
    }

    // This method simulates heating water for 1 second
    // It is going to increase the temprature based on power, water amount, special heat capacity.
    heatAsecond(): void{
        // energy added in 1 second, since power = joules per second
        let joules = this.heatingPower;

        // calculate how much temprature increases
        // Formula: ΔT = energy / (specific heat capacity × mass)
        let deltaTemprature = joules / (this.specialHeatCapacity * (this.waterAmount / 1000)); // converted grams to kg

        this.temprature += deltaTemprature;
    }

    // ===== Our added part starts here =====

    // This method simulates cooling water for 1 second.
    // It works similarly to heatAsecond(), but instead of adding heat,
    // it removes a small amount of energy from the water.
    coolAsecond(): void{
        // We use room temprature as the lowest possible temprature.
        // The water should not cool below 20°C in this simple simulation.
        const roomTemprature = 20;

        // If the water is already at room temprature or colder,
        // the method stops and does not change anything.
        if(this.temprature <= roomTemprature){
            return;
        }

        // This is a simple fixed cooling power.
        // It means that every second 100 joules of energy are removed.
        let coolingPower = 100;

        // We calculate how much the temprature should decrease.
        // Formula: ΔT = energy / (specific heat capacity × mass)
        // waterAmount is converted from grams to kilograms.
        let deltaTemprature = coolingPower / (this.specialHeatCapacity * (this.waterAmount / 1000));

        // The water temprature decreases by the calculated value.
        this.temprature -= deltaTemprature;

        // This check prevents the water from going below room temprature.
        // Without it, the program could cool the water too much after many clicks.
        if(this.temprature < roomTemprature){
            this.temprature = roomTemprature;
        }
    }

    // ===== Our added part ends here =====

    calculateHeatingTime(targetTemprature: number): number{
        // time = energy / power
        let tempratureDifference = targetTemprature - this.temprature;

        let jouleRequired = tempratureDifference * this.specialHeatCapacity * (this.waterAmount / 1000);

        let timeinSeconds = jouleRequired / this.heatingPower;

        return timeinSeconds;
    }
}


let w = new Water(800, 20);

console.log(w.getTemprature());

w.setHeatingPower(1500);

console.log("after setting the heating power: " + w.getTemprature());

w.heatAsecond();

console.log("after heating for 1 second: " + w.getTemprature());

// ===== Our added test starts here =====

// We call our new cooling method once to check that it works.
w.coolAsecond();

console.log("after cooling for 1 second: " + w.getTemprature());

// ===== Our added test ends here =====

let heatingtime = w.calculateHeatingTime(80);

console.log(heatingtime);