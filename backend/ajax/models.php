<?php
session_start();
require_once("../db.php");

//Change to your credentials
$db=new db("localhost",3306,"blackJack","root","");
//Use your own database here, must create the following table:
/*

CREATE TABLE users (
    users_id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    money INT,
    hash VARCHAR(300)
);

*/
//Needs sql, I use MariaDB
//If database is not in the same server as the web, must change port and ip

function saveLoggedUser($db, $name){

    $user=$db->getUser($db->getUserId($name));

    $_SESSION["loggedUser"]=[

        "users_id"=>$user["users_id"],
        "name"=>$user["nickname"],
        "email"=>$user["email"],
        "money"=>$user["money"]

    ];

}

?>