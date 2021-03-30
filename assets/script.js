// Assignment Code
var generateBtn = document.querySelector("#generate");

// Define user preferences object
var userPref = {
  promptUser: function(prefDesc, message) {
      prefDesc = prompt(message);
      return prefDesc;
  },
  errorMessageType: "Error: Invalid entry. Must be 'y' or 'n'."
};

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  // write the new password to the textarea
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Determine the criteria for the password's security from the user and return a password that fulfills the requirements
function generatePassword(){
  var pwLength;
  var newPassword;

  function getPasswordLength() {

    function getPasswordMinLength() {
       userPref.pwMinLength = userPref.promptUser(userPref.pwMinLength, "Enter minimum number of characters:");
      // Make sure number is greater than 0, if not force user to reenter
    }

    // Make sure the miniumum is greater than zero
    if (userPref.pwMinLength <= 0 ) {
      window.alert("Error: The minimum length must be greater than 0.");
      getPasswordMinLength();
    } 

    function getPasswordMaxLength() {
      userPref.pwMaxLength = userPref.promptUser(userPref.pwMaxLength, "Enter maxiumum number of characters:");
    }
    
    // Make sure the maximum is greater than the miminum, if not force user to reenter
    if (userPref.pwMinLength > userPref.pwMaxLength) {
      window.alert(`Error: The minimum length (${userPref.pwMinLength}) must be less than the maximum length.`);
      getPasswordMaxLength();
    }

    getPasswordMinLength();
    getPasswordMaxLength();
  }
  
  function getCharacterTypes() {
    //   Prompt if lowercase letters should be included
    function getCharacterTypeLowerCase() {
      userPref.pwTypeLowercase = userPref.promptUser(userPref.pwTypeLowercase, "Include lowercase letters? (y/n)");
      // Make sure a y or n is entered, if not force user to reenter
      if ((userPref.pwTypeLowercase != 'y') && (userPref.pwTypeLowercase != 'n')){
        window.alert(userPref.errorMessageType);
        getCharacterTypeLowerCase();
      }
    }
    
      //   Prompt if uppercase letters should be included
    function getCharacterTypeUpperCase() {
      userPref.pwTypeUppercase = userPref.promptUser(userPref.pwTypeUppercase, "Include uppercase letters? (y/n)");
       // Make sure a y or n is entered, if not force user to reenter
      if ((userPref.pwTypeUppercase != 'y') && (userPref.pwTypeUppercase != 'n')){
        window.alert(userPref.errorMessageType);
        getCharacterTypeUpperCase();
      }
    }

      //   Prompt if numbers should be included
    function getCharacterTypeNumeric() {
       userPref.pwTypeNumeric = userPref.promptUser(userPref.pwTypeNumeric, "Include numbers? (y/n)");
       // Make sure a y or n is entered, if not force user to reenter
      if ((userPref.pwTypeNumeric != 'y') && (userPref.pwTypeNumeric != 'n')){
        window.alert(userPref.errorMessageType);
        getCharacterTypeNumeric();
      }
    }
    
    // Prompt if special characters should be included
    function getCharacterTypeSpecialCharacters() {
       userPref.pwTypeSpecialCharacters = userPref.promptUser(userPref.pwTypeSpecialCharacters, "Include special characters? (y/n)");
      // Make sure a y or n is entered, if not force user to reenter
      if ((userPref.pwTypeSpecialCharacters != 'y') && (userPref.pwTypeSpecialCharacters != 'n')){
        window.alert(userPref.errorMessageType);
        getCharacterTypeSpecialCharacters();
      }
    }
    
    getCharacterTypeLowerCase();
    getCharacterTypeUpperCase();
    getCharacterTypeNumeric();
    getCharacterTypeSpecialCharacters();
    
    // THEN my input should be validated and at least one character type should be selected
    if ((userPref.pwTypeLowercase == "n") && (userPref.pwTypeUppercase == "n") && (userPref.pwTypeNumeric == "n") && (userPref.pwTypeSpecialCharacters == "n")) {
      window.alert("You must chose at least one character type.");
      getCharacterTypes();
    }

  }

  getPasswordLength();
  getCharacterTypes();

  // create random password length
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  pwLength = getRandomInt(userPref.pwMinLength, userPref.pwMaxLength);
  console.log(`Min is ${userPref.pwMinLength}. Max is ${userPref.pwMaxLength}. Password length is ${pwLength}.`);

  // create random password length
  function createPassword(length) {
    var characters = '';

    if (userPref.pwTypeLowercase == "y"){
      characters += ('abcdefghijklmnopqrstuvwxyz');
    }
    if (userPref.pwTypeUppercase == "y"){
      characters += ('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }
    if (userPref.pwTypeSpecialCharacters == "y"){
      characters += ('~!@#$%^&*_+?');
    }
    if (userPref.pwTypeNumeric == "y"){
      characters += ('0123456789');
    }
    console.log(`characters are ${characters}`);

    var result = '';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(`results are ${result}`);
    result.replace(/\s/g, "");
    return result;
  }

  function printRules() {
      // select the new div
    var passwordRules =  document.querySelector("#password-rules");

      // write rules to the DOM
    var rules = ('Password rules: <ul>' + 
      '<li>Length must be ' + userPref.pwMinLength + '-' + userPref.pwMaxLength + ' characters.</li>' +
      '<li>' + yesOrNo(userPref.pwTypeLowercase) + ' include lower case characters.</li>' +
      '<li>' + yesOrNo(userPref.pwTypeUppercase) +' include upper case characters.</li>' +
      '<li>' + yesOrNo(userPref.pwTypeNumeric) +' include numbers.</li>' +
      '<li>' + yesOrNo(userPref.pwTypeSpecialCharacters) +' include special characters.</li>' 
      + '</ul');

      // output must or must not text
    function yesOrNo(inputValueYN) {
        if (inputValueYN == "n"){
          return 'MUST NOT';
        } else {
          return 'MUST';
        }
    }

    //add new string to the div
    passwordRules.innerHTML += rules;
 } 

  printRules();
  return createPassword(pwLength);
}