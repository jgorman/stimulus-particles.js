import 'particles.js'
import { Controller } from 'stimulus'

export default class extends Controller {
  initialize() {
    // Get the configuration from the div component.
    const config_s = this.data.get('config')
    this.config = config_s ? JSON.parse(config_s) : {}
    this.element.pjs = this
  }

  connect() {
    // Start up particles.js and capture the pJS instance.
    window.particlesJS(this.element.id, this.config)
    this.pJS = window.pJSDom.pop().pJS
  }

  disconnect() {
    // Cancel the animation to avoid multiple background instances running.
    const frame = this.pJS.fn.drawAnimFrame
    cancelAnimationFrame(frame)
  }
}
