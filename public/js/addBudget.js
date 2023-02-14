const amountInput = document.getElementById('budgetAmount');
const editBudgetButton = document.getElementById('editBudgetBtn');
const setBudgetButton = document.getElementById('setBudgetBtn');
var transHistoryEl = document.getElementById("transactions-partial");
var newBudgetEl = document.getElementById("newBudgetForm"); 
var setBudgetBtn = document.getElementById("set-budget-button"); 
var newTransFormEl = document.getElementById("newTransForm");

const replaceForm2 = () => {
  transHistoryEl.style.display = "none";
  newTransFormEl.style.display = "none";
  newBudgetEl.style.display = "inline";
};

const editBudget = async (event) => {
  event.preventDefault();
  const amount = amountInput.value;

  if (!amount) {
    return alert('Please enter an amount');
  }
  if (amount <= 0) {
    return alert('Budget must be 1 or greater');
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
    alert('An error occurred while trying to add the budget');
  }
};

const setBudget = async (event) => {
  event.preventDefault();
  const amount = amountInput.value;

  if (!amount) {
    return alert('Please enter an amount');
  }

  try {
    const response = await fetch('/api/budget/add', {
      method: 'POST',
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
    alert('An error occurred while trying to add the budget');
  }
};



editBudgetButton.addEventListener('click', editBudget);
setBudgetButton.addEventListener('click', setBudget);
setBudgetBtn.addEventListener('click', replaceForm2);