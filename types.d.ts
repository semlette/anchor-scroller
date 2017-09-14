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

export interface AnchorScrollerMethods {
  /**
   * Scrolls to the given position
   */
  scroll(to: number): void;
  destroy(): void;
}

declare function AnchorScroller(
  options: Partial<Options>,
): AnchorScrollerMethods;

export default AnchorScroller;
