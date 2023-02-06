const { all, write, generate } = require('../../models/scores.models');

const controller = {
    scoreData: (req, res) => {
        let info = req.body[0]
        console.log(info)
        let newScore = generate(info)
        let allScores = all()
        allScores.push(newScore)
        write(allScores)
        res.render('pacman-score')
    }
}

module.exports = controller