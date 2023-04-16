const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const answerBtnsEl = document.getElementById("answer-buttons");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Paris", correct: true },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "What is the largest organ of the human body?",
    answers: [
      { text: "Liver", correct: false },
      { text: "Heart", correct: false },
      { text: "Skin", correct: true },
      { text: "Lungs", correct: false },
    ],
  },
  {
    question: "What is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Monaco", correct: false },
      { text: "San Marino", correct: false },
      { text: "Nauru", correct: false },
    ],
  },
];

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  questionEl.innerText = question.question;
  answerBtnsEl.innerHTML = "";
  for (let i = 0; i < question.answers.length; i++) {
    const answer = question.answers[i];
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerBtnsEl.appendChild(button);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    score++;
  }
  Array.from(answerBtnsEl.children).forEach((btn) => {
    setStatusClass(btn, btn.dataset.correct);
  });
  if (currentQuestionIndex < questions.length - 1) {
    nextBtn.classList.remove("hide");
  } else {
    submitBtn.innerText = "Submit";
    submitBtn.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function displayNextQuestion() {
  currentQuestionIndex++;
  displayQuestion();
  nextBtn.classList.add("hide");
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  submitBtn.classList.add("hide");
  nextBtn.classList.add("hide");
  quizContainer.classList.remove("end");
  displayQuestion();
}

displayQuestion();

nextBtn.addEventListener("click", displayNextQuestion);

submitBtn.addEventListener("click", () => {
  quizContainer.classList.add("end");
  answerBtnsEl.innerHTML = `
    <h2>You answered ${score}/${questions.length} questions correctly!</h2>
    <button class="btn" onclick="resetQuiz()">Play Again</button>
  `;
});