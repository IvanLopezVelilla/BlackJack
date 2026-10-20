<?php

class db{

    private $pdo;

    function __construct($host,$port,$db,$user,$pass){

        $this->pdo=new PDO("mysql:host=".$host.";port=".$port.";dbname=".$db.";charset=utf8mb4",$user,$pass);

    }


    //Functions
    //Finds an user by nickname and returns their id
    function getUserId($nickname){

        $sentence="SELECT users_id FROM users WHERE nickname=:nickname";
        $execution=$this->pdo->prepare($sentence);
        $execution->execute(

            array(

                ":nickname"=>$nickname

            )

        );

        $resp=$execution->fetch(PDO::FETCH_ASSOC);
        
        return $resp ? $resp["users_id"] : null;

    }

    //Finds an user by id and returns all their data
    function getUser($id){

        $sentence="SELECT * FROM users WHERE users_id=:id";
        $execution=$this->pdo->prepare($sentence);
        $execution->execute(

            array(

                ":id"=>$id

            )

        );

        $resp=$execution->fetch(PDO::FETCH_ASSOC);
        
        return $resp;

    }

    //Finds an user by email and returns their id
    function getUserIdByEmail($email){

        $sentence="SELECT users_id FROM users WHERE email=:email";
        $execution=$this->pdo->prepare($sentence);
        $execution->execute(

            array(

                ":email"=>$email

            )

        );

        $resp=$execution->fetch(PDO::FETCH_ASSOC);
        
        return $resp ? $resp["users_id"] : null;

    }

    //Checks if a password is right
    function checkPassword($id, $pass){

        $sentence="SELECT hash FROM users WHERE users_id=:id";
        $execution=$this->pdo->prepare($sentence);
        $execution->execute(

            array(

                ":id"=>$id

            )

        );

        $resp=$execution->fetch(PDO::FETCH_ASSOC);
        
        return password_verify($pass, $resp["hash"]);

    }


    //Inserts an user in the database
    function insertUser($name, $email, $money, $hash){
        
        $sentence="INSERT INTO users(nickname, email, money, hash) VALUES(:name, :email, :money, :hash)";
        $execution=$this->pdo->prepare($sentence);
        $execution->execute(

            array(

                ":name"=>$name,
                ":email"=>$email,
                ":money"=>$money,
                ":hash"=>$hash

            )

        );
        
        return true;

    }


    //Manages a bet from a registered user
    function bet($id, $currentMoney, $bet){

        $newMoney=$currentMoney-$bet;

        $sentence="UPDATE users SET money=:newMoney WHERE users_id=:id";
        $execution=$this->pdo->prepare($sentence);
        $execution->execute(

            array(

                ":id"=>$id,
                ":newMoney"=>$newMoney

            )

        );
        
        return true;

    }


    //Gets the X users with more money from the db and returns them in an array
    function getBestPlayers($amount){

        $sentence="SELECT nickname, money FROM users ORDER BY money DESC LIMIT :amount";
        $execution=$this->pdo->prepare($sentence);
        $execution->bindValue(':amount', (int)$amount, PDO::PARAM_INT);
        $execution->execute();

        $resp=$execution->fetchAll(PDO::FETCH_ASSOC);
        
        return $resp;

    }


    //Updates a user's money value
    function updateMoney($id, $money){

        $sentence="UPDATE users SET money=:money WHERE users_id=:id";
        $execution=$this->pdo->prepare($sentence);
        $execution->execute(

            array(

                ":id"=>$id,
                ":money"=>$money

            )

        );
        
        return true;

    }


    //Returns the current ranking position of an user, searchs by nickname
    function getCurrentRank($name){

        $sentence="SELECT position FROM (SELECT nickname, ROW_NUMBER() OVER (ORDER BY money DESC) AS position FROM users) AS ranking WHERE nickname=:name";
        $execution=$this->pdo->prepare($sentence);
        $execution->execute(

            array(

                ":name"=>$name

            )

        );

        $resp=$execution->fetch(PDO::FETCH_ASSOC);
        
        return $resp ? $resp["position"] : null;

    }


}

?>