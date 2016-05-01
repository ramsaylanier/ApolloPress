import React from 'react';
import { connect } from 'react-apollo';
import Page from '../pages/page.js';
import PostContent from '../posts/PostContent';

import CSSModules from 'react-css-modules';
import styles from '../pages/page.scss';

@CSSModules(styles, {allowMultiple: true})
class DefaultLayout extends React.Component{

  render(){
    console.log(this.props);
    const { loading } = this.props.page;

    if (loading){
      return (
        <div></div>
      )
    } else {

      const { post_title, post_content, thumbnail } = this.props.page.result.viewer.page;

      let bg = {
        backgroundImage: "url('" + thumbnail + "')"
      }

      let heroClass = thumbnail ? "hero_thumbnail" : "hero"

      return(
      	<Page>
          <div styleName={heroClass} style={bg}>
    				<div styleName="wrapper tight">
              <h2 styleName="title">{post_title}</h2>
    				</div>
    			</div>

    			<div styleName="content">
    				<div styleName="wrapper tight">
    					<PostContent post_content={post_content}/>
    				</div>
    			</div>
        </Page>
      )
    }
  }
}

const DefaultLayoutWithData = connect({
  mapQueriesToProps({ ownProps, state}) {
    return {
      page: {
        query: `
          query getPage($page: String){
            viewer{
              page(post_name: $page){
                id,
      					post_title
      					post_content
      					thumbnail
              }
            }
          }
        `,
        variables: {
          page: ownProps.params.page
        }
      }
    }
  }
})(DefaultLayout);

export default DefaultLayoutWithData;
