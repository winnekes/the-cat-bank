

// change visibility of elements depending on login status
function contentNav() {
	toggleVisibility("signedOut");
	var eleForms = document.getElementById("forms");
	eleForms.style.display = "none";
}

// show a different form for each action (either a sign in or a sign up form)
function toggleContent(action) {
	var eleSignUpForm = document.getElementById("signUpForm");
	var eleSignInForm = document.getElementById("signInForm");
	var eleForms = document.getElementById("forms");

	var eleContent = document.getElementById("content");

	if(action == "signIn") {
		eleForms.style.display = "";
		eleSignInForm.style.display = "";
		eleSignUpForm.style.display = "none";
		eleContent.innerHTML = "";

	}
	else if(action == "signUp") {
		eleForms.style.display = "";
		eleSignUpForm.style.display = "";
		eleSignInForm.style.display = "none";
		eleContent.innerHTML = "";

	}
}

var users = [];

// syntax for user structure
function User(firstName, lastName, email, password) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
}

// take user's input and create a new user, but checks if the user's mail is not already in the system
function signUp(form) {

	var eleContent = document.getElementById("content");

    if(users.some(user => user.email === form.email.value)) {
        eleContent.innerHTML = "<h1>Oops!</h1><br /> A user account with this email address already seems to exist. <br />Did you already sign up? Then please <a href='#' onclick=toggleContent('signIn')>sign in</a>!";
    } 
    else {
    	toggleVisibility("signedIn");
        eleContent.innerHTML = "<h1>You are signed up and signed in!</h1><br />";
        	var user = new User(form.firstName.value, form.lastName.value, form.email.value, form.password.value);
			users.push(user);
			console.log(users);
    }
}

function signIn(form) {

	var eleContent = document.getElementById("content");
	var eleSignedIn = document.getElementsByClassName("signedIn");
	var eleSignedOut = document.getElementsByClassName("signedOut");

    if(users.some(user => user.email === form.email.value && user.password === form.password.value)) {
        toggleVisibility("signedIn");
        eleContent.innerHTML = "<h1>You are signed in!</h1><br />";

   	}
    else {
    	eleContent.innerHTML = "<h1>Oops!</h1><br /> Please check your input, wrong email address or wrong password.";
    }

}

function toggleVisibility(state) {
	var eleSignedIn = document.getElementsByClassName("signedIn");
	var eleSignedOut = document.getElementsByClassName("signedOut");

	if(state == "signedIn") {

        for(var i = 0; i < eleSignedIn.length; i++) {
        	eleSignedIn[i].style.display = "";     	
        }
        for(var i = 0; i < eleSignedOut.length; i++) {
        	eleSignedOut[i].style.display = "none";     	
        }
	}

	else if (state =="signedOut") {
		        for(var i = 0; i < eleSignedOut.length; i++) {
        	eleSignedOut[i].style.display ="";     	
        }
        for(var i = 0; i < eleSignedIn.length; i++) {
        	eleSignedIn[i].style.display = "none";     	
        }

	}
}