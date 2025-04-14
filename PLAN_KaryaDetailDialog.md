# Plan: Modify KaryaDetailDialog to Remove Toggle

**Objective:** Modify the `KaryaDetailDialog` component (`src/components/KaryaDetailDialog.tsx`) to always display in its fullscreen, "glossy" style, removing the ability to toggle to the smaller, dark-background view. The info panel toggle within the fullscreen view should remain functional.

**Steps:**

1.  **Remove State Management for Fullscreen:**
    *   Delete the `isFullscreen` state variable declaration (line 28).
    *   Delete the `toggleFullscreen` function (lines 55-57).
2.  **Apply Fullscreen Styles Permanently:**
    *   Modify the `DialogContent` className (lines 65-69): Remove the conditional logic and apply the fullscreen styles directly: `p-0 overflow-hidden border-border/30 backdrop-blur-xl shadow-xl transition-all duration-300 max-w-[100vw] max-h-[100vh] w-[100vw] h-[100vh] rounded-none`.
    *   Modify the main content `div` className (line 70): Remove the conditional logic and apply the fullscreen style: `flex flex-col h-full overflow-hidden`.
    *   Modify the media container `div` style (line 73): Remove the conditional logic and set the height directly: `style={{ height: '100vh' }}`.
3.  **Remove Fullscreen Toggle Button:**
    *   Delete the button element responsible for toggling fullscreen (lines 136-142).
4.  **Adjust Info Panel Logic:**
    *   Modify the conditional rendering logic for the info panel `motion.div` (line 166): Remove the `!isFullscreen || (isFullscreen && ...)` condition. The panel's visibility will now solely depend on `showInfoPanel`. The condition becomes just `{showInfoPanel && (...)}`.
    *   Modify the `motion.div`'s `initial`, `animate`, and `exit` props (lines 168-170): Remove the conditional logic based on `isFullscreen`. Set them directly to the fullscreen behavior: `initial={{ y: '100%' }}`, `animate={{ y: 0 }}`, `exit={{ y: '100%' }}`.
    *   Modify the `motion.div`'s className (lines 172-174): Remove the conditional logic and apply the fullscreen styles directly: `bg-gradient-to-b from-secondary/95 to-background/95 backdrop-blur-md absolute bottom-0 left-0 right-0 z-10 max-h-[50vh] overflow-y-auto rounded-t-3xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.2)]`.
5.  **Retain Necessary Controls:** Keep the `showInfoPanel` state, `toggleInfoPanel` function, the button to toggle the info panel (lines 143-151), and the close button (lines 152-160).

**Visual Plan (Mermaid):**

```mermaid
graph TD
    A[Start: Original KaryaDetailDialog] --> B(Remove `isFullscreen` state & `toggleFullscreen` function);
    B --> C(Update `DialogContent` styles to be always fullscreen);
    C --> D(Update main content `div` styles to be always fullscreen);
    D --> E(Update media container `div` style to be always fullscreen height);
    E --> F(Remove Maximize/Minimize button);
    F --> G(Update Info Panel conditional rendering to depend only on `showInfoPanel`);
    G --> H(Update Info Panel animation props for permanent fullscreen behavior);
    H --> I(Update Info Panel styles for permanent fullscreen behavior);
    I --> J[End: Dialog always fullscreen, info panel toggle remains];