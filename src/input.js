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