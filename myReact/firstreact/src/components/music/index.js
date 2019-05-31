import React,{Component} from 'react';
import './music.css'
import data  from './music_data';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ThemeContext from './globalContext'

export default class Music extends Component{
    constructor(){
        super(...arguments);
        this.state ={
            data: this.props.data,
            listState: true
        }
                                                                                                                
        this.nowId = this.state.data.length+1;
    }
    
    add = (title, singer)=>{
        let data = this.state.data;
        data.push({
            id: this.nowId,
            title: title,
            singer: singer,
            selected: false,
            link: false
        })
        this.setState({data})
        this.nowId++;

    }
    isCheckAll = ()=>{
        return this.state.data.length === this.state.data.filter((item)=>item.selected).length
    }
    setCheckAll = (checked)=>{
        let data = this.state.data.map(item=>{
            item.selected = checked;
            return item;
        })
        this.setState({data})
    }
    setCheck = (id, checked)=>{
        let data = this.state.data;
        data.forEach(item=>{
            if(item.id == id){
                item.selected = checked;
            }
        })
        
        this.setState({data})
       
    }
    setLink = (id, checked)=>{
        let data = this.state.data;
        data.forEach(item=>{
            if(item.id == id){
                item.link = checked;
            }
        })
        this.setState({data})
       
    }
    remove = (id)=>{
        let data = this.state.data.filter(item=>item.id != id);
        this.setState({data})
    }
    removeSelect = ()=>{
        let data = this.state.data.filter(item=>!item.selected);
        this.setState({data})
    }
    linkSelect = ()=>{
        let data = this.state.data.map(item=>{
            if(item.selected){
                item.link = true
            }
            return item;
        })
        this.setState({data})
    }
    cancelLinkSelect = ()=>{
        let data = this.state.data.map(item=>{
            if(item.selected){
                item.link = false
            }
            return item;
        })
        this.setState({data})
    }
    showLinkState =(state)=>{
        this.setState({
            listState: state
        })
    }
    shouldComponentUpdate(nextProps, nextState){
        if(!nextState.listState){
            let linkData = nextState.data.filter(item=>item.link)
            if(linkData.length === 0){
                this.setState({
                    listState: true
                })
                return false;
            }
        }
        return true
    }
    render(){
        let data = this.state.data;
        let selectData = data.filter(item=>item.selected)
        let linkData = data.filter(item=>item.link)
        let contextVal = {
            data: this.state.listState? data: linkData,
            isCheckAll:this.isCheckAll(),
            setCheckAll: this.setCheckAll,
            setCheck:this.setCheck,
            setLink:this.setLink,
            remove:this.remove,
            length: data.length,
            selectLength : selectData.length,
            linkLength : linkData.length,
            listState : this.state.listState,
            removeSelect : this.removeSelect,
            linkSelect: this.linkSelect,
            cancelLinkSelect: this.cancelLinkSelect,
            showLinkState : this.showLinkState,
        }
        
        return (
            <ThemeContext.Provider value={contextVal}>
            <div className="wrapper">
                <Header add={this.add}/>
                <Main />
                <Footer/>
            </div>
            </ThemeContext.Provider>
        )
    }
}
