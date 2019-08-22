
// depending on the user's status show different content.
// possible states: signedIn, signedOut, signingOut
function toggleVisibility(state) {

	var eleSignedIn = document.getElementsByClassName("signedIn");
	var eleSignedOut = document.getElementsByClassName("signedOut");
	var eleSigningOut = document.getElementById("signingOut");

	var eleWelcome = document.getElementById("welcome");
	var eleWelcomeUser = document.getElementById("welcome-user");

	var eleUserForms = document.getElementById("userForms");
	var eleSignUpForm = document.getElementById("signUpForm");
	var eleSignInForm = document.getElementById("signInForm");

	var eleErrorUserExists = document.getElementById("error-user-exists");
	var eleErrorLoginFailed = document.getElementById("error-login-failed");
	var eleErrorBalanceNeg = document.getElementById("error-balance-negative");

	var eleAccountDetails = document.getElementById("account-details");
	var eleBalanceDepositForm = document.getElementById("balanceDepositForm");
	var eleBalanceWithdrawForm = document.getElementById("balanceWithdrawForm");

	switch(state) {
		case "signedIn":
			eleAccountDetails.classList.add("invisible");
			eleBalanceDepositForm.classList.add("invisible");
			eleBalanceWithdrawForm.classList.add("invisible");

	        for(var i = 0; i < eleSignedIn.length; i++) {
	        	eleSignedIn[i].style.display = "";     	
	        }
	        for(var i = 0; i < eleSignedOut.length; i++) {
	        	eleSignedOut[i].style.display = "none";     	
	        }

			break;

		case "signedOut":

			for(var i = 0; i < eleSignedOut.length; i++) {
	        	eleSignedOut[i].style.display = "";     	
	        }
	        for(var i = 0; i < eleSignedIn.length; i++) {
	        	eleSignedIn[i].style.display = "none";     	
	        }
	    	break;

	    case "signingOut":
	        eleSigningOut.classList.remove("invisible");
	        eleWelcome.classList.remove("invisible");
	        eleUserForms.classList.add("invisible");

	        for(var i = 0; i < eleSignedIn.length; i++) {
	        	eleSignedIn[i].style.display = "none";     	
	        }
	 		for(var i = 0; i < eleSignedOut.length; i++) {
	        	eleSignedOut[i].style.display ="";     	
	        }
	 	   break;

		case "signingIn":
			toggleVisibility("signedOut");

			eleSigningOut.classList.add("invisible");
			eleWelcome.classList.add("invisible");
			eleUserForms.classList.remove("invisible");
    		eleErrorLoginFailed.classList.add("invisible");

			eleSignInForm.style.display = "";
			eleSignUpForm.style.display = "none";
			break;

		case "signingUp":
			toggleVisibility("signedOut");
	        eleSigningOut.classList.add("invisible");
			eleWelcome.classList.add("invisible");
			eleUserForms.classList.remove("invisible");
    		eleErrorLoginFailed.classList.add("invisible");

			eleSignUpForm.style.display = "";
			eleSignInForm.style.display = "none";
			break;

		case "account":
			toggleVisibility("signedIn");
			eleWelcomeUser.classList.add("invisible");
			eleAccountDetails.classList.remove("invisible");
			eleBalanceDepositForm.classList.add("invisible");
			eleBalanceWithdrawForm.classList.add("invisible");	
			break;

		case "balance-deposit":
			toggleVisibility("signedIn");
			eleWelcomeUser.classList.add("invisible");
			eleAccountDetails.classList.add("invisible");
			eleBalanceDepositForm.classList.remove("invisible");
			eleBalanceWithdrawForm.classList.add("invisible");
			eleErrorBalanceNeg.classList.add("invisible");	
			break;

		case "balance-withdraw":
			toggleVisibility("signedIn");
			eleWelcomeUser.classList.add("invisible");
			eleAccountDetails.classList.add("invisible");
			eleBalanceDepositForm.classList.add("invisible");
			eleBalanceWithdrawForm.classList.remove("invisible");	
			eleErrorBalanceNeg.classList.add("invisible");	
			break;
	}
}

var userList = {};
var currentUser = {};
var currency = "€";

// setting up the user structure
function User(firstName, lastName, email, password, balance) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.balance = 0; 
 }


// take user's input and create a new user
function signUp(form) {

	var eleErrorUserExists = document.getElementById("error-user-exists");
	
	// check if the user is already signed up 
    if(userList[form.email.value]) {
    	eleErrorUserExists.classList.remove("invisible");
    } 

    // create a new user and add it to the bank's user list
    else {
    	var user = new User(form.firstName.value, form.lastName.value, form.email.value, form.password.value);
		userList[form.email.value] = user;

		// sign in the user in immediately after signing up
  		signIn(form);
		checkBalance();
    }
}

function signIn(form) {

	var eleWelcomeUser = document.getElementById("welcome-user");

	var eleErrorLoginFailed = document.getElementById("error-login-failed");

    if((!userList[form.email.value]) || (userList[form.email.value]['password'] === !form.password.value)) {
		eleErrorLoginFailed.classList.remove("invisible");
	} 
		
    else {
		eleWelcomeUser.classList.remove("invisible");
		toggleVisibility("signedIn");
		currentUser = userList[form.email.value];
		setFieldsData(currentUser);
		console.log(currentUser)
	}
}

function setFieldsData(currentUser) {

	var eleFirstName = document.getElementsByClassName("dtFirstName");
	var eleLastName = document.getElementsByClassName("dtLastName");	
	var eleWholeName = document.getElementsByClassName("dtWholeName");
	var eleEmail = document.getElementsByClassName("dtEmail");
	var eleBalance = document.getElementsByClassName("dtBalance");

	for(i = 0; i<eleBalance.length;i++) {
		eleBalance[i].innerHTML = currentUser.balance.toFixed(2) + currency; 
	}

	for(i = 0; i<eleWholeName.length;i++) {
		eleWholeName[i].innerHTML = currentUser.firstName + " " + currentUser.lastName;
	}

	for(i = 0; i<eleFirstName.length;i++) {
		eleFirstName[i].innerHTML = currentUser.firstName;
	}

	for(i = 0; i<eleLastName.length;i++) {
		eleLastName[i].innerHTML = currentUser.lastName;
	}

	for(i = 0; i<eleEmail.length;i++) {
		eleEmail[i].innerHTML = currentUser.email;
	}

	for(i = 0; i<eleBalance.length;i++) {
		eleBalance[i].innerHTML = currentUser.balance.toFixed(2) + currency; 
	}
}

// deposi a given amount into the user's account
function balanceDeposit(form) {

	var eleBalance = document.getElementsByClassName("dtBalance");

	amount = parseFloat(form.amount.value);
	
	if(amount >= 500) {
		console.log("You have deposited " + amount + currency + ". Where are you getting all this cash from?");
	}

	currentUser.balance += amount;

	for(i = 0; i<eleBalance.length;i++) {
		eleBalance[i].innerHTML = currentUser.balance.toFixed(2) + currency; 
	}
	checkBalance();
}

// let user withdraw a given amount from his account (if his balance will stay >= 0)
function balanceWithdraw(form) {

	var eleBalance = document.getElementsByClassName("dtBalance");
	var eleErrorBalanceNeg = document.getElementById("error-balance-negative");
	var eleBalanceWithdrawForm = document.getElementById("balanceWithdrawForm");

	amount = parseFloat(form.amount.value);

	if(currentUser.balance - amount < 0) {
		eleErrorBalanceNeg.classList.remove("invisible");
		eleBalanceWithdrawForm.classList.add("invisible");	
	}

	else {
		if(amount >= 500) {
			console.log("You have withdrawn " + amount + currency + ". Please be aware of your shopping addiction.");
		}

		currentUser.balance -= amount;

		for(i = 0; i < eleBalance.length; i++) {
			eleBalance[i].innerHTML = currentUser.balance.toFixed(2) + currency; 
		}
	}
	checkBalance();
}

function checkBalance() {
	console.log(currentUser);
	if(currentUser.balance < 100) {
		console.log("Please note that you have less than 100" + currency + " in your account, you have exactly " + currentUser.balance + currency + " available to you.");
	} 
}