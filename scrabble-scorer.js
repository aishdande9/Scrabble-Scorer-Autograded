// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
  1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
  2: ["D", "G"],
  3: ["B", "C", "M", "P"],
  4: ["F", "H", "V", "W", "Y"],
  5: ["K"],
  8: ["J", "X"],
  10: ["Q", "Z"],
};

//function 1: simpleScorer(word)
function simpleScorer(word) {
  let numericalScore = 0;
  for (let i in word) {
    numericalScore++;
  }
  return numericalScore;
}

//function 2: vowelBonusScorer
function vowelBonusScorer(word) {
  let vowels = "aeiou";
  let score = 0;
  for (let i in word) {
    if (vowels.includes(word[i])) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
}

//  function 3: oldScrabbleScorer(word)
function oldScrabbleScorer(word) {
  let letterPoints = "";
  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
      }
    }
  }
  return letterPoints;
}

//Define scoring algorithm
const scoringAlgorithms = [
  {
    Name: "Simple Score",
    Description: "Each letter is worth 1 point",
    ScoreFunction: simpleScorer,
  },
  {
    Name: "Bonus Vowels",
    Description: "Vowels are 3 pts, consonants are 1 pt.",
    ScoreFunction: vowelBonusScorer,
  },
  {
    Name: "Scrabble",
    Description: "The newpoint scoring algorithm.",
    ScoreFunction: scrabbleScorer,
  },
];

//function 4: scorerPrompt()
function scorerPrompt(scoringAlgorithms) {
  console.log("Let's play some Scrabble!");
  let regex = /[a-z]/;
  word = input.question("enter a word to score :");
  while (!(regex.test(word) === true)) {
    word = input.question(
      "\n" + "Invalid word!!!,please enter the correct word : "
    );
  }
  console.log("\n" + "Which scoring algorithm would you like to use?");
  console.log(" 0 - Simple: One point per character");
  console.log(" 1 - Vowel Bonus: Vowels are worth 3 points");
  console.log(" 2 - Scrabble: Uses scrabble point system");
  let chooseAlgorithm = input.question("\n" + "Enter 0, 1, or 2 : ");
  chooseAlgorithm = Number(chooseAlgorithm);
  while (
    !(chooseAlgorithm === 0 || chooseAlgorithm === 1 || chooseAlgorithm === 2)
  ) {
    chooseAlgorithm = input.question(
      "\n" + "Invalid input!!!, please enter valid input :"
    );
    chooseAlgorithm = Number(chooseAlgorithm);
  }
  console.log(`\nAlgorithm name :  ${scoringAlgorithms[chooseAlgorithm].Name}`);
  console.log(
    `Score for '${word}' : ${scoringAlgorithms[chooseAlgorithm].ScoreFunction(
      word
    )}`
  );
}

//function 5 : Transform oldpointstructure
function transform(oldPointStructure) {
  const newPointStructure = {};
  for (let i in oldPointStructure) {
    for (let j in oldPointStructure[i]) {
      let key = oldPointStructure[i][j];
      let lowerKey = key.toLowerCase();
      let value = i;
      newPointStructure[lowerKey] = Number(value);
    }
  }

  return newPointStructure;
}
let newPointStructure = transform(oldPointStructure);
newPointStructure[" "] = 0;

//function 6 : newscrabblescorer
function scrabbleScorer(word) {
  let newPoints = "" + "\n";
  let pointValue = 0;
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    for (pointValue in newPointStructure) {
      pointValue = newPointStructure[word[i]];
    }
    newPoints += `Points for '${word[i]}': ${pointValue}\n`;
    score = score + pointValue;
  }

  return score;
}

//console.log(newPointStructure);

function initialPrompt() {
  let word = input.question("please enter a word :");
  let score = oldScrabbleScorer(word);
  console.log(score);
}

function runProgram() {
  initialPrompt();
  transform(oldPointStructure);
  scorerPrompt(scoringAlgorithms);
}
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt,
};
