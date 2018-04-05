import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class Accept extends React.Component {
	constructor() {
		super();
		this.state = {
			accepted: [],
			rejected: []
		};
	}

	render() {
		let { imagePreviewUrl, clipParams } = this.state;
		let $imagePreview = null;
		if (imagePreviewUrl) {
			$imagePreview = <div><img style= {
				{
					position: 'absolute',
					top: '0px',
					left: '210px',
					clip: clipParams
				}
			} src={imagePreviewUrl} /></div>;
		}
		return (
			<section>
				<div className="dropzone" style={ { width: '200px' } }>
					<Dropzone
						accept="image/jpeg, image/png"
						onDrop={
							(accepted, rejected) => {
								this.setState({
									accepted,
									rejected
								});
								console.log(accepted);
								const reader = new FileReader();
								const readerD = new FileReader();
								const idx0 = 0;
								const idx1 = 1;
								const idx2 = 2;
								reader.onloadend = () => {
									const fileAsBinaryString = reader.result;
									const fileAsBase64String = btoa(fileAsBinaryString);
									const ar1to1 = 1.0;
									const prefAspectRatios = [ar1to1];
									axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAej2COhQ1bffGrHWRyLpkMmMg7GJ3OIc8', {
										"requests": [
											{
												"image": {
													"content": fileAsBase64String
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
											console.log(response);
											const vxs = response.data.responses[idx0].cropHintsAnnotation.cropHints[idx0].boundingPoly.vertices;
											const zeroPx = 0;
											const y1 = vxs[idx0] && vxs[idx0].y ? vxs[idx0].y : zeroPx;
											const x2 = vxs[idx1] && vxs[idx1].x ? vxs[idx1].x : zeroPx;
											const y2 = vxs[idx2] && vxs[idx2].y ? vxs[idx2].y : zeroPx;
											const x1 = vxs[idx0] && vxs[idx0].x ? vxs[idx0].x : zeroPx;
											this.setState({
												clipParams: 'rect(' + y1 + 'px,' + x2 + 'px,' + y2 + 'px,' + x1 + 'px)'
											});
											readerD.onabort = () => console.log('file reading was aborted');
											readerD.onerror = () => console.log('file reading has failed');
											readerD.readAsDataURL(accepted[idx0]);
										});
								};
								readerD.onloadend = () => {
									this.setState({
										imagePreviewUrl: readerD.result,
										accepted: [],
										rejected: []
									});

									// TODO: get this working in separate module
									/* const Jimp = require("jimp");
									Jimp.read(imagePreviewUrl, (err, img) => {
										if(err) {
											console.error(err);
											return;
										}
										console.log("IN THE JIMP");
										return;
									}); */
								};
								reader.onabort = () => console.log('file reading was aborted');
								reader.onerror = () => console.log('file reading has failed');
								reader.readAsBinaryString(accepted[idx0]);
							}
						}
					>
						<p>Only *.jpeg and *.png images will be accepted</p>
					</Dropzone>
				</div>
				<aside style={ { marginBottom: '20px' } }>
					{$imagePreview}
				</aside>
			</section>
		);
	}
}

export const CreateNow = () =>
	<div style={ { marginLeft: '100px' } }>
		<Accept />
	</div>;
