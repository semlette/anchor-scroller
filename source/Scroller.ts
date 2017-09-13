import { Animation, TimeOptions } from "./AnchorScroller";

interface ScrollerMethods {
  scrollTo(to: number): void;
}

function Scroller(
  animation: Animation,
  timeOptions: TimeOptions,
): ScrollerMethods {
  let position: number = 0;
  let positionRelativeToBottom: number = 0;
  let start: number = 0;
  let change: number = 0;
  let time: number = 0;
  let animationFrame: any;

  /**
   * Returns a fresh length of the document
   */
  function getDocumentLength(): number {
    const body = document.body;
    const root = document.documentElement;
    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      root.clientHeight,
      root.scrollHeight,
      root.offsetHeight,
    );
  }

  /**
   * Calculates the difference between the 
   */
  function calculateChange(): number {
    return positionRelativeToBottom < window.innerHeight
      ? getDocumentLength() - window.innerHeight - start
      : position - start;
  }

  /**
   * Checks if the user has scrolled during the animation
   */
  function userHasCanceledScroll(): boolean {
    const animated = animation(time, start, change, timeOptions.duration);
    const floor = Math.floor(animated);
    const ceil = Math.ceil(animated);
    /**
     * window.scroll doesn't use decimals,
     * so we have round them both up and down
     */

    /**
     * If the scroll position is not equal to
     * the predicted position, rounded up or down,
     * the user has scrolled.
     */
    if (window.scrollY !== floor && window.scrollY !== ceil) {
      return true;
    } else if (window.scrollY !== floor && window.scrollY === ceil) {
      /**
     * Rounding down usually gives the most
     * accurate position, but if that doesn't
     * match, but the rounded-up number does,
     * the user hasn't scrolled.
     */
      return false;
    } else {
      /**
     * The rounded down number is equal to the predicted number.
     */
      return false;
    }
  }

  /**
   * Calculates if it should scroll to the
   * bottom of the page or to the anchor.
   */
  function scroll(): void {
    if (userHasCanceledScroll()) {
      cancelAnimationFrame(animationFrame);
      return;
    }

    time += timeOptions.increment;

    window.scroll(
      window.scrollX,
      animation(time, start, change, timeOptions.duration),
    );

    if (time < timeOptions.duration) {
      animationFrame = requestAnimationFrame(scroll);
    }
  }

  function scrollTo(position: number): void {
    // Reset everything
    time = 0;
    position = position;
    positionRelativeToBottom = getDocumentLength() - position;
    start = window.scrollY;
    change = calculateChange();
    animationFrame = requestAnimationFrame(scroll);
  }

  return { scrollTo };
}

export default Scroller;
export { ScrollerMethods };
