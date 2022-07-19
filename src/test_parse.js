import { marked } from 'marked'
import * as svelte from 'svelte/compiler'
import { preprocess_md } from './preprocess.js'
import fs from 'fs'

var md = fs.readFileSync(process.argv[2], { encoding: 'utf8' })

var html = preprocess_md(md)
console.log(html)

/*
var toks = marked.lexer(md)
var html = marked.parser(toks)
console.log('marked extensions: ', marked.defaults.extensions)
console.log(toks)
console.log(html)

// first form doesn't load the extension (as erroneously described in docs)
// marked.use(math_block)

// marked.use({ extensions: [math_inline, math_block] })

toks = marked.lexer(md)
html = marked.parser(toks)
var ast = svelte.parse(html)
console.log('marked extensions: ', marked.defaults.extensions)
console.log(toks)
console.log(html)
console.log(ast)
*/




