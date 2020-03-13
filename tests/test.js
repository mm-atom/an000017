const test = require('ava');

const { default: a } = require('../dist/index');

test('redis get', async (t) => {
	const v = await a('key', 'value');
	t.is(v, 'value');
});
