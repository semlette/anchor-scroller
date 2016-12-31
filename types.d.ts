export interface animationFunction {
  (time?: number, start?: number, change?: number, duration?: number): number
}

export interface TimeOptions {
  increments?: number;
  duration?: number;
}

export interface Options {
  checkParent?: boolean;
  class?: string;
  animation?: animationFunction;
  time?: TimeOptions;
}

declare class AnchorScroller {

  constructor(options?: Options);

  /**
   * Removes all AnchorScroller related stuff
   */
  public destroy(): void;
  
}

export default AnchorScroller;