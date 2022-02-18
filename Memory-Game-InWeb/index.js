 cardsArray = [{
    'name': 'cplus',
    'img': 'Images/cplus.jpg',
  },
  {
    'name': 'csharp',
    'img': 'Images/csharp.png',
  },
  {
    'name': 'java',
    'img': 'Images/java.png',
  },
  {
    'name': 'css',
    'img': 'Images/css.png',
  },
  {
    'name': 'js',
    'img': 'Images/js.png',
  },
  {
    'name': 'php',
    'img': 'Images/php.png',
  },
  {
    'name': 'python',
    'img': 'Images/python.jpg',
  },
  {
    'name': 'html',
    'img': 'Images/html.png',
  },
  {
    'name': 'css',
    'img': 'Images/css.png',
  },
  {
    'name': 'sql',
    'img': 'Images/SQL.jpg',
  },
  {
    'name': 'coin',
    'img': 'Images/docker.png',
  },
  {
    'name': 'goomba',
    'img': 'Images/angular.png',
  },
];

var t=timer();

let ev=null;

const gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;
    
    var selected = document.querySelectorAll('.selected');
    selected.forEach(card => {
      card.classList.remove('selected');
    });
 
};

grid.addEventListener('click', event => {
  ev=event;
  const clicked = event.target;

  if (clicked.nodeName === 'SECTION' ||clicked === previousTarget ||
      clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
   
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});

document.getElementById("bb").addEventListener("click", timer);

function timer() {
  var audio=new Audio('Audio/countdown.wav');
  var sec = 4;

  function updateSec() {
    sec--;
    if (sec < 10) {
      document.querySelector("text").innerHTML = `&nbsp${sec}`;
    } else {
      document.querySelector("text").innerHTML = sec;
    }
    if(sec==8){
      audio.play();
      console.log(audio );
    }
    if (sec === 0) {
      stopTimer();
      audio.pause();
    }
  }
  updateSec();

  var interval = setInterval(updateSec, 1000);

  function stopTimer() {
    clearInterval(interval);
  }
}


