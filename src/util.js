util.readFile=function(file)
{
	if(!util.readFile.cache) util.readFile.cache=new FileReader()

	const
	{cache:reader}=util.readFile,
	blob=file.slice(0,file.size)

	return new Promise(async function(res,rej)
	{//@todo use object assign to simplify this
		reader.onloadend=res
		reader.onerror=rej
		//@todo use file.type to determine how to decode file based on mime type
		reader.readAsText(blob)
	})
	.then(({target})=>target.result)
}