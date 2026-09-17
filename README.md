# WHO MADE THE RULE?

A small, fast trivia game about where legal rules come from. Players read one plain-English scenario, choose **Legislature**, **Court**, or **Agency**, and get immediate feedback.

The game is designed as a companion to **LAW / NOT LAW**. It uses a single-card flow, bold typography, compact progress, tactile buttons, and a short end screen.

## How it works

- Each game selects 10 shuffled cards, with at least three from each answer category.
- The player can tap an answer or press `1`, `2`, or `3`.
- Correct and incorrect answers receive a short explanation.
- The final screen shows the score and the main learning takeaway.
- No login, backend, build step, or external dependency is required.

## Run locally

You can open `index.html` directly, or serve the folder with any static server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Add or edit cards

Open `app.js` and edit the `questionBank` array near the top of the file. Each card has this shape:

```js
{
  prompt: "A judge interprets a phrase in a statute.",
  answer: "Court",
  explanation: "Courts interpret and apply statutes in judicial decisions."
}
```

Use exactly one of these answers: `Legislature`, `Court`, or `Agency`. Make the scenario specific enough that the answer is clear from the wording alone. Agency cards should state or imply that the agency is acting under legal authority.

Change `CARD_COUNT` in `app.js` to adjust the number of cards in one game.

## Publish with GitHub Pages

This repository includes a Pages workflow at `.github/workflows/pages.yml`.

1. Push the repository to GitHub.
2. Open **Settings > Pages** in the GitHub repository.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Run the **Deploy static site to Pages** workflow, or push to the default branch.

The site will be available at `https://YOUR-USER.github.io/YOUR-REPOSITORY/`.

## Accessibility

The game uses semantic buttons, visible focus states, an ARIA live region for feedback, large tap targets, keyboard shortcuts, system dark mode, and reduced-motion support.
