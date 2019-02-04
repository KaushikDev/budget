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
const cancelBudgetButton = document.getElementById("cancelBudgetButton");
const cancelExpenseButton = document.getElementById("cancelExpenseButton");

const budgetTitleBox = document.getElementById("budgetTitleBox");
const budgetAmountBox = document.getElementById("budgetAmountBox");
const saveBudgetButton = document.getElementById("saveBudgetButton");


const expenseTitleBox = document.getElementById("expenseTitleBox");
const expenseAmountBox = document.getElementById("expenseAmountBox");
const saveExpenseButton = document.getElementById("saveExpenseButton");

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

		
					
//+++++++++++++++++++++++++++Logout from the application++++++++++++++++++++++++++++++++++++++++++++++++				
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
		 
//+++++++++++++++++++++++++++Cancelling the addition of budget operation++++++++++++++++++++++++++++++++++++++++++++++++				
		if(cancelBudgetButton){
             cancelBudgetButton.addEventListener('click', e=>{
				
			budgetTitleBox.value="";
			   budgetAmountBox.value="";  
			});
		 }		 
//+++++++++++++++++++++++++++Cancelling the addition of expense operation++++++++++++++++++++++++++++++++++++++++++++++++				
		if(cancelExpenseButton){
             cancelExpenseButton.addEventListener('click', e=>{
				
			expenseTitleBox.value="";
			   expenseAmountBox.value=""; 
			});
		 }		 
//+++++++++++++++++++++++++Adding budgets +++++++++++++++++++++++++++++++++++++++++++++++++++	
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
			  firebaseStoreBudgetRef = databaseRef.child("BudgetManager/users/"+uid+"/Budgets/");
			  firebaseStoreBudgetRef.push({BudgetTitle:budgetTitleBox.value, BudgetAmount:budgetAmountBox.value, BudgetTimestamp:timeStampBudgetAdd});
			  
			   budgetTitleBox.value="";
			   budgetAmountBox.value="";   
			   $('#addBudgetModal').modal('hide');
			  }
			 
			});
		 }
//+++++++++++++++++++++++++Adding Expenses +++++++++++++++++++++++++++++++++++++++++++++++++++	
		if(saveExpenseButton){
             saveExpenseButton.addEventListener('click', e=>{
			var expenseAddDate = new Date();
			var timeStampExpenseAdd = expenseAddDate.toLocaleString();
			
			if(expenseTitleBox.value==""){
				alert("Please mention 'Expense Title'");
			}
			else if(expenseAmountBox.value==""){
				alert("Please mention 'Expense Amount'");
			}
			else{
			  firebaseStoreExpenseRef = databaseRef.child("BudgetManager/users/"+uid+"/Budgets/"+expenseID+"/Expenses");
			  firebaseStoreExpenseRef.push({ExpenseTitle:expenseTitleBox.value, ExpenseAmount:expenseAmountBox.value, ExpenseTimestamp:timeStampExpenseAdd});
			  
			   expenseTitleBox.value="";
			   expenseAmountBox.value="";   
			  $('#addExpenseModal').modal('hide');
			  }
			 
			});
		 }

//++++++++++++++++++++++This will happen on click event of a add new expense button++++  
	storeExpense = function(clickedID){
		console.log("The clicked expense button's id is : "+clickedID);
		expenseID = clickedID;
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
				
				firebaseRetrieveBudgetRef = databaseRef.child("BudgetManager/users/"+uid+"/Budgets");
								
				
				firebaseRetrieveBudgetRef.on("child_added", snapshotBudget =>{
				retrievedBudgetData = snapshotBudget.val();
				retrievedBudgetKey = snapshotBudget.key;
					
					console.log("retrieved budget data is : "+retrievedBudgetData);
					console.log("retrieved budget key is : "+retrievedBudgetKey);
					
					
					//+++++++++testing expenses under a particular budget
					
										numOfExpenses = snapshotBudget.child("Expenses").numChildren();	
										console.log("The number of children replies has is : "+numOfExpenses);	
									
										expensesData = snapshotBudget.child("Expenses");
										if(expensesData.exists()){
											var matrix = [];
											var retrievedExpenses = [];
											var htmlStr = "";
											
										expensesData.forEach(function(snapshotExpense) {
											retrievedExpensekey = snapshotExpense.key;
											retrievedExpenseData = snapshotExpense.val();
											console.log("the key from retrievedExpensekey is " + retrievedExpensekey);
											console.log("the expense Title from retrievedExpenseData is " + retrievedExpenseData.ExpenseTitle);
										
											 matrix.push([retrievedExpenseData.ExpenseTitle, retrievedExpenseData.ExpenseAmount, retrievedExpenseData.ExpenseTimestamp]);
										 });
										
										for(var i=0;i<numOfExpenses;i++){
												var string = "["+matrix[i][2]+"] "+matrix[i][0]+" replied: \""+matrix[i][1]+"\"";
												retrievedExpenses.push(string);
												htmlStr = htmlStr+ "<p style='width:100%;'>"+string+"</p>";
											}
											
											console.log(retrievedExpenses);	
											console.log(htmlStr);
										
										}
					//++++++++++testing ends for expenses under a particular budget
					
					$("#budgetList").append("<div class='row'><div class='column'><div class='card'><h3>"+retrievedBudgetData.BudgetTitle+"</h3><h5 class='price'>Budget Amount : <i class='fa fa-inr' aria-hidden='true'></i>"+retrievedBudgetData.BudgetAmount+"</h5><h5>Expense Amount : <i class='fa fa-inr' aria-hidden='true'></i>5000</h5><h5>Balance Amount : <i class='fa fa-inr' aria-hidden='true'></i>2000</h5><h5>Budget Date : "+retrievedBudgetData.BudgetTimestamp+"</h5><h5><button class='btn btn-info'>View Expense History</button></h5><h4><button id="+retrievedBudgetKey+" class='btn btn-primary' data-toggle='modal' data-target='#addExpenseModal' onClick='storeExpense(this.id)'>Add New Expense</button></h5></div></div></div>");
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
	
 

	


