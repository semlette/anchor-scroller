import { animationFunction } from './AnchorScroller';

/**
 * Handles the scrolling
 */
class Scroller {

  /**
   * Elapsed time
   */
  private time: number = 0;

  /**
   * Duration of the scrolling
   */
  private duration: number = 1500;

  /**
   * Start position
   */
  private start: number = window.scrollY;

  /**
   * Difference between start and finish
   */
  private change: number = this.position - this.start;

  /**
   * Time increments
   */
  private increment: number = 25;

  /**
   * Bound copy of the scroll function.
   * Would normally get bound to window.
   */
  private scroll = this.scrollUnbound.bind(this);


  constructor(private position: number, private customAnimation?: animationFunction) {
    requestAnimationFrame(this.scroll);
  }


  /**
   * Scrolls the page
   */
  private scrollUnbound(): void {
    this.time += this.increment;

    window.scrollTo(
      window.scrollX,
      this.customAnimation ? this.customAnimation(this.time, this.start, this.change, this.duration) : this.ease(this.time, this.start, this.change, this.duration)
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
