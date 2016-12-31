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

  
  private userHasCanceledScroll() {
    return window.scrollY !== Math.floor(this.ease(this.time, this.start, this.change, this.duration));
  }

  /**
   * Calculates if it should scroll to the
   * bottom of the page or to the anchor
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
