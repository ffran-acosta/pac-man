// const pool = require('../data/db-railways')
const pool = require('../data/db-local')

const controller = {
    home: (req, res) => {
        res.render("pacman-home")
    },
    pacman: (req, res) => {
        res.render("pacman-game")
    },
    score: async (req, res) => {
        try {
            const data = await pool.query('SELECT * FROM pacman_scores')
            const scores = data.rows
            res.render("pacman-score", { scores })
        } catch (error) {
            console.log(error);
        }
    },
    scoreSave: async (req, res) => {
        const score = req.body
        try {
            const newScore = await pool.query('INSERT INTO pacman_scores(name, score) VALUES($1, $2)', [score[0].name, score[0].score])
            res.json(newScore)
        } catch (error) {
            console.log(error);
        }
    },
    exit: (req, res) => {
        res.redirect("https://ffran-acosta.up.railway.app/")
    }
}

module.exports = controller