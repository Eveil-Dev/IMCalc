const buttonCalc = document.getElementById("calc");
const buttonAgain = document.getElementById("again");
const bmiCalcContainer = document.querySelector(".bmi-calc-container");
const bmiResultContainer = document.querySelector(".bmi-result-container");
const bmi = document.getElementById("bmi");
const description = document.getElementById("description");

let mob_view = window.matchMedia("(max-width: 600px)");
let desk_view = window.matchMedia("(min-width: 601px)");

const arrowsHeightInput = document.querySelectorAll(".height-input .arrow");
const heightInput = document.getElementById("height");

const arrowsWeightInput = document.querySelectorAll(".weight-input .arrow");
const weightInput = document.getElementById("weight");

// -> CALC IMC

function calcIMC() {
  let weightInputValue = parseFloat(weightInput.value.replace(",", "."));
  let heightInputValue = parseFloat(heightInput.value.replace(",", "."));

  let result = 0;
  if (heightInputValue > 1) {
    result = weightInputValue / (heightInputValue * heightInputValue);
  } else {
    result =
      (weightInputValue * 1000) /
      (heightInputValue * 100 * (heightInputValue * 100));
  }

  result = Math.round(result * 100) / 100;
  return result;
}

// -> IMC DEFINITION

function imcDefinition(result) {
  let imcDefinition;

  if (result < 18.5) {
    imcDefinition = "Under body weight";
  } else if (result >= 18.5 && result <= 24.9) {
    imcDefinition = "Normal body weight";
  } else if (result >= 25 && result <= 29.9) {
    imcDefinition = "You are over your body weight";
  } else if (result >= 30 && result <= 34.9) {
    imcDefinition = "Grade I obesity";
  } else if (result >= 35 && result <= 39.9) {
    imcDefinition = "Grade II obesity";
  } else {
    imcDefinition = "Morbid obesity";
  }

  return imcDefinition;
}

// -> VALIDATE FIELDS

function validateFields() {
  if (heightInput.value == "0" || weightInput.value == "0") {
    throw new Error("Por favor preencha todos os campos");
  }
}

// -> CALC EVENT LISTENER

buttonCalc.addEventListener("click", function () {
  try {
    validateFields();
    result = calcIMC();
    imcText = imcDefinition(result);
    bmi.innerHTML = result;
    description.innerHTML = `${imcText}`;
    heightInput.value = "0";
    weightInput.value = "0";
    if (mob_view.matches) {
      bmiCalcContainer.classList.add("hidden-calc-container");
      bmiResultContainer.classList.add("show-result-mobile");
    }
  } catch (error) {
    alert(error.message);
  }
});

buttonAgain.addEventListener("click", function () {
  bmiCalcContainer.classList.remove("hidden-calc-container");
  bmiResultContainer.classList.remove("show-result-mobile");
});

// -> INPUT HEIGHT

arrowsHeightInput.forEach(function (arrow) {
  arrow.addEventListener("click", function (e) {
    let currentHeight = parseFloat(heightInput.value);
    const targetArrow = e.currentTarget;
    if (targetArrow.classList.contains("increase")) {
      currentHeight = currentHeight + 0.01;
    } else if (targetArrow.classList.contains("decrease")) {
      if (currentHeight > 0) {
        currentHeight = currentHeight - 0.01;
      }
    }

    heightInput.value = currentHeight.toFixed(2);
  });
});

// -> INPUT WEIGHT

arrowsWeightInput.forEach(function (arrow) {
  arrow.addEventListener("click", function (e) {
    let currentWeight = parseFloat(weightInput.value);
    const targetArrow = e.currentTarget;
    if (targetArrow.classList.contains("increase")) {
      currentWeight = currentWeight + 1;
    } else if (targetArrow.classList.contains("decrease")) {
      if (currentWeight > 0) {
        currentWeight = currentWeight - 1;
      }
    }

    weightInput.value = currentWeight;
  });
});
