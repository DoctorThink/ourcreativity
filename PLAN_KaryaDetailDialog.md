# Plan: Refactor KaryaDetailDialog Component

## Objective

Modify the `KaryaDetailDialog` component to remove the toggle between fullscreen and standard views. The dialog should always open in the fullscreen, "glossy" style, removing the smaller, dark-background default view.

## Target Appearance

*   Full viewport size (`w-[100vw] h-[100vh]`).
*   Blurred background (`backdrop-blur-xl`).
*   Media content takes up most of the vertical space.
*   Information panel is permanently visible at the bottom, styled as in the previous fullscreen mode.
*   No toggle buttons for fullscreen/miniscreen.
*   A persistent close button is available.

## Implementation Steps

1.  **Remove Fullscreen State:**
    *   Delete the `isFullscreen` state variable (`useState(false)`).
    *   Delete the `toggleFullscreen` function.
    *   Delete the `showInfoPanel` state variable (`useState(true)`).
    *   Delete the `toggleInfoPanel` function.
2.  **Apply Fullscreen Styles Permanently:**
    *   Modify the `DialogContent` className (line 65): Remove the conditional logic and apply `max-w-[100vw] max-h-[100vh] w-[100vw] h-[100vh] rounded-none` directly. Keep `p-0 overflow-hidden border-border/30 backdrop-blur-xl shadow-xl transition-all duration-300`.
    *   Modify the main container `div` className (line 70): Remove the conditional logic and apply `overflow-hidden` directly. Keep `flex flex-col h-full`.
    *   Modify the media display `div` style (line 73): Remove the conditional logic and apply `height: '100vh'` directly (or adjust as needed for layout, perhaps slightly less than 100vh to accommodate the info panel without scrolling). Keep `relative w-full bg-black/50 flex-grow`.
    *   Modify the info panel `motion.div` (line 167): Remove the `AnimatePresence` wrapper (lines 165, 266) and the conditional rendering logic (`!isFullscreen || (isFullscreen && showInfoPanel)` on line 166). Remove the `initial`, `animate`, `exit`, and `transition` props (lines 168-171). Apply the fullscreen styles directly to the `className` (line 172): `absolute bottom-0 left-0 right-0 z-10 max-h-[50vh] overflow-y-auto rounded-t-3xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.2)] bg-gradient-to-b from-secondary/95 to-background/95 backdrop-blur-md`.
3.  **Remove Toggle Buttons:**
    *   Delete the entire button group within the media display `div` (lines 135-161). This includes the Maximize/Minimize button, the Show/Hide Info button, and the fullscreen-specific Close button.
4.  **Add Persistent Close Button:**
    *   Add a new close button (using the `X` icon) inside the `DialogContent` but outside the main flex container, positioned absolutely at the top-right. Example structure:
        ```tsx
        <DialogContent className="...">
          {/* New Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 rounded-full p-2.5 text-white hover:text-white/90 bg-black/30 hover:bg-black/50 backdrop-blur-md border border-white/10 transition-colors shadow-lg"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>

          <div className="flex flex-col h-full overflow-hidden">
            {/* Media Display */}
            {/* Info Panel */}
          </div>
        </DialogContent>
        ```
5.  **Adjust Layout (If Necessary):** Review the layout after applying fullscreen styles permanently. Ensure the media display and info panel fit correctly within the viewport without unintended scrolling or overlap. The `max-h-[50vh]` on the info panel and the `height: '100vh'` on the media display might need adjustment for optimal presentation.

## Component Structure Diagram

```mermaid
graph TD
    A[KaryaCard Click] --> B(Open KaryaDetailDialog);
    B --> C{Dialog (Always Fullscreen Style)};
    C --> D[Media Display (Image/Video/Text)];
    C --> E[Information Panel (Bottom)];
    C --> F[Persistent Close Button (Top Right)];

    style B fill:#f9f,stroke:#333,stroke-width:2px
    style C fill:#ccf,stroke:#333,stroke-width:2px
    style D fill:#cfc,stroke:#333,stroke-width:1px
    style E fill:#cfc,stroke:#333,stroke-width:1px
    style F fill:#fcc,stroke:#333,stroke-width:1px