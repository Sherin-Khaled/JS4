var signUpBtn = document.getElementById('showSignUp');
var loginInBtn = document.getElementById('showLoginIn');


var signUpDiv = document.getElementById('signUp');
var loginInDiv = document.getElementById('loginIn');


var userNameInput = document.getElementById('signName');
var userEmailInput = document.getElementById('signEmail');
var userPasswordInput = document.getElementById('signPassword');


var enterEmailInput = document.getElementById('loginEmail');
var enterPasswordInput = document.getElementById('loginPassword');


var loginInBigButton = document.getElementById('loginInBtn');
var signUpBigButton = document.getElementById('signUpBtn');

var addIncorrectSentence = document.getElementById("incorrect");


var NavigationBar = document.getElementById('navigationBar');
var welcomePage = document.getElementById('welcomePage');

var logOut = document.getElementById('Logout');


signUpBigButton.addEventListener('click' , addUser);
loginInBigButton.addEventListener('click' , loginUser);
logOut.addEventListener('click' , logoutUser);


function logoutUser() {
    NavigationBar.classList.replace('d-flex', 'd-none');
    welcomePage.classList.replace('d-flex' , 'd-none');

    firstPage.classList.replace('d-none', 'd-flex');

    clearInputs();

    loginInAppear();

    userNameInput.classList.remove("is-valid");
    userEmailInput.classList.remove("is-valid");
    userPasswordInput.classList.remove("is-valid");
}



function signUpAppear() {
    signUpDiv.classList.replace('d-none' , 'd-flex');
    loginInDiv.classList.replace('d-flex' , 'd-none');
    addIncorrectSentence.textContent = "";
    addIncorrectSentence.classList.remove("text-danger", "text-success");
}


function loginInAppear() {
    signUpDiv.classList.replace('d-flex' , 'd-none');
    loginInDiv.classList.replace('d-none' , 'd-flex');
    addIncorrectSentence.textContent = "";
    addIncorrectSentence.classList.remove("text-danger", "text-success");
}

signUpBtn.addEventListener('click' , signUpAppear);
loginInBtn.addEventListener('click' , loginInAppear);


var userKey = "users";
var userList;


function addUser() {
    var user = {
        name : userNameInput.value.trim() ,
        email : userEmailInput.value.trim() ,
        password : userPasswordInput.value
    };

    if(!validateSignUpInputs(user)){
        addIncorrectSentence.textContent = "Please Correct the Highlighted Errors";
        addIncorrectSentence.classList.remove("text-success");
        addIncorrectSentence.classList.add("text-danger");
        return;
    }

    // Check for existing email
    if (userList.some(u => u.email === user.email)) {
    addIncorrectSentence.textContent = "Email already exists!";
    addIncorrectSentence.classList.remove("text-success");
    addIncorrectSentence.classList.add("text-danger");
    return;
    }

    console.log(user);

    userList.push(user);
    localStorage.setItem(userKey , JSON.stringify(userList));
    clearInputs();

    addIncorrectSentence.textContent = "Sign Up Successful!";
    addIncorrectSentence.classList.remove("text-danger");
    addIncorrectSentence.classList.add("text-success");

    userNameInput.classList.remove("is-valid");
    userEmailInput.classList.remove("is-valid");
    userPasswordInput.classList.remove("is-valid");
}

if(localStorage.getItem(userKey)) {
    userList = JSON.parse(localStorage.getItem(userKey));
}else{
    userList = []
}

function clearInputs() {
    userNameInput.value = "";
    userEmailInput.value = "";
    userPasswordInput.value = "";
    enterEmailInput.value = "";
    enterPasswordInput.value = "";
}

function loginUser() {
    var email = enterEmailInput.value;
    var password = enterPasswordInput.value;

    var storedUsers = localStorage.getItem(userKey);
    if(storedUsers){
        userList = JSON.parse(storedUsers);
    } else {
        userList = [];
    }

    var foundUser = userList.find(function(user){
        return user.email  === email && user.password === password;
    })


    if (foundUser) {
        welcomeSentence.textContent= "Welcome " + foundUser.name;
        NavigationBar.classList.replace('d-none' , 'd-flex');
        welcomePage.classList.replace('d-none' , 'd-flex');
        firstPage.classList.replace('d-flex' , 'd-none');
        addIncorrectSentence.textContent = "";
        addIncorrectSentence.classList.remove("text-danger", "text-success");
    } else {
        addIncorrectSentence.textContent="Incorrect email or password";
        addIncorrectSentence.classList.remove("text-success");
        addIncorrectSentence.classList.add("text-danger");
    }

    

}


function validateSignUpInputs(user) {
    let isValid = true ;

    // Name Validation
    if (user.name.trim() === ""){
        userNameInput.classList.add("is-invalid");
        userNameInput.classList.remove("is-valid");
        isValid = false;
    } else {
        userNameInput.classList.remove("is-invalid");
        userNameInput.classList.add("is-valid");
    }

    // Email Validation
    if (!PATTERNS.email.test(user.email)) {
        userEmailInput.classList.add("is-invalid");
        userEmailInput.classList.remove("is-valid");
        isValid = false;
    } else {
        userEmailInput.classList.remove("is-invalid");
        userEmailInput.classList.add("is-valid");
    }

    // Password Validation
    if (!PATTERNS.password.test(user.password)) {
        userPasswordInput.classList.add("is-invalid");
        userPasswordInput.classList.remove("is-valid");
        isValid = false;
    } else {
        userPasswordInput.classList.remove("is-invalid");
        userPasswordInput.classList.add("is-valid");
    }

    return isValid;
}


var PATTERNS= {
    email : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ ,
}


function validate(key , input) {

    input.classList.remove('is-valid' , 'is-invalid');

    var pattern = PATTERNS[key];
    var userValue = input.value ;
    var isMatched = pattern.test(userValue);

    if(isMatched){
        input.classList.add('is-valid');
        input.classList.remove("is-invalid");
        
    }else {
        input.classList.add("is-invalid");
      input.classList.remove("is-valid");
    }
}