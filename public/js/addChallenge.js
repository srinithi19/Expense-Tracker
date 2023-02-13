var newChallengeEl = document.getElementById("newChallengeForm"); 
var setChallengeBtn = document.getElementById("add-challenge-btn"); 

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
    console.log(response)
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

setChallengeBtn.addEventListener('click', replaceForm);
newChallengeEl.addEventListener('click', submitFromHandler);