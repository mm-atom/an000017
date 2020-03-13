import { getLogger } from 'log4js';
import { createClient } from 'redis';
import config from '@mmstudio/config';

const logger = getLogger();
const REDIS = config.redis;

export default function an17<T>(key: string, defalt_value?: T) {
	return new Promise<T | null>((resolve, reject) => {
		const client = open();
		// client.expire(key, REDIS.EXPIRATION);	// ? Do we need this?
		client.get(key, (error: Error, res: string) => {
			if (error) {
				reject(error);
			} else if (res === undefined || res === 'undefined' || res === null) {
				resolve(defalt_value);
			} else {
				resolve(JSON.parse(res) as T);
			}
		});
	});
}

function open() {
	const client = createClient(REDIS.url);
	client.on('error', (e) => {
		logger.error(e);
		logger.error('Redis Error thrown, process will exit with code -1');
		process.exit(-1);
	});
	return client;
}
