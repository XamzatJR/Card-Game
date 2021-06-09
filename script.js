const timer = document.querySelector('.timer'),
    startBtn = document.querySelector('.start_btn'),
    gameBoard = document.querySelector('#gameboard'),
    cards = document.querySelectorAll('.card'),
    counter = document.querySelector('#counter'),
    cardsBack = document.querySelectorAll('.card_back'),
    cardsArr = ['печение','акула','собака','волк','титан','берсерк','печение','акула','собака','волк','титан','берсерк'];
    let hasActiveCard = false;
    let firstCard, secondCard,interval,result,num = 0;
    function clearBoard() {
        cards.forEach(item => {
            item.classList.add('default');
            item.setAttribute('disabled','disabled');
        })
    }
    function setBack() {
        cardsArr.sort(function () { return Math.random() - 0.5; });
        for (let i = 0; i < cardsBack.length;i++) {
            cardsBack[i].textContent = cardsArr[i];
        }
    }

    function startGame() {
        if (result) result.remove()
        cards.forEach(card => card.addEventListener('click', activateCard));
        counter.textContent = 0
        num = 0;
            setBack()
            timer.textContent = Timer()
            gameBoard.classList.remove('GameBord_hide');
            gameBoard.classList.add('GameBord');
            startBtn.setAttribute('disabled','disabled');
            startBtn.classList.add('start_btn_hide','default');
            cards.forEach(item => {
                item.classList.remove('default')
                item.classList.add('pointer');
                item.removeAttribute('disabled');
            }) 
    }

    function Timer(sec = 0, min = 0) {
        interval = setInterval(() => {
            sec++;
            timer.textContent = sec
            if (sec < 10) {
            timer.textContent = `0${min}:0${sec}`
        } 
        if (sec >= 10) {
            timer.textContent = `0${min}:${sec}`
        } 
        if (sec > 59) {
            sec = 0;
            min++;
            timer.textContent = `0${min}:0${sec}`
        }

        },1000)
}


function activateCard() {
    this.classList.add('card_active')
    if (!hasActiveCard) {
        hasActiveCard = true;
        firstCard = this;
        return
    }
    secondCard = this;
    hasActiveCard = false;
   checkCards()
}

function checkCards() {
    cards.forEach(item => {
        if (item != firstCard && item != secondCard) {
            item.setAttribute('disabled','disabled');
            item.classList.add('default');
        }
    })
    if (firstCard.textContent == secondCard.textContent) {
        num+=2;
        counter.textContent = num;
        disableCards()
    }

    deactivateCard()
} 
function disableCards() {
    firstCard.removeEventListener('click', activateCard)
    secondCard.removeEventListener('click', activateCard)
    setTimeout(() => {
        firstCard.classList.add('card_disable','default')
        secondCard.classList.add('card_disable','default')
    },500)
    
}
function deactivateCard() {
    setTimeout(() => { 
        cards.forEach(item => {
            item.removeAttribute('disabled');
            item.classList.remove('default')
        })
        firstCard.classList.remove('card_active','pointer');
        secondCard.classList.remove('card_active','pointer');
        if (counter.textContent == 12) restartGame()
    }, 1400)
    
    
}
function restartGame() {
    clearInterval(interval);
    result = document.createElement('div');
    result.textContent = `Ваш результат: ${timer.textContent}`
    result.classList.add('result')
    gameBoard.before(result);
    startBtn.removeAttribute('disabled')
    startBtn.classList.remove('start_btn_hide','default');
    gameBoard.classList.add('GameBord_hide')
    clearBoard()
    cards.forEach(item => {
        item.classList.remove('card_disable')
    })
}

clearBoard()

startBtn.addEventListener('click', startGame)

