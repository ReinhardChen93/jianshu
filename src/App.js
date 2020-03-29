import React, {Fragment} from 'react';
import {GlobalStyle} from './style';
import { Provider } from 'react-redux'
import { IconFont } from './statics/iconfont/iconfont'
import Header from './common/hander'
import store from "./store";

function App() {
  return (
    <Fragment>
        <GlobalStyle/>
        <IconFont/>
        <Provider store={store}>
            <Header/>
        </Provider>
    </Fragment>
  );
}

export default App;
