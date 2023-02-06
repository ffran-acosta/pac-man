const { all } = require("../models/scores.models")

const controller = {
    home: (req, res) => {
        res.render("pacman-home")
    },
    pacman: (req, res) => {
        res.render("pacman-game")
    },
    score: (req, res) => {
        let scores = all()
        return res.render('pacman-score', { scores })
    },
    exit: (req, res) => {
        res.redirect("http://localhost:7000/")
    }
}

module.exports = controller