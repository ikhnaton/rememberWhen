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
	const color1 = req.body.color1;
	console.log(color1);

	const idx0 = 0;
	const idx1 = 1;
	const idx2 = 2;
	// const ar1to1 = 1.0;
	const ar110to85 = 1.294;
	const prefAspectRatios = [ar110to85];
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
				const w = 1700;
				const h = 2200;
				const backgroundTop = parseInt('0x'+color1.substring(1)+'ff', 16);
				img.crop(x1, y1, x2 - x1, y2 - y1);
				img.resize(550, 425);
				new Jimp(w, h, backgroundTop, (errNew, newImg) => {
					if (errNew) {
						console.error(errNew);
						return;
					}

					newImg.blit(img, 400, 100);
					const squareSize = 10;
					const blackHex = 0x000000FF;
					const whiteHex = 0xFFFFFFFF;
					for (let x=0; x < w; x++) {
						for (let y=0; y < h; y++) {
							if (x < 20 || x >= w-20 || y < 20 || y >= h-20) {
								if (x%(2*squareSize) < squareSize) {
									if (y % (2 * squareSize) < squareSize) {
										newImg.setPixelColor(blackHex, x, y);
									} else {
										newImg.setPixelColor(whiteHex, x, y);
									}
								} else {
									if (y % (2 * squareSize) < squareSize) {
										newImg.setPixelColor(whiteHex, x, y);
									} else {
										newImg.setPixelColor(blackHex, x, y);
									}
								}
							}
						}
					}
					Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then((font) => {
						newImg.print(font, 600, 40, "Happy Birthday!");
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
