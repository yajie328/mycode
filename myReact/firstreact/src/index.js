import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/counter'
import {Provider} from './react-redux'
import store from './store'

ReactDOM.render((
    <Provider store={store}>
        <Counter/>
    </Provider>
), document.getElementById('root'))

// import Counter1 from './components/counter1'
// import Counter2 from './components/counter2'
// ReactDOM.render(<><Counter1/><Counter2/></>, document.getElementById('root'))