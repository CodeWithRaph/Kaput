var en_technicalwords = ["gateway"];
var fr_technicalwords = ["routeur"];

var en_linkwords = ["willi","hello"];
var fr_linkwords = ["zizi","bonjour"];

var step = 0;
var score = 0;
var ask = "";
var correct_answer = "";

// let us know the word to translate and the correct answer
function randomiseWord(en_list, fr_list){

    // round an random real number between 0 included and en_list.lenght excluded
    let index = Math.floor(Math.random() * (en_list.length));
    return {en: en_list[index], fr: fr_list[index]};
};

// let us know if the question is about technical word or linkword
function questionTypeSelection(){

    let randomNumber = Math.random();
    if (randomNumber < 0.5){
        // generate a technical word question
        return randomiseWord(en_technicalwords, fr_technicalwords);
    }else{
        // generate a linkword question
        return randomiseWord(en_linkwords, fr_linkwords);
    }
};

// let us konw if the question want a french to english translation or the contrary
function questionFormSelection(){

    let words = questionTypeSelection();
    let randomNumber = Math.random();
    if (randomNumber < 0.5){
        // generate a french to english question
        ask = `Translate ${words.fr} into english.`;
        correct_answer = words.en;
    }else{
        // generate an english to french question
        ask = `Translate ${words.en} into french.`;
        correct_answer = words.fr;
    }
};





// disable real form submit that reload the page
document.querySelector("form").addEventListener("submit", function () {
    event.preventDefault(); // Empêche le rechargement de la page
});

// when the page is loaded generate the first question 
document.addEventListener("DOMContentLoaded", function () {
    questionFormSelection();
    document.getElementById('ask').innerHTML = ask;
    step = 1;
    document.getElementById('step').innerHTML = `${step}/10`;
});

document.getElementById('submit').addEventListener("click", function (){
    let answer = document.getElementById('answer').value

    // char case and accents ignored process made by chat gpt
    let processedValue = answer
            .toLowerCase() // Ignore uppercase
            .normalize("NFD") // Decompose accentuated char
            .replace(/[\u0300-\u036f]/g, "");

    
    if(processedValue == correct_answer){
        score += 1;
    }
    step += 1;
    if(step == 10){
        document.getElementById('submit').innerHTML = "Finish";
    }else if(step == 11){
        // il faut faire disparaitre le main ici
        // pour faire apparaitre la score section
        step = 1;
        document.getElementById('submit').innerHTML = "Next";
        document.getElementById('score_section').style.top = 0;
    }
    document.getElementById('step').innerHTML = `${step}/10`;
    questionFormSelection();
    document.getElementById('ask').innerHTML = ask;
});