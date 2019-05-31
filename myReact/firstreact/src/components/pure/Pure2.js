import React from 'react';
class ListOfWords extends React.PureComponent {
    render() {
        console.log('listword render')
      return <div>{this.props.words.join(',')}</div>;
    }
   }
   
export default  class WordAdder extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        words: ['marklar']
      };
      this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
      // 这个地方导致了bug
      const words = this.state.words;
     /*  words.push('marklar');
      this.setState({words: words});   这是错误写法*/ 
     // 1 一定要注意这个地放 word不能直接push一个，而要生成一个新的对象，否则不会更新
      this.setState({words: [...words, 'marklar']}); 
     //2  
     this.setState({words: this.state.words.concat(['marklar'])})
     // this.setState(prevState => ( { words: prevState.words.concat(['marklar']) }));
  
    }
  
    render() {
      return (
        <div>
          <button onClick={this.handleClick}>button</button>
          <ListOfWords words={this.state.words} />
        </div>
      );
    }
  }