const input0 = document.getElementById("amount");
const input1 = document.getElementById("percentage");
const output = document.getElementById("output");

function tipCalculator(amount, percentage) {
    if (percentage < 0 || percentage > 100)
        throw Error("Percentage not valid");
    let total = amount + (amount * (percentage / 100))
    return total;
}


function calculate() {
    try {
        let amount = Number.parseInt(input0.value)
        let percentage = Number.parseInt(input1.value)
        if (!isNaN(amount) && !isNaN(percentage)) {
            let tipAmount = tipCalculator(amount, percentage);
            output.textContent = `Total Amount : ${tipAmount}`;
        } else {
            output.textContent = `Enter Valid Numbers`
        }
    } catch (err) {
        output.textContent = `${err.message}`
    }
}