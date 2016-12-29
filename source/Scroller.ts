import { LOCATION_ABOVE, LOCATION_UNDER } from './constants';

/**
 * Handles the scrolling
 */
class Scroller {

  /**
   * Anchor is above or under current scroll position.
   */
  private location: symbol = (window.scrollY > this.position) ? LOCATION_ABOVE : LOCATION_UNDER;

  /**
   * Last scroll position. Used to stop scrolling
   * if the bottom of the page has been reached.
   */
  private last: number;

  /**
   * Bound copy of the scroll function.
   * Would normally get bound to window.
   */
  private scroll = this.scrollUnbound.bind(this);


  constructor(private position: number) {
    requestAnimationFrame(this.scroll);
  }


  /**
   * Scrolls the page
   */
  private scrollUnbound(): void {
    if (this.location === LOCATION_ABOVE) {
      if (window.scrollY <= this.position) {
        cancelAnimationFrame(this.scroll);
        return;
      }
    }
    else {
      if (window.scrollY >= this.position) {
        cancelAnimationFrame(this.scroll);
        return;
      }
    }

    /**
     * If it has not reached the target,
     * and isn't scrolling, it has reached
     * the top/bottom of the page
     */
    if (this.last === window.scrollY) {
      cancelAnimationFrame(this.scroll);
      return;
    }
    this.last = window.scrollY;

    if (this.location === LOCATION_ABOVE) {
      window.scrollTo(undefined, window.scrollY - 1);
    }
    else {
      window.scrollTo(undefined, window.scrollY + 1);
    }
    requestAnimationFrame(this.scroll);
  }
}

export default Scroller;
