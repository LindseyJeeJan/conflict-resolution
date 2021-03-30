// Assignment Code
var generateBtn = document.querySelector("#generate");
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
  var pwMinLength;
  var pwMaxLength;
  var pwLength;
  var pwTypeLowercase;
  var pwTypeUppercase;
  var pwTypeSpecialCharacters;
  var pwTypeNumeric;
  var newPassword;

  function getPasswordLength() {
    function getPasswordMinLength() {
      //   WHEN prompted for the length of the password
      pwMinLength = prompt("Enter minimum number of characters:");
      
      // Make sure number is greater than 0, if not force user to reenter
      if (pwMinLength <= 0 ) {
        window.alert("Error: The minimum length must be greater than 0.");
        getPasswordMinLength();
      } 
    }

    function getPasswordMaxLength() {
      //   WHEN prompted for the maxlength of the password
      pwMaxLength = prompt("Enter maxiumum number of characters:");
    }
    
    // Make sure the maximum is greater than the miminum, if not force user to reenter
    if (pwMinLength > pwMaxLength) {
      window.alert(`Error: The minimum length (${pwMinLength}) must be less than the maximum length.`);
      getPasswordMaxLength();
    }

    getPasswordMinLength();
    getPasswordMaxLength();
  }
  

  function getCharacterTypes() {
    //   Prompt if lowercase letters should be included
    function getCharacterTypeLowerCase() {
      pwTypeLowercase = prompt("Include lowercase letters? (y/n)");
      // Make sure a y or n is entered, if not force user to reenter
      if ((pwTypeLowercase != 'y') && (pwTypeLowercase != 'n')){
        window.alert("Error: Invalid entry. Must be 'y' or 'n'.");
        getCharacterTypeLowerCase();
      }
    }
    
      //   Prompt if uppercase letters should be included
    function getCharacterTypeUpperCase() {
      pwTypeUppercase = prompt("Include uppercase letters? (y/n)");
       // Make sure a y or n is entered, if not force user to reenter
      if ((pwTypeUppercase != 'y') && (pwTypeUppercase != 'n')){
        window.alert("Error: Invalid entry. Must be 'y' or 'n'.");
        getCharacterTypeUpperCase();
      }
    }

      //   Prompt if numbers should be included
    function getCharacterTypeNumeric() {
      pwTypeNumeric = prompt("Include numbers? (y/n)");
       // Make sure a y or n is entered, if not force user to reenter
      if ((pwTypeNumeric != 'y') && (pwTypeNumeric != 'n')){
        window.alert("Error: Invalid entry. Must be 'y' or 'n'.");
        getCharacterTypeNumeric();
      }
    }
    
    // Prompt if special characters should be included
    function getCharacterTypeSpecialCharacters() {
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

  getPasswordLength();
  getCharacterTypes();

  // create random password length
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  pwLength = getRandomInt(pwMinLength, pwMaxLength);
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
    result.replace(/\s/g, "");
    return result;
  }
  // select the new div
  var passwordRules =  document.querySelector("#password-rules");

  // output must or must not text
  function yesOrNo(inputValueYN) {
      if (inputValueYN == "n"){
        return 'MUST NOT';
      } else {
        return 'MUST';
      }
  }

  // determine if the user decided must or must not contain these types
  var lc = yesOrNo(pwTypeLowercase);
  var uc = yesOrNo(pwTypeUppercase);
  var nu = yesOrNo(pwTypeNumeric);
  var sc = yesOrNo(pwTypeSpecialCharacters);

    // write rules to the DOM
  var rules = ('Password rules: <ul>' + 
    '<li>Length must be ' + pwMinLength + '-' + pwMinLength + ' characters.</li>' +
    '<li>' + lc + ' include lower case characters.</li>' +
    '<li>' + uc +' include upper case characters.</li>' +
    '<li>' + nu +' include numbers.</li>' +
    '<li>' + sc +' include special characters.</li>' 
    + '</ul');
  passwordRules.innerHTML += rules;

  return createPassword(pwLength);
}