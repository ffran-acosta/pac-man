const scoreObject = []
const scoreData = () => {
    let name = window.prompt('Name: ')
    scoreObject.push({ name: name, score: score.firstChild.data })
    sendScore()
}

const sendScore = async () => {
    let data = JSON.stringify(scoreObject)
    await fetch('http://localhost:7001/pacman/api/score', {
        method: "POST",
        body: data,
        headers:
        {
            "Content-Type": "application/json"
        },
    })
}

module.exports = scoreData