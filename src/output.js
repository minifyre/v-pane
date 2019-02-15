output.popup=function(sandbox)
{
	const
	{popup}=sandbox.state.view,
	{pane}=popup,//@todo this might not be needed anymore
	hide=popup.y<0,
	//y is calculated last, so it will trigger showing the menu @ the proper place
	click=curry(input.closePopup,sandbox),
	render=curry(input.renderPopup,sandbox),
	on={click:curry(input.btnSplitPane,sandbox)}

	return v('dl.popup',{data:{hide,pane},on:{click,contextmenu:click,render}},
		v('dt',{},'split/insert new pane:'),
		v('dd',{},
			v('button',{data:{split:'-1,0'},on},'left'),
			v('button',{data:{split:'1,0'},on},'right')
		),
		v('dd',{},
			v('button',{data:{split:'0,-1'},on},'above'),
			v('button',{data:{split:'0,1'},on},'below')
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
			position:absolute;
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
		...Object.values(el.state.file.data.panes)
		.filter(x=>!!x)
		.map(function(pane)
		{
			const
			{id}=pane,
			style=util.box2style(pane)
	
			return v('.pane',{id,style,on:{contextmenu}},v('div'))
		}),
		output.popup(el)
	]
}