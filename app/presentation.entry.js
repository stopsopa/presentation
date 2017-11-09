
import Reveal from 'reveal';

window.Reveal = Reveal; // for plugins loade dynamically

import 'reveal/index.css'

import 'node-reveal/reveal.js/css/theme/black.css';
import 'node-reveal/reveal.js/lib/js/head.min';

import './pages/presentation.scss';

Reveal.initialize({
    controls: true,
    progress: true,
    history: true,
    center: true,
    // default/cube/page/concave/zoom/linear/fade/none
    // transition: 'none',
    dependencies: [
        { src: '../asset/public/node-reveal/reveal.js/plugin/markdown/marked.js' },
        { src: '../asset/public/node-reveal/reveal.js/plugin/markdown/markdown.js' },
        // { src: '../asset/public/node-reveal/reveal.js/plugin/notes/notes.js', async: true },
        {
            src: '../asset/public/node-reveal/reveal.js/plugin/highlight/highlight.js',
            async: true,
            callback: function() {
                hljs.initHighlightingOnLoad();
            }
        }
    ]
});
