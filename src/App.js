import React, {Fragment} from 'react';
import {GlobalStyle} from './style';
import { IconFont } from './statics/iconfont/iconfont'
import Header from './common/hander'
function App() {
  return (
    <Fragment>
        <GlobalStyle/>
        <IconFont/>
        <Header/>
    </Fragment>
  );
}

export default App;
