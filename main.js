import "./style.css";
import { Questions } from "./question";

const app = document.querySelector("#app");

const startButton = document.querySelector("#start");
let i = 0;

startButton.addEventListener("click", () => {
  const question = document.querySelector("#q") ?? document.createElement("p");
  question.id = "q";
  question.innerText = Questions[i].question;
  app.insertBefore(question, startButton);

  i++;
  if (i > Questions.length - 1) {
    i = 0;
  }
});
