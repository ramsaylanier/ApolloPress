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
    const { limit, postType } = this.props.route.layout;
    // this.props.relay.setVariables({
    //   limit: limit,
    //   postType: postType
    // })
  }

  render(){

    const { loading } = this.props.page;

    if (loading){
      return(
        <div></div>
      )
    } else {

      const { viewer } = this.props.page;
      const { posts } = viewer;
      const { hasNextPage, hasPreviousPage } = posts.pageInfo;
      console.log(this.props);

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
    const { limit, postType } = this.props.route.layout;
    this.props.page.refetch({limit: 2});
  }
}

const PostListWithData = connect({
  mapQueriesToProps({ ownProps, state}) {
    return {
      page: {
        query: `
          query getPage($postType: String, $limit: Int){
            viewer{
              page(post_name:"homepage"){
      					id,
      					thumbnail
      				},
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
          postType: 'post',
          limit: 1
        }
      }
    }
  }
})(PostList);

export default PostListWithData;
