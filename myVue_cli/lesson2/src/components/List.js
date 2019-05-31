export default {
	functional: true,
	props:['render',"a"],
	render(h, context){
		console.log(context.props.render);
		return context.props.render(h, context.props.a);
	}
}