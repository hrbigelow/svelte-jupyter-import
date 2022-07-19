<script>
	import JupyterCell from './JupyterCell.svelte'
  // import K from './katexCell.svelte'
	let md_content

</script>

<textarea bind:value={md_content} id="input" rows="15" cols="70"/>
<br>

<JupyterCell md_content={md_content}/>

