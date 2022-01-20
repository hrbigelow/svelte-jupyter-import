# A Jupyter Notebook

## That has been exported

### With the following

This md file is a Jupyter notebook .ipynb file that has been converted to
markdown format with the command:

`jupyter nbconvert --to markdown example.ipynb --output example.md`

The following constructs are understood:

Some marked macros which you can use later.  These won't be rendered:

$
\newcommand\B[1]{\boldsymbol{#1}}
\newcommand\norm[1]{\|#1\|}
\newcommand\ang[1]{\theta_{#1}}
\newcommand\dist{\mathrm{dist}}
\newcommand\half{{\small {1 \over 2}}}
\newcommand\FeatSpace{\mathcal{\Phi}}
\newcommand\GSpace{\mathcal{G}_\sigma}
\newcommand\proj[2]{#1_{\small \parallel #2}}
\newcommand\rej[2]{#1_{\small \perp #2}}
\newcommand\V[1]{\vec{#1}}
\newcommand\len[1]{\mathrm{len}(#1)}
\newcommand\disp[1]{\mathrm{disp}(#1)}
$

A sentence with inline math, like $e = mc^2$, or something including macros
defined above, such as $e^{-\half a(x-y)^2}$.

An equation array.  Delimit the whole array with double dollar sign.  you may
use mbox as well, with inline math inside the mbox delimited with single-dollar
sign.

$$
\begin{aligned}
e^{-\half a(x-\mu)^2} & = e^{-\half a(x^2-2x\mu+\mu^2)} \\[1em]
& = e^{-\half a x^2} e^{ax\mu} e^{-\half a \mu^2} \\[1em]
& = e^{-\half a x^2} ( \vec{\psi_a}(x) \cdot \vec{\psi_a}(\mu) ) e^{-\half a \mu^2} & \mbox{substitute formula above} \\[1em]
& = (e^{-\half a x^2} \vec{\psi_a}(x) \cdot e^{-\half a \mu^2} \vec{\psi_a}(\mu)) & \mbox{By bilinearity of dot product} \\[1em]
& = \vec{\phi_{\sigma}}(x) \cdot \vec{\phi_{\sigma}}(\mu) & \mbox{Let $\vec{\phi_{\sigma}}(p) \equiv e^{-\half a p^2} \vec{\psi_a}(p)$ with $a = {\small 1 \over \sigma^2}$} \\
\end{aligned}
$$


Verbatim HTML included within the dollar-bracket construct.  

${<p>I am a paragraph</p>}$
${<pre>I am a PRE element</pre>}$

This is also useful to insert Svelte components, see for example:

${<a
href="https://raw.githubusercontent.com/hrbigelow/kernel-methods/master/src/kernel_methods.md">kernel_methods.md</a>}$

and look for 'slot name='.  To see how to insert arbitrary Javascript
components using Svelte, see the (only) working example at 

${<a href="https://github.com/hrbigelow/kernel-methods">kernel methods
repo</a>}$


The conversion is done using marked.js (which is what jupyter notebook uses),
with a custom marked.js extension following the instructions here:
https://marked.js.org/using_pro#extensions



