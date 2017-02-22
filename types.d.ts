interface ScrollerOptions
{
  /**
   * Animation function
   */
  animation: Animation;

  /**
   * Time configuration time
   */
  time: TimeOptions
}

declare class Scroller
{
  
  constructor(options: ScrollerOptions);

  private options: ScrollerOptions;
  
  /**
   * Return value from requestAnimationFrame
   */
  private animation: number;

  /**
   * Position to scroll to
   */
  private position: number;

  /**
   * Document length (height)
   */
  private documentLength: number;

  /**
   * Anchor's position relative to the
   * bottom of the page
   */
  private positionRelativeToBottom: number;

  /**
   * Elapsed time
   */
  private time: number;

  /**
   * Start position
   */
  private start: number;

  /**
   * Difference between start and finish
   */
  private change: number;
  
  public scrollTo(position: number): void;

  /**
   * Detects if the user has scrolled
   */
  private userHasCanceledScroll(): boolean;

  /**
   * Calculates if it should scroll to the
   * bottom of the page or to the anchor.
   */
  private calculateChange(): number;

  /**
   * Scrolls the page
   */
  private scroll(): void;

}

export interface Animation
{
  (time: number, start: number, change: number, duration: number): number
}

export interface TimeOptions
{
  increment?: number;
  duration?: number;
}

export interface Options
{
  checkParent?: boolean;
  class?: string;
  animation?: Animation;
  time?: TimeOptions;
}

interface BoundEventHandlers
{
  click: EventListener;
}

declare class AnchorScroller
{

  constructor(options?: Options);

  private options: Options;

  /**
   * Bound event handlers
   */
  private handlers: BoundEventHandlers;

  private scroller: Scroller;

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