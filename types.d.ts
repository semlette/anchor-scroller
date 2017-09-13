interface ScrollerMethods {
  scrollTo(position: number): void;
}

declare function Scroller(
  animation: Animation,
  timeOptions: TimeOptions,
): ScrollerMethods;

export interface Animation {
  (time: number, start: number, change: number, duration: number): number;
}

export interface TimeOptions {
  increment?: number;
  duration?: number;
}

export interface Options {
  checkParent: boolean;
  class: string;
  animation: Animation;
  time: TimeOptions;
}

interface BoundEventHandlers {
  click: EventListener;
}

declare class AnchorScroller {
  constructor(options?: Partial<Options>);

  private options: Options;

  /**
   * Bound event handlers
   */
  private handlers: BoundEventHandlers;

  private scroller: ScrollerMethods;

  /**
   * Scrolls to given position
   */
  public scroll(position: number): void;

  /**
   * Removes all AnchorScroller related stuff
   */
  public destroy(): void;

  /**
   * Adds listeners
   */
  private addListeners(): void;

  /**
   * Removes all listeners
   */
  private removeListeners(): void;

  /**
   * Checks if the target `href` is pointing to an anchor
   */
  private check(event: Event): void;
}

export default AnchorScroller;
