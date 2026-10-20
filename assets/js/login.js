document.addEventListener("DOMContentLoaded", ()=>{

    //Login button
    let loginBtn=document.getElementById("loginBtn");
    if(loginBtn){

        loginBtn.addEventListener("click", login);

    }    

    //Register button
    let registerBtn=document.getElementById("registerBtn");
    if(registerBtn){

        registerBtn.addEventListener("click", register);

    }    

});


//Checks user credentials and logins if right
function login(){

    let name=document.getElementById("nickname").value;
    let pass=document.getElementById("password").value;

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            let nicknameError=document.getElementById("nicknameError");
            let passwordError=document.getElementById("passwordError");
            let generalError=document.getElementById("generalError");

            nicknameError.textContent="";
            nicknameError.hidden=true;
            passwordError.textContent="";
            passwordError.hidden=true;
            generalError.textContent="";
            generalError.hidden=true;
            

            switch(this.responseText){

                //Succesful login
                case "1":

                    window.location.href="index.html";

                break;


                //Name error
                //Not valid name
                case "-1":

                    nicknameError.hidden=false;
                    nicknameError.textContent="This name is not valid";

                break;

                //No name
                case "-2":

                    nicknameError.hidden=false;
                    nicknameError.textContent="Insert a name";

                break;


                //Password error
                //No password
                case "-3":

                    passwordError.hidden=false;
                    passwordError.textContent="Insert a password";

                break;

                //Wrong password
                case "-4":

                    passwordError.hidden=false;
                    passwordError.textContent="Incorrect password";

                break;

                //Not found error
                case "-5":

                    generalError.hidden=false;
                    generalError.textContent="User not found, please try to register";

                break;

                //Unknown error
                default:

                    generalError.hidden=false;
                    generalError.textContent="Unknown error, please try again";                    

                break;

            }

        }

    }

    xmlhttp.open("GET", "backend/ajax/login.php?name="+name+"&pass="+pass, true);
    xmlhttp.send();

}


//Checks the user credentials and registers if right
function register(){

    let name=document.getElementById("nickname").value;
    let pass=document.getElementById("password").value;
    let email=document.getElementById("email").value;

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){

            let nicknameError=document.getElementById("nicknameError");
            let passwordError=document.getElementById("passwordError");
            let emailError=document.getElementById("emailError");
            let generalError=document.getElementById("generalError");

            nicknameError.textContent="";
            nicknameError.hidden=true;
            passwordError.textContent="";
            passwordError.hidden=true;
            emailError.textContent="";
            emailError.hidden=true;
            generalError.textContent="";
            generalError.hidden=true;
            

            switch(this.responseText){


                //Succesful register
                case "1":

                    window.location.href="index.html";

                break;

                //Name error
                //Not valid name
                case "-1":

                    nicknameError.hidden=false;
                    nicknameError.textContent="This name is not valid";

                break;

                //No name
                case "-2":

                    nicknameError.hidden=false;
                    nicknameError.textContent="Insert a name";

                break;

                //Name already in use
                case "-3":

                    nicknameError.hidden=false;
                    nicknameError.textContent="This name is already in use";

                break;


                //Password error
                //No password
                case "-4":

                    passwordError.hidden=false;
                    passwordError.textContent="Insert a password";

                break;

                //Not valid password
                case "-5":
                    
                    passwordError.hidden=false;
                    passwordError.textContent="This password is not valid";

                break;


                //Email
                //No email
                case "-6":

                    emailError.hidden=false;
                    emailError.textContent="Insert an email";

                break;

                //Not valid email
                case "-7":

                    emailError.hidden=false;
                    emailError.textContent="This email is not valid";

                break;

                //Email already in use
                case "-8":

                    emailError.hidden=false;
                    emailError.textContent="This email is already in use";

                break;


                //Unknown error
                default:

                    generalError.hidden=false;
                    generalError.textContent="Unknown error, please try again";                    

                break;

            }

        }

    }

    xmlhttp.open("GET", "backend/ajax/register.php?name="+name+"&pass="+pass+"&email="+email, true);
    xmlhttp.send();

}
 
 
































