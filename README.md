## Particles.js Stimulus Wrapper

A [Stimulus](https://github.com/stimulusjs/stimulus) wrapper for
[Particles.js](https://github.com/VincentGarreau/particles.js) under
[Turbolinks](https://github.com/turbolinks/turbolinks).

The controller takes the Particles configuration from the containing div
on the page. This allows us to pass parameters such as the webpack
image_path from rails to the Particles instance.

Under Turbolinks, navigating away from this page and back without
cleaning up the running Particles instance would result
in multiple AnimationsFrames still running in the background, chewing
up CPU. The Particles controller takes care of the configuration,
the set up and the clean up.

## Example

Here is an example of passing the an image path from Rails to Particles.js.

```erb
<div id="particles-demo"
  style="height: 150px; background-color: #aaaaff;"
  data-controller="particles"
  data-particles-config="<%= {
    particles: {
      shape: {
        type: 'image',
        image: {
          src: image_path('jg-logo-512x512.png')
        },
      },
      size: {
        value: 10,
        random: true,
      },
    },
  }.to_json %>"
>
</div>
```

## Setup

Add [stimulus-particles.js](https://github.com/jgorman/stimulus-particles.js)
to package.json and register it with
[Stimulus](https://github.com/stimulusjs/stimulus).

```
yarn add stimulus-particles.js
```

```js
// Stimulus setup.
import { Application } from 'stimulus'
import { definitionsFromContext } from 'stimulus/webpack-helpers'
const application = Application.start()
const controllers = require.context('../controllers', true, /\.js$/)
application.load(definitionsFromContext(controllers))

// Register the stimulus-particles.js controller.
import Particles from 'stimulus-particles.js'
application.register('particles', Particles)
```
