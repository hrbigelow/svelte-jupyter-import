# A Jupyter Notebook

## That has been exported

### With the following

This md file is a Jupyter notebook .ipynb file that has been converted to
markdown format with the command:

`jupyter nbconvert --to markdown my_notebook.ipynb --output jupyter_nbconvert_markdown.md`

Here is another paragraph containing some LateX.  $e = mc^2$.  And here is an equation array:

$
\begin{aligned}
x_1 & = y_1 \\
\end{aligned}
$

The conversion is done using marked.js (which is what jupyter notebook uses), with
a custom marked.js extension following the instructions here:  https://marked.js.org/using_pro#extensions
to convert the LateX blocks delimited by dollar signs into <d-math></d-math> blocks that are
understood by distill.js.


