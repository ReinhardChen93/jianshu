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
        const { focused, list, page, totalPage, mouseIn, handleMouseIn, handleMouseLeave, handleChangePage } = this.props;
        const newList = list.toJS();
        // 每页显示2个
        const pageList = [];
        if(newList.length) {
            for (let i = (page - 1) * 2; i < page * 2; i++) {
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }

        console.log(focused)
        if (focused || mouseIn) {
            return (
                <SearchInfo
                    onMouseEnter = {handleMouseIn}
                    onMouseLeave = {handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={() => handleChangePage(page, totalPage, this.spinIcon)}>
                            <span ref={(icon) => { this.spinIcon = icon }} className="iconfont spin">&#xe851;</span>
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
        const { focused, handleInputFocus, handleInputBlur, list } = this.props;
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
                                onFocus={() => handleInputFocus(list)}
                                onBlur={handleInputBlur}
                            />
                        </CSSTransition>
                        <span className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe60b;</span>
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
        page: state.getIn(['header', 'page']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        totalPage: state.getIn(['header','totalPage'])
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus(list) {
            if(list.size === 0) {
                // 减少不必要的请求
                dispatch(actionCreators.getList());
            }
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
        },
        handleChangePage(page, totalPage, spin) {
            console.log(spin)
            let originAngle = spin.style.transform.replace(/[^0-9]/ig, ''); // 把'rotate(360deg)'中不是数字的全部替换未空

            if (originAngle) {
                originAngle = parseInt(originAngle, 10);
            } else {
                originAngle = 0
            }
            spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
            if (page < totalPage) {
                dispatch(actionCreators.changePageList(page + 1));
            } else {
                dispatch(actionCreators.changePageList(1));
            }

        }
    }
};

export  default connect(mapStateToProps, mapDispatchToProps) (Header)
