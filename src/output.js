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
	const//@todo replace this whole block with Object.entries(input.pane).
	contextmenu=curry(input.rightClick,el),
	drop=curry(input.dropFiles,el),
	dragenter=curry(input.dragenter,el),
	dragleave=curry(input.dragleave,el),
	dragover=curry(input.dragover,el),
	on={contextmenu,dragenter,dragleave,dragover,drop}

	return [
		v('style',{},config.style),
		...Object.values(el.state.file.data.panes)
		.filter(x=>!!x)
		.map(function(pane)
		{
			const
			{id}=pane,
			style=util.box2style(pane),
			data={dragover:el.state.view.dragover===id}

			return v('.pane',{data,draggable:true,id,style,on},v('tabbed-editor'))
		}),
		output.popup(el)
	]
}