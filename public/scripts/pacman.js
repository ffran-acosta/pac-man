document.addEventListener("DOMContentLoaded", () => {

    const scoreDisplay = document.getElementById("score")
    const width = 28
    let score = 0

    const grid = document.querySelector(".grid")
    const layout = [
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
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
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
    ];
    //Description:
        // 0: Pac-dot
        // 1: wall
        // 2: ghost-lair
        // 3: power-pallet
        // 4: empty
    const squares = []
    
    const createBoard = () => {
        for (let i = 0; i < layout.length; i++){
            const square = document.createElement("div")
            grid.appendChild(square)
            squares.push(square)

            if(layout[i] === 0) {
                squares[i].classList.add("pac-dot")
            } else if (layout[i] == 1) {
                squares[i].classList.add("wall")
            } else if (layout[i] == 2) {
                squares[i].classList.add("ghost-lair")
            } else if (layout[i] == 3) {
                squares[i].classList.add("power-pellet")
            }
        }
    }
    createBoard()

    // PAC-MAN-----------------------------------------------------------

    // Starting position of PAC-MAN
    let pacmanCurrentIndex = 490
    squares[pacmanCurrentIndex].classList.add("pac-man")

    //PAC-MAN movment
    const movePacman = (e) => {
        squares[pacmanCurrentIndex].classList.remove("pac-man")

        switch(e.keyCode){
            //left arrow
            case 37:
                if(
                    pacmanCurrentIndex % width !== 0 && 
                    !squares[pacmanCurrentIndex - 1].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex - 1].classList.contains("ghost-lair")
                ) 
                    pacmanCurrentIndex -= 1
                //pacman left exit
                if (squares[pacmanCurrentIndex - 1] === squares[363]) pacmanCurrentIndex = 391
                break
            //up arrow
            case 38:
                if(
                    pacmanCurrentIndex - width >= 0 && 
                    !squares[pacmanCurrentIndex - width].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")
                ) 
                    pacmanCurrentIndex -= width
                break
            //right arrow
            case 39:
                if(
                    pacmanCurrentIndex % width < width - 1 && 
                    !squares[pacmanCurrentIndex + 1].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex + 1].classList.contains("ghost-lair")
                ) 
                    pacmanCurrentIndex += 1
                //pacman right exit
                if (squares[pacmanCurrentIndex + 1] === squares[392])pacmanCurrentIndex = 364
                break
            //down arrow
            case 40:
                if(
                    pacmanCurrentIndex + width < width * width && 
                    !squares[pacmanCurrentIndex + width].classList.contains("wall") &&
                    !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")
                ) 
                pacmanCurrentIndex += width 
                break
        }
        squares[pacmanCurrentIndex].classList.add("pac-man")
        pacEat()
        powerPellet()
        checkForGameOver()
        checkForWin()
        
    }
    document.addEventListener("keydown", movePacman)

    //pacman EATS a pac-dot
    const pacEat = () => {
        if(squares[pacmanCurrentIndex].classList.contains("pac-dot")){
            score++
            scoreDisplay.innerHTML = score
            squares[pacmanCurrentIndex].classList.remove("pac-dot")
        }
    }

    //pacman EATS a power pallet
    const powerPellet = () => {
        if(squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
            console.log("hola");
            score += 10
            ghosts.forEach(ghost => ghost.isScared = true)
            setTimeout(unscare, 10000)
            squares[pacmanCurrentIndex].classList.remove("power-pellet")
        }
    }

    //ghost unscare
    const unscare = () => {
        ghosts.forEach(ghost => ghost.isScared = false)
    }

    // GHOSTS ---------------------------------------------------------------------------------------
    // template
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
    ghosts = [
        new Ghost('blinky', 348, 100),
        new Ghost('pinky', 376, 100),
        new Ghost('inky', 351, 200),
        new Ghost('clyde', 379, 200)
        ]

    // draw
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add("ghost")
    });

  //move the Ghosts randomly
    ghosts.forEach(ghost => moveGhost(ghost))

    function moveGhost(ghost) {
        const directions =  [-1, +1, width, -width]
        let direction = directions[Math.floor(Math.random() * directions.length)]

        ghost.timerId = setInterval(function() {
        //if the next squre your ghost is going to go to does not have a ghost and does not have a wall
        if(!squares[ghost.currentIndex + direction].classList.contains('ghost') &&
            !squares[ghost.currentIndex + direction].classList.contains('wall') ) {
            //remove the ghosts classes
            squares[ghost.currentIndex].classList.remove(ghost.className)
            squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
            //move into that space
            ghost.currentIndex += direction
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        //else find a new random direction ot go in
        } else direction = directions[Math.floor(Math.random() * directions.length)]

        //if the ghost is currently scared
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }

        //if the ghost is currently scared and pacman is on it
        if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            score +=100
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        }
        checkForGameOver()
        }, ghost.speed)
    }

    //check for a game over
    const checkForGameOver = () =>  {
        if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
            !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePacman)
            setTimeout(function(){ alert("Game Over"); }, 500)
        }
    }

     //check for a win - more is when this score is reached
    const checkForWin = () => {
        if (score === 274) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId))
            document.removeEventListener('keyup', movePacman)
            setTimeout(function(){ alert("You have WON!"); }, 500)
            }
        }
})

