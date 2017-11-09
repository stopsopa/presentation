
import Reveal from 'reveal';

window.Reveal = Reveal; // for plugins loade dynamically

import 'reveal/index.css'

import 'node-reveal/reveal.js/css/theme/black.css';
import 'node-reveal/reveal.js/lib/js/head.min';

import './pages/presentation.scss';


function getHtml(url) {

    if (url.indexOf('#') > -1) {

        url = url.split('#')[0];
    }

    const promise = fetch(`https://cors-anywhere.herokuapp.com/${url}`)
        .then(res => res.text())
    ;

    promise.catch(error => log('fetch error', error));

    return promise;
}


function trim(s) {
    return (s || '').replace(/^\s*(\S*(\s+\S+)*)\s*$/,'$1');
}
const loadPresentation = (function () {

    const baseUrl = location.pathname;

    return function (presentation) {

        location.href = `${baseUrl}?presentation=${presentation}`;
    }
}());

const target = document.querySelector('#target');

const presentation = location.search.split('?presentation=')[1];

const load = html => {
    document.querySelector('.slides').innerHTML = html;
    Reveal.initialize({
        controls: true,
        progress: true,
        history: true,
        center: true,
        // default/cube/page/concave/zoom/linear/fade/none
        // transition: 'none',
        dependencies: [
            // { src: '../asset/public/node-reveal/reveal.js/plugin/markdown/marked.js' },
            // { src: '../asset/public/node-reveal/reveal.js/plugin/markdown/markdown.js' },
            { src: '../nm/marked.js' },
            { src: '../nm/markdown.js' },
            // { src: '../asset/public/node-reveal/reveal.js/plugin/notes/notes.js', async: true },
            {
                // src: '../asset/public/node-reveal/reveal.js/plugin/highlight/highlight.js',
                src: '../nm/highlight.js',
                async: true,
                callback: function() {
                    hljs.initHighlightingOnLoad();
                }
            }
        ]
    })
}
if (presentation) {
    
    trim(presentation) && getHtml(presentation).then(load);
}
else {

    target.style.display = 'block';

    const input = target.querySelector('input');

    const textarea = target.querySelector('textarea');

    target.querySelector('button[name="fromscript"]').addEventListener('click', e => {

        e.preventDefault();

        const val = trim(input.value);

        if (val) {

            loadPresentation(val);
        }
        else {

            log('url is empty');
        }
    });

    target.querySelector('button[name="fromtext"]').addEventListener('click', e => {

        e.preventDefault();

        const val = trim(textarea.value);

        if (val) {

            target.style.display = 'none';

            load(val);
        }
        else {

            log('textarea is empty');
        }
    });
    
    getHtml('https://raw.githubusercontent.com/stopsopa/presentation/master/docs/tapes/list.html')
        .then(html => document.querySelector('#target .list').innerHTML = html)
        .then(() => target.addEventListener('click', e => {

            e.preventDefault();

            const target = e.target;

            const tag = target.tagName.toLowerCase();

            if (tag === 'a') {

                input.value = target.getAttribute('href');
            }
            else {

                log('other tag was clicked: ', tag);
            }
        }))
    ;
}



