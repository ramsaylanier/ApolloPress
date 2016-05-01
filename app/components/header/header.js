import React from 'react';
// import Relay from 'react-relay'
import { connect } from 'react-apollo';
import { Link } from 'react-router';
import AppNav from '../nav/_AppNav.js';
import GithubLogo from '../icons/github.js';

import CSSModules from 'react-css-modules';
import styles from './header.scss';

@CSSModules(styles, {allowMultiple: true})
class Header extends React.Component{

	render(){
    const { loading } = this.props.header;


    if (loading){
      return(
        <div></div>
      )
    } else {
  		const { menus } = this.props.header.viewer;

  		return (
  			<header styleName="base">
  				<div styleName="wrapper">
  					<AppNav menus={menus}/>
  					<a href="https://github.com/ramsaylanier/WordpressExpress" target="_blank">
  						<GithubLogo/>
  					</a>
  				</div>
  			</header>
  		)
    }
	}
}


const HeaderWithData = connect({
  mapQueriesToProps({ ownProps, state}) {

    return {
      header: {
        query: `
          query getMenu{
            viewer{
              menus(name: "primary-navigation"){
                items {
      						id,
      						order,
      		        navitem {
      		          id,
      		          post_title,
      		          post_name
      		        },
      		        children {
      		          id,
      		          linkedId,
      		          navitem {
      		            post_title,
      		            post_name
      		          }
      		        }
      		      }
              }
            }
          }
        `
      }
    }
  }
})(Header);

export default HeaderWithData;

// export default Relay.createContainer(Header, {
//
//   fragments: {
// 		viewer: () => Relay.QL`
// 			fragment on User {
// 				menus(name:"primary-navigation") {
// 		      items {
// 						id,
// 						order,
// 		        navitem {
// 		          id,
// 		          post_title,
// 		          post_name
// 		        },
// 		        children {
// 		          id,
// 		          linkedId,
// 		          navitem {
// 		            post_title,
// 		            post_name
// 		          }
// 		        }
// 		      }
// 				}
// 			}
//     `,
//   },
// });
