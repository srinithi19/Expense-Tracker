
var ctx = document.getElementById("chart").getContext('2d');

var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [ "Expense","Income"],
        datasets: [{    
            data: [500,1404], // Specify the data values array
         
            borderColor: ['#f443368c','#00968896'], // Add custom color border
            backgroundColor: ['#f443368c', '#00968896'], // Add custom color background (Points and Fill)
            borderWidth: 2 // Specify bar border width
        }]},        
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
    }
});