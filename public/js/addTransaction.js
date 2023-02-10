var addTransactionBtn = document.getElementById("add-transactions-button");
var transHistoryEl = document.getElementById("transactions-partial");
var newTransFormEl = document.getElementById("newTransForm");
var postTransaction  = document.getElementById("postTransaction")

const replaceForm = () => {
    transHistoryEl.style.display = "none";
    newTransFormEl.style.display = "inline";
};

const submitFormHandler = async (event) => {
  event.preventDefault();
  console.log("---------IN CREATE________")
    const date = document.getElementById("transDate").value;
    const category = document.querySelector( 'input[name="category"]:checked').value;
    const subCategory = document.getElementById("transSubCat").value.trim();
    const desc = document.getElementById("transDesc").value.trim();
    const amt = document.getElementById("transAmount").value.trim();
    console.log(date +  category + subCategory + desc + amt)
    if (title && content) {
      const response = await fetch("/api/transaction/addTransaction", {
        method: "POST",
        body: JSON.stringify({ date, category, subCategory, desc, amt }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to post a transaction.");
      }
    }
  };


addTransactionBtn.addEventListener("click", replaceForm);
postTransaction.addEventListener("click", submitFormHandler);
