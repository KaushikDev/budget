 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDo7D--UlZBdgHa68bHVWvE8MwH9Ngwrp4",
    authDomain: "budget-a49fd.firebaseapp.com",
    databaseURL: "https://budget-a49fd.firebaseio.com",
    projectId: "budget-a49fd",
    storageBucket: "budget-a49fd.appspot.com",
    messagingSenderId: "989527949965"
  };
 
 firebase.initializeApp(config);

//===============================================================================================

const googleAuth = document.getElementById("googleAuth");

var provider = new firebase.auth.GoogleAuthProvider();

  
//+++++++++++++++++++Login with Google++++++++++++++++++++++++++++++++++++++++++++++++		
	if(googleAuth){
		 googleAuth.addEventListener('click', e=>{

			firebase.auth().signInWithPopup(provider).then(function(result) {	 
		
			// This gives you a Google Access Token. You can use it to access the Google API.
  			var token = result.credential.accessToken;
			// The signed-in user info.
			  var user = result.user;
			  
			  console.log("access token is : " + token);
			  console.log("user is : " + user);

		
			}).catch(function(error) {
 			 // Handle Errors here.
			 console.log(error);
 			 var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
 			 // The firebase.auth.AuthCredential type that was used.
  			var credential = error.credential;
  			// ...
			});
		 });
		
		}


//++++++++++++++++++++++++++OnAUthStateChanges++++++++++++++++++++++++++++++++++++++++++++	
	
	firebase.auth().onAuthStateChanged(firebaseUser =>{
		
		if(firebaseUser){
			window.location = "home.html";
		}
		else{
			console.log("Firebase User is not logged in");
		}
		
	});
	

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
	
 

	


