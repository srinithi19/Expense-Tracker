var newChallengeEl = document.getElementById("newChallengeForm"); 
var setChallengeBtn = document.getElementById("add-challenge-btn"); 
var updateChallengeBtn = document.getElementById("update-challenge-btn"); 


const replaceForm = () => {
    newChallengeEl.style.display = "inline";
};


const submitFromHandler = async (event) => {
  event.preventDefault();
  const content = document.getElementById('challengeText').value;

  if(content){
    const response = await fetch('/api/challenge/addChallenge', {
        method: "POST",
        body: JSON.stringify({content}),
        headers: { "Content-Type": "application/json" }
    });
    if(response.ok){
      document.location.replace("/challenges");
    } else {

      alert("Failed to add Challenge.")
    }
  } else {
    let messageContainer = getElementById('#message-container')
      let message = document.createElement("div")
      message.innerHTML = 'Please enter a Challenge';
      messageContainer.append(message)
  }
}



const updateChallenge = async(event) => {
event.preventDefault();
const id = event.target.getAttribute('data-id');
const badge = true;
try {
    const response = await fetch(`/api/challenge/update/${id}`, {
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

if(document.querySelectorAll('.update-button'))
document.querySelectorAll('.update-button').forEach((updateButton) => {
    updateButton.addEventListener('click', updateChallenge);
  });

setChallengeBtn.addEventListener('click', replaceForm);
newChallengeEl.addEventListener('click', submitFromHandler);

