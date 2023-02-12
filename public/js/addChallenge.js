var newChallengeEl = document.getElementById("newChallengeForm"); 
var setChallengeBtn = document.getElementById("add-challenge-btn"); 
var updateChallengeBtn = document.getElementById("update-challenge-btn"); 


const replaceForm = () => {
    newChallengeEl.style.display = "inline";
};

const updateChallenge = async(event) => {
console.log("in ");
event.preventDefault();
const badge = true;
try {
    const response = await fetch('/api/challenge/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ badge }),
    });
    
    if (response.ok) {
      document.location.replace("/challenges");
    }
    if (!response.ok) {
      throw new Error('Failed to update challenge');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred while trying to update challenge');
  }
}



setChallengeBtn.addEventListener('click', replaceForm);
updateChallengeBtn.addEventListener('click', updateChallenge);