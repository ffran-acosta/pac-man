const volume = document.getElementById("volume")
const mute = document.getElementById("mute")
const play = document.getElementById("play")
const pause = document.getElementById("pause")
const restart = document.getElementById("restart")

const changeButton = (btn1, btn2) => {
    btn1.classList.add("hidden")
    btn2.classList.remove("hidden")
}

volume.addEventListener("click", () => {
    changeButton(volume, mute)
})

mute.addEventListener("click", () => {
    changeButton(mute, volume)
})

pause.addEventListener("click", () => {
    changeButton(pause, play)
})

play.addEventListener("click", () => {
    changeButton(play, pause)
})

restart.addEventListener("click", () => {
    window.location.reload()
})