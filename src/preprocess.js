import { markedMathExt } from './marked_math_ext.js'
import { marked } from 'marked'

// since we are going through the Svelte compiler,
// need to wrap Latex
let mm = new markedMathExt(true)
marked.use({ extensions: mm.getExtensions() } )

export function preprocess_md(md_content) {
  var content = marked(md_content)
  // console.log('in preprocess: ', content)
  return content
}


