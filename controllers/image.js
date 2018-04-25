const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'cf8647f6dda844a5909fe8cd6e69bcb5'
});

const handleApiCall = (req,res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	let found = false;
	db('users')
			.where('id', '=', id)
			.increment('entries', 1)
			.returning('entries')
			.then(entries => {
				res.json(entries[0])
			})
			.catch(err =>  res.status(400).json('unable to ger entries'));
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
};