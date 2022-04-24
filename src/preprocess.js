import { marked } from 'marked';
import katex from 'katex';
// import { node_parser } from 'node-html-parser';
import { parse as html_parse } from 'node-html-parser';

function wrap_for_svelte(str) {
   return `{@html \`${str.replace(/\\/g, '\\\\')}\`}`;
}

// this should accumulate between calls
var katex_macros = {};

/*
 * Anything enclosed in $$ .. $$
 * It can contain instances of \\mbox{ ... }, which can
 * contain strings of $ ... $.  But, these strings are not
 * touched by the
 */
const math_block = {
  name: 'math_block',
  level: 'block',
  // returns position of next match, or undefined if no match
  start(src) { return src.match(/\$\$/)?.index; },
  tokenizer(src, tokens) {
    // rule matches at beginning of string.  this must mean
    // that the tokenizer is called with different slices of the source
    const rule = /^\$\$(.+?)\$\$/s;
    const match = rule.exec(src); // returns a weird array/object hybrid thing 

    if (match) {
      var token = {
        type: 'math_block',
        raw: match[0],
        text: match[1]
      };
      return token;
    }
  },

  renderer(token) {
    var tok = token.text.replace(/\\mbox/g, '\\text');
    try {
      tok = katex.renderToString(tok, {
        macros: katex_macros,
        throwOnError: true,
        globalGroup: true,
        displayMode: true
      });
    } catch (err) {
      console.error(`Got ${err} processing math_block:\n\n${token.text}`);
      throw new Error('Error in math_block');
    }
    return wrap_for_svelte(tok);
  }
};


const math_inline = {
  name: 'math_inline',
  level: 'inline',
  start(src) { return src.match(/\$/)?.index; },
  tokenizer(src, tokens) {
    const rule = /^\$([^\$]+?)\$/s;
    const match = rule.exec(src);
    if (match) {
      return {
        type: 'math_inline',
        raw: match[0],
        text: match[1]
      };
    }
  },

  renderer(token) {
    var num_macros = Object.keys(katex_macros).length;
    var tok = token.text;
    tok = katex.renderToString(tok, {
      macros: katex_macros,
      throwOnError: true,
      displayMode: false,
      globalGroup: true
    });

    // console.log(`in inline: num macros: ${Object.keys(katex_macros).length}`);
    return wrap_for_svelte(tok);
  }
};

// ${ verbatim text }$  => verbatim text
const verbatim = {
  name: 'verbatim',
  level: 'block',
  start(src) { return src.match(/\${/s)?.index; },
  tokenizer(src, tokens) {
    const rule = /^\${(.+?)}\$/s;
    const match = rule.exec(src);
    if (match) {
      return {
        type: 'verbatim',
        raw: match[0],
        text: match[1]
      };
    }
  },

  renderer(token) {
    // console.log(`in verbatim, got ${token.text}`);
    return token.text;
  }
};



marked.use({ extensions: [math_inline, math_block, verbatim] });


function get_toks(content) {
  return marked.lexer(content);
}

function parse(toks) {
  return marked.parser(toks);
}

function pre_md(content) {
  content = marked(content);
  return content;
}

// transform $$ ... $$ to {@html `$$ ... $$`}, also
// changing '\\mbox' to '\\text'
// transform $ ... $ to {@html `$ ... $`}
// but skip over any $ ... $ inside of the $$ ... $$
function pre_sv(content) {
  function quote_math(s) {
    if (s === undefined) return s;
    const rx = /(\$\$.+?\$\$|\$.+?\$)/sg;
    s = s.replaceAll(rx, (el) => { return `{@html \`${el}\`}`; });
    s = s.replace(/\\/g, '\\\\');
    return s;
  }

  var node = html_parse(content);
  for (var n of node.childNodes) {
    if (n.tagName != 'SCRIPT' && n.tagName != 'STYLE') {
      n.innerHTML = quote_math(n.innerHTML);
    }
  }
  content = node.toString();
  return content;
}


export { get_toks, parse, pre_md, pre_sv };

