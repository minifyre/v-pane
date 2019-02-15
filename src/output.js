output.popup=function(sandbox)
{
	const
	hide=sandbox.state.view.popup.y<0,
	//y is calculated last, so it will trigger showing the menu @ the proper place
	click=curry(input.closePopup,sandbox),
	render=curry(input.renderPopup,sandbox)

	return v('dl.popup',{data:{hide},on:{click,render}},
		v('dt',{},'split:'),
		v('dd',{},
			v('button',{},'left'),
			v('button',{},'right')
		),
		v('dd',{},
			v('button',{},'up'),
			v('button',{},'down')
		)
	)
}
output.render=function(el)
{
	const contextmenu=curry(input.rightClick,el)

	return [
		v('style',{},`
		.pane
		{
			box-sizing:border-box;
			padding:0.5rem;
		}
		.pane div
		{
			background-color:#fc0;
			height:100%;
			width:100%;
		}
		.popup
		{
			background:#222;
			color:#fff;
			margin-block-start:0;
			margin-block-end:0;
			margin-inline-start:0;
			margin-inline-end:0;
			position:absolute;
			z-index:1;
		}
		.popup::before
		{
			content:"";
			display:block;
			position:fixed;
			height:200vh;
			left:0;
			top:0;
			width:200vw;
			z-index:-1;
		}
		.popup[data-hide="true"]
		{
			z-index:-1;
		}
		`),
		...Object.values(el.state.file.panes)
		.filter(x=>!!x)
		.map(function(pane)
		{
			const style=util.box2style(pane)
	
			return v('.pane',{style,on:{contextmenu}},v('div'))
		}),
		output.popup(el)
	]
}