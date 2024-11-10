var cells = document.querySelectorAll(".cell");
var output = document.getElementById("output");
var len = 4;
var map = new Array(len).fill(0).map(function () { return new Array(len).fill(0); });
cells.forEach(function (element, value) {
    element.addEventListener("click", function () {
        parse(value);
        changeColor(element, value);
    });
});
function changeColor(cell, value) {
    cell.style.backgroundColor = "#c67753";
    cell.style.border = "1px yellow solid";
}
function parse(n) {
    var row = Math.floor(n / 4);
    var column = n % 4;
    map[row][column] = 1;
}
function find() {
    var perimeter = 0;
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            if (map[i][j] == 1) {
                perimeter += 4;
                if (j < map[i].length - 1 && map[i][j + 1] == 1)
                    perimeter -= 2;
                if (i < map.length - 1 && map[i + 1][j] == 1)
                    perimeter -= 2;
            }
        }
    }
    output.textContent = "Perimeter : ".concat(perimeter, " units");
    console.log(perimeter);
}
