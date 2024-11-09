let screen = document.getElementById("screen");
let input = document.getElementById("input");
let btn = document.querySelectorAll(".btn");
let equalBtn = document.getElementById("eval");
let backBtn = document.getElementById("back")

for (const item of btn) {
  item.addEventListener("click", (e) => {
    let btnText = e.target.innerText;
    
    if(input.value){
      input.value="";
      screen.value="";
    } 
    if(btnText=== "AC"){
        btnText="";
        screen.value="";
      }

    if(btnText==="÷")
        btnText="/";

    if(btnText==="✕")
        btnText="*";

    screen.value = screen.value + btnText;
    
  }
  
  );
}

const returnEval = (arg) => {
  return eval(`"use strict"; (${arg})`);
}


const getResult = () => {
  input.value = screen.value;
  screen.value = returnEval(screen.value);
}
equalBtn.addEventListener("click" , getResult)

const deleteOne = () => {
  // screen.value=screen.value.substring(0, screen.value.length - 1);
  screen.value = screen.value.slice(0, -1);
}

backBtn.addEventListener("click" ,deleteOne)