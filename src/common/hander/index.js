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

    getListArea() {
        const { focused, list, page, handleMouseIn, handleMouseLeave } = this.props;
        const newList = list.toJS();
        // 每页显示2个
        const pageList = [];
        for (let i = (page - 1) * 2; i < page * 2; i++) {
            pageList.push(
                <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
            )
        }
        console.log(focused)
        if (focused) {
            return (
                <SearchInfo
                    onMouseEnter = {handleMouseIn}
                    onMouseLeave = {handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch>
                            换一批
                        </SearchInfoSwitch>
                        <SearchInfoList>
                            { pageList }
                        </SearchInfoList>
                    </SearchInfoTitle>
                </SearchInfo>
            )
        } else {
            return null
        }

    }
    render () {
        const { focused, handleInputFocus, handleInputBlur } = this.props;
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
                            in={focused}
                            timeout={500}
                            classNames={'slide'}>
                            <NavSearch
                                className={focused ? 'focused' : ''}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                            />
                        </CSSTransition>
                        <span className={focused ? 'focused iconfont' : 'iconfont'}>&#xe60b;</span>
                        {this.getListArea()}
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
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page'])
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
        },
        handleMouseIn() {
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave() {
            dispatch(actionCreators.mouseLeave());
        }
    }
};

export  default connect(mapStateToProps, mapDispatchToProps) (Header)
