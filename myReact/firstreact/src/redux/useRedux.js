
// import { createStore } from 'redux'
import { createStore } from './index.js'
let num = 0
function counter(state = num, action) {
	switch (action.type) {
	  case 'add':
		return state + 1
	  case 'minus':
		return state - 1
	  default:
		return state
	}
	
}
let store = createStore(counter, num)
let unsubscribe = store.subscribe(renderApp);

setTimeout(function(){
	unsubscribe();
},3000)

let v = document.getElementById('num');
let addBtn = document.getElementById('add');
let minusBtn = document.getElementById('minus');
function renderApp(){
	v.innerHTML = store.getState();
}
renderApp();
addBtn.addEventListener('click', function(){
	store.dispatch({type:'add'})
})
minusBtn.addEventListener('click', function(){
	store.dispatch({type:'minus'})
})

