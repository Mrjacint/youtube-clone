import React from 'react';
import numeral from 'numeral';
import moment from 'moment';

class ReplytListItem extends React.Component {

    state = {
        buttonClass: 'comment-show-more hidde-button',
        readMore: {
			show: false,
			classText: 'comment-text comment-text-Collapse',
			buttonText: 'READ MORE'
		} 
    }

    componentDidMount() {
        if (this.divElement.clientHeight >= 80) {

            this.setState({
                buttonClass: 'comment-show-more'
            })
        }
        
    }

    readMoreHandle = (event) => {
		if (this.state.readMore.show) {
			this.setState({
				readMore: {
					show: false,
					classText: 'comment-text comment-text-Collapse',
					buttonText: 'Read more'
				}
			})
		}
		else {
			this.setState({
				readMore: {
					show: true,
					classText: 'comment-text',
					buttonText: 'Show less'
				}
			})			
		}
    }

    render() {
        let likeCount = numeral(this.props.comment.snippet.likeCount).format('0,0a');

        return (
            <div className="comment">
                <div className="reply-thumbnail">
                    <img 
                        alt="" 
                        src={this.props.comment.snippet.authorProfileImageUrl} 
                        />
                </div>
                <div className="comment-main">
                    <div className="comment-header">
                        <div className="comment-author">{this.props.comment.snippet.authorDisplayName}</div>
                        <div className="comment-published-time">
                            {moment(this.props.comment.snippet.publishedAt).fromNow()}
                        </div>
                    </div>
                    <div className="comment-body">
                        <div 
                            id="comment-text" 
                            ref={(divElement) => { this.divElement = divElement }} 
                            className={this.state.readMore.classText}
                        >{this.props.comment.snippet.textOriginal}</div>
                        <div 
                            onClick={(event) => this.readMoreHandle(event)} 
                            className={this.state.buttonClass}>{this.state.readMore.buttonText}</div>
                    </div>
                    <div className="comment-action-buttons">
                        <div className="comment-like">
                            <svg viewBox="0 0 24 24" className="like-button">
                                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z" />
                            </svg>
                            <span>{(likeCount === '0') ?  '' : likeCount}</span>
                        </div>
                        <div className="comment-dislike">
                            <svg viewBox="0 0 24 24" className="dislike-button">
                                <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
                            </svg>
                        </div>
                        <div className="comment-reply-button">REPLY</div>
                    </div>
                </div>
                <div className="comment-action-menu"></div>
            </div>
        );
    }
}

export default ReplytListItem;