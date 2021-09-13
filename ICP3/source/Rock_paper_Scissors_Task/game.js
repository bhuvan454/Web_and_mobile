
//function to get the input

function getComputerInput(){
    var text="";
    var input=Math.floor(Math.random() * 3)
    if(input==1){
        text="rock";
    }
    else if(input==2){
        text="paper";
    }
    else{
        text="scissors";
    }
    return text;
}

//function to play the game
function Play(userinput){
    console.log('check');
    var computerinput=getComputerInput();
    var result=determineWinner(userinput,computerinput);
    document.getElementById("uchoice").innerText=userinput;
    document.getElementById("cchoice").innerText=computerinput;
    document.getElementById("result").innerText=result;

}


//rule to make the decision
function determineWinner(userChoice,computerChoice) {
    document.getElementById("result").style="color:green";
    if (userChoice === computerChoice) {
        return 'It\'s a tie!';
    } else if (userChoice === 'rock') {
        if (computerChoice === 'paper') {
            document.getElementById("result").style="color:red";
            return 'Computer wins!';
        } else {
            return 'You win!';
        }
    } else if (userChoice === 'paper'){
        if (computerChoice === 'scissors') {
            document.getElementById("result").style="color:red";
            return 'Computer wins!';
        }else {
            return 'You win!';
        }
    } else if (userChoice === 'scissors') {
        if (computerChoice === 'rock') {
            document.getElementById("result").style="color:red";
            return 'Computer wins!';
        } else {
            return 'You win!';
        }
    } else if (userChoice === 'bomb') {
        return 'You win!';
    }
}