function calculateTime(password) {
  var password = document.getElementById("input").value;
  var base = 0;
  var totalTime = 0;
  let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  let numbers = /[0-9]+/;
  let upperCaseAlpha = /^[A-Z]+/;
  let lowerCaseAlpha = /^[a-z]+/;
  if (specialCharacters.test(password)) {
    base = 93;
  } else if (numbers.test(password)) {
    base = 62;
  } else if (upperCaseAlpha.test(password)) {
    base = 52;
  } else if (lowerCaseAlpha.test(password)) {
    base = 26;
  }
  totalTime = Math.pow(base, password.length);
  switch (true) {
    case totalTime > 1 * Math.pow(10, 6) && totalTime < 6 * Math.pow(10, 10):
      var result =
        Number.parseFloat(totalTime / (1 * Math.pow(10, 9))).toPrecision(2) +
        " Seconds";
      document.getElementById("result").innerHTML = result;
      document.getElementById("input").style.background = "#FF7000";
      break;
    case totalTime > 6 * Math.pow(10, 10) && totalTime < 3.6 * Math.pow(10, 12):
      var result =
        Number.parseFloat(totalTime / (6 * Math.pow(10, 10))).toPrecision(2) +
        " Minutes";
      document.getElementById("result").innerHTML = result;
      document.getElementById("input").style.background = "#FF9700";
      break;
    case totalTime > 3.6 * Math.pow(10, 12) &&
      totalTime < 8.64 * Math.pow(10, 13):
      var result =
        Number.parseFloat(totalTime / (3.6 * Math.pow(10, 12))).toPrecision(2) +
        " Hours";
      document.getElementById("result").innerHTML = result;
      document.getElementById("input").style.background = "#FFC100";
      break;
    case totalTime > 8.64 * Math.pow(10, 13) &&
      totalTime < 3.154 * Math.pow(10, 16):
      var result =
        Number.parseFloat(totalTime / (8.64 * Math.pow(10, 13))).toPrecision(
          3
        ) + " Days";
      document.getElementById("result").innerHTML = result;
      document.getElementById("input").style.background = "#DFDF02";
      break;
    case totalTime > 3.154 * Math.pow(10, 16) &&
      totalTime < 3.154 * Math.pow(10, 18):
      var result =
        Number.parseFloat(totalTime / (3.154 * Math.pow(10, 16))).toPrecision(
          2
        ) + " Years";
      document.getElementById("result").innerHTML = result;
      document.getElementById("input").style.background = "#AAFF00";
      break;
    case totalTime > 3.154 * Math.pow(10, 18):
      totalTime = Number.parseFloat(
        totalTime / (3.154 * Math.pow(10, 18))
      ).toFixed();
      if (totalTime < 1.0 * Math.pow(10, 20)) {
        var result =
          totalTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
          " Centuries";
        document.getElementById("result").innerHTML = result;
        document.getElementById("input").style.background = "#17FF00";
      } else {
        var result = "Infinity!";
        document.getElementById("result").innerHTML = result;
        document.getElementById("input").style.background = "#008b2c";
      }
      break;
    default:
      var result =
        totalTime.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " Nanoseconds";
      document.getElementById("result").innerHTML = result;
      document.getElementById("input").style.background = "#FF0000";
      break;
  }
}
function readData(password, dictionary) {
  var result = document.getElementById("result");
  var found = false;
  for (var i in dictionary) {
    if (password === dictionary[i]) {
      found = true;
      var result = "Your password is in the dictionary!";
      document.getElementById("result").innerHTML = result;
    }
  }
  if (!found) {
    calculateTime(password);
  }
}
function bruteForce() {
  var password = document.getElementById("input").value;
  var result = document.getElementById("result");
  var commonPasswords;
  fetch("commonPasswords.json")
    .then((response) => response.json())
    .then((success) => readData(password, success));
}
