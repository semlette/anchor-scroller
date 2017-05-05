import Scroller from './Scroller';

export interface Animation {
  (time: number, start: number, change: number, duration: number): number
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

interface OptionalOptions {
  checkParent?: boolean;
  class?: string;
  animation?: Animation;
  time?: TimeOptions;
}

interface Options {
  checkParent: boolean;
  class: string | undefined;
  animation: Animation;
  time: TimeOptions;
}

interface BoundEventHandlers {
  click: EventListener;
}


/**
 * Make anchors great again!
 */
export default class AnchorScroller {

  private options: Options;

  /**
   * Bound event handlers
   */
  private handlers: BoundEventHandlers = {
    click: this.check.bind(this)
  };

  private scroller: Scroller;

  constructor(private optionalOptions?: OptionalOptions) {
    this.options = {
      checkParent: false,
      class: undefined,
      animation: (time, start, change, duration): number => {
        return ((time /= duration / 2) < 1)
          ? change / 2 * time * time * time + start
          : change / 2 * ((time -= 2) * time * time + 2) + start;
      },
      time: {
        increment: 25,
        duration: 1500  
      },
      ...optionalOptions
    };

    this.scroller = new Scroller({
      animation: this.options.animation,
      time: this.options.time
    })
    
    // Add event listeners
    document.addEventListener('click', this.handlers.click);
  }

  /**
   * Scrolls to given position
   */
  public scroll(position: number): void {
    this.scroller.scrollTo(position);
  }


  /**
   * Removes all AnchorScroller related stuff
   */
  public destroy(): void {
    document.removeEventListener('click', this.handlers.click);
  }

  /**
   * Checks if the target `href` is pointing to an anchor
   */
  private check(event: Event): void {
    const target = event.target as HTMLElement;

    // If clicked- or parent element is an anchor,
    // get the `href` and scroll to it  
    if (target.nodeName === 'A') {
      const _target = target as HTMLAnchorElement;
      this.checkElement(_target, event);
    }
    else if (this.options.checkParent && target.parentNode && target.parentNode.nodeName === 'A') {
      const parent = target.parentNode as HTMLAnchorElement;
      this.checkElement(parent, event);
    }
  }

  private checkElement(element: HTMLAnchorElement, event: Event): void {
    // If `options.class` is set, only continue
    // if the element contains the class
    if (this.options.class && !element.classList.contains(this.options.class)) return;
    // Stop if no href attribute is found
    // or it doesn't start with #
    const href: string | null = element.getAttribute('href');
    if (!href || href.charAt(0) !== '#') return;
    // Also stop if it cannot find an element
    // with `id` equal to `href`
    const anchor: HTMLElement | null = document.getElementById(href.slice(1, href.length));
    if (!anchor) return;
    // Only run if the current scroll position
    // is not equal to the anchors' position
    event.preventDefault();
    if (window.scrollY !== anchor.offsetTop) {
      this.scroll(anchor.offsetTop);
    }
  }

}