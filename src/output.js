output.render=function({state})
{
	return Object.values(state.file.panes)
	.filter(x=>!!x)
	.map(function(pane)
	{
		const style=util.box2style(pane)

		return v('.pane',{style})
	})
}