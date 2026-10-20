<?php
session_start();
require_once("api.php");

$isPlayer=isset($_GET["isPlayer"]) && ($_GET["isPlayer"]==="true" || $_GET["isPlayer"]==="1");

if($_SESSION["local"]){

    $card=array_pop($_SESSION["deck"]);

}else{
    
    $resp=callAPI("https://deckofcardsapi.com/api/deck/{$_SESSION['deck_id']}/draw/?count=1");
    $json=json_decode($resp, true);
    $card=$json["cards"][0];

}


if($isPlayer){

    $_SESSION["player"][]=$card;

    //Check if card is ace and if deck >21
    if(isAce($card) && getTotalDeckValue($_SESSION["player"])>21){

        $card["value"]=1;
        array_pop($_SESSION["player"]);
        $_SESSION["player"][]=$card;

    }

}else{

    $_SESSION["dealer"][]=$card;

    //Check if card is ace and if deck >21
    if(isAce($card) && getTotalDeckValue($_SESSION["dealer"])>21){

        $card["value"]=1;
        array_pop($_SESSION["dealer"]);
        $_SESSION["dealer"][]=$card;

    }

}

echo json_encode($card);