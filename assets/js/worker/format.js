---
---
/**
 * @name  {{ site.name }}
 * @description  {{ site.description }}
 * @author  {{ site.author }} <{{ site.author_email }}> ({{ site.url }})
 * @version  {{ site.version }}
 * @copyright  {{ site.author }} 2017
 * @license  {{ site.license }}
 */

self.addEventListener('message', function (e) {
    var source = e.data.source;

    if (e.data.beautify) {
        self._window = self.window;
        self.window = {};

        self.importScripts('https://laptrinhbanthan.com/de4js/assets/js/lib/js-beautify/beautify.min.js');

        source = self.window.js_beautify(source, {
            unescape_strings: true,
            jslint_happy: true
        });

        self.window = self._window;
    }

    self.importScripts('https://laptrinhbanthan.com/de4js/assets/js/lib/highlight-js/highlight.pack.js');

    source = self.hljs.highlight('javascript', source).value;
    source = source.split('\n');
    source = source.join('</code><code>');
    source = '<code>' + source + '</code>';

    self.postMessage(source);
});
