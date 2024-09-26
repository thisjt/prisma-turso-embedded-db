import http from 'http';

import prisma, { libsql } from './prisma';

const httpServer = http.createServer({}, async (request, response) => {
	const url = new URL(`${request.url}`, `http://${request.headers.host}`);
	response.writeHead(200, { 'content-type': 'application/json' });

	if (url.pathname === '/save') {
		const id = parseInt(url.searchParams.get('id') || '') || 0;
		const value = url.searchParams.get('value') || '';
		const dateTime = new Date();

		if (id) {
			const data = await prisma.notes.update({
				data: {
					text: value,
					time: dateTime,
				},
				where: {
					id,
				},
			});
			response.end(JSON.stringify(data));
		} else {
			const data = await prisma.notes.create({
				data: {
					text: value,
					time: dateTime,
				},
			});
			response.end(JSON.stringify(data));
		}
	} else if (url.pathname === '/load') {
		const data = await prisma.notes.findMany();
		response.end(JSON.stringify(data));
	} else if (url.pathname === '/sync') {
		await libsql.sync();
		response.end(JSON.stringify({ sync: true }));
	}
});

httpServer.listen(3010, () => {
	console.log('Listening to 3010');
});
