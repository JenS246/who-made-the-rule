const CARD_COUNT = 10;

// Add or edit cards here. Keep each scenario specific enough that only one
// institution is responsible for the rule described.
const questionBank = [
  {
    prompt: "Congress passes a law setting a new federal filing deadline.",
    answer: "Legislature",
    explanation: "Congress is a legislature. Legislatures enact statutes.",
  },
  {
    prompt: "A state general assembly creates a new statutory deadline.",
    answer: "Legislature",
    explanation: "State legislatures enact state statutes.",
  },
  {
    prompt: "A city council passes an ordinance limiting overnight parking.",
    answer: "Legislature",
    explanation: "A city council acts as a local legislature when it passes ordinances.",
  },
  {
    prompt: "Congress changes the minimum age required by a federal statute.",
    answer: "Legislature",
    explanation: "Congress changes federal statutes through legislation.",
  },
  {
    prompt: "A state senate and house approve a law creating a consumer right.",
    answer: "Legislature",
    explanation: "The state legislature creates statutory rights.",
  },
  {
    prompt: "A county legislative body adopts a local tax ordinance.",
    answer: "Legislature",
    explanation: "Local legislative bodies enact ordinances within their authority.",
  },
  {
    prompt: "An appellate court explains how a statute applies to a contract dispute.",
    answer: "Court",
    explanation: "Courts interpret and apply statutes in judicial decisions.",
  },
  {
    prompt: "A judge decides what “reasonable notice” means in a statute.",
    answer: "Court",
    explanation: "Courts interpret legal language when deciding cases.",
  },
  {
    prompt: "A state supreme court announces a rule of common law for negligence cases.",
    answer: "Court",
    explanation: "Courts develop common law through judicial decisions.",
  },
  {
    prompt: "A federal court decides that a statute violates the Constitution.",
    answer: "Court",
    explanation: "Courts review laws and decide constitutional questions in cases.",
  },
  {
    prompt: "A trial judge applies an earlier appellate decision to a new dispute.",
    answer: "Court",
    explanation: "Courts apply precedent when deciding cases.",
  },
  {
    prompt: "An appeals court clarifies when a legal test is satisfied.",
    answer: "Court",
    explanation: "Appellate courts explain and apply legal standards in their opinions.",
  },
  {
    prompt: "The EPA issues detailed pollution regulations under authority from Congress.",
    answer: "Agency",
    explanation: "Agencies issue regulations under authority delegated by a legislature.",
  },
  {
    prompt: "A state licensing board adopts regulations for renewing nurse licenses.",
    answer: "Agency",
    explanation: "Licensing boards are agencies that regulate under state law.",
  },
  {
    prompt: "The Department of Labor issues a workplace safety regulation authorized by statute.",
    answer: "Agency",
    explanation: "Agencies turn statutory authority into detailed regulations.",
  },
  {
    prompt: "A transportation agency sets detailed rules for commercial vehicle inspections.",
    answer: "Agency",
    explanation: "Agencies create detailed regulations within their legal authority.",
  },
  {
    prompt: "A state environmental department adopts water-quality regulations authorized by law.",
    answer: "Agency",
    explanation: "State agencies issue regulations when state law gives them authority.",
  },
  {
    prompt: "The FCC adopts a regulation after Congress directs it to oversee a communications issue.",
    answer: "Agency",
    explanation: "The FCC is an agency exercising authority delegated by Congress.",
  },
];

const ui = {
  playScreen: document.querySelector("#play-screen"),
  endScreen: document.querySelector("#end-screen"),
  questionCard: document.querySelector("#question-card"),
  questionText: document.querySelector("#question-text"),
  answers: [...document.querySelectorAll(".answer-button")],
  progress: document.querySelector("#progress"),
  score: document.querySelector("#score"),
  feedback: document.querySelector("#feedback"),
  feedbackTitle: document.querySelector("#feedback-title"),
  feedbackText: document.querySelector("#feedback-text"),
  nextButton: document.querySelector("#next-button"),
  finalScore: document.querySelector("#final-score"),
  playAgainButton: document.querySelector("#play-again-button"),
};

let cards = [];
let cardIndex = 0;
let score = 0;
let answered = false;

function shuffled(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function selectCards() {
  const answers = ["Legislature", "Court", "Agency"];
  const balancedCards = answers.flatMap((answer) =>
    shuffled(questionBank.filter((card) => card.answer === answer)).slice(0, 3),
  );
  const remainingCards = questionBank.filter((card) => !balancedCards.includes(card));
  return shuffled([...balancedCards, ...shuffled(remainingCards).slice(0, CARD_COUNT - balancedCards.length)]);
}

function startGame() {
  cards = selectCards();
  cardIndex = 0;
  score = 0;
  ui.endScreen.hidden = true;
  ui.playScreen.hidden = false;
  renderCard();
}

function renderCard() {
  answered = false;
  const card = cards[cardIndex];
  ui.questionText.textContent = card.prompt;
  ui.progress.textContent = `${cardIndex + 1} / ${CARD_COUNT}`;
  ui.score.textContent = `${score} correct`;
  ui.feedback.hidden = true;
  ui.feedback.className = "feedback";

  ui.answers.forEach((button) => {
    button.disabled = false;
    button.classList.remove("is-correct", "is-wrong");
  });

  ui.questionCard.classList.remove("card-enter", "correct-pop");
  void ui.questionCard.offsetWidth;
  ui.questionCard.classList.add("card-enter");
  ui.answers[0].focus({ preventScroll: true });
}

function chooseAnswer(choice) {
  if (answered) return;
  answered = true;

  const card = cards[cardIndex];
  const isCorrect = choice === card.answer;
  if (isCorrect) score += 1;

  ui.answers.forEach((button) => {
    button.disabled = true;
    if (button.dataset.answer === card.answer) button.classList.add("is-correct");
    if (button.dataset.answer === choice && !isCorrect) button.classList.add("is-wrong");
  });

  ui.score.textContent = `${score} correct`;
  ui.feedback.classList.add(isCorrect ? "is-correct" : "is-wrong");
  ui.feedbackTitle.textContent = isCorrect ? `YES. ${card.answer.toUpperCase()}` : `NOT QUITE. ${card.answer.toUpperCase()}`;
  ui.feedbackText.textContent = card.explanation;
  ui.feedback.hidden = false;

  if (isCorrect) {
    ui.questionCard.classList.remove("correct-pop");
    void ui.questionCard.offsetWidth;
    ui.questionCard.classList.add("correct-pop");
  }

  ui.nextButton.textContent = cardIndex === CARD_COUNT - 1 ? "SEE SCORE" : "NEXT CARD";
  ui.nextButton.focus({ preventScroll: true });
}

function advance() {
  if (!answered) return;
  if (cardIndex < CARD_COUNT - 1) {
    cardIndex += 1;
    renderCard();
    return;
  }

  ui.playScreen.hidden = true;
  ui.endScreen.hidden = false;
  ui.progress.textContent = `${CARD_COUNT} / ${CARD_COUNT}`;
  ui.finalScore.textContent = `${score} / ${CARD_COUNT}`;
  ui.playAgainButton.focus({ preventScroll: true });
}

ui.answers.forEach((button) => {
  button.addEventListener("click", () => chooseAnswer(button.dataset.answer));
});

ui.nextButton.addEventListener("click", advance);
ui.playAgainButton.addEventListener("click", startGame);

document.addEventListener("keydown", (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (!answered && ["1", "2", "3"].includes(event.key)) {
    chooseAnswer(ui.answers[Number(event.key) - 1].dataset.answer);
  } else if (answered && event.key === "Enter") {
    advance();
  }
});

startGame();
