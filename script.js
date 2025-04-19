let currentUser = null;

function showTab(tab) {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("coffeeForm").style.display = "none";

  if (tab === "login") document.getElementById("loginForm").style.display = "block";
  else if (tab === "register") document.getElementById("registerForm").style.display = "block";
  else if (tab === "order") {
    if (currentUser) document.getElementById("coffeeForm").style.display = "block";
    else alert("Please login to place an order.");
  }
}

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;
  localStorage.setItem(username, password);
  alert("Registered successfully!");
  showTab("login");
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const storedPassword = localStorage.getItem(username);
  if (storedPassword === password) {
    currentUser = username;
    alert("Login successful!");
    showTab("order");
  } else {
    alert("Invalid username or password.");
  }
});

document.getElementById("coffeeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const coffeeType = document.getElementById("coffeeType").value;
  const payment = document.getElementById("payment").value;
  const message = `Thank you, ${name}! Your ${coffeeType} is being prepared. Payment by ${payment}.`;
  document.getElementById("message").innerText = message;
});
