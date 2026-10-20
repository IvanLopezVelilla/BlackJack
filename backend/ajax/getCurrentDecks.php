<?php
session_start();


if(isset($_SESSION["player"]) && isset($_SESSION["dealer"])){

    echo json_encode([

        "player"=>$_SESSION["player"],
        "dealer"=>$_SESSION["dealer"]

    ]);

}else{

    echo "-1";

}


?>