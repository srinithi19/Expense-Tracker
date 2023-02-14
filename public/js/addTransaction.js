var addTransactionBtn = document.getElementById("add-transactions-button");
var transHistoryEl = document.getElementById("transactions-partial");
var newTransFormEl = document.getElementById("newTransForm");
var postTransaction  = document.getElementById("postTransaction")
var newBudgetEl = document.getElementById("newBudgetForm"); 

const replaceForm = () => {
    transHistoryEl.style.display = "none";
    newTransFormEl.style.display = "inline";
    newBudgetEl.style.display = "none";

};

const submitFormHandler = async (event) => {
  event.preventDefault();
    const date = document.getElementById("transDate").value;
    const category = document.querySelector( 'input[name="category"]:checked').value;
    const subCategory = document.getElementById("transSubCat").value.trim();
    const desc = document.getElementById("transDesc").value.trim();
    const amt = document.getElementById("transAmount").value.trim();
    console.log(date +  category + subCategory + desc + amt)
    if (date && category && subCategory && desc && amt) {
      const response = await fetch("/api/transaction/addTransaction", {
        method: "POST",
        body: JSON.stringify({ date, category, subCategory, desc, amt }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/profile");
      } else {
        alert("Failed to post a transaction.");
      }
    } else {
      return alert('Please enter the details');
    }
  };


addTransactionBtn.addEventListener("click", replaceForm);
postTransaction.addEventListener("click", submitFormHandler);
