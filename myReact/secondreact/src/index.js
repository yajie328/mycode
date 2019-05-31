import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link} from './react-router-dom'
// BrowerRouter
import Home from './components/Home'
import User from './components/User'
import Profile from './components/Profile'
import "bootstrap/dist/css/bootstrap.css"

// Router 路由的容器"
// exact属性 是精确匹配的意思
ReactDOM.render((
    <Router>
        <>
            <nav className="navbar navbar-inverse">
             <div className="container-fluid">
                 <div className="navbar-heanding">
                     <div className="navbar-brand">首页</div>
                 </div>
                 <ul className="nav navbar-nav">
                     <li><Link to={ {pathname:'/', state:{title:'首页'}} }>首页</Link></li>
                     <li><Link to={ {pathname:'/user', state: {title:'用户管理'}} }>用户管理</Link></li>
                     <li><Link to={ {pathname:'/profile', state: {title:'个人中心'}} }>个人中心</Link></li>
                 </ul>
             </div>
            </nav>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Route path="/" component={Home} exact></Route>
                        <Route path="/user" component={User}></Route>
                        <Route path="/profile" component={Profile}></Route>
                    </div>
                </div>
            </div>
            </>
    </Router>
), document.getElementById('root'))

{/* 
                <Link to="/">首页</Link> 
                <Link to="/user">用户管理</Link>
                <Link to="/profile">个人中心</Link>
            
                */}