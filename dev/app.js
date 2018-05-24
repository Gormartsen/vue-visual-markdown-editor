'use strict';

var Vue = require('vue')
var App = require('./app.vue')
var VueVisualEditor = require('../index.js');
var turndownRules = require('./turndownRules.js');


/*global._VVMEPreLoaderdIcons.at = require('@fortawesome/fontawesome-free-solid/faAt.js');
global._VVMEPreLoaderdIcons.hashtag = require('@fortawesome/fontawesome-free-solid/faHashtag.js');
global._VVMEPreLoaderdIcons['reply-all'] = require(
  '@fortawesome/fontawesome-free-solid/faReplyAll.js');*/

Vue.use(VueVisualEditor)

global.VueConfig = {
markdown: {
  breaks: true,
  html: true,
},
filedrop: function(file, callback){
  //var base64 = uri.substr(uri.indexOf(',') + 1);
  console.log('filedrop', file);
  callback(null, {url: 'https://pbs.twimg.com/profile_images/469017630796296193/R-bEN4UP.png'})
},
turndown: {
  rules: turndownRules,
  bulletListMarker: '-',
  emDelimiter: '*',
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
},
colorpicker: {
  width: 160,
  height: 160,
  sliderMargin: 1,
  sliderHeight: 1,
  color: "#f00"
},
toolbar: [
  "header",
  "bold",
  "italic",
  "link",
  "img",
  "list",
  "numlist",
  "code",
  "quote",
 /* {
    group: '5',
    name: 'assignee',
    type: 'autocomplete',
    icon: 'at',
    tag: 'a',
    preview: function(item) {
      return '<div class="assignee">' + item.login + '</div>';
    },
    render: function(item, mode) {
      var value = '';
      if (item.login) {
        value = item.login;
      } else {
        value = item;
      }
      if (mode == 'html') {
        return '<a href="/' + value + '" class="mention">@' + value + '</a> ';
      }
      return "@" + value + " ";
    },
    source: function(input, callback) {
      var searchRequest = {
        query: {login: {
            $regex: input,
            $options: 'i'
          },
          type: "user",
          installation_id: vm.sources.header.installation_id
        },
        limit: 5
      };
      debugLog('search mention', searchRequest);
      ws.search('owners', searchRequest, function(err, response, headers){
        debugLog('mentionStrategy:' + input, err, response, headers);
        if (err) {
          return callback([]);
        }
        callback(response);
      });
    }
  },
  {
    group: '5',
    name: 'issue',
    type: 'autocomplete',
    icon: 'hashtag',
    tag: 'a',
    preview: function(issue) {
      return '<div class="issue">#' + issue.number + ' ' + issue.title.substr(0, 40) + '</div>';
    },
    render: function(item, mode) {
      var value = '';
      if (item.number) {
        value = item.number;
      } else {
        value = item;
      }
      if (mode == 'html') {
        return '<a href="' + window.repoUrl + '#' + value + '" class="issue_link">#' + value + '</a> ';
      }
      return "#" + value + " ";
    },
    source: function(input, callback) {
      var orArray = generateNumberSearchArray(input);
      orArray.push({
        title: {
          $regex: input,
          $options: 'i'
        }
      });
      var searchRequest = {
        query: {
          $or: orArray
        },
        limit: 5,
        sort: {
          updated_at: -1
        }
      };
      debugLog('search issue', searchRequest);
      var issuesURL = 'repos' + window.repoUrl + '/issues';
      ws.search(issuesURL, searchRequest, function(err, response, headers){
        debugLog('issueStrategy:' + input, err, response, headers);
        if (err) {
          return callback([]);
        }
        callback(response);
      });
    }
  },
  {
    group: '5',
    name: 'reply',
    type: 'autocomplete',
    icon: 'reply-all',
    tag: 'a',
    preview: function(template) {
      return '<div class="reply">#' + template.name + '</div>';
    },
    render: function(item, mode) {
      var value = '';
      if (item.template) {
        value = item.template;
      } else {
        value = '';
      }
      if (mode == 'html') {
        return mdGlobal.render(item.template);
      }
      return item.template;
    },
    source: function(input, callback) {
      var orArray = generateNumberSearchArray(input);
      orArray.push({
        title: {
          $regex: input,
          $options: 'i'
        }
      });
      var searchRequest = {
        query: {
          $or: orArray
        },
        limit: 5,
        sort: {
          updated_at: -1
        }
      };
      debugLog('search issue', searchRequest);
      ws.search('templates', searchRequest, function(err, response, headers){
        debugLog('templates:' + input, err, response, headers);
        if (err) {
          return callback([]);
        }
        callback(response);
      });
    }
  }*/]
}
global.app = new Vue({
  el: '#app',
  created: function(){
  },
  render: function (createElement) {
    return createElement(App)
  },
})
