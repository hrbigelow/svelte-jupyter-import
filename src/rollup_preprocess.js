const dmath_block = {
  name: 'dmath_block',
  level: 'block',
  start(src) { return src.match(/\$/)?.index; },
  // start(src) { return 100 },
  tokenizer(src, tokens) {
    const rule = /^\$(\n\\begin{aligned}\n.+?\\end{aligned}\n)\$\n/s;
    const match = rule.exec(src);
    if (match) {
      // console.log(match);
      return {
        type: 'dmath_block',
        raw: match[0],
        text: match[1]
      };
    }
  },
  renderer(token) {
    var tok = token.text.replace(/\\mbox/g, '\\text');
    tok = tok.replace(/\\/g, '\\\\');
    return `<d-math block>\n{@html \`${tok}\`}\n</d-math>\n`;
  }
};

const dmath = {
  name: 'dmath',
  level: 'inline',
  start(src) { return src.match(/\$/)?.index; },
  tokenizer(src, tokens) {
    const rule = /^\$(?!.+?\\begin)([^\$]+)\$/s;
    const match = rule.exec(src);
    if (match) {
      return {
        type: 'dmath',
        raw: match[0],
        text: match[1]
      };
    }
  },
  renderer(token) {
    var tok = token.text.replace(/\\mbox/g, '\\text');
    tok = tok.replace(/\\/g, '\\\\');
    var out = `<d-math>{@html \`${tok}\`}</d-math>`;
    return out;
  }
};


// converts <d-math> ... </d-math> to
// <d-math>{@html `...`}</d-math>
// and likewise for <d-math block>
function quote_dmath_html(content) {
  let rx = /(\<d-math\>|\<d-math block\>)(.+?)\<\/d-math\>/sg;
  let code = content.replace(rx, (match, p1, p2) => 
    {
      // console.log('in quote_dmath: ', match, p1, p2, p3);
      var esc = p2.replace(/\\/g, '\\\\');
      var out = `${p1}{@html \`${esc}\`}</d-math>`;
      // console.log('in quote_dmath: ', out);
      return out;
    }
  );
  return code;
}


function make_latex_macro_convert(macros) {
  var rx = '';
  var mx = /\\newcommand(?<cmd>\\.+?)(\[(?<num_pars>.+?)\])*{(?<replace>.+)}/;
  var argpat = '{(.+?)}';
  var qrpats = [];
  var qpat, rpat, g;
  for (let m of macros) {
    var g = m.match(mx).groups;
    qpat = g.cmd + argpat.repeat(g.num_pars || 0);
    rpat = g.replace.replace('#','$');
    qrpats.push({ qpat: new RegExp(qpat, 'g'), rpat: rpat });
  }
  function macro_convert(code) {
    for (let qr of qrpats) {
      // console.log(qr);
      // console.log(qr.qpat.source);
      code = code.replace(qr.qpat, qr.rpat);
    }
    console.log(code);
    return code;
  }
  return macro_convert;
}
    

const macros = [
/\newcommand\\B[1]{\bold{#1}}/.source,
/\newcommand\\len[1]{\|#1\|}/.source,
/\newcommand\\ang[1]{\theta_{#1}}/.source,
/\newcommand\\dist{\mathrm{dist}}/.source,
/\newcommand\\proj{\mathrm{proj}}/.source
];


var macro_convert = make_latex_macro_convert(macros);

export { dmath, dmath_block, quote_dmath_html, macro_convert };

