<script>
	import JupyterCell from './JupyterCell.svelte'
	let md_content

</script>

<h2>Jupyter Cell Editor - paste Markdown, HTML and Latex</h2>
<div class='fb-horz'>
  <div class='fi-left'>
    <textarea bind:value={md_content}/>
  </div>
  <div class='fi-mid'>
  </div>
  <div class='fi-right'>
    <JupyterCell md_content={md_content}/>
  </div>
</div>


<style>
  textarea {
    width: 48vw; 
    height: 100%;
    overflow: auto;
  }

  .fb-horz {
    display: flex;
    flex-direction: row;
    height: 90vh;
  }

  .fi-left {
    /* border: 1px solid red; */
    flex-grow: 5;
    flex-shrink: 1;
    flex-basis: 10%;
  }

  .fi-right {
    /* border: 1px solid blue; */
    flex-grow: 5;
    flex-shrink: 1;
    flex-basis: 80%;
  }

  .fi-mid {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 20px;
  }

</style>



