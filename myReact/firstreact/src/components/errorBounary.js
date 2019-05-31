import React from 'react';
import ReactDOM from 'react-dom';
class ErrorBoundary extends React.Component{
    constructor(props) {
        super(props);
        this.state={hasError:false};
    }
    componentDidCatch(err,info) {
        this.setState({hasError: true});
    }
    render() {
        if (this.state.hasError) {
            return <h1>Something Went Wrong</h1>
        }
        return this.props.children;
    }
}

class Page extends React.Component{
    render() {
        return (
            <ErrorBoundary>
                <Clock/>
            </ErrorBoundary>
        )
    }
}
class Clock extends React.Component{
    render() {
        return (
            <div>hello{null.toString()}</div>
        )
    }
}

ReactDOM.render(<Page/>,document.querySelector('#root'));