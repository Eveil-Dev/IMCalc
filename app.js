const inputName = document.getElementById("name");
const inputHeight = document.getElementById("height");
const inputWeight = document.getElementById("weight");
const calcBtn = document.getElementById("calc");
const resultDiv = document.getElementById("result")

calcBtn.addEventListener('click', function(){

    try{
        validateFields();
        result = calcImc();
        imcText = imcDefinition(result);
        resultDiv.innerHTML = `Olá ${inputName.value}, seu IMC é de ${result} <br> e você está ${imcText}`;
        inputName.value = "";
        inputHeight.value = "";
        inputWeight.value = "";

    }catch(error){
        alert(error.message);
    }

});

function validateFields(){
    if(inputName.value == "" || inputHeight.value == "" || inputWeight.value == ""){
        throw new Error("Por favor preencha todos os campos");
    }
}

function calcImc(){
    let result = inputWeight.value / (inputHeight.value * inputHeight.value);
    result = Math.round(result * 100) / 100;
    return result;
}

function imcDefinition(result){
    let imcDefinition;

    if(result < 18.5){
        imcDefinition = "abaixo do peso";
    }else if(result >= 18.5 && result <= 24.9){
        imcDefinition = "peso normal";
    }else if(result >= 25 && result <= 29.9){
        imcDefinition = "acima do peso";
    }else if(result >= 30 && result <= 34.9){
        imcDefinition = "com obesidade grau I"
    }else if(result >= 35 && result <= 39.9){
        imcDefinition = "com obesidade grau II"
    }else{
        imcDefinition = "com obesidade morbida"
    }

    return imcDefinition;
}