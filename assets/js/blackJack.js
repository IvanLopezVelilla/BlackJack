document.addEventListener("DOMContentLoaded", ()=>{

    //Show current money and set bet to 0
    showCurrentMoney();


    //Bet buttons
    let bet1=document.getElementById("bet1");
    let bet5=document.getElementById("bet5");
    let bet10=document.getElementById("bet10");
    let bet25=document.getElementById("bet25");
    let bet50=document.getElementById("bet50");
    let bet100=document.getElementById("bet100");
    let betAll=document.getElementById("betAll");

    bet1.addEventListener("click", ()=>{bet(1)});
    bet5.addEventListener("click", ()=>{bet(5)});
    bet10.addEventListener("click", ()=>{bet(10)});
    bet25.addEventListener("click", ()=>{bet(25)});
    bet50.addEventListener("click", ()=>{bet(50)});
    bet100.addEventListener("click", ()=>{bet(100)});
    betAll.addEventListener("click", ()=>{bet(-1)});


    //Start game, new game and logout button
    let startGameBtn=document.getElementById("startBtn");
    startGameBtn.addEventListener("click", startGame);

    let logoutBtn=document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", logout);

    let newGameBtn=document.getElementById("newGameBtn");
    newGameBtn.addEventListener("click", newGame);


    //If user logged in show their name
    showLoggedUser();


    //Show the best 10 players in the ranking
    showBestPlayers(10);


});


//Functions
//Starts the game
function startGame(){

    removeAllEventListeners("startBtn");

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            showLoggedUser();

            document.getElementById("loggedOut").hidden=true;

            //Get response data and parse it to json
            const data=JSON.parse(this.responseText);
            console.log(data);

            //Disable bet and start buttons
            toggleBetButtons(false);
            document.getElementById("startBtn").hidden=true;
            document.getElementById("startBtn").addEventListener("click", startGame);
            document.getElementById("errorMsg").hidden=true;

            //Add hit and stand buttons
            removeAllEventListeners("hitBtn");
            let hitBtn=document.getElementById("hitBtn");
            hitBtn.hidden=false;
            hitBtn.addEventListener("click", ()=>{drawCard(true)});

            const dealerCards=data.dealer;

            removeAllEventListeners("standBtn");
            let standBtn=document.getElementById("standBtn");
            standBtn.hidden=false;
            standBtn.addEventListener("click", ()=>{stand(dealerCards)});

            //Get each deck total value
            let playerScore=document.getElementById("playerScore");
            playerScore.hidden=false;
            playerScore.textContent="Total: "+getTotalDeckValue(data.player);

            let dealerScore=document.getElementById("dealerScore");
            dealerScore.hidden=false;
            dealerScore.textContent="Total: "+valueToInt(data.dealer[0].value)+"+?";  
            
            //Add player cards to playerDiv
            let playerDiv=document.getElementById("playerDiv");
            playerDiv.innerHTML="";
            data.player.forEach(card => {

                let img=document.createElement("img");
                img.addEventListener("load", ()=>img.classList.add("loaded"));
                img.src=card.image;
                img.className="playingCard";
                playerDiv.appendChild(img);

            });

            //Add dealer cards to dealerDiv
            let dealerDiv=document.getElementById("dealerDiv");
            dealerDiv.innerHTML="";            

            let img=document.createElement("img");
            img.addEventListener("load", ()=>img.classList.add("loaded"));
            img.src=data.dealer[0].image;
            img.className="playingCard";
            dealerDiv.appendChild(img);

            let imgBack=document.createElement("img");
            imgBack.addEventListener("load", ()=>imgBack.classList.add("loaded"));
            imgBack.src="https://deckofcardsapi.com/static/img/back.png";
            imgBack.className="playingCard";
            imgBack.id="dealerSecondCard";
            dealerDiv.appendChild(imgBack);

        }

    };

    xmlhttp.open("GET", "backend/ajax/newDecks.php", true);
    xmlhttp.send();

}


//Starts a new game
function newGame(){

        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){

                //Show logged user
                showLoggedUser();

                //Show current money and set bet to 0
                showCurrentMoney();

                //Show the best 10 players in the ranking
                showBestPlayers(10);

                //Hide end screen overlay
                hideEndScreenOverlay();

                //Show start game button
                document.getElementById("startBtn").hidden=false;

                //Show new cards
                let playerDiv=document.getElementById("playerDiv");
                playerDiv.innerHTML='<img src="https://deckofcardsapi.com/static/img/back.png" class="playingCard loaded"><img src="https://deckofcardsapi.com/static/img/back.png" class="playingCard loaded"></img>';

                let dealerDiv=document.getElementById("dealerDiv");
                dealerDiv.innerHTML='<img src="https://deckofcardsapi.com/static/img/back.png" class="playingCard loaded"><img src="https://deckofcardsapi.com/static/img/back.png" class="playingCard loaded">';

                //Hide totals
                document.getElementById("playerScore").hidden=true;
                document.getElementById("dealerScore").hidden=true;

                //Toggle bet buttons
                toggleBetButtons(true);

                //Show no current bet
                document.getElementById("betValue").textContent="0€";


            }

    };

    xmlhttp.open("GET", "backend/ajax/newGame.php", true);
    xmlhttp.send();

}


//Process a bet
function bet(amount){

    let xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){

        if(this.readyState==4 && this.status==200){

            if(this.responseText==="-1"){

                document.getElementById("errorMsg").hidden=false;
                document.getElementById("errorMsg").textContent="You don't have enough money";

            }else{

                document.getElementById("errorMsg").hidden=true;
                let money=this.responseText.split("_")[0];
                let currentBet=this.responseText.split("_")[1];

                document.getElementById("moneyValue").textContent=money+"€";
                document.getElementById("betValue").textContent=currentBet+"€";               

            }

        }

    };

    xmlhttp.open("GET", "backend/ajax/bet.php?amount=" + amount, true);
    xmlhttp.send();

}


//Enables or disables bet buttons
function toggleBetButtons(enabled){

    document.querySelectorAll(".betBtn").forEach(btn => {
        btn.disabled = !enabled;
        btn.style.visibility = enabled ? "visible" : "hidden";
    });

    document.getElementById("betDiv").style.display = enabled ? "grid" : "none";

}


//Shows the current money and sets bet to 0 (backend) at the reload of the page
function showCurrentMoney(){

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            document.getElementById("moneyValue").textContent=this.responseText+"€";

        }

    };

    xmlhttp.open("GET", "backend/ajax/getCurrentMoney.php", true);
    xmlhttp.send();

}


//Gets the total value of a deck
function getTotalDeckValue(cards){

    let total=0;
    cards.forEach(card => {

        total+=valueToInt(card.value);

    });

    return total;

}


//Returns the real value of a card in case it's face or ace card
function valueToInt(value){

    switch(value){

        case "JACK": case "QUEEN": case "KING": return 10;
        case "ACE": return 11;
        default: return parseInt(value);

    }

}


//Draws a card for either the player's deck (true) or the dealer's deck
function drawCard(isPlayer){

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            const data=JSON.parse(this.responseText);

            let div=isPlayer ? document.getElementById("playerDiv"):document.getElementById("dealerDiv");
            let score=isPlayer ? document.getElementById("playerScore"):document.getElementById("dealerScore");
            let img=document.createElement("img");
            img.addEventListener("load", ()=>img.classList.add("loaded"));
            img.src=data.image;
            img.className="playingCard";
            div.appendChild(img);
            let cardValue;

            switch(data.value){

                case "JACK": case "QUEEN": case "KING": cardValue=10; break;
                case "ACE": cardValue=11; break;
                default: cardValue=parseInt(data.value); break;

            }

            score.textContent="Total: "+(parseInt(score.textContent.split(" ")[1])+cardValue);

            //Check if any deck value is >21
            if(isPlayer){checkGameState(false);}            
            
        }

    };

    xmlhttp.open("GET", "backend/ajax/drawCard.php?isPlayer="+isPlayer, true);
    xmlhttp.send();

}


//Changes the game state to stand, shows the second dealer card and starts the dealer play
function stand(dealer){

    //Change dealer total value
    let dealerScore=document.getElementById("dealerScore");
    dealerScore.hidden=false;
    dealerScore.textContent="Total: "+getTotalDeckValue(dealer);

    //Show dealer second card
    let dealerSecondCard=document.getElementById("dealerSecondCard");
    dealerSecondCard.src=dealer[1].image;

    //Disable player buttons and start dealer turn
    let hitBtn=document.getElementById("hitBtn");
    hitBtn.hidden=true;

    let standBtn=document.getElementById("standBtn");
    standBtn.hidden=true;

    dealerTurn();

}


//Starts the dealer turn where he draws a card until he has >=17 deck value
async function dealerTurn(){

    const drawCardInterval=setInterval(async ()=>{
        
        const deckData=await getCurrentDecks();
        const dealer=deckData.dealer;
                    
        if(getTotalDeckValue(dealer)>=17){

            clearInterval(drawCardInterval);
            console.log("Stop dealer turn");
            
            //Check who won
            checkGameState(true);
            
        }else{

            drawCard(false);

        }

    }, 1000);

}


//Gets the current deck values from backend ($_SESSION)
function getCurrentDecks(){

    return new Promise((resolve, reject) => {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){

                const data=JSON.parse(this.responseText);
                resolve(data);
                
            }

        };

        xmlhttp.open("GET", "backend/ajax/getCurrentDecks.php", true);
        xmlhttp.send();

    });

}


//Checks if there is a logged user and shows their name if true
function showLoggedUser(){

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            if(this.responseText!="-1"){

                const data=JSON.parse(this.responseText);

                document.getElementById("loggedAs").textContent="Logged as "+data.name;
                document.getElementById("moneyValue").textContent=data.money+"€";

                document.getElementById("loginBtn").hidden=true;
                document.getElementById("registerBtn").hidden=true;
                document.getElementById("logoutBtn").hidden=false;

                document.getElementById("loggedOut").hidden=false;
                document.getElementById("loggedOut").textContent="You are ranked "+data.rank;

            }else{

                document.getElementById("loginBtn").hidden=false;
                document.getElementById("registerBtn").hidden=false;
                document.getElementById("logoutBtn").hidden=true;

            }
            
        }

    };

    xmlhttp.open("GET", "backend/ajax/getLoggedUser.php", true);
    xmlhttp.send();

}


//Shows the best X players in the ranking
function showBestPlayers(amount){

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            if(this.responseText!="-1"){

                const data=JSON.parse(this.responseText);

                let rankingList=document.getElementById("rankingList");
                rankingList.innerHTML="";

                data.forEach(player=>{

                    let li=document.createElement("li");
                    li.textContent=player.nickname+"-"+player.money+"€";
                    rankingList.appendChild(li);

                });

            }
            
        }

    };

    xmlhttp.open("GET", "backend/ajax/getBestPlayers.php?amount="+amount, true);
    xmlhttp.send();

}


//Logs the user out by setting $_SESSION["loggedUser"] to null
function logout(){

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            document.getElementById("loginBtn").hidden=false;
            document.getElementById("registerBtn").hidden=false;
            document.getElementById("logoutBtn").hidden=true;
            
            document.getElementById("moneyValue").textContent="25€";
            document.getElementById("loggedAs").textContent="Login or register for free";

            document.getElementById("loggedOut").hidden=false;
            document.getElementById("loggedOut").textContent="Logged out";
            
        }

    };

    xmlhttp.open("GET", "backend/ajax/logout.php", true);
    xmlhttp.send();

}


//Checks if the game has ended and for which reason and manages the end screen
async function checkGameState(playerStood){

    const decksData=await getCurrentDecks();
    const player=decksData.player;
    const dealer=decksData.dealer;

    let result;

    //Check if the player's deck value is >21
    if(getTotalDeckValue(player)>21){

        showEndScreenOverlay(2);
        result=2;

    }else if(getTotalDeckValue(dealer)>21){

        showEndScreenOverlay(1);
        result=1;

    }else if(playerStood){

        //Check which deck value is higher
        if(getTotalDeckValue(player)>getTotalDeckValue(dealer)){

            showEndScreenOverlay(1);
            result=1;

        }else if(getTotalDeckValue(player)<getTotalDeckValue(dealer)){

            showEndScreenOverlay(2);
            result=2;

        }else{ //Draw

            showEndScreenOverlay(0);
            result=0;

        }

    }

    //Update money in backend
    if(result !== undefined){

        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){

            if(this.readyState == 4 && this.status == 200){

                //Update money display
                showCurrentMoney();

            }

        };

        xmlhttp.open("GET", "backend/ajax/updateMoney.php?result="+result, true);
        xmlhttp.send();

    }
    
}


//Shows the end screen overlay
function showEndScreenOverlay(result){

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            const data=JSON.parse(this.responseText);
            let gains=data.gains;
            let lostAll=data.lostAll;

            document.getElementById("hitBtn").hidden=true;
            document.getElementById("standBtn").hidden=true;
            document.getElementById("EndScreenOverlay").hidden=false;

            let endResultText=document.getElementById("endResultText");
            let endResultMoney=document.getElementById("endResultMoney");

            document.getElementById("betValue").textContent="0";

            if(lostAll){

                document.getElementById("errorMsg").hidden=false;
                document.getElementById("errorMsg").textContent="Received extra 25€";

            }

            switch(result){

                case 1: //win

                    endResultText.textContent="You win!";
                    endResultMoney.textContent="+"+gains+"€";

                break;

                case 2: //lose

                    endResultText.textContent="You lose!";
                    endResultMoney.textContent="-"+gains+"€";

                break;

                case 0: //draw

                    endResultText.textContent="Draw!";
                    endResultMoney.textContent="+0€";

                break;

            }            

        }

    };

    xmlhttp.open("GET", "backend/ajax/updateMoney.php?result="+result, true);
    xmlhttp.send();


    
}


//Hides the endScreen overlay
function hideEndScreenOverlay(){

    document.getElementById("EndScreenOverlay").hidden=true;

}


//Removes all event listeners from an element by its ID
function removeAllEventListeners(elementId){

    const element = document.getElementById(elementId);

    if(element){

        const clonedElement = element.cloneNode(true);
        element.parentNode.replaceChild(clonedElement, element);

    }

}

