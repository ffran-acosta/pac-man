const port = process.env.PORT || 7001
const start = () => (console.log(`Starting PAC-MAN =>  http://localhost:${port}/pacman`))

module.exports = {port, start}