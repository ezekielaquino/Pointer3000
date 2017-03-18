# Pointer3000
A simple little utility that makes it easy to work with values calculated from the pointer's location relative to one or multiple defined points. 🙋🏼

[🍒 VISIT THE PROJECT (MINI DEMO) WEBSITE](http://ezekielaquino.com/Pointer3000)

# Why?
I experiment a lot with interactive graphics and interaction in general, and have found that I often have to calculate `this` and `that`, particularly the distance and angle from (a) specific point(s). I decided to make this little utility so I can just plop it in and start trying things out. This is meant to be used in compositions with just regular DOM elements– the constraint of what can be done with just a 'regular' page is a great source of possibility.

While the output is very 'basic', I found that what can be done with them when used to manipulate `things` are endless. I hope you find this stirring your creativity and imagination. Lots of possibilities!

[💅🏾 THE PROJECT SITE IS A MINI DEMO](http://ezekielaquino.com/Pointer3000)

*More demos coming soon (mocking 3d, AppleTV rotating cards, etc)*


# How?
Simply call Pointer3000. This will create a global variable `Pointer3k` which contains `points`. Values are updated onMouseMove by default (see available settings below).

```js
  // Initialize
  Pointer3k();
```

If initialised without arguments it will simply register the center of the viewport as its one and only reference point. The default name of this auto-created point is `pointA`. If you do a `console.log(Pointer3k('pointA')` after initialisation, you will find that a point object contains the following data:

```js
  // Sample data
  pointA: {
    cx: 640, // (centerX, reference)
    cy: 333, // (centerY, reference)
    deg: 43.42633594589745, // (degrees),
    hyp: 426.8480408763756 // (distance from reference)
    rad: 0.7579325443330766, // (radians)
    x: 187 // (positionX),
    y: 177 // (positionY)
  }
```

But you probably want to define specific points of reference, have multiple and even name them for convenience, so you'd want to initialize it like so:

```js
  // We initialize with multiple points
  Pointer3k({
    points: {
      aNicelyNamedPoint: {
        cx: 200, // coordinate in pixels relative to viewport
        cy: 200
      },
      anotherPoint: {
        cx: 'center', // you can just pass 'center' for center of viewport
        cy: 'center' // you can just pass 'center' for center of viewport
      },
      goCrazy: {
        cx: 450
        cy: 620
      }
    },
    initialPos: { pageX: 200, pageY: 200 }, // (optional) registered 'mouse position' immediately on init. defaults to center
    listener: 'mousemove', // (optional, default: mousemove) event to listen to when updating values
    console: true // (optional) set to true if you want a console with values to be shown
  });
```

So how do you get a specific point's particular value? You just do: `Pointer3k(pointName).propertyKey`

```js
  // Get a specific point's value
  var distanceFromReference = Pointer3k('aNicelyNamedPoint').hyp;
  var angleInDegrees = Pointer3k('aNicelyNamedPoint').deg;
  // ... so on
```

You can also access `all` points via `Pointer3k.points`.


# Notes

- If manipulating DOM elements, it is still best to use transforms as they are way more performant than manipulating e.g. width and height.
- If you are going to be doing something relatively complex graphic wise then I think you should be looking at canvas or other drawing libraries. Those would be more performant, and have more math methods at your disposal. e.g. paperJS, raphael, svg.js
- Having `console: true` or having inspector open (as you already know) will reduce performance as it will be updating values, recording timelines, highlighting updated DOM elements what have you.


# Plans

- Add something like a 'listenIf' option which only updates values if it evaluates to true. 
- More values e.g. adjacent, opposite and corresponding angles
- point relative to a parent element
- any suggestions?

# Say Hi!

Please do. If you have any comments or suggestions, i'd love to hear them. This utility is completely free but if you have used it for something cool please do let me know, let me see what you've made! Drop me a line at ezekielaquino@gmail.com or via [@the_ezekiel](http://twitter.com/the_ezekiel) or [Share this](https://twitter.com/home?status=%E2%86%98%E2%86%98%20Supercharged%20pointer%20interactions%20%E2%80%93%20POINTER3000%20%E2%86%99%E2%86%99%20http%3A//ezekielaquino.com/Pointer3000) on Twitter!

P.S. Follow me on twitter!

# License

This project is licensed under the MIT License - see the LICENSE.md file for details
