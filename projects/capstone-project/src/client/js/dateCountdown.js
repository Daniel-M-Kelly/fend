function dateCountdown(formDate) {
  const countDownDate = new Date(formDate).getTime();
  console.log(`Caluculating countdown to date ${formDate}`)
//Update the count down every 1 second
//const x = setInterval(function() {
  // Get today's date and time
  let now = new Date().getTime();

  // Find the distance between now and the count down date
  let distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));

  console.log(`Days remaining until trip ${days}`)
  // Display the result in the element with id="countdown"
  document.getElementById("countdown").innerHTML = days + "d ";

  // If the count down is finished, write some text
  if (distance < 0) {
    //clearInterval(x);
    document.getElementById("countdown").innerHTML = "Vacation Time!";
  }
//}, 1000);
};

//Export function to include in index.js
export { dateCountdown }
