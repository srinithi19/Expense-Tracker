const amountInput = document.getElementById('budgetAmount');
const addBudgetButton = document.getElementById('addBudgetBtn');
var transHistoryEl = document.getElementById("transactions-partial");
var newBudgetEl = document.getElementById("newBudgetForm"); 
var setBudgetBtn = document.getElementById("set-budget-button"); 
var newTransFormEl = document.getElementById("newTransForm");

const replaceForm2 = () => {
  console.log('===Remove====TransHis')
  transHistoryEl.style.display = "none";
  newTransFormEl.style.display = "none";
  newBudgetEl.style.display = "inline";
};

const handleAddBudget = async (event) => {
  event.preventDefault();
  const amount = amountInput.value;

  if (!amount) {
    return alert('Please enter an amount');
  }

  try {
    const response = await fetch('/api/budget/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    
    if (response.ok) {
      document.location.replace("/profile");
    }
    if (!response.ok) {
      throw new Error('Failed to add budget');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred while trying to add the budget');
  }
};

addBudgetButton.addEventListener('click', handleAddBudget);
setBudgetBtn.addEventListener('click', replaceForm2);