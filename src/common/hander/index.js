import React , { Component } from "react";
import { connect } from 'react-redux'
import  { actionCreators }  from './store'
import { CSSTransition } from "react-transition-group";
import {
    HeaderWrapper,
    Logo, Nav, NavItem,
    SearchWrapper,
    NavSearch, SearchInfo,
    SearchInfoTitle, SearchInfoSwitch,
    SearchInfoList,
    SearchInfoItem,
    Addition,
    Button
} from './style'

class Header extends Component{

    getListArea(show) {
        if (show) {
            return (
                <SearchInfo>
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch>
                            换一批
                        </SearchInfoSwitch>
                        <SearchInfoList>
                            {
                                this.props.list.map((item) => {
                                    return <SearchInfoItem key={item}>{item}</SearchInfoItem>
                                })
                            }
                        </SearchInfoList>
                    </SearchInfoTitle>
                </SearchInfo>
            )
        } else {
            return null
        }

    }
    render () {
        return (
            <React.Fragment>
            <HeaderWrapper>
                <Logo/>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载App</NavItem>
                    <NavItem className='right'>登录</NavItem>
                    <NavItem className='right'>
                        <span className="iconfont">&#xe636;</span>
                    </NavItem>

                    <SearchWrapper>
                        <CSSTransition
                            in={this.props.focused}
                            timeout={500}
                            classNames={'slide'}>
                            <NavSearch
                                className={this.props.focused ? 'focused' : ''}
                                onFocus={this.props.handleInputFocus}
                                onBlur={this.props.handleInputBlur}
                            />
                        </CSSTransition>
                        <span className={this.props.focused ? 'focused iconfont' : 'iconfont'}>&#xe60b;</span>
                        {this.getListArea(this.props.focused)}
                    </SearchWrapper>

                    <Addition>
                        <Button className='writting'>
                            <span className='iconfont'>&#xe7b9;</span>
                            写文章</Button>
                        <Button className='reg'>注册</Button>
                    </Addition>
                </Nav>
            </HeaderWrapper>
        </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        focused: state.getIn(['header', 'focused']),
            // state.get('header').get('focused')
        list: state.getIn(['header', 'list'])
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus() {
            dispatch(actionCreators.getList());
            dispatch(actionCreators.searchFocus());
            // const action = actionCreators.searchFocus();
            // dispatch(action);
        },
        handleInputBlur() {
            const action = actionCreators.searchBlur();
            dispatch(action);
        }
    }
};

export  default connect(mapStateToProps, mapDispatchToProps) (Header)
