const Koa = require('koa');
const app = new Koa();
const User = require('../models/User.js');
const mongoose = require('mongoose');
const sendMail = require('../mail/libs/sendMail');

exports.get = async function(ctx) {
  ctx.body = ctx.render('register.pug');
};

exports.post = async (ctx, next) => {

	let userCheck = await User.findOne({email: ctx.request.body.email});
	if(userCheck) {
		if(userCheck.email) {

			ctx.flash('error', 'Your email\'ve been already registered');
			return;

		}
	}
	let result;

	if(!ctx.request.body.email || !ctx.request.body.password) {

		result = errorHandler(400);
		ctx.status = result.status;
		ctx.body = result.body;
		return;
	};

	const user = new User({
			email: ctx.request.body.email,
			verifiedToken: mongoose.Types.ObjectId()
	});
	await user.setPassword(ctx.request.body.password);

	await user.save()
		.then(async result => {

			const transportResponse = await sendMail({

			  template:     'hello',
			  subject:     	'Привет',
			  to:           result.email,
			  name:         'Someone',
			  authcode:		result.verifiedToken.toString()
		});

			return transportResponse;
		})
		.then(async result => {

			ctx.flash('success', 'We\'ve sent you a message. You should confirm your email');
      return result;

		})
		.then(async result => {

			return await ctx.redirect('/', (ctx, next) => {});
		})
		.catch(err => ctx.throw(err) );
};
