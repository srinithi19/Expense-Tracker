var newChallengeEl = document.getElementById("newChallengeForm"); 
var setChallengeBtn = document.getElementById("add-challenge-btn"); 

const replaceForm = () => {
    newChallengeEl.style.display = "inline";
};


setChallengeBtn.addEventListener('click', replaceForm);