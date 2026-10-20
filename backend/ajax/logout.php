<?php
require_once("models.php");


if(isset($_SESSION["loggedUser"])){

    unset($_SESSION["loggedUser"]);
    $_SESSION["currentMoney"]=25;

}



?>