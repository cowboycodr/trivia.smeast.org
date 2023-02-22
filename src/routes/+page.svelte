<script>
    import { onMount } from "svelte";

    import { getTrivia } from "$lib/js/trivia";
    import { shuffleArray } from "$lib/js/utils";

    let trivia;
    let nextTrivia;
    let timer = 10;
    let showResults = false;

    onMount(async () => {
        trivia = await getTrivia();
        nextTrivia = await getTrivia();
        startTimer();
    })

    function startTimer() {
        let clock = setInterval(async () => {
            timer--;
            if (timer === 0) {
                timer = 10;
                trivia = nextTrivia;
                nextTrivia = await getTrivia();
                // results();
                // clearInterval(clock);
            }
        }, 1000);
    }
</script>

<main>
    {#if trivia}
        <div class="trivia">
            <p>{trivia.answer}</p>
            <p>{timer}</p>
            <div class="question">
                {@html trivia.question}
            </div>
            <p>{trivia.category}</p>
        </div>
        {#if trivia.type === "multiple"}
            <div class="answers">
                <div class="row">
                    <div class="answer">
                        {@html trivia.shuffled_answers[0]}
                    </div>
                    <div class="answer">
                        {@html trivia.shuffled_answers[1]}
                    </div>
                </div>
                <div class="row">
                    <div class="answer">
                        {@html trivia.shuffled_answers[2]}
                    </div>
                    <div class="answer">
                        {@html trivia.shuffled_answers[3]}
                    </div>
                </div>
            </div>
        {:else if trivia.type === "boolean"}
            <div class="answers">
                <div class="row">
                    <div class="answer">
                        True
                    </div>
                    <div class="answer">
                        False
                    </div>
                </div>
            </div>
        {/if}
    {/if}
</main>

<style>
    * {
        font-family: Arial, Helvetica, sans-serif;
    }

    main {
        max-width: 500px;
        text-align: center;
    }

    .question {
        font-weight: bold;
        font-size: 2em;
    }

    .row {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    .answer {
        background-color: rgb(205, 205, 205);
        padding: 10px;
        width: 100%;
        margin: 2px;
        cursor: pointer;
        font-size: 1.5em;
        text-align: center;
    }

    .answer:hover {
        background-color: gray;
    }
</style>