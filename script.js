let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");




let turnO = true;
let count = 0;


const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) =>{
    box.addEventListener("click",() => {
        if(turnO){
            box.innerText = "O";
            box.style.color = "#b0413e";
            turnO = false;
        }else{
            box.innerText = "X"
            box.style.color = "blue";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

const checkWinner = () => {
    for(pattern of winPatterns){
       let pos1Val = boxes[pattern[0]].innerText;
       let pos2Val = boxes[pattern[1]].innerText;
       let pos3Val = boxes[pattern[2]].innerText;

       if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
        if(pos1Val === pos2Val && pos2Val === pos3Val){
            console.log("winner",pos1Val);
            showWinner(pos1Val);
            disabledBoxes();
            return true;
        }
       }
    }

    return false;
};
const disabledBoxes = () => {
    for (let box of boxes){
        box.disabled = true;
    }
};



const showWinner = (winner) => {
    msg.innerText = `congratulations!!, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};


const enabledBoxes = () => {
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}
const resetGame = () => {
    turnO = true;
    count = 0;
    enabledBoxes();
    msgContainer.classList.add("hide");
}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
