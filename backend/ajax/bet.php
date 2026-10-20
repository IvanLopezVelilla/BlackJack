<?php
require_once("models.php");

//Check if variables exists
if(!isset($_SESSION["currentMoney"]))  $_SESSION["currentMoney"]  = 25;
if(!isset($_SESSION["currentBet"])) $_SESSION["currentBet"] = 0;

$bet = intval($_GET["amount"]);

//All-in
if($bet == -1){

    $bet = $_SESSION["currentMoney"];

}

//Validations
if($bet <= 0 || $bet > $_SESSION["currentMoney"]){

    echo -1;

}else{

    $_SESSION["currentBet"] += $bet;
    $_SESSION["currentMoney"]  -= $bet;

    if(isset($_SESSION["loggedUser"])){
        
        $moneyBeforeBet = $_SESSION["currentMoney"] + $bet;
        $db->bet($_SESSION["loggedUser"]["users_id"], $moneyBeforeBet, $bet);
        $_SESSION["loggedUser"]["money"] = $_SESSION["currentMoney"];

    }

    echo $_SESSION["currentMoney"] . "_" . $_SESSION["currentBet"];

}
?>