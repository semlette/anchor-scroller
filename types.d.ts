declare interface Options {
  checkParent?: boolean;
  class?: (string | undefined);
}

declare class AnchorScroller {

  constructor(options: Options);

  /**
   * Removes all AnchorScroller related stuff
   */
  destroy(): void;
  
}