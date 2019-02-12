output.render=function({state})
{
	const contextmenu=curry(input.rightClick,state)

	return [v('style',{},`
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
	}`)]
	.concat(Object.values(state.file.panes)
	.filter(x=>!!x)
	.map(function(pane)
	{
		const style=util.box2style(pane)

		return v('.pane',{style,on:{contextmenu}},v('div'))
	}))
}