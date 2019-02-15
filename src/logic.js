logic.normalize=function(state)
{
	if(Object.keys(state.file.data.panes).length) return state
	//state must always have at least one pane
	const pane=util.mk({x:0,y:0,width:100,height:100})

	state.file.data.panes[pane.id]=pane

	return state
}