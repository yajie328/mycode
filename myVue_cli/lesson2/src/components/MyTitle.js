// 函数式组件，只有render方法不能写template, 
// 只有函数式组件会有上下文即render函数的第二个参数context
export default {
	// template:'<h1>daya</h1>'
	functional: true,
	render: (h, context)=>{
		// console.log(context)
		let t = 'h'+ context.props.type;
		return <t on-click={()=>context.props.say()}>{context.slots().default}</t>
	}
}