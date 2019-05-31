import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './modal.css'

class Modal extends React.Component{
    constructor() {
        super();
        this.modal=document.querySelector('#modal-root');
    }
    render() {
        return ReactDOM.createPortal(this.props.children,this.modal);
    }
}
export default class Page extends React.Component{
    constructor() {
        super();
        this.state={show:false};
    }
    handleClick=() => {
        this.setState({show:!this.state.show});
    }
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>显示模态窗口</button>
                {
                    this.state.show&&<Modal>
                    <div id="modal" className="modal">
                        <div className="modal-content" id="modal-content">
                                内容
                                <button onClick={this.handleClick}>关闭</button>
                        </div>
                    </div>
                </Modal>
                }
            </div>
        )
    }
}