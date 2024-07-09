let gameSeq=[];
let userSeq=[];

let btns=["red","yellow","blue","green"];


let started=false;
let level=0;
let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game is started");
        started=true;
        levelUp();
    }
});
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
        },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
        },250);
}

function levelUp(){
    userSeq=[];
    level++;
    //update level in h2.innertext
    h2.innerText=`Level ${level}`;
    //random index choose
    let randIdx=Math.floor(Math.random()*3);
    //push random index to gameSeq
    let randCol=btns[randIdx];
    //we call that random button
    let randbtn=document.querySelector(`.${randCol}`);

// console.log(randIdx);
// console.log(randCol);
// console.log(randbtn);
gameSeq.push(randCol);
gameFlash(randbtn);
}
function check(idx){
    // console.log("current level: ",level);
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        audio = new Audio("sounds/" +"wrong.mp3");
        audio.play();
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor="white";
        },150);
        reset();
    }
}  

function btnPress(){
    let pbtn=this;
    userFlash(pbtn);
    let userColor=pbtn.getAttribute("id");
    var audio = new Audio("sounds/" + userColor + ".mp3");
    audio.play();
    userSeq.push(userColor);
    check(userSeq.length-1);
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
//random btn choose
// gameFlash();
function reset(){
    started=false;
    level=0;
    gameSeq=[];
    userSeq=[];
}