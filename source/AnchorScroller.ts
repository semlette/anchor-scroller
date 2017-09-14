import Scroller, { ScrollerMethods } from "./Scroller";

export interface Animation {
  (time: number, start: number, change: number, duration: number): number;
}

export interface TimeOptions {
  /**
   * Time increments
   */
  increment: number;

  /**
   * Duration of the scrolling
   */
  duration: number;
}

interface Options {
  checkParent: boolean;
  class: string | undefined;
  animation: Animation;
  time: TimeOptions;
}

function AnchorScroller(userOptions?: Partial<Options>) {
  const defaultAnimation: Animation = (time, start, change, duration) => {
    return (time /= duration / 2) < 1
      ? change / 2 * time * time * time + start
      : change / 2 * ((time -= 2) * time * time + 2) + start;
  };
  let options = {
    checkParent: false,
    class: undefined,
    animation: defaultAnimation,
    time: {
      increment: 25,
      duration: 1500,
    },
    ...userOptions,
  };

  const scroller = Scroller(options.animation, options.time);
  document.addEventListener("click", check);

  function check(event: HTMLElementEventMap["click"]) {
    // If clicked- or parent element is an anchor,
    // get the `href` and scroll to it
    if ((<any>event).target.nodeName === "A") {
      checkElement((<any>event).target, event);
    } else if (
      options.checkParent &&
      (<any>event).target.parentNode &&
      (<any>event).target.parentNode.nodeName === "A"
    ) {
      checkElement((<any>event).target.parentNode, event);
    }
  }

  function checkElement(
    element: HTMLAnchorElement,
    event: HTMLElementEventMap["click"],
  ) {
    // If `options.class` is set, only continue
    // if the element contains the class
    if (options.class && !element.classList.contains(options.class)) return;
    // Stop if hash property is empty
    const hash: string = element.hash;
    if (!hash) return;
    // Also stop if it cannot find an element
    // with `id` equal to `hash`
    const anchor: HTMLElement | null = document.getElementById(hash.slice(1));
    if (!anchor) return;
    // Only run if the current scroll position
    // is not equal to the anchors' position
    event.preventDefault();
    if (window.scrollY !== anchor.offsetTop) {
      scrollTo(anchor.offsetTop);
    }
  }

  function scrollTo(to: number) {
    scroller.scrollTo(to);
  }

  function destroy() {
    document.removeEventListener("click", check);
  }

  return {
    scroll: scrollTo,
    destroy,
  };
}

export default AnchorScroller;
