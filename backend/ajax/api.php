<?php


function callAPI($url){

    $ch=curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 1);// 1 second max
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 1);
    
    $resp = curl_exec($ch);
    
    if(curl_errno($ch)==0){

        $http_code=curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if($http_code==200){

            return $resp;

        }else{

            return -1;

        }
    }else{

        curl_close($ch);
        return -2;

    }

}


//Generate local decks handled in server
function generateLocalDeck(){

    $suits=["HEARTS", "DIAMONDS", "CLUBS", "SPADES"];
    $values=["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE"];
    $codes=["2","3","4","5","6","7","8","9","0","J","Q","K","A"];
    $suitCodes=["HEARTS"=>"H", "DIAMONDS"=>"D", "CLUBS"=>"C", "SPADES"=>"S"];

    $deck=[];
    foreach($suits as $suit){

        foreach($values as $i => $value){

            $code=$codes[$i] . $suitCodes[$suit];
            $deck[]=[
                "code"=>$code,
                "image"=>"https://deckofcardsapi.com/static/img/{$code}.png",
                "images"=>[
                    "svg"=>"https://deckofcardsapi.com/static/img/{$code}.svg",
                    "png"=>"https://deckofcardsapi.com/static/img/{$code}.png"
                ],
                "value"=>$value,
                "suit"=>$suit
            ];

        }

    }

    shuffle($deck);
    return $deck;

}


//Generates new decks and checks if local deck storage is needed
function newDecks(){

    $resp=callAPI("https://deckofcardsapi.com/api/deck/new/shuffle/");

    if($resp!==-1 && $resp!==-2){

        $json=json_decode($resp, true);
        $_SESSION["deck_id"]=$json["deck_id"];
        $_SESSION["local"]=false;

        $resp=callAPI("https://deckofcardsapi.com/api/deck/{$_SESSION['deck_id']}/draw/?count=4");
        
        if($resp!==-1 && $resp!==-2){

            $json=json_decode($resp, true);
            $_SESSION["player"]=[$json["cards"][0], $json["cards"][1]];
            $_SESSION["dealer"]=[$json["cards"][2], $json["cards"][3]];
            return 1;

        }
    }

    $_SESSION["local"]=true;
    $deck=generateLocalDeck();
    $_SESSION["deck"]=$deck;
    $_SESSION["player"]=[array_pop($_SESSION["deck"]), array_pop($_SESSION["deck"])];
    $_SESSION["dealer"]=[array_pop($_SESSION["deck"]), array_pop($_SESSION["deck"])];
    return 1;

}


//Checks if a card is an ace
function isAce($card){

    if($card["value"]=="ACE"){

        return true;

    }    

    return false;

}


//Returns the total value of a deck, DOES NOT CHECK ACE VALUE
function getTotalDeckValue($deck){

    $total = 0;

    foreach($deck as $card){

        // A card can be an associative array (from API / local deck) or a raw value.
        $value = is_array($card) && isset($card["value"]) ? $card["value"] : $card;

        switch($value){

            case "JACK": case "QUEEN": case "KING":
                $total += 10;
                break;

            case "ACE":
                $total += 11;
                break;

            default:
                $total += intval($value);
                break;

        }

    }

    return $total;

}