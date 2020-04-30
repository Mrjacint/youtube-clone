import _ from 'lodash';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import CommentList from './components/comment_list';

const API_KEY = process.env.REACT_APP_API_KEY;

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null,
			videoDetails: {
				description: null,
				viewCount: null,
				likeCount: null,
				dislikeCount: null,
				publishedAt: null,
				commentCount: null
			},
			comments: []
		};
		this.videoSearch('cats')
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.selectedVideo !== this.state.selectedVideo) {
			this.fetchVideoDetails();
		}
	}

	async videoSearch(term) {
		await axios({
			method: 'get',
			url: 'https://www.googleapis.com/youtube/v3/search',
			params: {
				part: 'snippet',
				key: API_KEY,
				q: term,
				type: 'video',
				maxResults: 25
			}
		}).then((result) => {
			this.setState({
				videos: result.data.items,
				selectedVideo: result.data.items[0]
			})
			this.fetchVideoDetails();
		},
		(error) => {
			console.log(error.message);
		});

	}

	fetchVideoDetails = () => {
		axios({
			method: 'get',
			url: 'https://www.googleapis.com/youtube/v3/videos',
			params: {
				part: 'snippet,contentDetails,statistics',
				id: this.state.selectedVideo.id.videoId,
				key: API_KEY
			}
		}).then(result => {
			this.commentsData();
			this.setState({
				videoDetails: {
					description: result.data.items[0].snippet.localized.description,
					viewCount: result.data.items[0].statistics.viewCount,
					likeCount: result.data.items[0].statistics.likeCount,
					dislikeCount: result.data.items[0].statistics.dislikeCount,
					publishedAt: result.data.items[0].snippet.publishedAt,
					commentCount: result.data.items[0].statistics.commentCount
				} 
			})
		})
	}

	commentsData = () => {
		axios({
			method: 'get',
			url: 'https://www.googleapis.com/youtube/v3/commentThreads',
			params: {
				part: 'snippet,replies',
				videoId: this.state.selectedVideo.id.videoId,
				key: API_KEY
			}
		}).then((result) => {
			this.setState({
				comments: result.data.items 
			})
		},
		(error) => {
			console.log(error.message);
		})
	}

	render() {
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 2000)

		return (
			<Fragment>
				<div>
					<SearchBar onSearchTermChange={videoSearch} />
				</div>
				<div className="content">
					<div className="content-row">
						<div className="primary">
							<VideoDetail
								video={this.state.selectedVideo}
								apiKey={API_KEY}
								videoDetails={this.state.videoDetails}
							/>
						</div>
						<div className="secondary">
							<VideoList
								onVideoSelect={selectedVideo => this.setState({selectedVideo})}
								videos={this.state.videos}
								apiKey={API_KEY}
							/>
						</div>
						<div className="last">
							<CommentList 
								commentsArray={this.state.comments} 
								commentCount={this.state.videoDetails.commentCount}
							/>
						</div>
					</div>
				</div>
			</Fragment>
			);
	}
}

ReactDOM.render(<App />, document.querySelector('.root'));


