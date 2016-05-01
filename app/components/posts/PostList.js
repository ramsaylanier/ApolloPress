import React from 'react';
import { connect } from 'react-apollo';

import Page from '../pages/page.js';
import PostExcerpt from './PostExcerpt.js';
import Button from '../button/button.js';

class PostList extends React.Component{

  constructor(){
    super();
    this._loadMorePosts = this._loadMorePosts.bind(this);
  }

  componentWillMount(){
    // const { limit, postType } = this.props.layout;
  }

  render(){
    console.log('postList render:', this.props)
    const { loading } = this.props.page;

    if (loading){
      return(
        <div></div>
      )
    } else {

      const { viewer } = this.props.page;
      const { posts } = viewer;
      const { hasNextPage, hasPreviousPage } = posts.pageInfo;

      return(
        <Page>
          {posts.edges.map( (post, index) => {
            return(
              <PostExcerpt index={index} key={post.node.id} viewer={viewer} {...post.node} />
            )
          })}

          { hasNextPage &&
            <Button type="primary center" onClick={this._loadMorePosts}>Load More</Button>
          }
        </Page>
      )
    }
  }

  _loadMorePosts(){
    // const { limit, postType } = this.props.layout;
    const limit = this.props.page.viewer.posts.edges.length;
    console.log(limit);
    this.props.page.refetch({limit: limit + 1});
  }
}

const PostListWithData = connect({
  mapQueriesToProps({ ownProps, state}) {
    return {
      page: {
        query: `
          query getPosts($postType: String, $limit: Int){
            viewer{
              posts(post_type: $postType first: $limit){
      					edges{
                  cursor
      						node{
      							id
      							post_title
      							post_name
      							post_excerpt
                    thumbnail
      						}
      					},
                pageInfo{
                  hasNextPage,
                  hasPreviousPage
                }
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
          postType: ownProps.route.layout.postType || 'post',
          limit: ownProps.route.layout.limit || 1
        }
      }
    }
  }
})(PostList);

export default PostListWithData;
