import React, { Component } from 'react';
import UserList  from './UserList'
import UserAdd from './UserAdd'
import {Route, Link, Redirect, Switch} from '../react-router-dom'
export default class User extends Component{
    render(){
        return (
            <div className="row">
              <div className="col-md-2">
                    <ul className="nav nav-stacked">
                        <li><Link to="/user/list">用户列表</Link></li>
                        <li><Link to="/user/add">添加用户</Link></li>
                    </ul>
                </div>
                <div className="col-md-10">
                    <Switch>
                        <Route path="/user/list" component={UserList} />
                        <Route path="/user/add" component={UserAdd} />
                        <Redirect to="/user/list" />
                    </Switch>
                </div>
                </div>
        )
    }
}
// switch  匹配成功就不再向下匹配了
// Redirect 重定向
