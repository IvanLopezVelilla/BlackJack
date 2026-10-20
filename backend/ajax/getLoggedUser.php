<?php
require_once("models.php");


if(isset($_SESSION["loggedUser"])){

    saveLoggedUser($db, $_SESSION["loggedUser"]["name"]);

    $_SESSION["currentMoney"]=$_SESSION["loggedUser"]["money"];

    echo json_encode([

        "users_id"=>$_SESSION["loggedUser"]["users_id"],
        "name"=>$_SESSION["loggedUser"]["name"],
        "email"=>$_SESSION["loggedUser"]["email"],
        "money"=>$_SESSION["loggedUser"]["money"],
        "rank"=>$db->getCurrentRank($_SESSION["loggedUser"]["name"])

    ]);

}else{

    echo -1;

}



?>