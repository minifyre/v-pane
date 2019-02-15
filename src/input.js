input.btnSplitPane=function(sandbox,{target})//insert new pane
{
	const 
	paneId=sandbox.state.view.popup.pane,
	[h,v]=target.getAttribute('data-split')
		.split(',')
		.map(int=>parseInt(int)),
	oldPane=sandbox.state.file.data.panes[paneId]

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
	logic.addPane(sandbox.state,{x,y,width,height})
}
input.closePopup=function(sandbox)
{
	const {popup}=sandbox.state.view

	popup.pane=null
	popup.x=-1
	popup.y=-1
}
input.rightClick=function(sandbox,evt)
{
	if(!evt.target.matches('.pane')) return

	evt.preventDefault()

	const
	box=sandbox.getBoundingClientRect(),
	{popup}=sandbox.state.view

	popup.pane=evt.target.id
	popup.x=(evt.pageX-box.x)/box.width*100
	popup.y=(evt.pageY-box.y)/box.height*100
}
input.renderPopup=function(sandbox,evt)
{
	const
	{x,y}=sandbox.state.view.popup,
	{height:h,width:w}=evt.target.getBoundingClientRect(),
	left=x>50?`calc(${x}% - ${w}px)`:x+'%',
	top=y>50?`calc(${y}% - ${h}px)`:y+'%'

	evt.target.setAttribute('style',`left:${left}; top:${top};`)
}