import React, { Component } from 'react';
import { fetchPost, deletePost } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount() {
    if(!this.props.post) { //otherwise it's fetching twice (not a problem though)
      const { id } = this.props.match.params; // params will have all given parameters in url
      this.props.fetchPost(id);
    }
  }
  onDeleteClick = () => {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => { // actioncreater use params instead of props, so it will only load if it gets params (post exists)
      this.props.history.push('/');
    });
  }
  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return(
      <div>
        <Link className='btn btn-primary pull-xs-right' to='/'>Back to index</Link>
        <button
          className='btn btn-danger pull-xs-right'
          onClick={this.onDeleteClick}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) { // {posts} = give me list of posts, ownProps = this.props
  return { post: posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost }) (PostsShow);
