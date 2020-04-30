import React from 'react';
import axios from 'axios';
import numeral from 'numeral';
import moment from 'moment';

class VideoListItem extends React.Component {
	state={
		video: this.props.video,
		onVideoSelect: this.props.onVideoSelect,
		videoStatistics: null,
		loadingStatistics: true,
		showOverlays: 'overlays-none'
	}

	componentDidMount() {
		axios({
			method: 'get',
			url: 'https://www.googleapis.com/youtube/v3/videos',
			params: {
				part: 'snippet,contentDetails,statistics',
				id: this.state.video.id.videoId,
				key: this.props.apiKey
			}
		}).then((result) => {
			this.setState({
				videoStatistics: result.data.items[0],
				loadingStatistics: false
			})
		})
	}

	overlayShow = () => {
		this.setState({showOverlays: 'overlays'})
	}

	overlayHide = () => {
		this.setState({showOverlays: 'overlays-none'})
	}

	render() { 
		let viewCount = null;
		let publishedAt = null;
		let duration = null;

		if (!this.state.loadingStatistics) {
			viewCount = numeral(this.state.videoStatistics.statistics.viewCount).format('0,0a');
			publishedAt = moment(this.state.videoStatistics.snippet.publishedAt).fromNow();
			let tempDuration = 
				moment.duration(this.state.videoStatistics.contentDetails.duration, moment.ISO_8601)
				.asSeconds();
			duration = duration = numeral(tempDuration).format('00:00');
		}
		return (
		<li onClick={() => this.props.onVideoSelect(this.state.video)} className="list-group-item">
			<div 
				onMouseOver={this.overlayShow} 
				onMouseOut={this.overlayHide} 
				className="video-list media"
				>
				<div className={this.state.showOverlays}>
					<div className="ikon-container">
						<div className="palyer-ikon">
							<svg viewBox="0 0 24 24">
								<g>
									<path d="M8 5v14l11-7z"></path>
								</g>
							</svg>
						</div>
						<div className="watch-later">
							<svg viewBox="0 0 24 24">
								<g>
									<path d="M12 3.67c-4.58 0-8.33 3.75-8.33 8.33s3.75 8.33 8.33 8.33 8.33-3.75 8.33-8.33S16.58 3.67 12 3.67zm3.5 11.83l-4.33-2.67v-5h1.25v4.34l3.75 2.25-.67 1.08z"></path>
								</g>
							</svg>
						</div>
						<div className="add-to-queue">
							<svg viewBox="0 0 24 24">
								<g>
									<path d="M9,10 L18,10 L18,12 L9,12 L9,10 Z M6,6 L18,6 L18,8 L6,8 L6,6 Z M12,14 L18,14 L18,16 L12,16 L12,14 Z M6,12 L6,18 L10,15 L6,12 Z"></path>
								</g>
							</svg>
						</div>
					</div>
					<div className="three-dots-button">
						<svg>
							<g>
							<path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
							</g>
						</svg>
					</div>
				</div>
				<div className="media-left">
					<div className="duration">{duration}</div>
					<img className="media-object" alt="" src={this.state.video.snippet.thumbnails.medium.url} />
				</div>
				<div className="media-body">
					<div className="media-heading" 
						data-toggle="tooltip" 
						data-placement="top" 
						title={this.state.video.snippet.title}>
						<b>{this.state.video.snippet.title}</b>
					</div>
					<div 
						data-toggle="tooltip" 
						data-html="true" 
						title={this.state.video.snippet.channelTitle} >
						{this.state.video.snippet.channelTitle}
					</div>
					<div className="statistics">
						<span className="view-count">{viewCount}</span><span> views</span>
						<span> • </span>
						<span>{publishedAt}</span>
					</div>
				</div>
			</div>
		</li>
		)
	}
}

export default VideoListItem;