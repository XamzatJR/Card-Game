const timer = document.querySelector('.timer'),
    startBtn = document.querySelector('.start_btn'),
    gameBoard = document.querySelector('#gameboard'),
    cards = document.querySelectorAll('.card'),
    counter = document.querySelector('.counter')

    function clearBoard() {
        cards.forEach(item => {
            item.classList.add('default');
            item.setAttribute('disabled','disabled');
        })
    }

    function startGame() {
        startBtn.addEventListener('click', () => {
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
        })  
    }

    function Timer(sec = 0, min = 0) {
        setInterval(() => {
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


clearBoard()
startGame();
