var turndownRules = {};

function repeat (character, count) {
  return Array(count + 1).join(character)
}

turndownRules.paragraph = {
  filter: 'p',

  replacement: function (content) {
    return '\n\n' + content + '\n\n'
  }
};

turndownRules.lineBreak = {
  filter: 'br',

  replacement: function (content, node, options) {
    return options.br + '\n'
  }
};

turndownRules.heading = {
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

  replacement: function (content, node, options) {
    var hLevel = Number(node.nodeName.charAt(1));

    if (options.headingStyle === 'setext' && hLevel < 3) {
      var underline = repeat((hLevel === 1 ? '=' : '-'), content.length);
      return (
        '\n\n' + content + '\n' + underline + '\n\n'
      )
    } else {
      return '\n\n' + repeat('#', hLevel) + ' ' + content + '\n\n'
    }
  }
};

turndownRules.blockquote = {
  filter: 'blockquote',

  replacement: function (content) {
    content = content.replace(/^\n+|\n+$/g, '');
    content = content.replace(/^/gm, '> ');
    return '\n\n' + content + '\n\n'
  }
};

turndownRules.list = {
  filter: ['ul', 'ol'],

  replacement: function (content, node) {
    var parent = node.parentNode;
    if (parent.nodeName === 'LI' && parent.lastElementChild === node) {
      return '\n' + content
    } else {
      return '\n\n' + content + '\n\n'
    }
  }
};

turndownRules.listItem = {
  filter: 'li',

  replacement: function (content, node, options) {
    content = content
      .replace(/^\n+/, '') // remove leading newlines
      .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
      .replace(/\n/gm, '\n    '); // indent
    var prefix = options.bulletListMarker + '   ';
    var parent = node.parentNode;
    if (parent.nodeName === 'OL') {
      var start = parent.getAttribute('start');
      var index = Array.prototype.indexOf.call(parent.children, node);
      prefix = (start ? Number(start) + index : index + 1) + '.  ';
    }
    return (
      prefix + content + (node.nextSibling && !/\n$/.test(content) ? '\n' : '')
    )
  }
};

turndownRules.indentedCodeBlock = {
  filter: function (node, options) {
    return (
      options.codeBlockStyle === 'indented' &&
      node.nodeName === 'PRE' &&
      node.firstChild &&
      node.firstChild.nodeName === 'CODE'
    )
  },

  replacement: function (content, node, options) {
    return (
      '\n\n    ' +
      node.firstChild.textContent.replace(/\n/g, '\n    ') +
      '\n\n'
    )
  }
};

turndownRules.fencedCodeBlock = {
  filter: function (node, options) {
    return (
      options.codeBlockStyle === 'fenced' &&
      node.nodeName === 'PRE' &&
      node.firstChild &&
      node.firstChild.nodeName === 'CODE'
    )
  },

  replacement: function (content, node, options) {
    var className = node.firstChild.className || '';
    var language = (className.match(/language-(\S+)/) || [null, ''])[1];

    return (
      '\n\n' + options.fence + language + '\n' +
      content +
      '\n' + options.fence + '\n\n'
    )
  }
};

turndownRules.horizontalRule = {
  filter: 'hr',

  replacement: function (content, node, options) {
    return '\n\n' + options.hr + '\n\n'
  }
};

turndownRules.mentionLink = {
  filter: function (node, options) {
    return (
      node.className === 'mention' &&
      node.nodeName === 'A' &&
      node.getAttribute('href')
    )
  },

  replacement: function (content, node) {
    return node.innerText;
  }
};

turndownRules.issueLink = {
  filter: function (node, options) {
    return (
      node.className.indexOf('issue_link') != -1  &&
      node.nodeName === 'A' &&
      node.getAttribute('href')
    )
  },

  replacement: function (content, node) {
    return node.innerText;
  }
};

turndownRules.inlineLink = {
  filter: function (node, options) {
    return (
      options.linkStyle === 'inlined' &&
      node.nodeName === 'A' &&
      node.getAttribute('href')
    )
  },

  replacement: function (content, node) {
    var href = node.getAttribute('href');
    var title = node.title ? ' "' + node.title + '"' : '';
    return '[' + content + '](' + href + title + ')'
  }
};

turndownRules.referenceLink = {
  filter: function (node, options) {
    return (
      options.linkStyle === 'referenced' &&
      node.nodeName === 'A' &&
      node.getAttribute('href')
    )
  },

  replacement: function (content, node, options) {
    var href = node.getAttribute('href');
    var title = node.title ? ' "' + node.title + '"' : '';
    var replacement;
    var reference;

    switch (options.linkReferenceStyle) {
      case 'collapsed':
        replacement = '[' + content + '][]';
        reference = '[' + content + ']: ' + href + title;
        break
      case 'shortcut':
        replacement = '[' + content + ']';
        reference = '[' + content + ']: ' + href + title;
        break
      default:
        var id = this.references.length + 1;
        replacement = '[' + content + '][' + id + ']';
        reference = '[' + id + ']: ' + href + title;
    }

    this.references.push(reference);
    return replacement
  },

  references: [],

  append: function (options) {
    var references = '';
    if (this.references.length) {
      references = '\n\n' + this.references.join('\n') + '\n\n';
      this.references = []; // Reset references
    }
    return references
  }
};

turndownRules.emphasis = {
  filter: ['em', 'i'],

  replacement: function (content, node, options) {
    if (!content.trim()) return ''
    return options.emDelimiter + content + options.emDelimiter
  }
};

turndownRules.strong = {
  filter: ['strong', 'b'],

  replacement: function (content, node, options) {
    if (!content.trim()) return ''
    return options.strongDelimiter + content + options.strongDelimiter
  }
};

turndownRules.code = {
  filter: function (node) {
    var hasSiblings = node.previousSibling || node.nextSibling;
    var isCodeBlock = node.parentNode.nodeName === 'PRE' && !hasSiblings;

    return node.nodeName === 'CODE' && !isCodeBlock
  },

  replacement: function (content) {
    if (!content.trim()) return ''

    var delimiter = '`';
    var leadingSpace = '';
    var trailingSpace = '';
    var matches = content.match(/`+/gm);
    if (matches) {
      if (/^`/.test(content)) leadingSpace = ' ';
      if (/`$/.test(content)) trailingSpace = ' ';
      while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + '`';
    }

    return delimiter + leadingSpace + content + trailingSpace + delimiter
  }
};

turndownRules.image = {
  filter: 'img',

  replacement: function (content, node) {
    var alt = node.alt || '';
    var src = node.getAttribute('src') || '';
    var title = node.title || '';
    var titlePart = title ? ' "' + title + '"' : '';
    return src ? '![' + alt + ']' + '(' + src + titlePart + ')' : ''
  }
}

module.exports = turndownRules;