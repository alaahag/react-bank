const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction.js');

/* SANITY CHECK */
router.get('/sanity', function(req, res) {
	//200 = OK
	res.sendStatus(200);
});
/* END OF SANITY CHECK */

router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

router.post('/transaction', async function(req, res) {
	try {
		const transaction = new Transaction({ ...req.body });
		await transaction.save();
		res.send(transaction);
	}
	catch (error) {
		console.log(error);
		res.send(null);
	}
});

router.get('/transactions', async function(req, res) {
	try {
		const transaction = await Transaction.find({});
		res.send(transaction);
	}
	catch (error) {
		console.log(error);
		res.send(null);
	}
});

router.get('/breakdown', async function(req, res) {
	try {
		const breakdown = await Transaction.aggregate([{ $group: { _id: "$category", total: { $sum: "$amount" } } },{ $sort: { category: 1 } }]);
		res.send(breakdown);
	}
	catch (error) {
		console.log(error);
		res.send(null);
	}
});

router.delete('/transaction/:transactionID', async function(req, res) {
	try {
		console.log(req.params);
		const transaction = await Transaction.findByIdAndRemove({ _id: req.params.transactionID });
		res.send(transaction);
	}
	catch (error) {
		console.log(error);
		res.send(null);
	}
});

module.exports = router;