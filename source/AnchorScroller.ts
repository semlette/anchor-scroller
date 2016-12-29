import Scroller from './Scroller';


interface Options {
  checkParent?: boolean;
  class?: (string | undefined);
}

interface BoundEventHandlers {
  click: EventListener
}


/**
 * Make anchors great again!
 */
class AnchorScroller {

  private options: Options;

  /**
   * Bound event handlers
   */
  private handlers: BoundEventHandlers = {
    click: this.check.bind(this)
  };


  constructor(private optionalOptions?: Options) {
    this.options = {
      checkParent: false,
      class: undefined,
      ...optionalOptions
    };
    this.addListeners();
  }


  /**
   * Removes all AnchorScroller related stuff
   */
  public destroy(): void {
    this.removeListeners();
  }


  /**
   * Adds listeners
   */
  private addListeners(): void {
    document.addEventListener('click', this.handlers.click);
  }


  /**
   * Removes all listeners
   */
  private removeListeners(): void {
    document.removeEventListener('click', this.handlers.click);
  }


  /**
   * Checks if the target `href` is pointing to an anchor
   */
  private check(event: Event): void {
    const target = event.target as HTMLElement;

    // If clicked- or parent element is an anchor,
    // get the `href` and scroll to it

    // If `options.class` is set, only continue
    // if the element contains the class

    // Stop if no href attribute is found
    // or it doesn't start with #

    // Also stop if it cannot find an element
    // with `id` equal to `href`

    // If the current scroll position is not
    // equal to the anchors', start scrolling
    
    if (target.nodeName === 'A') {
      const _target = target as HTMLAnchorElement;
      if (this.options.class && !_target.classList.contains(this.options.class)) return;
      const href: string | null = _target.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;
      const anchor: HTMLElement | null = document.getElementById(href.slice(1, href.length));
      if (!anchor) return;
      event.preventDefault();
      if (window.scrollY !== anchor.offsetTop) {
        new Scroller(anchor.offsetTop);
      }
    }
    else if (this.options.checkParent && target.parentNode && target.parentNode.nodeName === 'A') {
      const parent = target.parentNode as HTMLAnchorElement;
      if (this.options.class && !parent.classList.contains(this.options.class)) return;
      const href: string | null = parent.getAttribute('href');
      if (!href) return;
      const anchor: HTMLElement | null = document.getElementById(href.slice(1, href.length));
      if (!anchor) return;
      event.preventDefault();
      if (window.scrollY !== anchor.offsetTop) {
        new Scroller(anchor.offsetTop);
      }
    }
  }

}

export default AnchorScroller;