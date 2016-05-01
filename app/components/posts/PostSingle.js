import React from 'react';
import { connect } from 'react-apollo';


import PostContent from './PostContent.js';

import CSSModules from 'react-css-modules';
import styles from './post.scss';

@CSSModules(styles, {allowMultiple: true})
class PostSingle extends React.Component{

  componentDidMount(){
    const post = this._post;
    TweenMax.fromTo(post, 0.5, {
      opacity: 0
    }, {
      opacity: 1
    });
  }

  render(){
    console.log(this.props);

    const { loading} = this.props.post;

    if (loading){
      return <div></div>
    } else {

      const { post_title, post_content, thumbnail } = this.props.post.viewer.page;
      const { settings } = this.props.post.viewer;
      const { uploads, amazonS3 } = settings;

      let bg = {
        backgroundImage: 'url("' + thumbnail + '")'
      }

      return(
        <div ref={(c) => this._post = c} styleName="base">
          <div styleName="header" style={bg}>

          </div>
          <div styleName="main">
            <div styleName="wrapper">
              <h1 styleName="title">{post_title}</h1>
              <PostContent post_content={post_content}/>
            </div>
          </div>
        </div>
      )
    }
  }
}

const PostSingleWithData = connect({
  mapQueriesToProps({ ownProps, state}) {
    return {
      post: {
        query: `
          query getPost($post: String){
            viewer{
              page(post_name:$post){
                id
                post_title
                post_content
                thumbnail
              },
              settings{
                id
                uploads
                amazonS3
              }
            }
          }
        `,
        variables: {
          post: ownProps.params.post
        }
      }
    }
  }
})(PostSingle);

export default PostSingleWithData;
