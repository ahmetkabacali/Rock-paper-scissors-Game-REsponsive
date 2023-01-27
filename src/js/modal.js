
const modal = document.getElementById("myModal");
const btn = document.getElementById("rulesBtn");
const span = document.getElementsByClassName("closeRules")[0];

btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



