import { shuffleArray } from "./utils";

export async function getTrivia() {
    let response = await fetch('https://opentdb.com/api.php?amount=1')
        .then((response) => response.json())
        .then((data) => data.results[0]);

    let shuffled_answers = shuffleArray([...response.incorrect_answers, response.correct_answer]);

    let trivia = {
        question: response.question,
        category: response.category,
        difficulty: response.difficulty,
        type: response.type,
        answer: response.correct_answer,
        incorrect_answers: response.incorrect_answers,
        shuffled_answers,
    }

    return trivia;
}