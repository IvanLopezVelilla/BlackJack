<?php
require_once("models.php");


$money;
$gains=$_SESSION["currentBet"];
$lostAll=false;

switch($_GET["result"]){

    case "0":

        $money=$_SESSION["currentMoney"]+$_SESSION["currentBet"];

    break;

    case "1":

        $money=$_SESSION["currentMoney"]+$_SESSION["currentBet"]*2;

    break;

    case "2":

        if($_SESSION["currentMoney"]<=0){

            $money=25;
            $lostAll=true;

        }else{

            $money=$_SESSION["currentMoney"];

        }

    break;

}

if(isset($_SESSION["loggedUser"])){

    $db->updateMoney($_SESSION["loggedUser"]["users_id"], $money);
    $_SESSION["loggedUser"]["money"]=$money;

}

$_SESSION["currentMoney"] = $money;

$_SESSION["currentBet"] = 0;

echo json_encode([

        "player"=>$_SESSION["player"],
        "dealer"=>$_SESSION["dealer"],
        "gains"=>$gains,
        "lostAll"=>$lostAll

    ]);

?>