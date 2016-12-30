interface animationFunction {
  (time: number, start: number, change: number, duration: number): number
}

declare interface Options {
  checkParent?: boolean;
  class?: string;
  animation?: animationFunction;
}

declare class AnchorScroller {

  constructor(options: Options);

  /**
   * Removes all AnchorScroller related stuff
   */
  destroy(): void;
  
}