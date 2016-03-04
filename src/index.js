var expect = require('expectations');

function nextItem(queue, complete) {
	if (queue.length === 0) {
		if (complete) {
			complete();
		}
	} else {
		runQueue(queue, complete);
	}
};

function runQueue(queue, complete) {
	var next = queue.shift();

	if (next) {
		if (next.then) {
			next.then(function() {
				nextItem(queue, complete);
			});
		} else {
			next().then(function() {
				nextItem(queue, complete);
			})
		}
	}
};

module.exports = function jasmineSpec(spec) {
	var queue = [];

	var utils = {
		describe: describe,
		beforeEach: function (fn) {
			beforeEach(function(done) {
				fn();
				queue.length ? runQueue(queue, done) : done();
			});
		},
		afterEach: function (fn) {
			afterEach(function(done) {
				fn();
				queue.length ? runQueue(queue, done) : done();
			});
		},
		it: function (title, fn) {
			it(title, function (done) {
				this.timeout(5000);
				fn();
				queue.length ? runQueue(queue, done) : done();
			})
		},
		expect: expect,
		runs: function (fn) {
			queue.push(function() {
				fn();
				return Promise.resolve();
			});
		},
		waitsFor: function (fn, error, time) {
			queue.push(function() {
				return new Promise(function (resolve, reject) {
					setTimeout(function () {
						fn();
						resolve();
					}, time);
				});
			});
		},
		waits: function (time) {
			queue.push(function() {
				return new Promise(function (resolve, reject) {
					setTimeout(function () {
						resolve();
					}, time);
				});
			});
		}
	};
	spec(utils);
	runQueue(queue, null);
};
