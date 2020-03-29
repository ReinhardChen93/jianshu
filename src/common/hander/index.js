import React from "react";
import { connect } from 'react-redux'
import  { actionCreators }  from './store'
import { CSSTransition } from "react-transition-group";
import {HeaderWrapper, Logo, Nav, NavItem, SearchWrapper, NavSearch, Addition, Button} from './style'

const Header = (props) => {
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
                           in={props.focused}
                           timeout={500}
                           classNames={'slide'}>
                           <NavSearch
                               className={props.focused ? 'focused' : ''}
                               onFocus={props.handleInputFocus}
                               onBlur={props.handleInputBlur}
                           />
                       </CSSTransition>
                       <span className={props.focused ? 'focused iconfont' : 'iconfont'}>&#xe60b;</span>
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

const mapStateToProps = (state) => {
    return {
        focused: state.header.get('focused')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus() {
            const action = actionCreators.searchFocus();
            dispatch(action);
        },
        handleInputBlur() {
            const action = actionCreators.searchBlur();
            dispatch(action);
        }
    }
};

export  default connect(mapStateToProps, mapDispatchToProps) (Header)
