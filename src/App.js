import React, { Component } from 'react';
import {GlobalStyle} from './style';
import { Provider } from 'react-redux'
import { IconFont } from './statics/iconfont/iconfont'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './common/hander'
import Home from './pages/home'
import Detail from './pages/detail'
import store from "./store";

class App extends Component{
  render () {
      return (
          <Provider store={store}>
              <GlobalStyle/>
              <IconFont/>
              <Header/>
              <BrowserRouter>
                  <div>
                      <Route path='/' exact component={Home}/>
                      <Route path='/detail' exact component={Detail}/>
                  </div>
              </BrowserRouter>

          </Provider>
      );
  }
}

export default App;
