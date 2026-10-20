<?php
session_start();
require_once("api.php");

newDecks();
echo json_encode([

    "player" => $_SESSION["player"],
    "dealer" => $_SESSION["dealer"]

]);

?>