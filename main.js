//Set of questions and answers -DONE
//Give each answer an identifier -DONE
//Each identifier will increment through each question
//St the end the identifier with the highest number is the winner 
//Display the answer and rest the quiz

//pass results frm previous question to the next page usig localcache

//Randomise the background of the quiz for each questiion

//Possible - Personality Traits
// 15 -21- You Need Help
// 10 - 15 - Good Soul
// 5- 10 - Meh 
// 5 - Are You Even Real


let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');

//Function to generate question 
function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    //Populate html elements 
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }
    //Get value of selected radio
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    ////Add the answer score to the score array
    score.push(answerScore);

    selectedAnswersData.push()
    

    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    //Finally we incement the current question number ( to be used as the index for each array)
    currentQuestion++;

        //once finished clear checked
        selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }
    //If the quiz is finished then we hide the questions container and show the results 
    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
        result.innerHTML =
         `<h1 id="p1" style="direction: rtl"  class="final-score">سكورك : ${totalScore}</h1>
         <div id="p1" style="direction: rtl"  class="summary">
            <h1 id="p1" style="direction: rtl" >حالتك حسب السكور</h1>
            <p id="p1" style="direction: rtl" >دراسة شخصيتك تتم حسب عدة معايير و مش بضرورة تكون الجواب  يمثل شخصيتك</p>
            <p id="p1" style="direction: rtl" >38 - 45- شخص مثالي و سوف تنجح في حياتك (ﺟﻤﻴﻞ / ﻣﺮﺡ / ﻣﺘﻔﺎﺋﻞ / ﻳﻘﺪﻡ ﺍﻟﻌﻮﻥ ﻟﻠﺠﻤﻴﻊ -ﻧﺎﺟﺢ / ﻭﺍﻋﻲ)</p>
            <p id="p1" style="direction: rtl" >34 - 37 - (ﺻﻠﺐ ﺍﻟﺮﺃﻱ / ﻻ‌ ﻳﺴﺘﺴﻠﻢ ﺑﺴﻬﻮﻟﺔ / ﻣﺘﺴﻠﻂ / ﻛﺮﻳﻢ ﺟﺪﺍ / ﻗﺎﺳﻲ ) شخصيك ممتازة</p>
            <p id="p1" style="direction: rtl" >26 - 33 -   شخص عادي (ﺧﺠﻮﻝ / ﻧﻘﻲ / ﺫﻛﻲ ﺟﺪﺍ / ﺣﻜﻴﻢ / ﻣﺨﻠﺺ / ﻳﻜﺮﻩ ﺍﻟﻜﺬﺏ ) </p>
            <p id="p1" style="direction: rtl" >19 - 25 -  تمر بفترة فراغ كبيرة (ﺍﺟﺘﻤﺎﻋﻲ / ﺳﺮﻳﻊ ﺍﻟﺘﻜﻴﻒ / ﺻﺎﺩﻕ / ﻗﻮﻱ ﺍﻟﺸﺨﺼﻴﺔ)</p>
            <p id="p1" style="direction: rtl" >9 - 18 - (ﻋﺎﻃﻔﻲ ﺑﺸﻜﻞ ﻣﻔﺮﻁ / ﺣﺴﺎﺱ ﺟﺪﺍ ) عندك مشاكل عاطفية و تضارب في شخصية</p>
            <p id="p1" style="direction: rtl" >8 - تعاني من مشاكل نفسية كبيرة</p>

        </div>
        <button id="p1" style="direction: rtl" class="restart">عاود من جديد</button>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}

//Function to load previous question
function loadPreviousQuestion() {
    //Decrement quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
}

//Fuction to reset and restart the quiz;
function restartQuiz(e) {
    if(e.target.matches('button')) {
    //reset array index and score
    currentQuestion = 0;
    score = [];
    //Reload quiz to the start
    location.reload();
    }

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);


