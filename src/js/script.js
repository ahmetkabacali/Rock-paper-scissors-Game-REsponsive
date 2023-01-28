const circleAll = document.getElementById("circleAll")
const circle1 = document.querySelector(".circle-1")
const circle2 = document.querySelector(".circle-2")
const circleplaceholder = document.querySelector(".circle-placeholder")
const circle3 = document.querySelector(".circle-3")
const triangle = document.querySelector(".triangle")
const yourScoreDisp = document.querySelector(".your-score")
const comScoreDisp = document.querySelector(".com-score")
const winnertitle = document.querySelector(".winner-title")

let yourscore = 0;
let comscore = 0;

circleAll.addEventListener("click", (clicked) => {
    let clickedCircle = clicked.target
    const clickedControl = (!(
        clickedCircle.matches(".scissors") ||
        clickedCircle.matches(".rock") ||
        clickedCircle.matches(".paper") ||
        clickedCircle.matches(".circle")
    ))
    if (clickedControl) return;

    if (clickedCircle.classList.contains("paper")) {
        let selected = "paper"
        let selectedCircle = 1
        step2(selected, selectedCircle)
    }
    if (clickedCircle.classList.contains("scissors")) {
        let selected = "scissors"
        let selectedCircle = 2
        step2(selected, selectedCircle)
    }
    if (clickedCircle.classList.contains("rock")) {
        let selected = "rock"
        let selectedCircle = 3
        step2(selected, selectedCircle)
    }
})

function step2(selected, selectedCircle) {
    document.querySelector("head").insertAdjacentHTML("beforeend", '<link rel="stylesheet" href="./src/css/selected.css">')
    triangle.classList.add("hidden")
    let newcircleALL =
        `
            <span class="picked-text">YOU PICKED</span>
            <span class="house-picked-text">HOUSE PICKED</span>

            <div class="circle circle-${selectedCircle} m_circle-${selectedCircle}">
                <div class="img-wrapper ${selected}">
                    <img class="${selected}" src="./src/images/icon-${selected}.svg" alt="${selected}Icon">
                </div>
            </div>
        `
    circleAll.innerHTML = newcircleALL
    circleAll.insertAdjacentHTML("beforeend", '<div class="circle-placeholder"></div>')

    circleAll.lastElementChild.remove()
    let pcSelected;
    const randomNum = Math.floor(Math.random() * 3) + 1
    if (randomNum == 1) {
        pcSelected = "paper"
    } else if (randomNum == 2) {
        pcSelected = "scissors"
    } else if (randomNum == 3) {
        pcSelected = "rock"
    }

    circleAll.insertAdjacentHTML("beforeend",
        `
        <div class="circle circle-${randomNum} m_circle-${randomNum}">
            <div class="img-wrapper ${pcSelected}">
                <img class="${pcSelected}" src="./src/images/icon-${pcSelected}.svg" alt="${pcSelected}Icon">
            </div>
        </div>
        `
    )
    circleAll.lastElementChild.style.gridColumn = "3 / span 1"
    console.log("SEN:", selectedCircle)
    console.log("Bilgisayar:", randomNum)
    console.log((selectedCircle == 1 && randomNum == 3))

    if ((selectedCircle == 1 && randomNum == 3) || (selectedCircle == 3 && randomNum == 1)) {
        if (selectedCircle == 1 && randomNum == 3) {
            yourscore++
            document.querySelector(`.circle-${selectedCircle}`).classList.add("winner")
            document.querySelector(`.circle-${selectedCircle}`).insertAdjacentHTML("afterend",
                `
                    <div class="play-box m_play-box" >
                        <p class="result" style="color:green">YOU WIN</p>
                        <button id="playAgain" class="play-again-btn">PLAY AGAIN</button>
                    </div>
                    `
            )
        } else {
            comscore++
            document.querySelector(`.circle-${randomNum}`).classList.add("winner")
            document.querySelector(`.circle-${selectedCircle}`).insertAdjacentHTML("afterend",
                `
                <div class="play-box m_play-box" >
                    <p class="result" style="color:red">YOU LOSE</p>
                    <button id="playAgain" class="play-again-btn">PLAY AGAIN</button>
                </div>
                `
            )
        }
    } else if (selectedCircle == randomNum) {
        document.querySelector(`.circle-${selectedCircle}`).insertAdjacentHTML("afterend",
            `
            <div class="play-box m_play-box" >
                <p class="result" style="color:yellow">DRAW</p>
                <button id="playAgain" class="play-again-btn">PLAY AGAIN</button>
            </div>
            `
        )
    } else if (selectedCircle < randomNum) {
        comscore++
        document.querySelector(`.circle-${randomNum}`).classList.add("winner")
        document.querySelector(`.circle-${selectedCircle}`).insertAdjacentHTML("afterend",
            `
            <div class="play-box m_play-box" >
                <p class="result" style="color:red">YOU LOSE</p>
                <button id="playAgain" class="play-again-btn">PLAY AGAIN</button>
            </div>
            `
        )
    } else if (selectedCircle > randomNum) {
        yourscore++
        document.querySelector(`.circle-${selectedCircle}`).classList.add("winner")
        document.querySelector(`.circle-${selectedCircle}`).insertAdjacentHTML("afterend",
            `
                <div class="play-box m_play-box" >
                    <p class="result" style="color:green">YOU WIN</p>
                    <button id="playAgain" class="play-again-btn">PLAY AGAIN</button>
                </div>
                `
        )
    }

    for (const i in circleAll.children) {
        if (Object.hasOwnProperty.call(circleAll.children, i)) {
            const element = circleAll.children[i];
            if (element.classList.contains("circle")) {
                element.style.pointerEvents = "none"
            }
        }
    }
    console.log(document.querySelector("#playAgain"))
    document.querySelector("#playAgain").addEventListener("click", () => {
        document.querySelector('[href="./src/css/selected.css"]').remove()
        triangle.classList.remove("hidden")

        let recircleALL =
            `
            <div class="circle circle-1">
                <div class="img-wrapper paper">
                    <img class="paper" src="./src/images/icon-paper.svg" alt="paperIcon">
                </div>
            </div>
            <div class="circle circle-2">
                <div class="img-wrapper scissors">
                    <img class="scissors" src="./src/images/icon-scissors.svg" alt="scissorsIcon">
                </div>
            </div>
            <div class="circle circle-3">
                <div class="img-wrapper rock">
                    <img class="rock" src="./src/images/icon-rock.svg" alt="rockIcon">
                </div>
            </div>
        </div>
    `
        circleAll.innerHTML = recircleALL
        circleAll.insertAdjacentHTML("beforeend", '<div class="circle-placeholder"></div>')
    })
    yourScoreDisp.innerHTML = yourscore;
    comScoreDisp.innerHTML = comscore;
    if (yourscore == 10) {
        winnerModal.style.display = "block";
        winnertitle.innerText = "*** YOU WIN ***"
        winnertitle.insertAdjacentHTML("beforeend",
        `
            <div class="winner-score-modal">
            <div class="your-score-wrapper">
                <span class="y-score">Your Score: ${yourscore}</span>
            </div>
            <div class="Com-score-wrapper">
                <span class="c-score">Your Score: ${comscore}</span>
            </div>
        
        `)
        comscore = 0;
        yourscore = 0;
    } else if (comscore == 10) {
        winnerModal.style.display = "block";
        winnertitle.innerText = "*** YOU LOSE ***"
        winnertitle.insertAdjacentHTML("beforeend",
        `
            <div class="winner-score-modal">
            <div class="your-score-wrapper">
                <span class="y-score">Your Score: ${yourscore}</span>
            </div>
            <div class="Com-score-wrapper">
                <span class="c-score">Your Score: ${comscore}</span>
            </div>
        
        `)

        comscore = 0;
        yourscore = 0;

    }
}

const winnerModal = document.getElementById("winnerModal");
const winnerClose = document.getElementsByClassName("closeWinner")[0];


winnerClose.onclick = function () {
    winnerModal.style.display = "none";
}

