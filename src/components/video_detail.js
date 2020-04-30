import React, {Fragment} from 'react';
import axios from 'axios';
import numeral from 'numeral';
import moment from 'moment';
import Spinner from './Spinner/Spinner';

class VideoDetail extends React.Component {

	state = {
		channelDetails: {
			thumbnail: null,
			subscribers: null
		},
		showMore: {
			show: false,
			classText: 'details-text details-text-Collapse',
			buttonText: 'SHOW MORE'
		}
	}

	channelDetails = () => {
		axios({
			method: 'get',
			url: 'https://www.googleapis.com/youtube/v3/channels',
			params: {
				part: 'snippet,statistics',
				id: this.props.video.snippet.channelId,
				key: this.props.apiKey
			}
		}).then((result) => {
			this.setState({
				channelDetails: {
					thumbnail: result.data.items[0].snippet.thumbnails.default.url,
					subscribers: result.data.items[0].statistics.subscriberCount
				}
			})
		},
		(error) => {
			console.log(error.message);
		})
	}

	formatText = (text) => {
		let urlRegex = /(https?:\/\/[^\s]+)/g;
		if (text) {
			let returnText = [];
			let fragments = text.split(urlRegex);
			returnText = fragments.map((fragment, i) => {
				if (fragment.match(urlRegex)) {
					return <a key={fragment + i} href= {fragment} >{fragment}</a>
				}
				let parts = fragment.split(/\n/g);
				let partsLength = parts.length;
				return parts.map((part, index) => {
					if (partsLength === index + 1) {
						return <Fragment><span key={part + i + index}>{part}</span></Fragment> 
					}else {
						return <Fragment><span key={part + i + index}>{part}</span><br /></Fragment> 
					}
				})
			})
			return returnText
		}
	}

	showMoreHandel = () => {
		if (this.state.showMore.show) {
			this.setState({
				showMore: {
					show: false,
					classText: 'details-text details-text-Collapse',
					buttonText: 'SHOW MORE'
				}
			})
		}
		else {
			this.setState({
				showMore: {
					show: true,
					classText: 'details-text',
					buttonText: 'SHOW LESS'
				}
			})			
		}
	}

	render() {
		if(!this.props.video) {
			return <Spinner />
			
		}

		// const url = `https://www.youtube.com/embed/${this.props.video.id.videoId}?&autoplay=1`;
		const url = `https://www.youtube.com/embed/${this.props.video.id.videoId}`;
		let publishedAt = moment(this.props.videoDetails.publishedAt).format('DD MMM YYYY');
		let scanedDescription = this.formatText(this.props.videoDetails.description);

		return (
			<div className="video-detail">
				<div className="embed-responsive embed-responsive-16by9">
					<iframe 
						className="embed-responsive-item youtube-frame" 
						src={url}
						title={this.props.video.snippet.title}
						onLoad={this.channelDetails}
					>
					</iframe>
				</div>
				<div className="details-container">
					<div className="primary-title">
						<h4>{this.props.video.snippet.title}</h4>
					</div>
					<div className="primary-statistics">
						<div>
							<span className="view-count">
								{numeral(this.props.videoDetails.viewCount).format('0,0')} views
							</span>
							<span> • </span>
							<span>{this.props.videoDetails.publishedAt ? publishedAt : ""}</span> 
						</div>
						<div className="flex"></div>
						<div className="statistics-container">
							<div className="like-container">
								<svg viewBox="0 0 24 24" className="like-button">
									<path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
								</svg>
								<span>{numeral(this.props.videoDetails.likeCount).format('0,0a')}</span>
							</div>
							<div className="dislike-container">
								<svg viewBox="0 0 24 24" className="dislike-button">
									<path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
								</svg>
								<span>{numeral(this.props.videoDetails.dislikeCount).format('0,0a')}</span>
							</div>
							<div className="share-button">
								<svg>
								<path d="M11.7333 8.26667V4L19.2 11.4667L11.7333 18.9333V14.56C6.4 14.56 2.66667 16.2667 0 20C1.06667 14.6667 4.26667 9.33333 11.7333 8.26667Z" />
								</svg>
								<span>SHARE</span>
							</div>
							<div className="save-button">
								<svg viewBox="0 0 24 24">
								<path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z" />
								</svg>
								<span>SAVE</span>
							</div>
							<div className="more-container">
								<svg viewBox="0 0 24 24">
									<circle cx="5" cy="12" r="2"></circle>
									<circle cx="12" cy="12" r="2"></circle>
									<circle cx="19" cy="12" r="2"></circle>
								</svg>
							</div>	
						</div>
					</div>
				</div>

				<div className="details">
					<div className="top-row">
						<div className="channel-thumbnail">
							<img className="channel-avatar" alt="" src={this.state.channelDetails.thumbnail} />
						</div>
						<div className="channel-deatails">
							<p className="channel-name">{this.props.video.snippet.channelTitle}</p>
							<p className="channel-subscribers">
								{numeral(this.state.channelDetails.subscribers).format('0,0a')} subscribers</p>
						</div>
						<div className="flex"></div>
						<div className="subscribe-button">
							<div>Subscribe</div>
						</div>
					</div>
					<div className={this.state.showMore.classText}>{scanedDescription}</div>
					<div className="show-more">
						<button onClick={this.showMoreHandel}>{this.state.showMore.buttonText}</button>
					</div>
				</div>
			</div>
		)
	}
}

export default VideoDetail;