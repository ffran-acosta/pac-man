const volume = document.getElementById("volume")
const mute = document.getElementById("mute")
// const play = document.getElementById("play")
// const pause = document.getElementById("pause")
const restart = document.getElementById("restart")

let startAudio = new Audio('../sounds/start.mp3')
let wakaWakaAudio = new Audio('../sounds/waka-waka.mp3')
let powerPallet = new Audio('../sounds/power-pallet.mp3')
let gameOverAudio = new Audio('../sounds/game-over.mp3')

const changeButton = (btn1, btn2) => {
    btn1.classList.add("hidden")
    btn2.classList.remove("hidden")
}

volume.addEventListener("click", () => {
    changeButton(volume, mute)
    wakaWakaAudio.volume = 0
})

mute.addEventListener("click", () => {
    changeButton(mute, volume)
})

// pause.addEventListener("click", () => {
//     changeButton(pause, play)
// })

// play.addEventListener("click", () => {
//     changeButton(play, pause)
// })

restart.addEventListener("click", () => {
    window.location.reload()
})