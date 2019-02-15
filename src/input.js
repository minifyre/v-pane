input.rightClick=function(sandbox,evt)
{
	if(!evt.target.matches('.pane')) return

	evt.preventDefault()

	const
	box=sandbox.getBoundingClientRect(),
	{popup}=sandbox.state.view

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