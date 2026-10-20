<?php
session_start();

if(!isset($_SESSION["currentMoney"]) || $_SESSION["currentMoney"]<=0)  $_SESSION["currentMoney"]  = 25;
$_SESSION["currentBet"]=0;
echo $_SESSION["currentMoney"];

?>