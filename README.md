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

