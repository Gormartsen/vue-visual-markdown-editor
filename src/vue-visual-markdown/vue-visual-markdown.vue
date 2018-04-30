<style scoped lang="scss" src="vue-visual-markdown.scss"></style>
<template src="vue-visual-markdown.html"></template>
<script>

module.exports = {
  data: function(){
    var currentMode;// = vm.datastate['visualeditor'];
    if (['html', 'markdown'].indexOf(currentMode) == -1) {
      currentMode = 'markdown';
    }
    return {
      error: 'SomeText',
      visualeditor: false,
      texteditor: false,
      console: false,
      isEdit: false,
      isDelete: false,
      submit: true,
      newBody: '',
      update: {},
      latestElem: false,
      offset: 0,
      range: false,
      autocomplete: '',
      markdowncontent: '',
      editormode: currentMode,
      toolbar: [],
      textStart: '\u200B',
      textStop: '\u200D'
    }
  },
  props:['value', 'config'],
  watch: {
    'config.markdown': {
      deep: true,
      handler: function (newValue) {
        this.markdown = new global.MarkdownIt();
      }
    },
    'config.turndown': {
      deep: true,
      handler: function (newValue) {
        this.td = new TurndownService(newValue);
      }
    },
    'config.toolbar': {
      deep: true,
      handler: function (newValue) {
        this.toolbar = this.processToolbar(newValue);
      }
    },
    value: function(newValue) {
      if (newValue == '') {
        this.markdowncontent = '';
        this.visualeditor.innerHTML = '';
      }
      if (newValue != this.markdowncontent) {
        this.markdowncontent = newValue;
      }
    },
  },
  mounted: function() {
    document.execCommand('defaultParagraphSeparator', false, 'p');
    this.visualeditor = this.$el.querySelector('.visualeditor');
    this.texteditor = this.$el.querySelector('.texteditor');
    this.toolbar = this.processToolbar(this.config.toolbar);

   // this.visualDrop = new FileDrop(this.visualeditor, {input: false});
   // this.textDrop = new FileDrop(this.texteditor, {input: false});

    var self = this;
/*
    this.textDrop.event('upload', function (e) {
      self.textDrop.eventFiles(e).each(function (file) {
        file.readDataURI(
          function (uri) {
            self.texteditor.focus();
            var start = self.texteditor.selectionStart;
            var placeholder = '';
            var isImage = false;
            if (file.mime.indexOf('image') != -1) {
              placeholder = ' ![Uploading ' + file.name + '](Please wait)';
              isImage = true;
            } else {
              placeholder = ' [Uploading ' + file.name + '](Please wait)';
            }
            self.texteditor.value = self.texteditor.value.substr(0, start)
              + placeholder
              + self.texteditor.value.substr( start, self.texteditor.value.length);
            var base64 = uri.substr(uri.indexOf(',') + 1);

            ws.post('repos' + window.repoUrl + '/files', {
              name: file.name,
              size: file.size,
              content: base64
            }, function(err, response, headers){
              console.log(err, response, headers);
              var replaceStart = self.texteditor.value.indexOf(placeholder);
              if (replaceStart != -1) {
                if (err) {
                  var replaceBy = ' [Uploading ' + file.name + '](failed)';
                  if (isImage) {
                    replaceBy = ' ![Uploading ' + file.name + '](failed)';
                  }
                  self.texteditor.value = self.texteditor.value.substr(0, replaceStart)
                  + replaceBy
                  + self.texteditor.value.substr( replaceStart + placeholder.length, self.texteditor.value.length);
                } else {
                  var replaceBy = ' [' + file.name + '](' + response.publicUrl + ')';
                  if (isImage) {
                    replaceBy = ' ![' + file.name + '](' + response.publicUrl + ')';
                  }
                  self.texteditor.value = self.texteditor.value.substr(0, replaceStart)
                  + replaceBy
                  + self.texteditor.value.substr( replaceStart + placeholder.length, self.texteditor.value.length);
                }
              }
              var event = new Event('input');
              self.texteditor.dispatchEvent(event);
            });
          },
          function () { alert('Problem reading this file.'); },
          'text'
        );
      });
    });

    this.visualDrop.event('upload', function (e) {
      self.visualDrop.eventFiles(e).each(function (file) {
        file.readDataURI(
          function (uri) {
            self.visualeditor.focus();
            if (window.getSelection) {
              var sel = window.getSelection();
              if (sel.getRangeAt && sel.rangeCount) {
                var range = sel.getRangeAt(0);
                var root = document.createElement('uploading');
                root.innerHTML = '<i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>'
                  + ' <b>Uploading ' + file.name + '. Plase wait. </b>';
                range.insertNode(root);
                sel.removeAllRanges();
              }
            }
            var isImage = false;
            if (file.mime.indexOf('image') != -1) {
              isImage = true;
            }

            var base64 = uri.substr(uri.indexOf(',') + 1);

            ws.post('repos/gormartsen/files', {
              name: file.name,
              size: file.size,
              content: base64
            }, function(err, response, headers){
              console.log(err, response, headers);
              setTimeout(function(){
                var node = self.visualeditor.querySelector('uploading');
                if (node) {
                  if (err) {
                    node.innerHTML = '<i class="fa fa-exclamation" aria-hidden="true"></i>'
                      + ' <b style="color:red"> Failed to upload ' + file.name + '</b>';
                  } else {
                    var element = ''
                    if (isImage){
                      element = document.createElement('img');
                      element.src = response.publicUrl;
                      element.alt = file.name;
                    } else {
                      element = document.createElement('a');
                      element.href = response.publicUrl;
                      element.innerHTML = file.name;
                    }
                    node.parentNode.insertBefore(element, node);
                    node.parentNode.removeChild(node);
                  }
                }
                self.emitHTMLInput();
                self.visualeditor.focus();

              }, 1000);
            });
          },
          function () { alert('Problem reading this file.'); },
          'text'
        );
      });
    });*/

    // enable turndown(tomarkdown)
    /*this.td = new TurndownService(this.config.turndown);
    this.td.addRule('font', {
      filter: ['font'],
      replacement: function (content, node) {
        var size = '';
        var color = '';
        if (node.size){
          size = ' size="' + node.size + '"';
        }
        if (node.color){
          color = ' color="' + node.color + '"';
        }
        return '<font' + size + color + '>' + content + '</font>'
      }
    })
    this.td.addRule('newlinebr', {
      filter: ['br'],
      replacement: function (content) {
        return '\n' + content + '\n'
      }
    })*/
    this.visualeditor.addEventListener("paste", function(event) {
      setTimeout(function(){
        self.reRender();
        self.$emit('input', self.td.turndown(self.visualeditor.innerHTML));
      }, 0);
    }, false);

    // Enable Markdown
    this.markdown = new global.MarkdownIt();

    this.visualeditor.innerHTML = this.markdown.render(this.value);
    this.markdowncontent = this.value;
    var self = this;
  },
  computed: {
    toolbarGroups: function(){
      var groups = [];
      groups.push('default');
      if (this.config.toolbar) {
        for(var i in this.toolbar){
          var button = this.toolbar[i];
          if (button.group) {
            if (groups.indexOf(button.group) == -1) {
              groups.push(button.group);
            }
          }
        }
      }
      groups.sort();
      return groups;
    }
  },
  methods: {
    processToolbar: function(toolbar) {
      var buttonNames = ['bold', 'italic', 'header', 'link', 'img', 'list', 'numlist', 'code', 'quote', 'color', 'size'];
      var buttonDefenitions = {
        'bold': {
          group: '1',
          type: 'inline',
          icon: 'bold',
          tag: 'b',
          markdown: '**selection**',
          placeholder: 'bold text'
        },
        'italic': {
          group: '1',
          type: 'inline',
          icon: 'italic',
          tag: 'em',
          markdown: '*selection*',
          placeholder: 'italic text'
        },
        'link': {
          group: '2',
          type: 'input',
          icon: 'link',
          tag: 'a',
          markdown: '[selection](input)',
          placeholder: 'Link',
          input: 'href',
          selection: 'innerHTML',
          prompt: 'Insert Hyperlink'
        },
        'img': {
          group: '2',
          type: 'input',
          icon: 'image',
          tag: 'img',
          markdown: '![selection](input)',
          placeholder: 'Image',
          input: 'src',
          selection: 'alt',
          prompt: 'Insert Image URL'
        },
        'quote': {
          group: '3',
          type: 'wrap',
          icon: 'quote-left',
          tag: 'blockquote',
          markdown: '> selection\n',
          perline: true,
          placeholder: 'Quote',
        },
        'code': {
          group: '3',
          type: 'wrap',
          icon: 'code',
          tag: 'pre',
          item: 'code',
          markdown: '```\nselection\n```',
          perline: false,
          placeholder: 'Code',
        },
        'list': {
          group: '3',
          type: 'wrap',
          icon: 'list',
          tag: 'ul',
          item: 'li',
          markdown: ' - selection\n',
          perline: true,
          placeholder: 'List',
        },
        'numlist': {
          group: '3',
          type: 'wrap',
          icon: 'list-ol',
          tag: 'ol',
          item: 'li',
          before: function(){
            if (!window.numlistcounter) {
              window.numlistcounter = 0;
            }
            window.numlistcounter = window.numlistcounter + 1;
            return ' ' + window.numlistcounter + '. ';
          },
          reset: function() {
            delete window.numlistcounter;
          },
          markdown: 'selection\n',
          perline: true,
          placeholder: 'Numeric list',
        },
        'header': {
          group: '1',
          type: 'dropdown',
          icon: 'heading',
          tag: 'h',
          handlerText: function(self, button, callback) {
            var start = self.texteditor.value.indexOf(self.textStart);

            // find newline
            if (start > 0 ){
              var newlinePos = start - 1;
              while (true) {
                if (newlinePos == 0) {
                  break;
                }
                if (self.texteditor.value.substring(newlinePos, newlinePos + 1) == '\n') {
                  newlinePos = newlinePos + 1;
                  break;
                }
                newlinePos = newlinePos - 1;
              }
              self.texteditor.value = self.texteditor.value.substring(0, newlinePos)
                + self.textStart
                + self.texteditor.value.substring(newlinePos, start )
                + self.texteditor.value.substr(start + self.textStart.length);
                start = self.texteditor.value.indexOf(self.textStart);
            }
            var stop = self.texteditor.value.indexOf(self.textStop);
            if (stop < self.texteditor.value.length - 1 ){
              var newlinePos = stop + 1;
              while (true) {
                if (newlinePos == self.texteditor.value.length) {
                  break;
                }
                if (self.texteditor.value.substring(newlinePos, newlinePos + 1) == '\n') {
                  //newlinePos = newlinePos - 1;
                  break;
                }
                newlinePos = newlinePos + 1;
              }
              self.texteditor.value = self.texteditor.value.substring(0, stop)
                + self.texteditor.value.substring(stop + self.textStop.length, newlinePos )
                + self.textStop
                + self.texteditor.value.substr(newlinePos);
                stop = self.texteditor.value.indexOf(self.textStop);
            }
            var content = self.texteditor.value.substring(start + self.textStart.length, stop)
            if (content == '') {
              content = button.placeholder;
            }
            var newlinePos = 0;
            while (true) {
              if (content.substr(newlinePos, 1) == '#') {
                content = content.substr(newlinePos + 1);
              } else {
                if (content.substr(newlinePos, 1) == ' ') {
                  content = content.substr(newlinePos + 1);
                }
                break;
              }
            }
            var level = 1;
            var pref = '#';
            while (level < button.level) {
              pref = pref + '#'
              level = level + 1;
            }
            content = pref + ' ' + content;
            self.texteditor.value = self.texteditor.value.substring(0, start + self.textStart.length)
            + content
            + self.texteditor.value.substr(stop);
            callback(true);
          },
          handlerHtml: function(self, button, callback) {
            var node = self.visualeditor.querySelector('ve-rule');
            var element = self._findParentElement(self.visualeditor, node, /^H/);
            var el = document.createElement('H' + button.level);
            var placeholder = button.placeholder;
            if (element == false) {
              if (node.firstChild && node.firstChild.nodeName.search(/^H/) !== -1) {
                var frag = self._extractFrags(node.firstChild);
                el.appendChild(frag);
                var parent = node.parentNode;
                parent.replaceChild(el, node);
                return callback(el);
              }
              var frag = self._extractFrags(node);
              if (frag.textContent == '' && button.placeholder ) {
                frag.appendChild(document.createTextNode(button.placeholder));
              }
              el.appendChild(frag);
              var parent = node.parentNode;
              parent.replaceChild(el, node);
              return callback(el);
            } else {
              var frag = self._extractFrags(node);
              node.parentNode.insertBefore(frag, node);
              node.parentNode.removeChild(node);
              el.innerHTML = element.innerHTML;
              element.parentNode.replaceChild(el, element);
              return callback(el);
            }
          },
          items: [
            {
              title: '<h1 style="margin: 0px;">Header</h1>',
              placeholder: 'Header 1',
              level: 1,
            },
            {
              title: '<h2 style="margin: 0px;">Header</h2>',
              placeholder: 'Header 2',
              level: 2,
            },
            {
              title: '<h3 style="margin: 0px;">Header</h3>',
              placeholder: 'Header 3',
              level: 3,
            }
          ],
          perline: true,
          placeholder: 'Header',
        },
      }
      if (toolbar && toolbar.length > 0) {
        if (toolbar == 'default'){
          // generate default toolbar here
          return this.processToolbar(buttonNames);
        }
        if (toolbar.length > 0){
          var newToolbar = [];
          for(var i in toolbar){
            var button = toolbar[i];
            if (button && button.type) {
              newToolbar.push(button);
            }
            if (buttonNames.indexOf(button) != -1) {
              // add predefined button.
              if (buttonDefenitions[button]) {
                var tmp = buttonDefenitions[button];
                if(!tmp.name ) {
                  tmp.name = button;
                }
                newToolbar.push(tmp);
              }
            }
          }
          return newToolbar;
        }
      }
      return []
    },
    switchMode: function(){
      if (this.editormode == 'html') {
        this.editormode = 'markdown';
      } else {
        this.editormode = 'html';
        this.visualeditor.innerHTML = this.markdown.render(this.value);
      }
      //vm.datastate['visualeditor'] = this.editormode;
      var self = this;
      setTimeout(function(){
        if (self.editormode == 'html') {
          self.visualeditor.focus();
        } else {
          self.texteditor.focus();
        }
      }, 10);
    },
    buttonByGroup: function(group){
      var buttons = [];
      var types = ['inline', 'input', 'wrap', 'dropdown'];
      if (this.config.toolbar) {
        for(var i in this.toolbar){
          var button = this.toolbar[i];
          if (button.group == group && button.tag && button.tag != '') {
            buttons.push(button);
          }
        }
      }
      return buttons;
    },
    emitTextEditor: function() {
      this.$emit('input', this.markdowncontent);
      this.visualeditor.innerHTML = this.markdown.render(this.markdowncontent);
    },
    reRender: function(){
      var mdcontent = this.td.turndown(this.visualeditor.innerHTML);
      mdcontent = striptags(mdcontent, ['font']);
      this.visualeditor.innerHTML = this.markdown.render(mdcontent);
    },
    changed: function(event) {
      this.emitHTMLInput();
    },
    emitHTMLInput: function(){
      this._cleanTags(this.visualeditor);
      this._joinTags(this.visualeditor);
      var nodes = this.visualeditor.querySelectorAll('span');
      var self = this;
      if (nodes.length > 0) {
        nodes.forEach(function(currentValue, currentIndex, listObj) {
          var frag = self._extractFrags(currentValue);
          currentValue.parentNode.insertBefore(frag, currentValue);
          currentValue.parentNode.removeChild(currentValue);
        });
      }
      var md = this.td.turndown(this.visualeditor.innerHTML);
      this.$emit('input', md);
    },
    _findStringBefore: function(string, findme) {
      var pos = string.indexOf(findme);
      if (pos == -1) {
        return -1;
      }
      var lastpos = pos;
      while (true) {
        pos = string.indexOf(findme, pos + findme.length);
        if (pos == -1) {
          return lastpos;
        }
        lastpos = pos;
      }
    },
    _findStringAfter: function(string, findme) {
      return string.indexOf(findme);
    },
    _cleanTags: function(node){
      for (var n = 0; n < node.childNodes.length; n ++) {
        var child = node.childNodes[n];
        if ( child.nodeType === 8
          || (child.nodeType === 3
              && (child.nodeValue == "" || child.nodeValue == "\n"))) {
          child.parentNode.removeChild(child);
          n --;
        }
        else if (child.nodeType === 1 && ['br', 'img'].indexOf(child.nodeName.toLowerCase()) == -1) {
          if (child.childNodes.length > 0) {
            this._cleanTags(child);
            if (child.childNodes.length == 0) {
              node.removeChild(child);
              n --;
            }
          } else {
            node.removeChild(child);
            n --;
          }
        }
      }
    },
    _extractFrags: function(element, name){
      var frag = document.createDocumentFragment();
      while (element.childNodes.length > 0){
        var child = element.childNodes[0];
        if (child.nodeName.toLowerCase() == name) {
          var childContent = this._extractFrags(child, name);
          element.removeChild(child);
          child = childContent;
        }
        frag.appendChild(child);
      }
      return frag;
    },
    _splitNode: function(node, split) {
      function getNodeIndex(parent, node) {
        var index = parent.childNodes.length;
        while (index--) {
          if (node === parent.childNodes[index]) {
            break;
          }
        }
        return index;
      }
      var parent = node.parentNode;
      var parentOffset = getNodeIndex(parent, node);
      var doc = split.parentNode.ownerDocument;
      var leftRange = doc.createRange();
      leftRange.setStart(parent, parentOffset);
      leftRange.setEnd(split, 0);
      var left = leftRange.extractContents();
      parent.insertBefore(left, node);
      parent.insertBefore(document.createElement('span'), node);
      var theSplit = parent.querySelector('span');
      return theSplit;
    },
    _joinTags: function(node) {
      var n = 0;
      while (n < node.childNodes.length){
        var child = node.childNodes[n];
        if (child.childNodes.length > 1) {
          this._joinTags(child);
        }
        if ( node.childNodes.length > n + 1) {
          var childNext = node.childNodes[n + 1];
          if (["b", "i", "blockquote", "h1", "h2", "h3", "font"].indexOf(child.nodeName.toLowerCase()) == -1) {
            n = n + 1;
            continue;
          }
          if (child.nodeName == 'font' ) {
            if (childNext.nodeName != 'font') {
              n = n + 1;
              continue;
            }
            if (child.color != childNext.color) {
              n = n + 1;
              continue;
            }
            if (child.size != childNext.size) {
              n = n + 1;
              continue;
            }
          }
          if (child.nodeName == childNext.nodeName) {
            var frag = this._extractFrags(childNext);
            child.appendChild(frag);
            childNext.parentNode.removeChild(childNext);
          } else {
            n = n + 1;
          }
        } else {
          break;
        }
      }
    },
    _findParentElement: function(root, element, pattern) {
        if (!root.contains(element)){
          return false;
        }
        if (element.nodeName.search(pattern) !== -1) {
          return element;
        }
        return this._findParentElement(root, element.parentElement, pattern);
    },
    _getLastItems: function(node, lastItems, tag) {
      if (node.childNodes.length == 0 ) {
        return false;
      }
      var exclude = ["i", "span"];
      if (tag) {
        exclude.push(tag);
      }
      if (exclude.indexOf(node.nodeName.toLowerCase()) != -1) {
        return false;
      }
      for (var n = 0; n < node.childNodes.length; n ++) {
        var child = node.childNodes[n];
        if (["br"].indexOf(child.nodeName.toLowerCase()) != -1) {
          continue;
        }
        var isLatest = true;

        if (child.childNodes.length > 0) {
          for (var i = 0; i < child.childNodes.length; i ++) {
            var n1 = child.childNodes[i];
            if (n1.nodeType == 1) {
              isLatest = false;
              break;
            }
          }
        }
        if (isLatest) {
          if (child.nodeType == 3 && child.textContent == "\n") {
            continue;
          }
          lastItems.push(child);
        } else {
          var ret = this._getLastItems(child, lastItems, tag);
          if (ret === false) {
            lastItems.push(child);
          }
        }
      }
    },
    process_mark: function(){
      var self = this;
      if (this.editormode == 'html') {
        this.visualeditor.focus();
        if (window.getSelection) {
          var sel = window.getSelection();
          if (sel.getRangeAt && sel.rangeCount) {
            var range = sel.getRangeAt(0);
            var selectionContent = range.cloneContents();
            var root = document.createElement('ve-rule');
            if (selectionContent.textContent != '') {
              root.appendChild(this._extractFrags(selectionContent));
            }
            range.deleteContents();
            range.insertNode(root);
            sel.removeAllRanges();
          }
        }
      } else {
        this.texteditor.focus();
        var start = this.texteditor.selectionStart;
        var length = this.texteditor.selectionEnd - this.texteditor.selectionStart;
        var content = this.texteditor.value.substr(start, length);

        if (content.indexOf('\n') != -1 ) {
          if (button.type == 'wrap' && !button.perline ) {
            this.texteditor.value = this.texteditor.value.substr(0, start)
            + this.textStart
            + content
            + this.textStop
            + this.texteditor.value.substr( this.texteditor.selectionEnd, this.texteditor.value.length);
          } else {
            var newContent = '';
            var lines = content.split("\n");
            for (var i in lines ) {
              if (lines[i] != "") {
                newContent = newContent + this.textStart + lines[i] + this.textStop;
              }
            }
            this.texteditor.value = this.texteditor.value.substr(0, start)
            + newContent
            + this.texteditor.value.substr( this.texteditor.selectionEnd, this.texteditor.value.length);
          }
        } else {
          this.texteditor.value = this.texteditor.value.substr(0, start)
            + this.textStart
            + content
            + this.textStop
            + this.texteditor.value.substr( this.texteditor.selectionEnd, this.texteditor.value.length);
        }
      }
    },
    process_replace: function(button) {
      var self = this;
      if (this.editormode == 'html') {
        this.visualeditor.focus();
        var functionName = 'processHtml' + button.type;
        var handlerHtml = function(element) {
          if (element) {
            range.selectNode(element);
            sel.addRange(range);
          }
          self.emitHTMLInput();
        }
        if (button.handlerHtml) {
          return button.handlerHtml(self, button, handlerHtml);
        }
        if (self[functionName]) {
          self[functionName](button, handlerHtml);
        } else {
          handlerHtml();
        }
      } else {
        this.texteditor.focus();
        var functionName = 'processText' + button.type;
        var handlerText = function(){
          var start = self.texteditor.value.indexOf(self.textStart);
          if (start != -1 ) {
            self.texteditor.value = self.texteditor.value.substring(0, start) + self.texteditor.value.substring(start + self.textStart.length);
          }
          var end = self.texteditor.value.indexOf(self.textStop);
          if (end != -1 ) {
            self.texteditor.value = self.texteditor.value.substring(0, end) + self.texteditor.value.substring(end + self.textStop.length);
          }
          self.texteditor.selectionStart = start;
          self.texteditor.selectionEnd = end;
          if (self.texteditor.value.indexOf(self.textStart) != -1) {
            if (button.handlerText) {
              return button.handlerText(self, button, handlerText);
            }
            if (self[functionName]) {
              self[functionName](button, handlerText);
            } else {
              handlerText();
            }
          }
          if (button.reset) {
            button.reset();
          }
          var event = new Event('input');
          self.texteditor.dispatchEvent(event);
        }
        if (button.handlerText) {
          return button.handlerText(self, button, handlerText);
        }
        if (this[functionName]) {
          this[functionName](button, handlerText);
        } else {
          handlerText();
        }
      }
    },
    process_click: function(button) {
      var self = this;
      if (this.editormode == 'html') {
        this.visualeditor.focus();
        if (window.getSelection) {
          var sel = window.getSelection();
          if (sel.getRangeAt && sel.rangeCount) {
            var range = sel.getRangeAt(0);
            var selectionContent = range.cloneContents();
            var root = document.createElement('ve-rule');
            if (selectionContent.textContent != '') {
              root.appendChild(this._extractFrags(selectionContent));
            }
            range.deleteContents();
            range.insertNode(root);
            sel.removeAllRanges();
            var functionName = 'processHtml' + button.type;
            var handlerHtml = function(element) {
              if (element) {
                range.selectNode(element);
                sel.addRange(range);
              }
              self.emitHTMLInput();
            }
            if (button.handlerHtml) {
              return button.handlerHtml(self, button, handlerHtml);
            }
            if (self[functionName]) {
              self[functionName](button, handlerHtml);
            } else {
              handlerHtml();
            }
          }
        }
      } else {
        this.texteditor.focus();
        var start = this.texteditor.selectionStart;
        var length = this.texteditor.selectionEnd - this.texteditor.selectionStart;
        var content = this.texteditor.value.substr(start, length);

        if (content.indexOf('\n') != -1 ) {
          if (button.type == 'wrap' && !button.perline ) {
            this.texteditor.value = this.texteditor.value.substr(0, start)
            + this.textStart
            + content
            + this.textStop
            + this.texteditor.value.substr( this.texteditor.selectionEnd, this.texteditor.value.length);
          } else {
            var newContent = '';
            var lines = content.split("\n");
            for (var i in lines ) {
              if (lines[i] != "") {
                newContent = newContent + this.textStart + lines[i] + this.textStop;
              }
            }
            this.texteditor.value = this.texteditor.value.substr(0, start)
            + newContent
            + this.texteditor.value.substr( this.texteditor.selectionEnd, this.texteditor.value.length);
          }
        } else {
          this.texteditor.value = this.texteditor.value.substr(0, start)
            + this.textStart
            + content
            + this.textStop
            + this.texteditor.value.substr( this.texteditor.selectionEnd, this.texteditor.value.length);
        }
        var functionName = 'processText' + button.type;
        var handlerText = function(){
          var start = self.texteditor.value.indexOf(self.textStart);
          if (start != -1 ) {
            self.texteditor.value = self.texteditor.value.substring(0, start) + self.texteditor.value.substring(start + self.textStart.length);
          }
          var end = self.texteditor.value.indexOf(self.textStop);
          if (end != -1 ) {
            self.texteditor.value = self.texteditor.value.substring(0, end) + self.texteditor.value.substring(end + self.textStop.length);
          }
          self.texteditor.selectionStart = start;
          self.texteditor.selectionEnd = end;
          if (self.texteditor.value.indexOf(self.textStart) != -1) {
            if (button.handlerText) {
              return button.handlerText(self, button, handlerText);
            }
            if (self[functionName]) {
              self[functionName](button, handlerText);
            } else {
              handlerText();
            }
          }
          if (button.reset) {
            button.reset();
          }
          var event = new Event('input');
          self.texteditor.dispatchEvent(event);
        }
        if (button.handlerText) {
          return button.handlerText(self, button, handlerText);
        }
        if (this[functionName]) {
          this[functionName](button, handlerText);
        } else {
          handlerText();
        }
      }
    },
    processHtmlinline: function(button, callback) {
      var node = this.visualeditor.querySelector('ve-rule');
      var self = this;
      var pattern = new RegExp('^' + button.tag.toUpperCase() + '$');

      // clean all possible empty tags first.
      this._cleanTags(node);
      var element = this._findParentElement(this.visualeditor, node, pattern);
      if (element) {
        var split = this._splitNode(element, node);
        var parent = split.parentNode;
        var frag = this._extractFrags(node, button.tag)
        parent.replaceChild(frag, split);
        return callback(split.parentNode);
      }
      // if only one child and eq tag
      if (node.childNodes.length == 1  && node.firstChild.nodeName.toLowerCase() == button.tag) {
        var frag = this._extractFrags(node, tag);
        var parent = node.parentNode;
        parent.replaceChild(frag, node);
        return callback(parent);
      }
      // if multiple nodes selected
      var lastNodes = [];
      this._getLastItems(node, lastNodes, button.tag);
      if (lastNodes.length > 1) {
        for (var n = 0; n < lastNodes.length; n ++) {
          var child = lastNodes[n];
          var childElem = this._findParentElement(node, child, pattern);
          if (childElem == false) {
            if (['#text', 'i', 'em'].indexOf(child.nodeName.toLowerCase()) != -1) {
              var wrap = document.createElement(button.tag);
              child.parentNode.insertBefore(wrap, child);
              wrap.appendChild(child);
            } else {
              child.innerHTML = '<' + button.tag + '>' + child.innerHTML + '</' + button.tag + '>';
            }
          } else {
            var frag = this._extractFrags(childElem, button.tag);
            var parentNode = childElem.parentNode;
            parentNode.replaceChild(frag, childElem);
          }
        }
        var frag = this._extractFrags(node);
        var parent = node.parentNode
        parent.replaceChild(frag, node);
        return callback(false);
      }
      // Else. just wrap.
      var wrap = document.createElement(button.tag);
      wrap.appendChild(this._extractFrags(node, button.tag));
      var nodes = wrap.querySelectorAll(button.tag);
      var self = this;
      if (nodes.length > 0) {
        nodes.forEach(function(currentValue, currentIndex, listObj) {
          var frag = self._extractFrags(currentValue);
          var parent = currentValue.parentNode;
          parent.replaceChild(frag, currentValue);
        });
      } else {
        if (wrap.textContent == '' && button.placeholder ) {
          wrap.appendChild(document.createTextNode(button.placeholder));
        }
      }
      node.parentNode.insertBefore(wrap, node);
      node.parentNode.removeChild(node);
      return callback(wrap);
    },
    processHtmlinput: function(button, callback) {
      var node = this.visualeditor.querySelector('ve-rule');
      var self = this;
      var pattern = new RegExp('^' + button.tag.toUpperCase() + '$');
      // clean all possible empty tags first.
      this._cleanTags(node);
      if (!button.prompt) {
        button.prompt = 'Please input';
      }
      var element = this._findParentElement(this.visualeditor, node, pattern);
      if (element) {
        var split = this._splitNode(element, node);
        var parent = split.parentNode;
        var frag = this._extractFrags(node, button.tag)
        parent.replaceChild(frag, split);
        return callback(split.parentNode);
      }
      var input = prompt(button.prompt, 'http://');
      if (input === null) {
        var frag = this._extractFrags(node);
        var parent = node.parentNode
        parent.replaceChild(frag, node);
        return callback(false);
      }
      var element = document.createElement(button.tag);
      if (button.selection) {
        element[button.selection] = node.textContent.replace('\n', '');
      }
      if (button.input) {
        element[button.input] = input;
      }
      node.parentNode.insertBefore(element, node);
      node.parentNode.removeChild(node);
      return callback(element);
    },
    processHtmlautocomplete: function(button, callback) {
      var node = this.visualeditor.querySelector('ve-rule');
      var self = this;
      var root = document.createElement('span');
      if (button.click) {
        node.innerHTML = button.text;
      }
      var frag = this._extractFrags(node);
      node.parentNode.insertBefore(frag, node);
      node.parentNode.removeChild(node);
      return callback(false);
    },
    processHtmlwrap: function(button, callback) {
      var node = this.visualeditor.querySelector('ve-rule');
      var self = this;
      var pattern = new RegExp('^' + button.tag.toUpperCase() + '$');
      if (node.innerHTML == '') {
        node.innerHTML = button.placeholder;
      }

      // clean all possible empty tags first.
      this._cleanTags(node);

      var root = document.createElement(button.tag);
      var element = this._findParentElement(this.visualeditor, node, /^H|^B$|^EM$/);
      if (element == false) {
        if (button.item) {
          var item = document.createElement(button.item);
          if (button.item == 'code') {
            item.innerHTML = node.textContent;
          } else {
            item.innerHTML = node.innerHTML;
          }
          root.appendChild(item);
        } else {
          root.innerHTML = node.innerHTML;
        }
        node.parentNode.insertBefore(root, node);
        node.parentNode.removeChild(node);
      } else {
        var split = this._splitNode(element, node);
        var parent = split.parentNode;
        var frag = this._extractFrags(node, button.tag);
        if (button.item) {
          var item = document.createElement(button.item);
          item.appendChild(frag);
          root.appendChild(item);
        } else {
          root.appendChild(frag);
        }
        parent.replaceChild(root, split);

      }
      return callback(root);
    },
    processTextautocomplete: function(button, callback) {
      var start = this.texteditor.value.indexOf(this.textStart);
      if (start == -1) {
        console.log('unexpected error. No textStart found in: ', this.texteditor.value);
        return callback(false);
      }
      var stop = this.texteditor.value.indexOf(this.textStop);
      if (stop == -1) {
        console.log('unexpected error. No testStop found in: ', this.texteditor.value);
        return callback(false);
      }
      var content = this.texteditor.value.substring(start + this.textStart.length, stop);
      if (button.click) {
        content = button.text;
      }
      this.texteditor.value = this.texteditor.value.substring(0, start)
        + this.textStart
        + content
        + this.textStop
        + this.texteditor.value.substring(stop + this.textStop.length);
      return callback(true);
    },
    processTextwrap: function(button, callback) {
      if (!button.markdown) {
        console.log('unexpected error. No markdown property found in: ', button);
        return callback(false);
      }
      var start = this.texteditor.value.indexOf(this.textStart);
      if (start == -1) {
        console.log('unexpected error. No textStart found in: ', this.texteditor.value);
        return callback(false);
      }
      var stop = this.texteditor.value.indexOf(this.textStop);
      if (stop == -1) {
        console.log('unexpected error. No testStop found in: ', this.texteditor.value);
        return callback(false);
      }
      var content = this.texteditor.value.substring(start + this.textStart.length, stop);
      if (content == '') {
        content = button.placeholder;
      }
      var md_selection = button.markdown.indexOf('selection');
      if (md_selection == -1) {
        console.log('unexpected error. No "selection" found in markdown for ', button);
        return callback(false);
      }
      var md_before;
      if (button.before) {
        md_before = button.before();
      } else {
        md_before = button.markdown.substring(0, md_selection);
      }
/*        if(this.texteditor.value.substring(start - 1, start) != "\n") {
        md_before = "\n" + md_before;
      }*/
      var md_after = button.markdown.substring(md_selection + 'selection'.length);
      this.texteditor.value = this.texteditor.value.substring(0, start)
        + md_before
        + this.textStart
        + content
        + this.textStop
        + md_after
        + this.texteditor.value.substring(stop + this.textStop.length);
      return callback(true);
    },
    processTextinline: function(button, callback) {
      if (!button.markdown) {
        console.log('unexpected error. No markdown property found in: ', button);
        return callback(false);
      }
      var start = this.texteditor.value.indexOf(this.textStart);
      if (start == -1) {
        console.log('unexpected error. No textStart found in: ', this.texteditor.value);
        return callback(false);
      }
      var stop = this.texteditor.value.indexOf(this.textStop);
      if (stop == -1) {
        console.log('unexpected error. No testStop found in: ', this.texteditor.value);
        return callback(false);
      }
      var content = this.texteditor.value.substring(start + this.textStart.length, stop);
      if (content == '') {
        content = button.placeholder;
      }
      var md_selection = button.markdown.indexOf('selection');
      if (md_selection == -1) {
        console.log('unexpected error. No "selection" found in markdown for ', button);
        return callback(false);
      }
      var md_before = button.markdown.substring(0, md_selection);
      var md_after = button.markdown.substring(md_selection + 'selection'.length);
      var txt_before = this.texteditor.value.substr(start - md_before.length, md_before.length);
      var txt_after = this.texteditor.value.substr(stop + this.textStop.length, md_after.length);
      if ( txt_before == md_before && txt_after == md_after) {
          this.texteditor.value = this.texteditor.value.substring(0, start - md_before.length )
            + this.texteditor.value.substring(start, stop + this.textStop.length)
            + this.texteditor.value.substring(stop + this.textStop.length + md_after.length);
      } else {
        this.texteditor.value = this.texteditor.value.substring(0, start)
          + md_before
          + this.textStart
          + content
          + this.textStop
          + md_after
          + this.texteditor.value.substring(stop + this.textStop.length);
      }
      return callback(true);
    },
    processTextinput: function(button, callback) {
      if (!button.markdown) {
        console.log('unexpected error. No markdown property found in: ', button);
        return callback(false);
      }
      var start = this.texteditor.value.indexOf(this.textStart);
      if (start == -1) {
        console.log('unexpected error. No textStart found in: ', this.texteditor.value);
        return callback(false);
      }
      var stop = this.texteditor.value.indexOf(this.textStop);
      if (stop == -1) {
        console.log('unexpected error. No testStop found in: ', this.texteditor.value);
        return callback(false);
      }
      var content = this.texteditor.value.substring(start + this.textStart.length, stop);
      if (content == '') {
        content = button.placeholder;
      }
      if (!button.prompt) {
        button.prompt = 'Please input';
      }
      var md_selection = button.markdown.indexOf('selection');
      if (md_selection == -1) {
        console.log('unexpected error. No "selection" found in markdown for ', button);
        return callback(false);
      }
      var md_input = button.markdown.indexOf('input');
      if (md_input == -1) {
        console.log('unexpected error. No "input" found in markdown for ', button);
        return callback(false);
      }

      var input = prompt(button.prompt, 'http://');
      if (input === null) {
        return callback(true);
      }

      var newContent = [];
      newContent.push(button.markdown.substring(0, md_selection));
      newContent.push(content);
      newContent.push(button.markdown.substring(md_selection + 'selection'.length, md_input));
      newContent.push(input);
      newContent.push(button.markdown.substring(md_input + 'input'.length));

      this.texteditor.value = this.texteditor.value.substring(0, start)
        + newContent.join('')
        + this.texteditor.value.substring(stop + this.textStop.length);

      return callback(true);
    }
  }
}
</script>
