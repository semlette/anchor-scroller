import { CustomAnimation, TimeOptions } from './AnchorScroller';

interface ScrollerOptions {
  customAnimation?: CustomAnimation;
  time?: TimeOptions
}

/**
 * Handles the scrolling
 */
class Scroller {

  /**
   * Document length (height)
   */
  private documentHeight: number = Math.max(
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
  private positionRelativeToBottom: number = this.documentHeight - this.position;
  
  /**
   * Elapsed time
   */
  private time: number = 0;

  /**
   * Duration of the scrolling
   */
  private duration: number = this.options.time && this.options.time.duration
    ? this.options.time.duration
    : 1500;

  /**
   * Start position
   */
  private start: number = window.scrollY;

  /**
   * Difference between start and finish
   */
  private change: number = this.calculateChange();

  /**
   * Time increments
   */
  private increment: number = this.options.time && this.options.time.increment
    ? this.options.time.increment
    : 25;

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
      window.scrollY !== Math.floor(this.ease(this.time, this.start, this.change, this.duration)) &&
      window.scrollY !== Math.ceil(this.ease(this.time, this.start, this.change, this.duration))
    ) {
      return true;
    }
    /**
     * Rounding down usually gives the most
     * accurate position, so if that doesn't
     * match, but the rounded-up number does,
     * the user hasn't scrolled.
     */
    else if (
      window.scrollY !== Math.floor(this.ease(this.time, this.start, this.change, this.duration)) &&
      window.scrollY === Math.ceil(this.ease(this.time, this.start, this.change, this.duration))
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
      ? this.documentHeight - window.innerHeight - this.start
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

    this.time += this.increment;

    window.scroll(
      window.scrollX,
      this.options.customAnimation ? this.options.customAnimation(this.time, this.start, this.change, this.duration) : this.ease(this.time, this.start, this.change, this.duration)
    );



    if (this.time < this.duration) {
      requestAnimationFrame(this.scroll);
    }
  }

  /**
   * Adds easing animation to the scrolling
   */
  private ease(time: number, start: number, change: number, duration: number): number {
    // Easing functions
    // http://robertpenner.com/easing/

    if ((time /= duration / 2) < 1) {
      return change / 2 * time * time * time + start;
    }
    else {
		  return change / 2 * ((time -= 2) * time * time + 2) + start;
    }
  }
}

export default Scroller;
