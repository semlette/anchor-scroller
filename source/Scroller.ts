/**
 * Handles the scrolling
 */
class Scroller {

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
    if (window.scrollY >= this.position) {
      cancelAnimationFrame(this.scroll);
      return;
    }

    if (this.last === window.scrollY) {
      cancelAnimationFrame(this.scroll);
      return;
    }
    this.last = window.scrollY;

    window.scrollTo(window.scrollX, window.scrollY + 7);
    requestAnimationFrame(this.scroll);
  }
}

export default Scroller;