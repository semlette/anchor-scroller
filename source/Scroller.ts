import { Animation, TimeOptions } from './AnchorScroller';

interface ScrollerOptions {
  /**
   * Animation function
   */
  animation: Animation;

  /**
   * Time configuration time
   */
  time: TimeOptions
}

/**
 * Handles the scrolling
 */
class Scroller {

  /**
   * Document length (height)
   */
  private documentLength: number = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );

  /**
   * Anchor's position relative to the
   * bottom of the page
   */
  private positionRelativeToBottom: number = this.documentLength - this.position;

  /**
   * Elapsed time
   */
  private time: number = 0;
  
  /**
   * Start position
   */
  private start: number = window.scrollY;

  /**
   * Difference between start and finish
   */
  private change: number = this.calculateChange();

  /**
   * Bound copy of the scroll function.
   * Would normally get bound to window.
   */
  private scroll = this.scrollUnbound.bind(this);


  constructor(private position: number, private options: ScrollerOptions) {
    requestAnimationFrame(this.scroll);
  }

  /**
   * Detects if the user has scrolled
   */
  private userHasCanceledScroll(): boolean {
    /**
     * window.scroll doesn't use decimals,
     * so we have round them both up and down
     */

    /**
     * If the scroll position is not equal to
     * the predicted position, rounded up or down,
     * the user has scrolled.
     */
    if (
      window.scrollY !== Math.floor(this.options.animation(this.time, this.start, this.change, this.options.time.duration)) &&
      window.scrollY !== Math.ceil(this.options.animation(this.time, this.start, this.change, this.options.time.duration))
    ) {
      return true;
    }
    /**
     * Rounding down usually gives the most
     * accurate position, but if that doesn't
     * match, but the rounded-up number does,
     * the user hasn't scrolled.
     */
    else if (
      window.scrollY !== Math.floor(this.options.animation(this.time, this.start, this.change, this.options.time.duration)) &&
      window.scrollY === Math.ceil(this.options.animation(this.time, this.start, this.change, this.options.time.duration))
    ) {
      return false;
    }
    /**
     * The rounded down number is equal to the predicted number.
     */
    else {
      return false;
    } 
  }

  /**
   * Calculates if it should scroll to the
   * bottom of the page or to the anchor.
   */
  private calculateChange(): number {
    return this.positionRelativeToBottom < window.innerHeight
      ? this.documentLength - window.innerHeight - this.start
      : this.position - this.start;
  }

  /**
   * Scrolls the page
   */
  private scrollUnbound(): void {
    if (this.userHasCanceledScroll()) {
      cancelAnimationFrame(this.scroll);
      return;
    }

    this.time += this.options.time.increment;

    window.scroll(
      window.scrollX,
      this.options.animation(this.time, this.start, this.change, this.options.time.duration)
    );

    if (this.time < this.options.time.duration) {
      requestAnimationFrame(this.scroll);
    }
  }
}

export default Scroller;
