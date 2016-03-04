"use strict";

const expect = require('chai').expect;
const jasmineSpec = require('../src');

describe('jasmineSpec tests', () => {
	describe('jasmineSpec utils initialisation', () => {
		it('should provide a utils object via paramater', () => {
			jasmineSpec(utils => {
				expect(utils).to.not.equal(null);
				expect(utils).to.be.a.object;
			})
		});
		it('should have a valid describe method in utils object', () => {
			jasmineSpec(utils => {
				const _describe = utils.describe;

				expect(_describe).to.not.equal(null);
				expect(_describe).to.be.a.function;
			})
		});
		it('should have a valid beforeEach method in utils object', () => {
			jasmineSpec(utils => {
				const beforeEach = utils.beforeEach;

				expect(beforeEach).to.not.equal(null);
				expect(beforeEach).to.be.a.function;
			})
		});
		it('should have a valid afterEach method in utils object', () => {
			jasmineSpec(utils => {
				const afterEach = utils.afterEach;

				expect(afterEach).to.not.equal(null);
				expect(afterEach).to.be.a.function;
			})
		});
		it('should have a valid it method in utils object', () => {
			jasmineSpec(utils => {
				const _it = utils.it;

				expect(_it).to.not.equal(null);
				expect(_it).to.be.a.function;
			})
		});
		it('should have a valid waits method in utils object', () => {
			jasmineSpec(utils => {
				const waits = utils.waits;

				expect(waits).to.not.equal(null);
				expect(waits).to.be.a.function;
			})
		});
		it('should have a valid waitsFor method in utils object', () => {
			jasmineSpec(utils => {
				const waitsFor = utils.waitsFor;

				expect(waitsFor).to.not.equal(null);
				expect(waitsFor).to.be.a.function;
			})
		});
		it('should have a valid runs method in utils object', () => {
			jasmineSpec(utils => {
				const runs = utils.runs;

				expect(runs).to.not.equal(null);
				expect(runs).to.be.a.function;
			})
		});
		it('should have a valid expect method in utils object', () => {
			jasmineSpec(utils => {
				const _expect = utils.expect;

				expect(_expect).to.not.equal(null);
				expect(_expect).to.be.a.function;
			})
		});
		it('the describe method in utils object should match global Mocha describe', () => {
			jasmineSpec(utils => {
				const _describe = utils.describe;

				expect(_describe).to.equal(global.describe);
			})
		});
		it('the expect method in utils object should match expectations libarary', () => {
			jasmineSpec(utils => {
				const _expect2 = require('expectations');
				const _expect = utils.expect;

				expect(_expect).to.equal(_expect2);
			})
		})
	});
	describe('expects the Jasmine "it" to work as expected', () => {
		jasmineSpec(utils => {
			let value = false;

			utils.it('with a sync "it" test', () => {
				value = true;
				expect(value).to.equal(true);
			})

			utils.it('with an async "it" test that uses waitsFor and waits', () => {
				utils.waits(100);

				utils.waitsFor(function() {
					value = true;
				}, 100);

				utils.runs(() => {
					expect(value).to.equal(true);
				})
			})
		})
	});
	describe('expects the Jasmine "beforeEach" to work as expected', () => {
		describe('with a sync test', () => {
			jasmineSpec(utils => {
				let value = false;

				utils.beforeEach(() => {
					value = true;
				});
				utils.it('with a sync "beforeEach" test', () => {
					expect(value).to.equal(true);
				});
			});
		});
		describe('with an async test', () => {
			jasmineSpec(utils => {
				let value = false;

				utils.beforeEach(() => {
					utils.waits(100);
					utils.runs(() => {
						value = true;
					});
				});
				utils.it('with an async "beforeEach" test', () => {
					expect(value).to.equal(true);
				});
			});
		});
	});
	describe('expects the Jasmine "afterEach" to work as expected', () => {
		describe('with a sync test', () => {
			jasmineSpec(utils => {
				let value = true;

				utils.afterEach(() => {
					value = false;
				});
				utils.it('with a sync "afterEach" test', () => {
					expect(value).to.equal(true);
				});
			});
		})
		describe('with an async test', () => {
			jasmineSpec(utils => {
				let value = true;

				utils.afterEach(() => {
					utils.waits(100);
					utils.runs(() => {
						value = true;
					});
				});
				utils.it('with an async "afterEach" test', () => {
					expect(value).to.equal(true);
				});
			});
		});
	});
});
