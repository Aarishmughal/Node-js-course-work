// class Calculator {
//     add(a, b) {
//         return Number(a + b);
//     }
//     multiply(a, b) {
//         return a * b;
//     }
//     divide(a, b) {
//         return a / b;
//     }
//     subtract(a, b) {
//         return a - b;
//     }
// }
module.exports = class {
    add(a, b) {
        return Number(a + b);
    }
    multiply(a, b) {
        return a * b;
    }
    divide(a, b) {
        return a / b;
    }
    subtract(a, b) {
        return a - b;
    }
};
