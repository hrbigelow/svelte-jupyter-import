# A project template for converting A Colab notebook into a flexible Web application

## Quick Start

```bash
$ git clone https://github.com/hrbigelow/svelte-jupyter-import.git my-article
$ cd my-article
$ npm update
$ npm run dev
# Install any other missing dependencies with npm install <dependency>
$ go to localhost:port as instructed to view the example content
```

The above steps compile the file src/example.md provided in the
repo into a Svelte component and webpage, with Katex used to render the
embedded LateX inside the marked markdown.

To provide your own markdown file:

```bash
$ jupyter nbconvert --to markdown my_notebook.ipynb --output my_notebook.md
$ cp my_notebook.md svelte-jupyter-import/src/
# Edit svelte-jupyter-import/src/App.svelte and replace the line:
# import JupyterContent from './example.md';
# with:
# import JupyterContent from './my_notebook.md'; 
```

The workflow is a bit of a compromise.  Ideally, you will edit the article
completely in Google Colab.  Then, once you are ready to convert it to HTML,
save it as ipynb locally, and follow the steps above.

## Math Block and Inline Math modes

The Colab source will be interpreted as one of three types:  Markdown, Math
block, and inline math.  Markdown is the default.  Math block mode is delimited
either by the `\begin{equation}` and `\end{equation}` flanking the content on
separte lines, or by `$$` flanking it on separate lines, as in:

```
\begin{equation}
\begin{split}  
\prod_{\substack{ i=1 \\ i=i \\ i \ne j}}
\end{split}
\end{equation}
```

or:

```
$$
\begin{split}  
\prod_{\substack{ i=1 \\ i=i \\ i \ne j}}
\end{split}
$$
```


Inline math is delimited by '$' as in:

```
Einstein's equation $e = mc^2$ looks pretty easy to me.  You square $c$,
multiply by $m$, what's the big deal?  
```

Within Math block, you can have embedded text using the `mbox{...}` construct.
Furthermore, the `\mbox{...}` can contain inline math, as in:

```
\begin{equation}
\begin{split}  
\prod_{\substack{ i=1 \\ i=i \\ i \ne j}} 
\end{split} \\[1em]
\mbox{some text within the math block, with inline math: $m_{rc} = a_{ri} * b_{ic}$}
\end{equation}
```

## Non-standard Verbatim mode

The delimiters `${ ... }$` cause this compiler to pass the contents through as
verbatim HTML during the preprocessing phase.  Such delimiters aren't
particularly useful for use in Colab directly, because Colab will interpret the
whole thing inside the `$ ... $`, namely, the content `{ ... }`, as a LateX
expression.  The verbatim consstruct should be used to hook in Svelte
components, as explained below.

## More Detail

Google Colab provides a very nice interactive interface for composing articles
using HTML-like formatting, but also with easy embedding of LateX, and even
defining LateX macros.  The language you type is a form of Markdown that the
'markedjs' parser understands.  (See https://github.com/markedjs/marked)

This tool allows you to export this Colab notebook and convert it to an HTML
webpage.  While there is another default tool for this, it doesn't work well.
Also, it doesn't allow you any entrypoint for adding interactive Javascript
components.  This tool uses Svelte (a Javascript web components system, also
used by Distill.pub), allowing you to add arbitrary Javascript components into
your article using a small construct:

```${<slot name='figure1' />}$```

where 'figure1' is the name of a Svelte Component.  An example can be found at
https://github.com/hrbigelow/kernel-methods.

