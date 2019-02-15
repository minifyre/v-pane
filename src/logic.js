logic.normalize=function(state)
{
	if(Object.keys(state.file.data.panes).length) return state

	logic.addPane(state)

	return state
}
logic.addPane=function(state,paneOpts={})
{
	const pane=util.mk({x:0,y:0,width:100,height:100},paneOpts)

	state.file.data.panes[pane.id]=pane
}
logic.splitPaneByDirection=function(state,id,[h,v])
{
	const oldPane=state.file.data.panes[id]

	//@todo move everything below into logic
	let {x,y,width,height}=oldPane

	if(h)
	{
		width=oldPane.width/=2

		if(h<0) oldPane.x+=width
		else x+=width
	}
	else
	{
		height=oldPane.height/=2

		if(v<0) oldPane.y+=height
		else y+=height
	}
	logic.addPane(state,{x,y,width,height})
}