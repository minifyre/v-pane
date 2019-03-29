input.btnSplitPane=function(sandbox,{target})//insert new pane
{
	const 
	paneId=sandbox.state.view.popup.pane,
	[h,v]=target.getAttribute('data-split')
		.split(',')
		.map(int=>parseInt(int))

	logic.splitPaneByDirection(sandbox.state,paneId,[h,v])
}
input.closePopup=function(sandbox)
{
	const {popup}=sandbox.state.view

	popup.pane=null
	popup.x=-1
	popup.y=-1
}
input.dragenter=function(sandbox,evt)
{
	evt.preventDefault()
	evt.dataTransfer.setData('text/plain',evt.target.id)
}
input.dragleave=function(sandbox,evt)
{
	evt.preventDefault()
	//@todo (does this interfere with another pane setting its value?)
	sandbox.state.view.dragover=null
}
input.dragover=function(sandbox,evt)
{
	evt.preventDefault()
	sandbox.state.view.dragover=evt.target.id
}
input.dropFiles=async function(sandbox,evt)
{
	evt.preventDefault()

	const
	items=[...evt.dataTransfer.files],
	files=await util.asyncMap(items,async function(file)
	{
		const
		{lastModified:modified,name:path,size,type}=file,
		meta={modified,path,size,type},
		data=await util.readFile(file)

		return util.assignNested(util.mkFile(),{data,meta})
	}),
	views=[]//@todo finish by generating views based on pane app type
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