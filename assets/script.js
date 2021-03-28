// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Determine the criteria for the password's security from the user and return a password that fulfills the requirements
function generatePassword(){

  var pwMinLength;
  var pwMaxLength;
  var pwTypeLowercase;
  var pwTypeUppercase;
  var pwTypeSpecialCharacters;
  var pwTypeNumeric;
  var newPassword;

  function getPasswordLength() {
    function getPasswordMinLength() {
      //   WHEN prompted for the length of the password
      pwMinLength = prompt("Enter minimum number of characters:");
      console.log(`The minimum length is ${pwMinLength}`);
      if (pwMinLength === null) {
        return; 
      }
      // Make sure number is greater than 0, if not force user to reenter
      if (pwMinLength <= 0 ) {
        window.alert("Error: The minimum length must be greater than 0.");
        getPasswordMinLength();
      } 
    }

    function getPasswordMaxLength() {
      //   WHEN prompted for the maxlength of the password
      pwMaxLength = prompt("Enter maxiumum number of characters:");
      console.log(`The maximum length is ${pwMaxLength}`);
      if (pwMaxLength === null) {
        return; 
      }
    }
    
    getPasswordMinLength();
    getPasswordMaxLength();

    // Make sure the maximum is greater than the miminum, if not force user to reenter
    if (pwMinLength > pwMaxLength) {
      window.alert(`Error: The minimum length (${pwMinLength}) must be less than the maximum length.`);
      getPasswordMaxLength();
    }
  }
  

  function getCharacterTypes() {
    function getCharacterTypeLowerCase() {
      //   Prompt if lowercase letters should be included
      pwTypeLowercase = prompt("Include lowercase letters? (y/n)");
      if (pwTypeLowercase === null) {
        return; 
      }
      // Make sure a y or n is entered, if not force user to reenter
      if ((pwTypeLowercase != 'y') && (pwTypeLowercase != 'n')){
        window.alert("Error: Invalid entry. Must be 'y' or 'n'.");
        getCharacterTypeLowerCase();
      }
    }
    
    function getCharacterTypeUpperCase() {
       //   Prompt if uppercase letters should be included
      pwTypeUppercase = prompt("Include uppercase letters? (y/n)");
       // Make sure a y or n is entered, if not force user to reenter
      if ((pwTypeUppercase != 'y') && (pwTypeUppercase != 'n')){
        window.alert("Error: Invalid entry. Must be 'y' or 'n'.");
        getCharacterTypeUpperCase();
      }
    }

    function getCharacterTypeNumeric() {
       //   Prompt if numbers should be included
      pwTypeNumeric = prompt("Include numbers? (y/n)");
       // Make sure a y or n is entered, if not force user to reenter
      if ((pwTypeNumeric != 'y') && (pwTypeNumeric != 'n')){
        window.alert("Error: Invalid entry. Must be 'y' or 'n'.");
        getCharacterTypeNumeric();
      }
    }
    
    function getCharacterTypeSpecialCharacters() {
       // Prompt if special characters should be included
      pwTypeSpecialCharacters = prompt("Include special characters? (y/n)");
      // Make sure a y or n is entered, if not force user to reenter
      if ((pwTypeSpecialCharacters != 'y') && (pwTypeSpecialCharacters != 'n')){
        window.alert("Error: Invalid entry. Must be 'y' or 'n'.");
        getCharacterTypeSpecialCharacters();
      }
    }
    
    getCharacterTypeLowerCase();
    getCharacterTypeUpperCase();
    getCharacterTypeNumeric();
    getCharacterTypeSpecialCharacters();
    // THEN my input should be validated and at least one character type should be selected
    if ((pwTypeLowercase == "n") && (pwTypeUppercase == "n") && (pwTypeNumeric == "n") && (pwTypeSpecialCharacters == "n")) {
      window.alert("You must chose at least one character type.");
      getCharacterTypes();
    }

  }

  // create random password length
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min); 
  }

  getPasswordLength();
  getCharacterTypes();

  var pwLength = getRandomArbitrary(pwMinLength, pwMaxLength);
  console.log(`Min is ${pwMinLength}. Max is ${pwMaxLength}. Password length is ${pwLength}.`);

  // create random password length
  function createPassword(length) {
    console.log(`${pwTypeLowercase}`);
    console.log('run');
    var characters = '';

    if (pwTypeLowercase == "y"){
      characters += ('abcdefghijklmnopqrstuvwxyz');
    }
    if (pwTypeUppercase == "y"){
      characters += ('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }
    if (pwTypeSpecialCharacters == "y"){
      characters += ('~!@#$%^&*_+?');
    }
    if (pwTypeNumeric == "y"){
      characters += ('0123456789');
    }
    console.log(`characters are ${characters}`);

    var result = '';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(`results are ${result}`);
    return result;
  }

  return createPassword(pwLength);
}