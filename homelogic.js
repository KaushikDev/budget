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

const signout = document.getElementById("signoutButton");


const budgetTitleBox = document.getElementById("budgetTitleBox");
const budgetAmountBox = document.getElementById("budgetAmountBox");
const saveBudgetButton = document.getElementById("saveBudgetButton");


const budgetAmount = document.getElementById("budgetAmount");
const expenseAmount = document.getElementById("expenseAmount");	
const balanceAmount = document.getElementById("balanceAmount");	
const budgetButton = document.getElementById("budgetButton");
		
const expenseNameBox = document.getElementById("expenseNameBox");
const expenseAmountBox = document.getElementById("expenseAmountBox");
const expenseAddButton = document.getElementById("expenseAddButton");

const storageRef = firebase.storage().ref();
var databaseRef = firebase.database().ref();

var totalExpenseAmount = 0;	
var totalBalanceAmount = 0;

var currentuser;
var uid;
var displayName;
var email;
var emailVerified;
var photoURL;
var isAnonymous;
var providerData;

const userDisplayPicture = document.getElementById("userDisplayPicture");
const userDisplayName = document.getElementById("userDisplayName");


var provider = new firebase.auth.GoogleAuthProvider();
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	

 //++++++++++++++++++++Retrieving Budgets++++++++++++++++++++++++++++++++++++++++++
				
				firebaseRetrieveBudgetRef = databaseRef.child("BudgetManager/users/"+uid);
								
				
				firebaseRetrieveBudgetRef.on("child_added", snapshotBudget =>{
				retrievedBudgetData = snapshotBudget.val();
				
							console.log("retrieved budget data is : "+retrievedBudgetData);
		
					$("#budgetList").append("<div style='border-style:solid;border-color:white;border-width:1px;border-radius:5px;margin-bottom:3px;'><div class='row'>	<div class='col-xs-12'><p>Title: "+retrievedBudgetData.BudgetTitle+"</p><p>Amount: "+retrievedBudgetData.BudgetAmount+"</p><p>Entry Time: "+retrievedBudgetData.Timestamp+"</p></div></div><div class='row'><div class='col-xs-12'><i style='margin:5px 30px;font-size:25px;color:red;' class='fa fa-trash' aria-hidden='true'></i><i style='margin:5px 30px;font-size:25px;' class='fa fa-pencil' aria-hidden='true'></i></div></div></div>");
					});

/* SHOULD USE IT WHEN REDIRECTION WORKS SUCCESSFULY ON AUTHSTATECHANGED. IE NO PAGE RELOADING.
    //+++++++++++Retrieving Expenses++++++++++++++++++++++++++++++++
					
				firebaseRetrieveExpenseRef = databaseRef.child("ExpenseDashboard");
								
				
				firebaseRetrieveExpenseRef.on("child_added", snapshotExpense =>{
				retrievedExpenseData = snapshotExpense.val();
				
							
				totalExpenseAmount = totalExpenseAmount + parseInt(retrievedExpenseData.ExpenseAmount);
				expenseAmount.innerHTML = '<i class="fa fa-inr" aria-hidden="true"></i>' + " " + totalExpenseAmount;
				
				console.log("total budgetamount is : "+ parseInt(budgetAmount.value));
				
				totalBalanceAmount = parseInt(budgetAmount.value) - totalExpenseAmount;
				balanceAmount.innerHTML = '<i class="fa fa-inr" aria-hidden="true"></i>' + " " + totalBalanceAmount;
			
					$("#expenseList").append("<div style='border-style:solid;border-color:white;border-width:1px;border-radius:5px;margin-bottom:3px;'><div class='row'>	<div class='col-xs-12'><p>Amount: "+retrievedExpenseData.ExpenseAmount+"</p><p>Expense: "+retrievedExpenseData.ExpenseTitle+"</p><p>Entry Time: "+retrievedExpenseData.Timestamp+"</p></div></div><div class='row'><div class='col-xs-12'><i style='margin:5px 30px;font-size:25px;color:red;' class='fa fa-trash' aria-hidden='true'></i><i style='margin:5px 30px;font-size:25px;' class='fa fa-pencil' aria-hidden='true'></i></div></div></div>");	
					});
					
*/
					
				
					
	//+++++++++++Storing New Expense+++++++++++++++++++++++++++
		$("#expenseAddButton").on("click", function(){
			var dtOfExpense = new Date();
			var timeStampExpense = dtOfExpense.toLocaleString();
			
			if(budgetAmount.value=="0"){
				alert("Please add your 'Budget Amount' from Budget icon");
			}
			else if(expenseNameBox.value==""){
				alert("Please mention 'Expense Title'");
			}
			else if(expenseAmountBox.value==""){
				alert("Please mention 'Expense Amount'");
			}
			else{
			  firebaseStoreExpenseRef = databaseRef.child("ExpenseDashboard/");
			  firebaseStoreExpenseRef.push({ExpenseTitle:expenseNameBox.value, ExpenseAmount:expenseAmountBox.value, Timestamp:timeStampExpense});
			  
			   expenseNameBox.value="";
			   expenseAmountBox.value="";   
			  
			  }
			
		});	

    
  

//+++++++++++++++++++++++++++Logout++++++++++++++++++++++++++++++++++++++++++++++++				
		if(signout){
             signout.addEventListener('click', e=>{
		  
			 promise = firebase.auth().signOut().then(function(){
				if(confirm("Do you wish to leave?")){
				 window.location = "index.html";
			 }	
					 });
		      promise.catch(e => 
	                console.log(e.message))
			});
		 }
//+++++++++++++++++++++++++Add budget button+++++++++++++++++++++++++++++++++++++++++++++++++++	
		if(saveBudgetButton){
             saveBudgetButton.addEventListener('click', e=>{
			var budgetAddDate = new Date();
			var timeStampBudgetAdd = budgetAddDate.toLocaleString();
			
			if(budgetTitleBox.value==""){
				alert("Please mention 'Budget Title'");
			}
			else if(budgetAmountBox.value==""){
				alert("Please mention 'Budget Amount'");
			}
			else{
			  firebaseStoreExpenseRef = databaseRef.child("BudgetManager/users/"+uid);
			  firebaseStoreExpenseRef.push({BudgetTitle:budgetTitleBox.value, BudgetAmount:budgetAmountBox.value, Timestamp:timeStampBudgetAdd});
			  
			   budgetTitleBox.value="";
			   budgetAmountBox.value="";   
			  
			  }
			 
			});
		 }
//++++++++++++++++++++++++++OnAUthStateChanges on home page++++++++++++++++++++++++++++++++++++++++++++	
	
	firebase.auth().onAuthStateChanged(firebaseUser =>{
		
		currentuser = firebase.auth().currentUser;
		if(firebaseUser){
			//window.location = "home2.html";
			displayName = firebaseUser.displayName;
			email = firebaseUser.email;
			emailVerified = firebaseUser.emailVerified;
			photoURL = firebaseUser.photoURL;
			isAnonymous = firebaseUser.isAnonymous;
			uid = firebaseUser.uid;
			providerData = firebaseUser.providerData;
			
			console.log("dispayName : "+displayName+"\n email : "+email+"\n emailVerified : "+emailVerified+"\n photoURL : "+photoURL+"\n isAnonymous : "+isAnonymous+"\n uid : "+uid+"\n providerData : "+providerData);
			
			
			//--User Profile Specific Operations------
				userDisplayPicture.src = photoURL;
				userDisplayName.innerHTML = "Welcome, \n"+ displayName;
			
			//-------------Retrieving Budgets---------
				
				firebaseRetrieveBudgetRef = databaseRef.child("BudgetManager/users/"+uid);
								
				
				firebaseRetrieveBudgetRef.on("child_added", snapshotBudget =>{
				retrievedBudgetData = snapshotBudget.val();
				
							console.log("retrieved budget data is : "+retrievedBudgetData);
		
					$("#budgetList").append("<div class='row'><div class='column'><div class='card'><h3>Budget Title : "+retrievedBudgetData.BudgetTitle+"</h3><h4 class='price'>Budget Amount : <i class='fa fa-inr' id='budget' aria-hidden='true'></i>"+retrievedBudgetData.BudgetAmount+"</h4><h4>Total Expense Till Date : 5000</h4><h4>Total Balance : 2000</h4><h4><button class='btn btn-info'>View Expense History</button></h4><h4><button class='btn btn-primary'>Add New Expense</button></h4></div></div></div>");
					});
					
			//---------------------------------------		
			}
		else{
			console.log("Firebase User is not logged in");
		}
		
	});
	

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
	
 

	


