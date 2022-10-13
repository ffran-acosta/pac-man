const controller = {
    home: (req, res) => {
        res.render("pacman-home")
    },
    pacman: (req, res) => {
        res.render("pacman-game")
    },
    score: (req, res) => {
        res.render("pacman-score")
    },
    exit: (req, res) => {
        res.redirect("http://localhost:7000/")
    }
}

module.exports = controller