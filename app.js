var en_technicalwords = ["open world", "player", "random", "controller", "computer", "game engine", "map", "online", "upgrade", "achievement", "firmware", "level", "reboot", "screenshot", "team", "warn", "deathmatch"];
var fr_technicalwords = ["monde ouvert", "joueur", "aleatoire", "manette", "ordinateur","moteur de jeux", "carte", "en ligne", "ameliorer", "succes", "micrologiciels", "niveau", "relancer", "capture d'ecran", "equipe", "avertissement", "match a mort"];

var en_linkwords = ["but","or","and","thus","neither [...] nor [...]","because","that is to say","in other words","or in other words","besides","furthermore","moreover","what is more","by the way","in this regard","in addition","in fact","so that","so as to [+verb]","in order to","for","to this end", "aim at","because of","as","thanks to","due to","on account of","given that","as though","in comparison","although","even though","in spite of","All the same","instead of","nevertheless","notwithstanding","otherwise","whether","whereas","yet","however","conversely","in contrary to","by contrast","as far as","as long as","then","so that","so much that","as a result","therefore","that is why","hence"];
var fr_linkwords = ["mais","ou","et","donc","ni [...] ni [...]","parce que","c'est-a-dire","en d'autres termes","autrement dit","d'ailleurs","en outre","de plus","qui plus est","a ce propos","a cet egard","de surcroit","en fait","afin que","pour que [+verbe]","dans le but de","pour","a cet effet","viser a","en raison de","comme","grace a","du au fait de","etant donne de","etant donne que","comme si","par comparaison","bien que","meme si","malgre","tout de meme","au lieu de","neanmoins","nonobstant","sinon","si","tandis","pourtant","cependant","inversement","contrairement a","par opposition","dans la mesure de","du moment ou","puis","de telle sorte que","a tel point que","en consequence","par consequent","c'est pourquoi","d'ou"];

var step = 0;
var score = 0;
var ask = "";
var correct_answer = "";
var en_word = "";
var fr_word = "";

let correction = {};

// let us know the word to translate and the correct answer
function randomiseWord(en_list, fr_list){
    // round an random real number between 0 included and en_list.lenght excluded
    let index = Math.floor(Math.random() * (en_list.length));
    en_word = en_list[index];
    fr_word = fr_list[index];
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
        ask = `Translate "${words.fr}" into english.`;
        correct_answer = words.en;
    }else{
        // generate an english to french question
        ask = `Translate "${words.en}" into french.`;
        correct_answer = words.fr;
    }
};

function showCorrectionTable(){
    if (score < 10){
        document.getElementById('score_table').innerHTML = "<tr><th>En</th><th>Fr</th></tr>";
        for(let key in correction){
            document.getElementById('score_table').innerHTML += `<tr><td>${key}</td><td>${correction[key]}</td></tr>`;
        }
        correction = {};
    }else{
        document.getElementById('score_table').innerHTML = "";
    }
}

function displayScore(){
    step = 1;
        document.getElementById('main').style.display = "none";
        document.getElementById('submit').innerHTML = "Next";
        document.getElementById('score').innerHTML = `${score}/10`;
        document.getElementById('score_section').style.top = "70px";
        showCorrectionTable();
}





// disable real form submit that reload the page
document.querySelector("form").addEventListener("submit", function (event) {
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
    }else{
        // record in a dictionnary failed word
        correction[en_word] = fr_word;
    }
    step += 1;
    if(step == 10){
        document.getElementById('submit').innerHTML = "Finish";
    // The quiz is finished
    }else if(step == 11){
        displayScore();
    }
    document.getElementById('step').innerHTML = `${step}/10`;
    questionFormSelection();
    document.getElementById('ask').innerHTML = ask;
    document.getElementById('answer').value = "";
});

document.getElementById('retry').addEventListener("click", function (){   
    document.getElementById('main').style.display = "flex";
    document.getElementById('score_section').style.top = "-200vh";
    score = 0;
});