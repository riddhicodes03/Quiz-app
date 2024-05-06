const question = document.getElementById(`question`);
const _options = document.querySelector(`.quiz-options`)

let correctAnswer = "";
async function loadapi() {
    const apiurl = `https://opentdb.com/api.php?amount=1`;
    const result = await fetch(apiurl);
    const data = await result.json();
    console.log(data);
    showdata(data.results[0]);
    showoption(data);
}

function showdata(data) {
    console.log(data);
    correctAnswer = data.correct_answer;
    const incorrectAnswer = data.incorrect_answers;

    let optionList = incorrectAnswer;
    optionList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    question.innerHTML = data.question;
    _options.innerHTML = `${optionList.map((option, index) => `<button> ${index + 1}.  ${option}</button>`).join('')}`;

}


loadapi();

function showoption(data) {

    _options.querySelectorAll('button').forEach((option) => {
        option.addEventListener('click', () => {
            console.log(correctAnswer)
            let ans = option.innerHTML.slice(3);
            let finalAns = ans.trim();
            if (finalAns == correctAnswer) {
                option.style.backgroundColor = "green"
                option.style.color = "white"
            }
            else {
                option.style.backgroundColor = "red";
                option.style.color = "white";
               
            }
            Array.from(buttons.children).forEach(option => {
                if (option.innerHTML.slice(3).trim() === correctAnswer) {
                    option.style.backgroundColor = "green"
                    option.style.color = "white"
                }
                option.disabled=true;
            })
        })
    })
}

next.addEventListener('click',()=>{
    loadapi();
})