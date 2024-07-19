const questions = [
    { question: "What is the capital of France?", answers: ["Paris", "London", "Rome", "Berlin"], correct: 0 },
    { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1 },
    { question: "What is the capital of Spain?", answers: ["Madrid", "Lisbon", "Barcelona", "Seville"], correct: 0 },
    { question: "What is 5 x 3?", answers: ["15", "20", "25", "30"], correct: 0 },
    { question: "What is the capital of Italy?", answers: ["Venice", "Milan", "Naples", "Rome"], correct: 3 },
    { question: "What is 10 / 2?", answers: ["2", "4", "5", "6"], correct: 2 },
    { question: "What is the capital of Germany?", answers: ["Munich", "Berlin", "Frankfurt", "Hamburg"], correct: 1 },
    { question: "What is 7 - 3?", answers: ["3", "4", "5", "6"], correct: 1 },
    { question: "What is the capital of Portugal?", answers: ["Lisbon", "Porto", "Braga", "Coimbra"], correct: 0 },
    { question: "What is 8 + 2?", answers: ["9", "10", "11", "12"], correct: 1 }
];
let currentquestion = 0
let score = 0
let highscore = localStorage.getItem('highscore' || 0)
function startquiz () {
    let quiz = document.getElementById('quiz')
    let introquiz = document.querySelector('.quiz-intro')
    quiz.style.display = 'block'
    introquiz.style.display='none'
    loaddata();
}
document.getElementById('highscore').innerHTML = highscore
function loaddata () {
    if (currentquestion < questions.length) {
        let questionelement = questions[currentquestion]
        document.getElementById('question').innerHTML = `<p>${currentquestion + 1}. ${questionelement.question} </p>`
        let answersdiv = document.getElementById('answers')
        answersdiv.innerHTML = ''
        questionelement.answers.forEach((answer, index) => {
            let label = document.createElement('label')
            label.innerHTML = `<input type='radio' name='answer' value='${index}'> ${answer}`
            answersdiv.append(label)
        })
    }
    else {
        showresult();
    }
}

function nextQuestion() {
    const selectedanswer = document.querySelector('input[name="answer"]:checked')
    if (selectedanswer) {
        if (selectedanswer.value == questions[currentquestion].correct) {
         score++;   
         currentquestion++
             loaddata();
        }
         else {
             currentquestion++
             loaddata();
             
         }
    }
    else {
        alert('please select the answer')
    }

}
function showresult () {
    let quiztitle = document.getElementById('quiz-title')
    quiztitle.style.display = 'none'
    let result = document.getElementById('result')
    result.style.display = 'block'
    let quiz = document.getElementById('quiz')
    quiz.style.display = 'none'
    let corrected = document.getElementById('correctcount')
    corrected.innerHTML = score;
    if (score > highscore) {
        highscore = score
        localStorage.setItem('highscore', highscore)
    }
    let per = (score / questions.length) * 100
    let progressvalue = document.querySelector('.progress-value')
    progressvalue.innerHTML = `${per}%`;
    let progresscircle =  document.getElementById('progressCircle')
    progresscircle.style.background=`conic-gradient(green ${per * 3.6}deg, rgb(197, 195, 195) 0deg)`;
    if (per < 60) {
        progresscircle.style.background=`conic-gradient(red ${per * 3.6}deg, rgb(197, 195, 195) 0deg)`;
        progressvalue.style.color="red"
    }
}
function restartQuiz() {
    let result = document.getElementById('result')
    let quiz = document.getElementById('quiz')
    let quiztitle = document.getElementById('quiz-title')
    result.style.display = 'none'
    quiz.style.display = 'block'
    quiztitle.style.display = 'block'
    currentquestion = 0
    score = 0
    loaddata()
}
loaddata();