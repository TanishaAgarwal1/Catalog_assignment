const fs = require('fs');
function convertBaseToDecimal(base, encodedValue) {
    return parseInt(encodedValue, base); 
}

// Function for Lagrange interpolation
function calculateConstantTerm(pointsList, requiredPoints) {
    let constantTerm = 0n; 

    for (let i = 0; i < requiredPoints; i++) {
        let currentX = BigInt(pointsList[i][0]);
        let currentY = BigInt(pointsList[i][1]);

        let termProduct = currentY;
        for (let j = 0; j < requiredPoints; j++) {
            if (i !== j) {
                let otherX = BigInt(pointsList[j][0]);
                
                termProduct *= (0n - otherX) / (currentX - otherX);
            }
        }
        constantTerm += termProduct;
    }

    return constantTerm;
}

// Main function to process input, decode, and calculate constant term
function decodeAndSolve(inputData) {
    const inputKeys = inputData.keys;
    const totalRoots = inputKeys.n; // Total number of roots
    const minimumRoots = inputKeys.k; // Minimum number of roots required

    let decodedPoints = [];
    for (let index = 1; index <= totalRoots; index++) {
        if (inputData[index]) {
            let baseOfValue = parseInt(inputData[index].base);
            let encodedValue = inputData[index].value;
            let decodedY = convertBaseToDecimal(baseOfValue, encodedValue); 
            decodedPoints.push([index, decodedY]); 
        }
    }

    
    let finalConstantTerm = calculateConstantTerm(decodedPoints, minimumRoots);
    return finalConstantTerm;
}


fs.readFile('input.json', 'utf8', (error, jsonData) => {
    if (error) {
        console.error("Error reading the file:", error);
        return;
    }

    const parsedInput = JSON.parse(jsonData); 
    const constantTermResult = decodeAndSolve(parsedInput); 
    console.log("The constant term (c) is:", constantTermResult.toString()); 
});
