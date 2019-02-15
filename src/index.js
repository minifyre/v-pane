import silo from './node_modules/silo/index.js'
import truth from './node_modules/truth/truth.mjs'
import v from './node_modules/v/v.mjs'

const
{config,util,logic,output,input}=silo,
{curry}=util
//@todo find & replace "custom" & "element" with proper values

export default silo(async function(initialState)
{
	customElements.define('v-pane',silo.element)
})
silo.element=class extends silo.customElement
{
	constructor(state)
	{
		super(state,silo)
	}
}