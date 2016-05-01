import React from 'react';
import { connect } from 'react-apollo';

import styles from './styles.scss';
import Head from './components/head/head';
import Header from './components/header/header';

class App extends React.Component {

  render() {
    const { children } = this.props;
    const page = React.cloneElement(children)

    return (
      <div className="application">
        <Head/>
        <Header/>
        {page}
      </div>
    )
  }
}

export default App;
