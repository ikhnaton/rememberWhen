const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const Jimp = require('jimp');
const app = express();
const defaultPort = 9999;

// app.use(bodyParser.json()); // has no limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use("/", require('../routes'));

app.post('/process_image/?', (req, res) => {
	// console.log(req.headers);
	// console.log(req.body);
	let imageB64 = req.body.imageBase64;
	const image = Buffer.from(req.body.imageBase64, 'base64');

	const idx0 = 0;
	const idx1 = 1;
	const idx2 = 2;
	const ar1to1 = 1.0;
	const prefAspectRatios = [ar1to1];
	axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAej2COhQ1bffGrHWRyLpkMmMg7GJ3OIc8', {
		"requests": [
			{
				"image": {
					"content": imageB64
				},
				"features": [
					{
						"type": "IMAGE_PROPERTIES"
					},
					{
						"type": "CROP_HINTS"
					}
				],
				"imageContext": {
					"cropHintsParams": {
						"aspectRatios": prefAspectRatios
					}
				}
			}
		]
	}).
		then(response => {
			// console.log(response.headers);
			// console.log(response.data);
			const vxs = response.data.responses[idx0].cropHintsAnnotation.cropHints[idx0].boundingPoly.vertices;
			const zeroPx = 0;
			const y1 = vxs[idx0] && vxs[idx0].y ? vxs[idx0].y : zeroPx;
			const x2 = vxs[idx1] && vxs[idx1].x ? vxs[idx1].x : zeroPx;
			const y2 = vxs[idx2] && vxs[idx2].y ? vxs[idx2].y : zeroPx;
			const x1 = vxs[idx0] && vxs[idx0].x ? vxs[idx0].x : zeroPx;

			Jimp.read(image, (errRead, img) => {
				if (errRead) {
					console.error(errRead);
					return;
				}
				const w = img.bitmap.width;
				const h = img.bitmap.height;
				img.crop(x1, y1, x2 - x1, y2 - y1);
				img.resize(400, 400);
				new Jimp(800, 500, 0x0000FFFF, (errNew, newImg) => {
					if (errNew) {
						console.error(errNew);
						return;
					}

					newImg.blit(img, 200, 50);
					Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then((font) => {
						newImg.print(font, 280, 10, "Happy Birthday");
						newImg.getBuffer(Jimp.AUTO, (errGB, buffer) => {
							if (errGB) {
								console.error(errGB);
								return;
							}
							imageB64 = Buffer.from(buffer).toString('base64');
							res.send(imageB64);
							res.end();
						});
					});
				});
			});
		});
});

const port = process.env.PORT || defaultPort;
http.createServer(app).listen(port, () =>
{
	console.log(`Server started on http://localhost:${port}`);
});
