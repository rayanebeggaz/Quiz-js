import "./style.css";
import { Questions } from "./question";

const app = document.querySelector("#app");
const startButton = document.querySelector("#start");

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  const app = document.querySelector("#app");
  let score = 0;
  let currentQuestion = 0;

  displayQuestion(app, currentQuestion);

  function displayQuestion(app, currentQuestion) {
    clear(app);
    header(app);
    const progressBar = getProgressBar(Questions.length, currentQuestion);
    app.appendChild(progressBar);
    const question = Questions[currentQuestion];

    if (!question) {
      displayFinishMessage();
      return;
    }

    const titre = getElementTitle(question.question);
    app.appendChild(titre);

    let answers = Questions[currentQuestion].answers;
    buildAnswers(app, answers);

    const submitButton = addSubmitButton(app);
    submitButton.addEventListener("click", submit);
  }

  function submit() {
    const selectedAnswer = app.querySelector('input[name="answer"]:checked');
    if (selectedAnswer == null) {
      return;
    }
    disableInputs();
    const value = selectedAnswer.value;
    console.log(Questions.length);
    console.log(currentQuestion - 1);

    const question = Questions[currentQuestion];
    const isCorrect = question.correct === value;
    if (isCorrect) {
      score++;
    }
    showFeedBack(isCorrect, question.correct, value);
    displayNextQuestionButton(() => {
      currentQuestion++;
      displayQuestion(app, currentQuestion);
    });
    const message = feedBackMessage(isCorrect, question.correct);
    app.appendChild(message);
  }
  function disableInputs() {
    const inputs = document.querySelectorAll('input[type="radio"]');
    for (const input of inputs) {
      input.disabled = true;
    }
  }
  function displayFinishMessage() {
    const h1 = document.createElement("h1");
    h1.innerText = "Bravo tu as terminé le Quiz ";
    const paragraphe = document.createElement("p");
    paragraphe.innerText = `Tu as eu ${score} sur ${Questions.length} points`;
    app.appendChild(h1);
    app.appendChild(paragraphe);
  }
}

function clear(app) {
  while (app.firstChild) {
    app.firstChild.remove();
  }
}

function getProgressBar(max, valeu) {
  const progress = document.createElement("progress");
  progress.setAttribute("max", max);
  progress.setAttribute("value", valeu);
  return progress;
}

function header(app) {
  const js = document.createElement("h1");
  const span = document.createElement("span");
  span.innerText = "JS";
  span.className = "js";

  js.appendChild(span);
  js.append(document.createTextNode(" Quiz"));
  app.appendChild(js);
}

function addSubmitButton(app) {
  const submitButton = document.createElement("button");
  submitButton.innerText = "submit";
  app.appendChild(submitButton);
  return submitButton;
}

function buildAnswers(app, answers) {
  const answerDiv = document.createElement("div");

  answerDiv.className = "answers";

  for (const answer of answers) {
    const label = getAnswerElement(answer);
    answerDiv.appendChild(label);
  }
  app.appendChild(answerDiv);
}

function getElementTitle(texte) {
  const element = document.createElement("h3");
  element.innerText = texte;
  return element;
}
function formatId(text) {
  return text.replaceAll(" ", "-").replaceAll('"', "'").toLowerCase();
}
function getAnswerElement(text) {
  const label = document.createElement("label");
  label.innerText = text;
  const input = document.createElement("input");
  const id = formatId(text);

  input.id = id;
  label.htmlFor = id;
  input.setAttribute("type", "radio");
  input.setAttribute("name", "answer");
  input.setAttribute("value", text);
  label.appendChild(input);

  return label;
}

function displayNextQuestionButton(callback) {
  const TIMEOUT = 4000;
  let timeout = 4000;

  let button = app.querySelector("button");
  button.remove();
  button = document.createElement("button");
  const getButtonTxt = () => `Next (${timeout / 1000}s)`;
  app.appendChild(button);
  button.innerText = getButtonTxt();

  const nextQuestion = () => {
    clearInterval(interval);
    clearTimeout(timeoutEvent);
    callback();
  };

  const interval = setInterval(() => {
    timeout -= 1000;
    button.innerText = getButtonTxt();
  }, 1000);

  button.addEventListener("click", nextQuestion);
  const timeoutEvent = setTimeout(() => {
    nextQuestion();
  }, TIMEOUT);
}

function showFeedBack(isCorrect, correct, answer) {
  const selectedAnswerId = formatId(answer);
  const selectedElement = document.querySelector(
    `label[for="${selectedAnswerId}"]`
  );

  const correctAnswerId = formatId(correct);
  const correctElement = document.querySelector(
    `label[for="${correctAnswerId}"]`
  );
  correctElement.classList.add("correct");
  if (!isCorrect) {
    selectedElement.classList.add("incorrect");
  }
}

function feedBackMessage(isCorrect, correct) {
  const paragraphe = document.createElement("p");
  paragraphe.innerText = isCorrect
    ? "Bonne repense  !"
    : `La bonne repense était ${correct} `;
  return paragraphe;
}
