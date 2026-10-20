<?php
session_start();


//Not in use at the moment, could be helpfull in the future
//Would need some rework


require_once("api.php");

$totalPlayer=0;
$totalDealer=0;

foreach($_SESSION["player"] as $card){

    switch($card["value"]){

        case "JACK": $totalPlayer+=10; break;

        case "QUEEN": $totalPlayer+=10; break;

        case "KING": $totalPlayer+=10; break;

        case "ACE": $totalPlayer+=11; break;

        default: $totalPlayer+=(int)$card["value"]; break;

    }

}

foreach($_SESSION["dealer"] as $card){

    switch($card["value"]){

        case "JACK": $totalDealer+=10; break;

        case "QUEEN": $totalDealer+=10; break;

        case "KING": $totalDealer+=10; break;

        case "ACE": $totalDealer+=11; break;

        default: $totalDealer+=(int)$card["value"]; break;

    }

}

$_SESSION["totalPlayer"]=$totalPlayer;
$_SESSION["totalDealer"]=$totalDealer;

echo json_encode([

    "totalPlayer" => $totalPlayer,
    "totalDealer" => $totalDealer

]);

?>