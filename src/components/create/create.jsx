import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { SketchPicker } from 'react-color';

class Accept extends React.Component {
	constructor() {
		super();
		this.state = {
			accepted: [],
			rejected: [],
			imagePreviewUrl: '',
			color1: '#ffffff'
		};
		this.handleChangeComplete = (color) => {
			this.setState({ color1: color.hex });
		};
	}

	render() {
		const { imagePreviewUrl, color1 } = this.state;
		let $imagePreview = null;
		if (imagePreviewUrl) {
			$imagePreview = <div><img style= {
				{
					width: '500px',
					marginTop: '20px'
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
								const reader = new FileReader();
								const readerD = new FileReader();
								const idx0 = 0;
								reader.onloadend = () => {
									this.setState({
										accepted: [],
										rejected: []
									});
									const fileAsBinaryString = reader.result;
									const fileAsBase64String = btoa(fileAsBinaryString);
									console.log(this.state.color1);
									axios.post('/process_image', {
										imageBase64: fileAsBase64String,
										color1: this.state.color1
									}).
										then(response => {
											// console.log(response.status);
											// console.log(response.data);
											const byteCharacters = atob(response.data);
											const byteNumbers = new Array(byteCharacters.length);
											for (let i = 0; i < byteCharacters.length; i++) {
												byteNumbers[i] = byteCharacters.charCodeAt(i);
											}
											const byteArray = new Uint8Array(byteNumbers);
											const blob = new Blob([byteArray]);
											readerD.readAsDataURL(blob);
										});
								};
								readerD.onloadend = () => {
									this.setState({
										imagePreviewUrl: readerD.result
									});
								};
								reader.readAsBinaryString(accepted[idx0]);
							}
						}
					>
						<p>Only *.jpeg and *.png images will be accepted</p>
					</Dropzone>
				</div>
				<div>
					<SketchPicker
						color={this.state.color1}
						onChangeComplete={this.handleChangeComplete}
					/>
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
