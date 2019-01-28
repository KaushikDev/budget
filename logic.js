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
$("document").ready(function(){

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
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
	initApp();
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    function initApp(){
  	
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
					

					
				}
					
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

    
	//+++++++++++++++ budgetButton ++++++++++++++++++++++    

		
		

    	
 });
