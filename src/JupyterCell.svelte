<script>
  /* Call this cell with <JupyterCell md_content={var} />
   * When the value of 'var' changes, the cell will re-parse and re-render
   */
  import { onMount } from 'svelte'
	import { marked } from 'marked'
	import { markedMathExt } from './marked_math_ext.js'
	import { mathJaxTypesetter } from './mathjax_call.js'
	export let md_content = ''
	let target

	let mm = new markedMathExt(false)
	marked.use({ extensions: mm.getExtensions() } )
	
	function parse(md_content) {
		if (target === undefined) return
		target.innerHTML = ''
		let html_string = marked(md_content)
		target.innerHTML = html_string
		// console.log(target.firstElementChild)
		mathJaxTypesetter.typeset(target)
		// target.appendChild(frag)
	}
	$: parse(md_content)
	
</script>

<span id='target' bind:this={target} />


<style>
  span {
    width: 100%;
  }
</style>

