# A project template for converting A Colab notebook into a flexible Web application

Usage:

```bash
$ git clone https://github.com/hrbigelow/svelte-jupyter-import.git
$ cd svelte-jupyter-import
$ npm run dev
# Install any missing dependencies with npm install <dependency>
$ go to localhost:port as instructed
```

This compiles a .md file ./src/example.md provided in the
repo into a Svelte component and webpage, with Katex used to render the LateX 

To provide your own markdown file:

```bash
$ jupyter nbconvert --to markdown my_notebook.ipynb --output my_notebook.md
$ cp my_notebook.md svelte-jupyter-import/src/
# Edit svelte-jupyter-import/src/App.svelte and replace the line:
# import JupyterContent from './example.md';
# with:
# import JupyterContent from './my_notebook.md'; 
```

