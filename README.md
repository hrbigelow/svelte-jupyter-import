# A project template for converting A Colab notebook into a flexible Web application

Usage:

```bash
$ git clone https://github.com/hrbigelow/svelte-jupyter-import.git
$ cd svelte-jupyter-import
$ npm run dev
# Install any missing dependencies with npm install <dependency>
$ go to localhost:port as instructed
```

This compiles a .md file ./src/jupyter_nbconvert_markdown.md provided in the
repo into a Svelte component and webpage, with distill.js used to render LateX.

To provide your own markdown file:

```bash
$ jupyter nbconvert --to markdown my_notebook.ipynb --output my_notebook.md
$ cp my_notebook.md svelte-jupyter-import/src/
# Edit svelte-jupyter-import/src/App.svelte and replace the line:
# import JupyterContent from './jupyter_nbconvert_markdown.md';
# with:
# import JupyterContent from './my_notebook.md'; 
```

## How it works

The technique shown in [Marked.js Custom Extensions](https://marked.js.org/using_pro#extensions)
is used in src/rollup_preprocess.js.  The occurrences of `$ ... $` and:

```
$
\begin{aligned}
...
\end{aligned}
$
```

are replaced with `<d-math> ... </d-math>` blocks, and the contents escaped appropriately for Svelte
to process.  The remainder of the .md file contents are parsed normally with marked.js to produce html.

Then, the Svelte compiler compiles all of it to Javascript, and bundles it as a component which
you can then import.  The `<d-math>` tags are tags understood by distill.js, which is a handy
typesetting library based on katex.js for math.  Distill.js also has good formatting for figures.





