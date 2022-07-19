import { MathJaxTypesetter } from '@jupyterlab/mathjax2'
let fullMathjaxUrl = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js'
let mathjaxConfig = 'TeX-AMS_HTML-full,Safe'
let mathJaxTypesetter = new MathJaxTypesetter({ url: fullMathjaxUrl, config: mathjaxConfig })

export { mathJaxTypesetter }
