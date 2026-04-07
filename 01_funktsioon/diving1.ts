// Calculating diving presure
// a= deph 
// b= presure
//const b =1 
function pressure(depth: number): number {
    if (depth < 0){
        throw new Error("Depth cannot be negative");
    }
    return 1 + depth / 10;
}

console.log(pressure(0));   // 1 atm
console.log(pressure(10));  // 2 atm
console.log(pressure(20));  // 3 atm