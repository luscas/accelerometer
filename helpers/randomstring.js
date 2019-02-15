module.exports = function(length) {
	var text = ''
	var possible = 'abcdefghijklmnopqrstuvwxyz'

	for(var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}

	return text
}