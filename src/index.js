import silo from './node_modules/silo/index.js'
import truth from './node_modules/truth/truth.mjs'
import v from './node_modules/v/v.mjs'
import tabs from './node_modules/tabbed-editor/index.js'

const
{config,util,logic,output,input}=silo,
{curry}=util
//@todo find & replace "custom" & "element" with proper values

export default silo(async function(initialState)
{
	customElements.define('v-pane',silo.element)

	//setup apps//@todo REPLACE THIS TEMP CODE!!
	;`checklist,code-editor,code-picker,file-manager,finance-app,
	iframe-viewer,pixel-editor,vector-editor,youtube-player`
	.replace(/\s/g,'')
	.split(',')
	.forEach(app=>tabs.config.apps[app]={src:`./node_modules/${app}/`})

	await tabs()
})
silo.element=class extends silo.customElement
{
	constructor(state)
	{
		super(state,silo)
	}
}