document.addEventListener('DOMContentLoaded', () => {

  //SOUNDS
  const startAudio= new Audio('../sounds/start.mp3')
  const wakaWakaAudio = new Audio('../sounds/waka-waka.mp3')
  const powerPallet = new Audio('../sounds/power-pallet.mp3')
  const gameOverAudio = new Audio('../sounds/game-over.mp3')
  const mute = document.getElementById("mute")
  const volume = document.getElementById("volume")
  startAudio.volume = .5
  wakaWakaAudio.volume = .2
  powerPallet.volume = .5
  gameOverAudio.volume = .5
  volume.addEventListener("click", () => {
    startAudio.volume = 0
    wakaWakaAudio.volume = 0
    powerPallet.volume = 0
    gameOverAudio.volume = 0
  })
  mute.addEventListener("click", () => {
    startAudio.volume = 0.2
    wakaWakaAudio.volume = 1
    powerPallet.volume = 1
    gameOverAudio.volume = 1
  })

  //SCORE
  const scoreDisplay = document.getElementById('score')
  let score = 0
  let pacDotEatenCount = 0
  
  const grid = document.querySelector('.grid')
  const width = 28
  
  const board = [
    // 0:PAC-DOTS  1:WALL 2:GHOST-LAIR  3:POWER-PELLET  4:EMPTY
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,2,2,2,2,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]

  //CREATE BOARD
  const squares = []
  const createBoard = () => {
    for (let i = 0; i < board.length; i++) {
      const square = document.createElement('div')
      grid.appendChild(square)
      squares.push(square)
      let boardLayout = board[i]
      if(boardLayout === 0) {
        squares[i].classList.add('pac-dot')
      } else if (boardLayout === 1) {
        squares[i].classList.add('wall')
      } else if (boardLayout === 2) {
        squares[i].classList.add('ghost-lair')
      } else if (boardLayout === 3) {
        squares[i].classList.add('power-pellet')
      }
    }
  }
  createBoard()
  startAudio.play()
  //DRAW PAC-MAN INTO THE BOARD
  let pacmanCurrentIndex = 490
  squares[pacmanCurrentIndex].classList.add('pac-man')

  //MOVE PAC-MAN
  const movePacman = (e) => {
    squares[pacmanCurrentIndex].classList.remove('pac-man')   
    switch(e.keyCode) {
      //LEFT-ARROW
      case 37:
        if(
          pacmanCurrentIndex % width !== 0
          && !squares[pacmanCurrentIndex -1].classList.contains('wall') 
          && !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')
        ) { pacmanCurrentIndex -= 1 }

        if (squares[pacmanCurrentIndex -1] === squares[363]) {
          pacmanCurrentIndex = 391
        }
        break

      //UP-ARROW
      case 38:
        if(
          pacmanCurrentIndex - width >= 0 
          && !squares[pacmanCurrentIndex -width].classList.contains('wall')
          && !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair')
        ) { pacmanCurrentIndex -= width }
        break

      //RIGHT-ARROW
      case 39:
        if(
          pacmanCurrentIndex % width < width - 1 
          && !squares[pacmanCurrentIndex +1].classList.contains('wall') 
          && !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')
        ) { pacmanCurrentIndex += 1 }

        if (squares[pacmanCurrentIndex +1] === squares[392]) {
          pacmanCurrentIndex = 364
        }
        break

      //DOWN-ARROW
      case 40:
        if (
          pacmanCurrentIndex + width < width * width 
          && !squares[pacmanCurrentIndex +width].classList.contains('wall') 
          && !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair')
        ) { pacmanCurrentIndex += width }
        break
    }
    squares[pacmanCurrentIndex].classList.add('pac-man')
    pacDotEaten()
    powerPelletEaten()
    checkForGameOver()
    checkForWin()
  }
  document.addEventListener('keyup', movePacman)

  //EAT A PAC-DOT
  const pacDotEaten = () => {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
      pacDotEatenCount++
      score++
      scoreDisplay.innerHTML = score
      squares[pacmanCurrentIndex].classList.remove('pac-dot')
      wakaWakaAudio.play()
    }
  }

  //EAT POWER PELLET
  const powerPelletEaten = () => {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
      powerPallet.play();
      score +=10
      ghosts.forEach(ghost => ghost.isScared = true)
      setTimeout(unScareGhosts, 10000)
      squares[pacmanCurrentIndex].classList.remove('power-pellet')
    }
  }

  //GHOST SCARED RESET
  const unScareGhosts = () => {
    ghosts.forEach(ghost => ghost.isScared = false)
  }

  //GHOST CONTRSTRUCTOR
  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.isScared = false
      this.timerId = NaN
    }
  }

  //CREATE GHOST
  ghosts = [
    new Ghost('blinky', 348, 200),
    new Ghost('pinky', 376, 150),
    new Ghost('inky', 351, 150),
    new Ghost('clyde', 379, 200)
    ]

  //DRAW GHOST INTO THE BOARD
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
    })

  //MOVE GHOST
  ghosts.forEach(ghost => moveGhost(ghost))

  function moveGhost(ghost) {
    const directions =  [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {
      //CHECK FOR WALL AND GHOST FOR NEXT MOVE
      if  (!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
        !squares[ghost.currentIndex + direction].classList.contains('wall') ) {

          //REMOVE GHOST CLASS 
          squares[ghost.currentIndex].classList.remove(ghost.className)
          squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')

          //ADD GHOST CLASS IN NEW SQUARE
          ghost.currentIndex += direction
          squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')

      //IF WALL OR GHOST, FIND NEW DIRECTION
      } else direction = directions[Math.floor(Math.random() * directions.length)]

      //ADD SCARED CLASS
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost')
      }

      //PAC-MAN EATS SCARED GHOST
      if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex
        score +=100
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      }

    checkForGameOver()
    }, ghost.speed)
  }

  //CHECK FOR A GAME OVER
  const checkForGameOver =() => {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
      !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
      gameOverAudio.play()
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(() => { alert("Game Over"), scoreData() }, 500)
    }
  }

  //CHECK FOR WIN
  const checkForWin = () => {
    if (pacDotEatenCount === 234) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', movePacman)
      setTimeout(() => { alert("You have WON!"), scoreData() }, 500)
    }
  }
})

const scoreObject = []
const scoreData = () => {
  let name = window.prompt('Name: ')
  scoreObject.push({ name: name, score: score.firstChild.data }) 
  sendScore()
}

const sendScore = async () => {
  let data = JSON.stringify(scoreObject)
  await fetch('https://pac-man.up.railway.app/pacman/score/save', {
    method: "POST",
    body: data,
    headers:
    {
      "Content-Type": "application/json"
    },
  })
}
