const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
    // This generate [0,0,0,0]
    answers: new Array(4).fill(0),

    registerNewAnswer() {
        const answer = Number.parseInt(
            prompt(
                `${this.question}\n${this.options.join("\n")}\n(Write option number)`
            )
        );
        if (answer >= 0 && answer <= 3) {
            this.answers[answer]++;
        } else {
            alert("Invalid input");
        }
        this.displayResults("string");
    },
    displayResults(type) {
        if (type === "string") {
            console.log(`Poll results are ${this.answers.join(", ")}`);
        } else if (type === "array") {
            console.log(this.answers);
        }
    }
};

let btn = document.getElementById("pollBtn");
btn.addEventListener("click", poll.registerNewAnswer.bind(poll));


