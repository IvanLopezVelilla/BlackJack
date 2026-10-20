<?php
require_once("models.php");


$amount=isset($_GET["amount"]) ? (int)$_GET["amount"]:10;

$players=$db->getBestPlayers($amount);

echo json_encode($players);


?>