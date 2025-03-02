var en_technicalwords = ["open world", "player", "random", "controller", "computer", "game engine", "map", "online", "upgrade", "achievement", "firmware", "level", "reboot", "screenshot", "team", "warn", "deathmatch"];
var fr_technicalwords = ["monde ouvert", "joueur", "aleatoire", "manette", "ordinateur","moteur de jeux", "carte", "en ligne", "ameliorer", "succes", "micrologiciels", "niveau", "relancer", "capture d'ecran", "equipe", "avertissement", "match a mort"];

var en_linkwords = ["but","or","and","thus","neither [...] nor [...]","because","that is to say","in other words","or in other words","besides","furthermore","moreover","what is more","by the way","in this regard","in addition","in fact","so that","so as to [+verb]","in order to","for","to this end", "aim at","because of","as","thanks to","due to","on account of","given that","as though","in comparison","although","even though","in spite of","All the same","instead of","nevertheless","notwithstanding","otherwise","whether","whereas","yet","however","conversely","in contrary to","by contrast","as far as","as long as","then","so that","so much that","as a result","therefore","that is why","hence"];
var fr_linkwords = ["mais","ou","et","donc","ni [...] ni [...]","parce que","c'est-a-dire","en d'autres termes","autrement dit","d'ailleurs","en outre","de plus","qui plus est","a ce propos","a cet egard","de surcroit","en fait","afin que","pour que [+verbe]","dans le but de","pour","a cet effet","viser a","en raison de","comme","grace a","du au fait de","etant donne de","etant donne que","comme si","par comparaison","bien que","meme si","malgre","tout de meme","au lieu de","neanmoins","nonobstant","sinon","si","tandis","pourtant","cependant","inversement","contrairement a","par opposition","dans la mesure de","du moment ou","puis","de telle sorte que","a tel point que","en consequence","par consequent","c'est pourquoi","d'ou"];

var en_suppr_technicalwords = [];
var fr_suppr_technicalwords = [];
var en_suppr_linkwords = [];
var fr_suppr_linkwords = [];

var step = 0;
var score = 0;
var ask = "";
var correct_answer = "";

// let us know the word to translate and the correct answer
function randomiseWord(en_list, fr_list, type){

    // round an random real number between 0 included and en_list.lenght excluded
    let index = Math.floor(Math.random() * (en_list.length));
    // remove from the list the picked elements
    if(type == "linkwords"){
        en_suppr_linkwords.push(en_list.splice(index,1));
        fr_suppr_linkwords.push(fr_list.splice(index,1));
    }else{
        en_suppr_technicalwords.push(en_list.splice(index,1));
        fr_suppr_technicalwords.push(fr_list.splice(index,1));
    }
    
    return {en: en_list[index], fr: fr_list[index]};
};

// let us know if the question is about technical word or linkword
function questionTypeSelection(){

    let randomNumber = Math.random();
    if (randomNumber < 0.5){
        // generate a technical word question
        return randomiseWord(en_technicalwords, fr_technicalwords, "technicalwords");
    }else{
        // generate a linkword question
        return randomiseWord(en_linkwords, fr_linkwords, "linkwords");
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
    }
    step += 1;
    if(step == 10){
        document.getElementById('submit').innerHTML = "Finish";
    }else if(step == 11){
        step = 1;
        document.getElementById('main').style.display = "none";
        document.getElementById('submit').innerHTML = "Next";
        document.getElementById('score').innerHTML = `${score}/10`;
        document.getElementById('score_section').style.top = 0;

        // reset variables that ensure the unicity of question in a single quiz
        for(let i = 0; i < en_suppr_linkwords.length; i++){
            en_linkwords.push(en_suppr_linkwords[i]);
            fr_linkwords.push(fr_suppr_linkwords[i]);
        }
        for(let i = 0; i < en_suppr_technicalwords.length; i++){
            en_technicalwords.push(en_suppr_technicalwords[i]);
            fr_technicalwords.push(fr_suppr_technicalwords[i]);
        }
        en_suppr_technicalwords = [];
        fr_suppr_technicalwords = [];
        en_suppr_linkwords = [];
        fr_suppr_linkwords = [];
    }
    document.getElementById('step').innerHTML = `${step}/10`;
    questionFormSelection();
    document.getElementById('ask').innerHTML = ask;
});

document.getElementById('retry').addEventListener("click", function (){   
    document.getElementById('main').style.display = "flex";
    document.getElementById('score_section').style.top = "200vh";
    score = 0;
});