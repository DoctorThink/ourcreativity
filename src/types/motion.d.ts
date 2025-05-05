
import { HTMLMotionProps, ForwardRefComponent, SVGMotionProps } from "framer-motion";

declare module 'framer-motion' {
  // Add explicit index signature to allow string indexing of the motion object
  interface MotionComponents {
    [key: string]: ForwardRefComponent<HTMLElement, HTMLMotionProps<"div">>;
    
    // Preserve existing typings
    div: ForwardRefComponent<HTMLDivElement, HTMLMotionProps<"div">>;
    span: ForwardRefComponent<HTMLSpanElement, HTMLMotionProps<"span">>;
    p: ForwardRefComponent<HTMLParagraphElement, HTMLMotionProps<"p">>;
    h1: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h1">>;
    h2: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h2">>;
    h3: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h3">>;
    h4: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h4">>;
    h5: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h5">>;
    h6: ForwardRefComponent<HTMLHeadingElement, HTMLMotionProps<"h6">>;
    img: ForwardRefComponent<HTMLImageElement, HTMLMotionProps<"img">>;
    button: ForwardRefComponent<HTMLButtonElement, HTMLMotionProps<"button">>;
    a: ForwardRefComponent<HTMLAnchorElement, HTMLMotionProps<"a">>;
    ul: ForwardRefComponent<HTMLUListElement, HTMLMotionProps<"ul">>;
    li: ForwardRefComponent<HTMLLIElement, HTMLMotionProps<"li">>;
    section: ForwardRefComponent<HTMLElement, HTMLMotionProps<"section">>;
    article: ForwardRefComponent<HTMLElement, HTMLMotionProps<"article">>;
    header: ForwardRefComponent<HTMLElement, HTMLMotionProps<"header">>;
    footer: ForwardRefComponent<HTMLElement, HTMLMotionProps<"footer">>;
    nav: ForwardRefComponent<HTMLElement, HTMLMotionProps<"nav">>;
    main: ForwardRefComponent<HTMLElement, HTMLMotionProps<"main">>;
    aside: ForwardRefComponent<HTMLElement, HTMLMotionProps<"aside">>;
  }

  interface AnimationControls {
    start(definition: string): Promise<any>;
  }
  
  // Make sure motion is properly typed with our extended interface
  const motion: MotionComponents;
}
