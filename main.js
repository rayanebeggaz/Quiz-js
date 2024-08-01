import "./style.css";
import { Questions } from "./question";

const app = document.querySelector("#app");
const startButton = document.querySelector("#start");

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  let score = 0;
  let currentQuestion = 0;
  const app = document.querySelector("#app");
  for (currentQuestion; currentQuestion < Questions.length; currentQuestion++) {
    let answers = Questions[currentQuestion].answers;

    clear(app);
    const js = document.createElement("h1");
    const span = document.createElement("span");
    span.innerText = "JS";
    span.className = "js";

    js.appendChild(span);
    js.append(document.createTextNode(" Quiz"));
    app.appendChild(js);

    displayQuestion(currentQuestion);
    buildAnswers(answers);
  }

  function clear(app) {
    while (app.firstChild) {
      app.firstChild.remove();
    }
  }

  function displayQuestion(ind) {
    const question = Questions[ind];

    if (!question) {
      //f
    }

    const titre = getElementTitle(question.question);
    app.appendChild(titre);
  }
  function buildAnswers(answers) {
    const answerDiv = document.createElement("div");

    answerDiv.className = "answers";

    for (const answer of answers) {
      const label = getAnswerElement(answer);
      answerDiv.appendChild(label);
    }
    app.appendChild(answerDiv);
  }
}

function submit() {
  const selectedAnswer = app.querySelector('input[name="answer"]:checked');
  const value = selectedAnswer.value;
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
  input.setAttribute("value", "text");
  label.appendChild(input);

  return label;
}
