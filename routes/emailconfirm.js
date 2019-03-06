
const User = require('../models/User.js');
const mongoose = require('mongoose');


exports.get = async (ctx) => {

	let authCode = ctx.params.authCode;
	if (!mongoose.Types.ObjectId.isValid(authCode)) {
    ctx.throw(404);
   	return;
  }

	let user = await User.findOne({verifiedToken: authCode});
console.log(user	);
	if(!user) {
		ctx.throw(400);
		return;
	}


	await User.update({verifiedToken: authCode}, {$set: {verifiedToken: ''}})
	.then(async result => {
	console.log(result);

		ctx.session.messages = { message: { message: 'Email successful confirmed' } }
	})
	.catch(err => console.error(err) );

	await ctx.login(user)
	.catch(err => console.error(err));

	ctx.redirect('/');

}