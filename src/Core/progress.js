'use strict';

/**
 * Browser progress bar module.
 * @module core
 *
 * Private module. Shows a progress bar at the top of the browser.
 *
 */
var browserProgress = (function() {

    var progressbar,
        progressbarbg,
        progressblocker,
        inProgress = false,
        fadingOut = false,
        options = {
            intervalAnmation: 10,
            zIndex: 1000,
            barHeight: 10,
            barWidth: 800,
            progressBGColor: '#A2CFEE',
            progressColor: '#3498DB',
            blockerImage: 'https://cdn.jumpstartjs.org/images/logo-portrait.png',
            blockerBGColor: '#ECF0F1'
        };

    function styleCSS() {

        progressbar.setAttribute('style', 'display: block;');
        progressbar.setAttribute('style', 'z-index:' + options.zIndex + ';');
        progressbar.style.position = 'fixed';
        progressbar.style.width = options.barWidth + 'px';
        progressbar.style.left = -options.barWidth + 'px';
        progressbar.style.top = '0px';
        progressbar.style.background = options.progressColor;
        progressbar.style.height = options.barHeight + 'px';

        progressbarbg.style.backgroundColor = options.progressBGColor;
        progressbarbg.style.width = '100%';
        progressbarbg.style.height = options.barHeight + 'px';
        progressbarbg.style.position = 'fixed';
        progressbarbg.style.top = '0px';
        progressbarbg.style.left = '0px';

        var height = $window.innerHeight || $window.document.documentElement.clientHeight ||
            $window.document.body.clientHeight;
        progressblocker.style.backgroundColor = options.blockerBGColor;
        progressblocker.style.width = '100%';
        progressblocker.style.height = height + 'px';
        progressblocker.style.position = 'fixed';
        progressblocker.style.top = '0px';
        progressblocker.style.left = '0px';
        progressblocker.style.zIndex = '50000';
        progressblocker.style.background = options.blockerBGColor +
            ' url(' + options.blockerImage + ') no-repeat center center fixed';
    }

    function animate() {

        var id = $window.setInterval(frame, options.intervalAnmation);
        var width = $window.innerWidth || $window.document.documentElement.clientWidth ||
            $window.document.body.clientWidth;
        var fromLeft = -options.barWidth;
        function frame() {
            if (inProgress) {
                if (fromLeft > options.barWidth + width) {
                    progressbar.style.left = -options.barWidth + 'px';
                    fromLeft = -options.barWidth;
                } else {
                    fromLeft += 10;
                    progressbar.style.left = fromLeft + 'px';
                }
            } else {
                $window.clearInterval(id);
            }
        }
    }

    function start() {

        if (!fadingOut) {
            inProgress = true;
            progressblocker.style.opacity = 1;
            animate();
        } else {
            $window.setTimeout(function() {
                start();
            }, 200);
        }
    }

    function stop() {

        if (inProgress) {
            fadeOut();
            inProgress = false;
        }
    }

    function fadeOut() {

        var op = 1;
        fadingOut = true;
        var timer = $window.setInterval(function() {
            if (op <= 0.1) {
                progressblocker.style.opacity = 0;
                $window.clearInterval(timer);
                fadingOut = false;
                var element = $window.document.getElementsByClassName('progressbarblocker');
                if (element.length > 0)
                    element[0].outerHTML = '';
            } else {
                progressblocker.style.opacity = op;
                progressblocker.style.filter = 'alpha(opacity=' + (op * 100) + ')';
                op -= op * 0.1;
            }
        }, 10);
    }

    return {

        show: function(settings) {

            if (inProgress)
                return;
                
            // Set the options.
            options = util.extend(options, settings);

            // Add the elements.
            progressblocker = util.addElement('div', { 'class': 'progressbar-blocker' },
                $window.document.body);
            progressbarbg = util.addElement('div', { 'class': 'progressbar-bg' },
                progressblocker);
            progressbar = util.addElement('div', { 'class': 'progressbar' },
                progressblocker);

            // Style the elements.
            styleCSS();

            // Start the animation.
            start();
        },

        hide: function() {

            // Stop the animation.
            stop();
        }

    };

})();
