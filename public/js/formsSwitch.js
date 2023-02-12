const forms = [
   document.getElementById("newTransForm"),
   document.getElementById("newBudget"),
 ];
 
 const replaceForm = () => {
   forms.forEach((form) => {
     form.style.display = "none";
   });
   document.getElementById("newTransForm").style.display = "inline";
 };
 
 const showBudget = () => {
   forms.forEach((form) => {
     form.style.display = "none";
   });
   document.getElementById("newBudget").style.display = "inline";
 };

 setBudgetBtn.addEventListener('click', showBudget);
 addTransactionBtn.addEventListener("click", replaceForm);