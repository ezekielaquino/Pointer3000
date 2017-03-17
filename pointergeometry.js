/**
 * POINTERGEOMETRY3000
 * http://github.com/ezekielaquino/pointergeometry3000
 * JS Utility to get all sorts of pointer properties
 * MIT License
 */

'use strict';

(function() {
  let keys, propsKeys, points, isConsole, propElems, initialPos, listener;

  const defaults = {
    points: {
      pointA: {
        cx: window.innerWidth / 2,
        cy: window.innerHeight / 2
      }
    }
  };



  window.PointerGeometry = function(arg) {
    // If passed a string, we return the
    // object containing the named point
    if (typeof arg === 'string' || Number.isInteger(arg)) {
      return window.PointerGeometry.points[arg];
    } else {
      // If passed an object, then we initialise
      // the plugin and register the points
      arg = arg || defaults;
      keys = Object.keys(arg.points);
      points = arg.points || {};
      isConsole = arg.console;
      initialPos = arg.initialPos || { pageX: window.innerWidth / 2, pageY: window.innerHeight / 2 };
      listener = arg.listener || 'mousemove';

      // initial register, before initial mousemove
      // so we populate the values for the console
      if (isConsole) {
        register();
        initializeConsole(keys);
      }

      // register with initial position
      register(initialPos);

      // Listen to mousemove within the viewport
      window.addEventListener(listener, function(event) {
        register(event);
      });
    }
  };



  function register(event) {
    event = event || {};

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      let point;

      let cx = (points[key].cx == 'center' || !points[key].cx) ? defaults.points['pointA'].cx : points[key].cx;
      let cy = (points[key].cy == 'center' || !points[key].cy) ? defaults.points['pointA'].cy : points[key].cy;
      let x = (event.pageX || 0) - cx;
      let y = (event.pageY || 0) - cy;
      let rad = Math.atan2(y, x);
      let deg = rad * (180 / Math.PI);
      let hyp = Math.hypot(x, y);

      point = {
        cx: cx,
        cy: cy,
        x: x,
        y: y,
        rad: rad,
        deg: deg,
        hyp: hyp
      };

      propsKeys = Object.keys(point);
      points[key] = point;

      updateConsole(point, i);
    }

    window.PointerGeometry.points = points;
  }



  function initializeConsole(keys) {
    if (isConsole) {
      const container = document.createElement('div');

      // Create the parent container
      if (!document.querySelector('.js-pgProps')) {
        container.classList.add('js-pgProps');
        container.style.position = 'fixed';
        container.style.background = 'rgba(0, 0, 0, 0.7)';
        container.style.color = 'white';
        container.style.fontSize = '9px';
        container.style.fontFamily = 'Arial';
        container.style.width = 140 + 'px';
        container.style.top = 0;
        container.style.right = 0;

        document.body.appendChild(container);
      }

      // Create each point's container
      if (document.querySelectorAll('.js-pgPoint').length < keys.length) {
        for (var i = 0; i < keys.length; i++) {
          // Initialize console
          const key = keys[i];
          const propKeys = Object.keys(window.PointerGeometry.points[key]);
          const pointInfo = document.createElement('div');
          const pointLabel = document.createElement('label');

          pointInfo.classList.add('js-pgPoint');

          pointLabel.innerHTML = key;
          pointLabel.style.padding = '2px 5px';

          pointInfo.appendChild(pointLabel);

          for (let n = 0; n < propKeys.length; n++) {
            const prop = document.createElement('div');
            const propKey = propKeys[n];

            prop.classList.add('js-pgProp');
            prop.style.padding = '2px 5px 2px 15px';

            prop.innerHTML = propKey + ':' + window.PointerGeometry.points[propKey];
            pointInfo.appendChild(prop);
          }

          container.appendChild(pointInfo);
        }
      }

      propElems = document.querySelectorAll('.js-pgProp');
    }
  }



  function updateConsole(point, index) {
    if (propElems) {
      for (var j = 0; j < propsKeys.length; j++) {
        const i = (index * propsKeys.length) + j;
        const elem = propElems[i];
        const key = propsKeys[j];
        const value = point[key];

        elem.innerHTML = key + ':' + value;
      }
    }
  }





})();