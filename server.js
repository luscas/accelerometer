const app    = require('express')()
const server = require('http').Server(app)
const io     = require('socket.io')(server)
const jade   = require('jade')

let port = 3000

server.listen(port, () => {
	console.log(`Listen http://localhost:${port}`)
	console.log('Server started.')
})

app.get('/', (req, res, next) => {
	// generate id
	var id = require('./helpers/randomstring')(3)
	id = 'abc'
	var room = io.of('/' + id);

	room.on('connection', (socket) => {
		var ready = false

		socket.on('movement', (data) => {
			if (!ready) {
				room.emit('connected')
				ready = true
			}

			room.emit('updateBall', data)
		})
	})
	
	try {
		res.send(jade.compileFile(__dirname + '/templates/game.jade')({
			id: id,
			title: 'Game',
			host: req.hostname,
			port: port
		}))
	} catch (e) {
		next(e)
	}
})

app.get('/:id', (req, res, next) => {	
	try {
		res.send(jade.compileFile(__dirname + '/templates/controller.jade')({
			id: req.params.id,
			title: 'Controller',
			host: req.hostname,
			port: port
		}))
	} catch (e) {
		next(e)
	}
})