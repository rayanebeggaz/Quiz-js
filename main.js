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
    const question = Questions[currentQuestion];

    if (!question) {
      //f
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
    const value = selectedAnswer.value;
    console.log(Questions.length);
    console.log(currentQuestion - 1);

    const question = Questions[currentQuestion];
    const isCorrect = question.correct === value;
    if (isCorrect) {
      score++;
    }
    showFeedBack(isCorrect, question.correct, value);
    const message = feedBackMessage(isCorrect, question.correct);
    app.appendChild(message);
    setTimeout(() => {
      currentQuestion++;
      displayQuestion(app, currentQuestion);
    }, 4000);
  }
}

function clear(app) {
  while (app.firstChild) {
    app.firstChild.remove();
  }
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

function getAnswerElement(text) {
  const label = document.createElement("label");
  label.innerText = text;
  const input = document.createElement("input");
  const id = text.replaceAll(" ", "-").toLowerCase();

  input.id = id;
  label.htmlFor = id;
  input.setAttribute("type", "radio");
  input.setAttribute("name", "answer");
  input.setAttribute("value", text);
  label.appendChild(input);

  return label;
}

function showFeedBack(isCorrect, correct, answer) {
  const selectedAnswerId = answer.replaceAll(" ", "-").toLowerCase();
  const selectedElement = document.querySelector(
    `label[for="${selectedAnswerId}"]`
  );

  const correctAnswerId = correct.replaceAll(" ", "-").toLowerCase();
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
