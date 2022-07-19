export class markedMathExt {
	
	constructor(wrap_for_svelte) {
		this.do_wrap = wrap_for_svelte
	}

  getExtensions() {
    var do_wrap = this.do_wrap

    function wrap_html(raw) {
      var esc = raw.replace(/\\/g, '\\\\')
      return `{@html \`${esc}\`}`
    }

    var math_block = {
      name: 'math_block',
      level: 'block',
      // returns position of next match, or undefined if no match
      //start(src) { return src.match(/\$\$/)?.index; },
      start(src) { return src.match(/(\\begin{[^\}]+}|\$\$)/)?.index; },
      tokenizer(src, tokens) {
        // rule matches at beginning of string.  this must mean
        // that the tokenizer is called with different slices of the source
        // const rule = /^\\begin{equation}(.+?)\\end{equation}|^\$\$(.+?)\$\$/s;
        const eqn_rule = /^(?<latex1>\\begin{(?<block>[^\}]+)}.+?\\end{\k<block>})/
        const dollar_rule = /^(?<latex2>\$\$.+?\$\$)/
        const rule = RegExp(eqn_rule.source + '|' + dollar_rule.source, 's')
        const match = rule.exec(src); // returns a weird array/object hybrid thing 

        if (match) {
          // console.log(match)
          var token = {
            type: 'math_block',
            raw: match[0],
            text: match.groups.latex1 || match.groups.latex2
          };
          return token;
        }
      },
      renderer(token) {
        var par = `<p>${token.text}</p>`
        // console.log(par)
        if (do_wrap) return wrap_html(par)
        else return par
      }
    }

    var math_inline = {
      name: 'math_inline',
      level: 'inline',
      start(src) { return src.match(/\$/)?.index; },
      tokenizer(src, tokens) {
        const rule = /^(\$[^\$]+?\$)/s;
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
        if (do_wrap) return wrap_html(token.text)
        else return token.text
      }
    }

    var verbatim = {
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
    }

    return [ math_block, math_inline, verbatim ]
  }
}


