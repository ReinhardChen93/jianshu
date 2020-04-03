import React, { Component }  from 'react';
import {
    HomeWrapper,
    HomeLeft,
    HomeRight
} from './style'
class Home extends Component {
    render () {
        return (
            <HomeWrapper>
                <HomeLeft>

                </HomeLeft>
                <HomeRight>right</HomeRight>
            </HomeWrapper>
        );
    }
}

export default Home;
