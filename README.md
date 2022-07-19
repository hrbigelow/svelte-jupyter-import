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

The above steps compile the file src/example.md provided in the repo into a
Svelte component and webpage, with MathJax 2.7 (as used in Jupyter notebooks,
see
[here](https://github.com/jupyter/notebook/blob/4076882c0e08875dd719945835f8cbe5b10eac9e/notebook/app.py#L75)
) used to render the embedded LateX inside the marked markdown.

To provide your own markdown file:

```bash
$ jupyter nbconvert --to markdown my_notebook.ipynb --output my_notebook.md
$ cp my_notebook.md svelte-jupyter-import/src/
# Edit svelte-jupyter-import/src/App.svelte and replace the line:
# import JupyterContent from './example.md';
# with:
# import JupyterContent from './my_notebook.md'; 
```

There are two endpoints produced by the compilation `$npm run dev`, which you
can access at `localhost:<port>` and `localhost:<port>/editor.html`.  The First
one is your article content `my_notebook.md` as a webpage.  The second one is
a live editor which you can use to spot-check the rendering.

## Math Block and Inline Math modes

The Colab source will be interpreted as one of three types:  Markdown, Math
block, and inline math.  Markdown is the default.  Math block mode is delimited
either by a `\begin{something}` and `\end{something}` flanking the content on
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

Within either math block or inline, you can have embedded text using the
`\mbox{...}` construct.  Furthermore, the `\mbox{...}` can contain inline math,
as in:

```
\begin{equation}
\begin{split}  
\prod_{\substack{ i=1 \\ i=i \\ i \ne j}} 
\end{split} \\[1em]
\mbox{some text within the math block, with inline math: $m_{rc} = a_{ri} * b_{ic}$}
\end{equation}
```

The mechanism used to identify these math snippets is in
[src/marked_math_ext.js](https://github.com/hrbigelow/svelte-jupyter-import/blob/main/src/marked_math_ext.js).
It provides three extensions for marked.js, see [markedjs extensions](https://marked.js.org/using_pro#extensions).
The actual rules used in Colab are quite complicated, see
[packages/rendermine/src/latex.js](https://github.com/jupyterlab/jupyterlab/blob/master/packages/rendermime/src/latex.ts)


## Non-standard Verbatim mode

The delimiters `${ ... }$` cause this compiler to pass the contents through as
verbatim HTML during the preprocessing phase.  In Colab and Jupyter notebook,
these are simply interpreted as inline math content `{ ... }`.  In the repo
they have a special meaning as verbatim content, which can be used to insert an
HTML placeholder for later processing by Svelte.  This is useful for inserting
interactive javascript in your webpage, which is not possible in Jupyter /
Colab.

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

