import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import {HeaderWrapper, Logo, Nav, NavItem, SearchWrapper, NavSearch, Addition, Button} from './style'
class Header extends Component{
    constructor (props) {
        super(props);
        this.state = {
            focused: false
        }
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleInputBlur = this.handleInputBlur.bind(this);
    }
    render() {
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
                                in={this.state.focused}
                                timeout={500}
                                classNames={'slide'}>
                                <NavSearch
                                    className={this.state.focused ? 'focused' : ''}
                                    onFocus={this.handleInputFocus}
                                    onBlur={this.handleInputBlur}
                                />
                            </CSSTransition>
                            <span className={this.state.focused ? 'focused iconfont' : 'iconfont'}>&#xe60b;</span>
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
        )
    }

    handleInputFocus() {
        this.setState({
            focused: true
        })
    }

    handleInputBlur() {
        this.setState({
            focused: false
        })
    }
}

export  default Header
