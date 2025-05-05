
// Type definitions for Framer Motion with React component props 

import { HTMLMotionProps, ForwardRefComponent, SVGMotionProps } from "framer-motion";

declare module 'framer-motion' {
  // Add explicit index signature to the motion object
  interface MotionDivTagNameMap {
    [key: string]: ForwardRefComponent<HTMLElement, HTMLMotionProps<any>>;
  }

  // Fix the motion object type to include string indexing
  interface Motion extends MotionDivTagNameMap {
    // Preserve existing typings
    div: ForwardRefComponent<HTMLDivElement, HTMLMotionProps<"div">>;
    span: ForwardRefComponent<HTMLSpanElement, HTMLMotionProps<"span">>;
    p: ForwardRefComponent<HTMLParagraphElement, HTMLMotionProps<"p">>;
    // Add more common HTML elements as needed
  }
}
