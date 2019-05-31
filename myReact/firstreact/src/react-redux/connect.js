import React, { Component } from 'react';
import ReduxContext from './context'
import {bindActionCreators} from '../redux'
export default function(mapStateToProps, mapDispatchToProps){
    return function(WrappedComponent){
        return class extends Component{
            static contextType = ReduxContext;
            constructor(props, context){
                super(props); // context={store: this.props.store}
                this.state = mapStateToProps(context.store.getState());
                
            }
            componentDidMount(){
                this.unsubcribe = this.context.store.subscribe(()=>{
                    this.setState(mapStateToProps(this.context.store.getState()))
                })
            }
            componentUnmount(){
                this.unsubscribe();
            }
            render(){
                let actions = {}
                if(typeof mapDispatchToProps === 'function'){
                    actions = mapDispatchToProps(this.context.store.dispatch)
                }else{
                    actions = bindActionCreators(mapDispatchToProps, this.context.store.dispatch);
                }
                return (
                    <WrappedComponent {...this.state} {...actions}/>
                )
            }
        }
    }
}