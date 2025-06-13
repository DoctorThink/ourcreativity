# Component Documentation

This document provides an overview of the React components used in this project.

---

## About

**Path:** `src/components/About.tsx`

**Description:**
A section component that displays information about the community, including its vision, mission, and values. It uses motion animations for a dynamic appearance.

**Props:**
This component does not accept any props.

---

## Contact

**Path:** `src/components/Contact.tsx`

**Description:**
A section component that encourages users to join the community. It features a prominent "Get Started" button.

**Props:**
This component does not accept any props.

---

## Hero

**Path:** `src/components/Hero.tsx`

**Description:**
The main hero section for the homepage. It displays the community logo, name, a brief tagline, and navigation links to other parts of the website. It utilizes scroll-aware animations and a modern card-based design for navigation items.

**Props:**
This component does not accept any props.

---

## KaryaCard

**Path:** `src/components/KaryaCard.tsx`

**Description:**
A card component to display a "Karya" (creative work). It can show an image or video, title, creator name, category, and a link. It includes hover animations and optimized image loading. For works with multiple media, a carousel is displayed. Text-based works ("Karya Tulis") have a distinct presentation.

**Props:**

| Name    | Type                                                  | Optional | Description                         |
| :------ | :---------------------------------------------------- | :------- | :---------------------------------- |
| `karya` | `Database['public']['Tables']['karya']['Row']`         | No       | The Karya object to display.        |
| `onClick` | `() => void`                                          | Yes      | Function to call when card is clicked. |

---

## TeamMemberCard

**Path:** `src/components/TeamMemberCard.tsx`

**Description:**
A card component to display information about a team member. It shows their name, role, initials, and an optional Instagram link. It supports different accent colors and can display a short bio or achievements preview.

**Props:**

| Name          | Type         | Optional | Description                                   |
| :------------ | :----------- | :------- | :-------------------------------------------- |
| `name`        | `string`     | No       | The name of the team member.                  |
| `role`        | `string`     | No       | The role of the team member.                  |
| `instagram`   | `string`     | Yes      | The team member's Instagram username (e.g., "@username"). |
| `accentColor` | `string`     | Yes      | Accent color for the card (e.g., "coral", "emerald"). |
| `bio`         | `string`     | Yes      | A short biography of the team member.         |
| `achievements`| `string[]`   | Yes      | A list of achievements.                       |
| `onClick`     | `() => void` | Yes      | Function to call when card is clicked.        |

---

## Button

**Path:** `src/components/ui/button.tsx`

**Description:**
A versatile button component based on `class-variance-authority (CVA)`. It supports different visual variants, sizes, and can be rendered as a child component using the `asChild` prop. (ShadCN UI Component)

**Props:**

| Name     | Type                                                       | Optional | Default   | Description                                                                 |
| :------- | :--------------------------------------------------------- | :------- | :-------- | :-------------------------------------------------------------------------- |
| `variant`| `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | Yes      | `default` | The visual style of the button.                                           |
| `size`   | `'default' \| 'sm' \| 'lg' \| 'icon'`                        | Yes      | `default` | The size of the button.                                                       |
| `asChild`| `boolean`                                                  | Yes      | `false`   | If true, renders the component as a child, passing props to the first child. |
| _Other_  | `React.ButtonHTMLAttributes<HTMLButtonElement>`            | Yes      |           | Standard HTML button attributes.                                            |

---

## FlowingBackground

**Path:** `src/components/FlowingBackground.tsx`

**Description:**
A component that renders an animated, flowing background with configurable intensity, accent colors, and variants. It can be optimized to reduce motion. The accent colors can change based on the current route.

**Props:**

| Name       | Type                                                                  | Optional | Default    | Description                                                                 |
| :--------- | :-------------------------------------------------------------------- | :------- | :--------- | :-------------------------------------------------------------------------- |
| `className`| `string`                                                              | Yes      |            | Custom CSS classes for the container.                                       |
| `intensity`| `'subtle' \| 'medium' \| 'high'`                                        | Yes      | `medium`   | Controls the opacity and visual prominence of the background effects.       |
| `accents`  | `Array<'amethyst' \| 'turquoise' \| 'coral' \| 'mint' \| 'softPink'>` | Yes      | `['amethyst', 'turquoise', 'coral']` | Array of accent colors to use for the gradient blobs.                     |
| `variant`  | `'gradient' \| 'monochromatic' \| 'neutral'`                          | Yes      | `gradient` | Defines the style of the background (colored gradients, single color, or neutral). |
| `animate`  | `boolean`                                                             | Yes      | `true`     | Whether to enable animations (if not preferring reduced motion or optimized). |
| `optimized`| `boolean`                                                             | Yes      | `true`     | If true, reduces some animations for performance.                           |

---

## GlobalAnimations

**Path:** `src/components/GlobalAnimations.tsx`

**Description:**
A component that provides global background animations consisting of several colored orbs and subtle line accents. The color scheme of the orbs changes based on the current route. Animations are disabled if the user prefers reduced motion.

**Props:**
This component does not accept any props.

---

## JoinCommunityDialog

**Path:** `src/components/JoinCommunityDialog.tsx`

**Description:**
A dialog component that provides users with links to join the community's various platforms, primarily Linktree and WhatsApp groups. It uses ShadCN UI's Dialog component.

**Props:**

| Name          | Type           | Optional | Description                                     |
| :------------ | :------------- | :------- | :---------------------------------------------- |
| `open`        | `boolean`      | No       | Controls whether the dialog is open or closed.  |
| `onOpenChange`| `(open: boolean) => void` | No       | Callback function when the dialog's open state changes. |

---

## KaryaDetailDialog

**Path:** `src/components/KaryaDetailDialog.tsx`

**Description:**
A dialog component to display the detailed view of a "Karya" (creative work). It handles different media types (image, video, text), multiple media via a carousel, and includes information like title, creator, category, description, tags, and external links.

**Props:**

| Name    | Type                                                  | Optional | Description                         |
| :------ | :---------------------------------------------------- | :------- | :---------------------------------- |
| `karya` | `Database['public']['Tables']['karya']['Row']`         | No       | The Karya object to display.        |
| `isOpen`| `boolean`                                             | No       | Controls if the dialog is open.     |
| `onClose`| `() => void`                                          | No       | Function to call when dialog closes. |

---

## KaryaGallery (Main)

**Path:** `src/components/KaryaGallery.tsx`

**Description:**
The main gallery component for displaying "Karya" items. It fetches data from Supabase, allows filtering by category, and uses a masonry layout for the gallery. It also integrates the `KaryaDetailDialog` for viewing item details and includes a spotlight section for featured works.

**Props:**
This component does not accept any props directly, but manages internal state for category filtering and dialog display.

---

## KaryaUploadForm

**Path:** `src/components/KaryaUploadForm.tsx`

**Description:**
A form component, wrapped in a dialog, for users to upload new "Karya". It supports image, video, and text-based submissions, includes client-side validation (file type, size) using Zod, and uploads files to Supabase storage. Submissions are marked as 'pending' for admin review.

**Props:**
This component does not accept any props directly but uses `useForm` for form management.

---

## PageTransition

**Path:** `src/components/PageTransition.tsx`

**Description:**
A higher-order component that wraps page content to provide standardized page transition animations using Framer Motion. It supports different animation variants for regular pages and admin pages.

**Props:**

| Name       | Type        | Optional | Default | Description                                         |
| :--------- | :---------- | :------- | :------ | :-------------------------------------------------- |
| `children` | `ReactNode` | No       |         | The content of the page to be animated.             |
| `isAdmin`  | `boolean`   | Yes      | `false` | If true, uses admin-specific transition variants.   |

---

## TeamMember

**Path:** `src/components/TeamMember.tsx`

**Description:**
A component to display an individual team member's card, showing their avatar (or initials), name, role, and Instagram link. Uses Framer Motion for hover effects.

**Props:**

| Name       | Type     | Optional | Description                         |
| :--------- | :------- | :------- | :---------------------------------- |
| `name`     | `string` | No       | Name of the team member.            |
| `instagram`| `string` | Yes      | Instagram username (without '@').   |
| `role`     | `string` | No       | Role of the team member.            |
| `imageUrl` | `string` | Yes      | URL for the member's avatar image.  |
| `index`    | `number` | No       | Index for animation delay.          |

---

## TeamMemberBio

**Path:** `src/components/TeamMemberBio.tsx`

**Description:**
A component to display the biography and achievements of a team member. It supports accent colors for styling. Can accept props directly or an entire `member` object for backward compatibility.

**Props:**

| Name          | Type       | Optional | Description                                                                 |
| :------------ | :--------- | :------- | :-------------------------------------------------------------------------- |
| `bio`         | `string`   | Yes      | The biography text.                                                         |
| `achievements`| `string[]` | Yes      | An array of achievement strings. Defaults to an empty array.                |
| `accentColor` | `string`   | Yes      | Accent color for styling elements (e.g., "coral", "emerald").               |
| `member`      | `any`      | Yes      | A member object (for backward compatibility, if `bio`, `achievements`, `accentColor` are not directly provided). |

---

## AdminActivityLog

**Path:** `src/components/admin/AdminActivityLog.tsx`

**Description:**
Displays a log of admin activities fetched from Supabase. It shows actions like login, logout, create, update, delete, approve, and reject, along with details and timestamps. Includes real-time updates and a refresh button.

**Props:**
This component does not accept any props.

---

## AdminDashboardHeader

**Path:** `src/components/admin/AdminDashboardHeader.tsx`

**Description:**
The header for the admin dashboard. Displays current time, last login time for admin, a notification bell for pending karya count (with real-time updates), and a logout button. Includes a mobile navigation sheet for admin tabs.

**Props:**

| Name           | Type          | Optional | Description                               |
| :------------- | :------------ | :------- | :---------------------------------------- |
| `onLogout`     | `() => void`  | No       | Function to call on logout.               |
| `lastLogin`    | `Date`        | No       | Timestamp of the admin's last login.      |
| `activityCount`| `number`      | No       | Count of recent activities (currently unused in component logic). |
| `activeTab`    | `string`      | No       | The currently active admin tab.           |
| `onTabChange`  | `(tab: string) => void` | No       | Callback for when an admin tab is changed. |

---

## AdminDashboardStats

**Path:** `src/components/admin/AdminDashboardStats.tsx`

**Description:**
Displays various statistics on the admin dashboard, including total karya, counts for approved, rejected, and pending karya, and category-wise counts. Also includes a chart showing karya activity for the last 7 days. Fetches and updates data in real-time from Supabase.

**Props:**
This component does not accept any props.

---

## AnnouncementEditor

**Path:** `src/components/admin/AnnouncementEditor.tsx`

**Description:**
A dialog form for creating new announcements. Allows admins to input title, content, category, image URL, link URL, and set published/important status. Uses `adminAnnouncementService` to interact with the backend.

**Props:**

| Name                   | Type                         | Optional | Description                                    |
| :--------------------- | :--------------------------- | :------- | :--------------------------------------------- |
| `onClose`              | `() => void`                 | No       | Function to call when the editor dialog closes. |
| `onAnnouncementCreated`| `(announcement: Announcement) => void` | Yes      | Callback after a new announcement is created.  |

---

## AnnouncementManager

**Path:** `src/components/admin/AnnouncementManager.tsx`

**Description:**
A comprehensive manager for announcements. Allows admins to view, create, edit, delete, publish/unpublish, and mark announcements as important/unimportant. Includes filtering by status (all, published, draft, important). Uses `adminAnnouncementService` for backend operations.

**Props:**
This component does not accept any props.

---

## ContentEditor

**Path:** `src/components/admin/ContentEditor.tsx`

**Description:**
An editor for managing static text content on various pages (e.g., Homepage subtitle, Brand Story, Information page sections). It uses a mock initial content structure; in a real app, this would connect to a database.

**Props:**
This component does not accept any props.

---

## KaryaModeration

**Path:** `src/components/admin/KaryaModeration.tsx`

**Description:**
A component for admins to moderate "Karya" submissions. It allows viewing pending, approved, and rejected karya, and provides actions to approve, reject, return to pending, or delete submissions. Fetches data from Supabase and uses TanStack Query for data management and mutations.

**Props:**
This component does not accept any props.

---

## RequireAuth

**Path:** `src/components/admin/RequireAuth.tsx`

**Description:**
A higher-order component used to protect admin routes. It checks if an admin user is authenticated using `useAdminAuth` context. If not authenticated, it redirects to the admin login page. Shows a loading indicator while checking authentication.

**Props:**

| Name       | Type          | Optional | Description                        |
| :--------- | :------------ | :------- | :--------------------------------- |
| `children` | `React.ReactNode` | No       | The content to render if authenticated. |

---

## TeamEditor

**Path:** `src/components/admin/TeamEditor.tsx`

**Description:**
An editor for managing team members grouped by categories (e.g., Video, Design). Allows adding/deleting groups and adding/updating/deleting members within groups. Uses mock initial data; a real app would use a database.

**Props:**
This component does not accept any props.

---

## AnnouncementCard

**Path:** `src/components/announcement/AnnouncementCard.tsx`

**Description:**
A card component to display individual announcements in a BentoBox style. Shows category, title, a snippet of content, date, and special styling for certain important announcements (e.g., "Gerakan 27 April", "Version 4.0").

**Props:**

| Name          | Type         | Optional | Description                                |
| :------------ | :----------- | :------- | :----------------------------------------- |
| `announcement`| `Announcement` | No       | The announcement object to display.        |
| `onClick`     | `() => void` | No       | Function to call when the card is clicked. |

---

## AnnouncementDetail

**Path:** `src/components/announcement/AnnouncementDetail.tsx`

**Description:**
Displays the full detail of an announcement. Includes title, category, date, full content (with basic Markdown-like parsing for paragraphs and lists), and any associated image or link. Has special rendering for "Version 4.0" and "Gerakan 27 April" announcements.

**Props:**

| Name          | Type         | Optional | Description                        |
| :------------ | :----------- | :------- | :--------------------------------- |
| `announcement`| `Announcement` | No       | The announcement object to display. |

---

## AnnouncementDetailModal

**Path:** `src/components/announcement/AnnouncementDetailModal.tsx`

**Description:**
A modal dialog to display the full details of an announcement. It uses the `AnnouncementDetail` component for rendering the content.

**Props:**

| Name          | Type          | Optional | Description                                     |
| :------------ | :------------ | :------- | :---------------------------------------------- |
| `announcement`| `Announcement \| null` | No       | The announcement object to display, or null.  |
| `isOpen`      | `boolean`     | No       | Controls whether the modal is open or closed.   |
| `onClose`     | `() => void`  | No       | Callback function when the modal closes.        |

---

## AnnouncementErrorState

**Path:** `src/components/announcement/AnnouncementErrorState.tsx`

**Description:**
A component to display an error message when announcements fail to load. Includes an icon, the error message, and a retry button.

**Props:**

| Name    | Type         | Optional | Description                         |
| :------ | :----------- | :------- | :---------------------------------- |
| `error` | `string`     | No       | The error message to display.       |
| `onRetry`| `() => void` | No       | Function to call when retry is clicked. |

---

## AnnouncementFilters

**Path:** `src/components/announcement/AnnouncementFilters.tsx`

**Description:**
A set of filter buttons for announcements, allowing users to filter by category (All, Event, Recruitment, Update).

**Props:**

| Name            | Type         | Optional | Description                               |
| :-------------- | :----------- | :------- | :---------------------------------------- |
| `currentFilter` | `string`     | No       | The currently active filter ID.           |
| `onFilterChange`| `(filter: string) => void` | No       | Callback when a filter button is clicked. |

---

## AnnouncementGrid

**Path:** `src/components/announcement/AnnouncementGrid.tsx`

**Description:**
A component that displays a grid of announcements using `CleanAnnouncementCard`. Shows an empty state if no announcements are provided.

**Props:**

| Name                 | Type           | Optional | Description                                      |
| :------------------- | :------------- | :------- | :----------------------------------------------- |
| `announcements`      | `Announcement[]` | No       | An array of announcement objects to display.     |
| `onAnnouncementClick`| `(announcement: Announcement) => void` | No       | Callback when an announcement card is clicked. |

---

## AnnouncementLoading

**Path:** `src/components/announcement/AnnouncementLoading.tsx`

**Description:**
A simple loading indicator component with a spinning loader icon and "Memuat pengumuman..." text.

**Props:**
This component does not accept any props.

---

## AnnouncementLoadingState

**Path:** `src/components/announcement/AnnouncementLoadingState.tsx`

**Description:**
A skeleton loading state for the announcements page, showing placeholders for a featured announcement and a grid of announcement cards.

**Props:**
This component does not accept any props.

---

## CleanAnnouncementCard

**Path:** `src/components/announcement/CleanAnnouncementCard.tsx`

**Description:**
A cleaner, more standard card design for displaying announcements. Shows category, importance, title, content snippet, and date.

**Props:**

| Name          | Type         | Optional | Description                                |
| :------------ | :----------- | :------- | :----------------------------------------- |
| `announcement`| `Announcement` | No       | The announcement object to display.        |
| `onClick`     | `() => void` | No       | Function to call when the card is clicked. |

---

## EmptyAnnouncementState

**Path:** `src/components/announcement/EmptyAnnouncementState.tsx`

**Description:**
Displays a message when no announcements are available for the current filter, with a button to "Lihat semua pengumuman".

**Props:**

| Name       | Type         | Optional | Description                                     |
| :--------- | :----------- | :------- | :---------------------------------------------- |
| `onShowAll`| `() => void` | No       | Callback function when "Lihat semua" is clicked. |

---

## FeaturedAnnouncement

**Path:** `src/components/announcement/FeaturedAnnouncement.tsx`

**Description:**
A component to display a prominent featured announcement, typically at the top of the announcements page. Has special styling for "Gerakan 27 April" and "Version 4.0" announcements. Also includes an `EmptyFeaturedAnnouncement` variant.

**Props:**

| Name          | Type         | Optional | Description                        |
| :------------ | :----------- | :------- | :--------------------------------- |
| `announcement`| `Announcement` | No       | The announcement object to display. |
| `onClick`     | `() => void` | No       | Function to call when clicked.     |

---

## FeaturedAnnouncementCard

**Path:** `src/components/announcement/FeaturedAnnouncementCard.tsx`

**Description:**
A card specifically designed for featured announcements. It includes a "Unggulan" (Featured) badge, category, title, content snippet, date, and an optional image.

**Props:**

| Name          | Type         | Optional | Description                                |
| :------------ | :----------- | :------- | :----------------------------------------- |
| `announcement`| `Announcement` | No       | The announcement object to display.        |
| `onClick`     | `() => void` | No       | Function to call when the card is clicked. |

---

## FilterButton (Announcement)

**Path:** `src/components/announcement/FilterButton.tsx`

**Description:**
A reusable button component for category filtering in the announcements section. Supports an active state and an optional icon.

**Props:**

| Name      | Type          | Optional | Description                         |
| :-------- | :------------ | :------- | :---------------------------------- |
| `active`  | `boolean`     | No       | Whether the button is active.       |
| `onClick` | `() => void`  | No       | Function to call when clicked.      |
| `children`| `React.ReactNode` | No    | The content of the button.          |
| `icon`    | `LucideIcon`  | Yes      | Optional icon for the button.       |
| `color`   | `string`      | Yes      | Optional color class for the icon.  |
| `className`| `string`     | Yes      | Additional CSS classes.             |

---

## VersionBadge

**Path:** `src/components/announcement/VersionBadge.tsx`

**Description:**
A decorative badge component, specifically designed to announce "OurCreativity Web v4.0". Features floating and sparkle animations.

**Props:**
This component does not accept any props.

---

## AdvancedFilters (Karya)

**Path:** `src/components/karya/AdvancedFilters.tsx`

**Description:**
A component providing advanced filtering options for the "Karya" gallery. Includes search by text, category selection, sorting (recency, popularity), and tag filtering.

**Props:**

| Name               | Type                                                              | Optional | Description                                       |
| :----------------- | :---------------------------------------------------------------- | :------- | :------------------------------------------------ |
| `onSelectCategory` | `(category: string) => void`                                      | No       | Callback for category selection.                  |
| `selectedCategory` | `string`                                                          | No       | Currently selected category ID.                     |
| `onSearchChange`   | `(search: string) => void`                                        | No       | Callback for search term changes.                 |
| `onTagsChange`     | `(tags: string[]) => void`                                        | No       | Callback for selected tags changes.               |
| `onSortChange`     | `(sort: "recency" \| "popularity", order: "asc" \| "desc") => void` | No       | Callback for sort criteria changes.               |
| `searchTerm`       | `string`                                                          | No       | Current search term.                              |
| `selectedTags`     | `string[]`                                                        | No       | Array of currently selected tags.                 |
| `sortBy`           | `"recency" \| "popularity"`                                         | No       | Current sort property.                            |
| `sortOrder`        | `"asc" \| "desc"`                                                   | No       | Current sort order.                               |

---

## CategoryExplorer

**Path:** `src/components/karya/CategoryExplorer.tsx`

**Description:**
A visual category selection component for the "Karya" gallery. Displays categories as interactive cards with icons and hover effects.

**Props:**

| Name               | Type                        | Optional | Description                               |
| :----------------- | :-------------------------- | :------- | :---------------------------------------- |
| `onSelectCategory` | `(category: string) => void`| No       | Callback when a category is selected.     |
| `selectedCategory` | `string`                    | No       | The ID of the currently selected category. |

---

## CategorySelector (Karya)

**Path:** `src/components/karya/CategorySelector.tsx`

**Description:**
A set of buttons for selecting a "Karya" category. Displays category names and icons.

**Props:**

| Name               | Type                        | Optional | Description                               |
| :----------------- | :-------------------------- | :------- | :---------------------------------------- |
| `selectedCategory` | `string`                    | No       | The ID of the currently selected category. |
| `onSelectCategory` | `(category: string) => void`| No       | Callback when a category is selected.     |

---

## CustomCursor

**Path:** `src/components/karya/CustomCursor.tsx`

**Description:**
Implements a custom cursor for desktop view, consisting of a main dot and a larger follower circle. The cursor changes appearance when clicking or hovering over interactive elements. The default browser cursor is hidden.

**Props:**
This component does not accept any props.

---

## KaryaGallery (Karya Subdirectory)

**Path:** `src/components/karya/KaryaGallery.tsx`

**Description:**
A gallery component specifically for "Karya" items within the `src/components/karya/` directory. It uses `CategorySelector` for filtering and `MasonryGrid` for display. Integrates `KaryaDetailDialog` for item details.

**Props:**

| Name               | Type                        | Optional | Description                               |
| :----------------- | :-------------------------- | :------- | :---------------------------------------- |
| `karyaData`        | `KaryaType[]`               | No       | Array of Karya objects to display.        |
| `isLoading`        | `boolean`                   | No       | Indicates if data is currently loading.   |
| `selectedCategory` | `string`                    | No       | The ID of the currently selected category. |
| `onSelectCategory` | `(category: string) => void`| No       | Callback when a category is selected.     |

---

## MasonryGrid

**Path:** `src/components/karya/MasonryGrid.tsx`

**Description:**
A responsive masonry grid layout for displaying "Karya" items. Uses `react-masonry-css` and integrates `KaryaCard` for rendering each item.

**Props:**

| Name            | Type           | Optional | Description                                    |
| :-------------- | :------------- | :------- | :--------------------------------------------- |
| `items`         | `KaryaType[]`  | No       | Array of Karya objects to display in the grid. |
| `onKaryaClick`  | `(karya: KaryaType) => void` | Yes      | Callback when a Karya item is clicked.         |
| `loading`       | `boolean`      | Yes      | If true, can be used to show loading state (currently not implemented in this component's rendering). |

---

## ParticleBackground

**Path:** `src/components/karya/ParticleBackground.tsx`

**Description:**
Renders an animated particle background on an HTML5 canvas. Particles move, fade, and interact with mouse movement. Includes connecting lines between nearby particles.

**Props:**
This component does not accept any props.

---

## ScrollProgressIndicator

**Path:** `src/components/karya/ScrollProgressIndicator.tsx`

**Description:**
Displays a horizontal progress bar at the top of the page that indicates the user's scroll progress. Uses Framer Motion for smooth animation.

**Props:**
This component does not accept any props.

---

## SpotlightCarousel

**Path:** `src/components/karya/SpotlightCarousel.tsx`

**Description:**
A carousel component to showcase "Spotlight" Karya items. Uses ShadCN UI's Carousel and `KaryaCard` for display. Integrates `KaryaDetailDialog` for viewing item details.

**Props:**

| Name            | Type         | Optional | Description                                  |
| :-------------- | :----------- | :------- | :------------------------------------------- |
| `spotlightItems`| `KaryaType[]`| No       | Array of Karya objects to display as spotlight. |

---

## SpotlightSection

**Path:** `src/components/karya/SpotlightSection.tsx`

**Description:**
A section dedicated to showcasing a single featured "Spotlight" Karya item, usually the first item from a list of spotlighted works.

**Props:**

| Name            | Type         | Optional | Description                                    |
| :-------------- | :----------- | :------- | :--------------------------------------------- |
| `spotlightItems`| `KaryaType[]`| No       | Array of Karya objects, the first is featured. |

---

## PageLayout

**Path:** `src/components/layouts/PageLayout.tsx`

**Description:**
A general layout component for pages. Includes a fixed header with navigation (desktop and mobile), an optional page title section with a back button, and a footer. Handles scroll-based header style changes and mobile menu state.

**Props:**

| Name              | Type          | Optional | Default | Description                                     |
| :---------------- | :------------ | :------- | :------ | :---------------------------------------------- |
| `children`        | `ReactNode`   | No       |         | The main content of the page.                   |
| `title`           | `string`      | Yes      |         | Optional title for the page header section.     |
| `subtitle`        | `string`      | Yes      |         | Optional subtitle for the page header section.  |
| `showBackButton`  | `boolean`     | Yes      | `true`  | Whether to display the back button.             |
| `backButtonPath`  | `string`      | Yes      |         | Custom path for the back button. Navigates -1 if not set. |
| `className`       | `string`      | Yes      | `""`    | Additional CSS classes for the main layout div. |
| `footerClassName` | `string`      | Yes      | `""`    | Additional CSS classes for the footer.          |
| `contentClassName`| `string`      | Yes      | `""`    | Additional CSS classes for the main content area. |
| `headerClassName` | `string`      | Yes      | `""`    | Additional CSS classes for the header.          |
| `fullWidth`       | `boolean`     | Yes      | `false` | If true, container uses full width.             |

---

## BentoCard (UI)

**Path:** `src/components/ui/BentoCard.tsx`

**Description:**
A flexible card component designed for Bento grid layouts. Supports column and row spans, an optional icon, glass effect, glow effect, and interactive hover/tap animations. (Custom Component)

**Props:**

| Name         | Type          | Optional | Default    | Description                                      |
| :----------- | :------------ | :------- | :--------- | :----------------------------------------------- |
| `children`   | `ReactNode`   | No       |            | Content of the card.                             |
| `className`  | `string`      | Yes      |            | Additional CSS classes.                          |
| `colSpan`    | `string`      | Yes      | `col-span-1` | Tailwind CSS column span.                        |
| `rowSpan`    | `string`      | Yes      | `row-span-1` | Tailwind CSS row span.                           |
| `icon`       | `LucideIcon`  | Yes      |            | Optional Lucide icon for the card.               |
| `iconColor`  | `string`      | Yes      | `text-foreground` | CSS class for the icon color.                 |
| `glassEffect`| `boolean`     | Yes      | `true`     | Apply glassmorphism effect.                      |
| `glowColor`  | `string`      | Yes      |            | Color for the hover glow effect (CSS color value). |
| `interactive`| `boolean`     | Yes      | `true`     | Enable hover and tap animations.                 |
| `hoverScale` | `number`      | Yes      | `1.03`     | Scale factor on hover.                           |
| `motionProps`| `MotionProps` | Yes      |            | Additional Framer Motion props.                  |
| `style`      | `React.CSSProperties` | Yes      |    | Custom inline styles.                            |
| `onClick`    | `() => void`  | Yes      |            | Callback function when card is clicked.          |

---

## BentoGrid (UI)

**Path:** `src/components/ui/BentoGrid.tsx`

**Description:**
A layout component for creating Bento grids. Supports responsive column configurations and customizable gaps. Can animate child items with a stagger effect. (Custom Component)

**Props:**

| Name      | Type                               | Optional | Default | Description                                     |
| :-------- | :--------------------------------- | :------- | :------ | :---------------------------------------------- |
| `children`| `ReactNode`                        | No       |         | Child components to arrange in the grid.        |
| `className`| `string`                          | Yes      |         | Additional CSS classes for the grid container.  |
| `cols`    | `1 \| 2 \| 3 \| 4 \| 5 \| 6`           | Yes      | `3`     | Number of columns on desktop.                   |
| `mdCols`  | `1 \| 2 \| 3 \| 4`                   | Yes      | `2`     | Number of columns on tablets.                   |
| `smCols`  | `1 \| 2`                           | Yes      | `1`     | Number of columns on mobile.                    |
| `gap`     | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | Yes   | `md`    | Gap size between grid items.                    |
| `animate` | `boolean`                          | Yes      | `true`  | Enable animation for child items.               |
| `stagger` | `number`                           | Yes      | `0.1`   | Stagger delay (in seconds) for item animations. |

---

## GlassBentoCard (UI)

**Path:** `src/components/ui/GlassBentoCard.tsx`

**Description:**
A specialized Bento card with a glassmorphism effect, interactive hover animations, and an optional shimmer/shine effect. Includes mouse-tracking for a moving gradient background. (Custom Component)

**Props:**

| Name           | Type          | Optional | Default        | Description                                     |
| :------------- | :------------ | :------- | :------------- | :---------------------------------------------- |
| `children`     | `ReactNode`   | No       |                | Content of the card.                            |
| `title`        | `string`      | Yes      |                | Optional title for the card.                    |
| `icon`         | `LucideIcon`  | Yes      |                | Optional Lucide icon.                           |
| `iconColor`    | `string`      | Yes      | `bg-amethyst/90`| CSS class for icon background/color.            |
| `interactive`  | `boolean`     | Yes      | `true`         | Enable hover/tap interactions.                  |
| `hoverScale`   | `number`      | Yes      | `1.02`         | Scale factor on hover.                          |
| `colSpan`      | `string`      | Yes      | `col-span-1`   | Tailwind CSS column span.                       |
| `rowSpan`      | `string`      | Yes      | `row-span-1`   | Tailwind CSS row span.                          |
| `accentColor`  | `string`      | Yes      | `from-amethyst/20 to-transparent` | Gradient for background effect. |
| `hasShimmer`   | `boolean`     | Yes      | `true`         | Enable shimmering shine effect.                 |
| `className`    | `string`      | Yes      | `""`           | Additional CSS classes.                         |
| `shineDuration`| `number`      | Yes      | `5`            | Duration of the shine animation (seconds).      |
| `disabled`     | `boolean`     | Yes      | `false`        | Disable interactions and apply opacity.         |
| `motionProps`  | `MotionProps` | Yes      |                | Additional Framer Motion props.                 |
| `style`        | `React.CSSProperties` | Yes |             | Custom inline styles.                           |
| `onClick`      | `() => void`  | Yes      |                | Callback function when card is clicked.         |

---

## Accordion (UI)

**Path:** `src/components/ui/accordion.tsx`

**Description:**
A vertically stacked set of interactive headings that each reveal a section of content. Based on Radix UI Accordion primitives. (ShadCN UI Component)

**Props:**
- `Accordion`: Root component. Props include `type ('single' | 'multiple')`, `defaultValue`, `value`, `onValueChange`, `collapsible`, `disabled`, `dir`, `orientation`.
- `AccordionItem`: Individual accordion item. Props include `value`, `disabled`.
- `AccordionTrigger`: The button that toggles an item's content. Props include `asChild`.
- `AccordionContent`: The content panel. Props include `asChild`.
All components accept standard HTML attributes and `className`.

---

## AlertDialog (UI)

**Path:** `src/components/ui/alert-dialog.tsx`

**Description:**
A modal dialog that interrupts the user with important information or a call to action. Based on Radix UI Alert Dialog primitives. (ShadCN UI Component)

**Props:**
- `AlertDialog`: Root. Props: `open`, `onOpenChange`, `defaultOpen`.
- `AlertDialogTrigger`: Button to open the dialog. Props: `asChild`.
- `AlertDialogContent`: Dialog content. Props: `className`, `onEscapeKeyDown`, `onPointerDownOutside`, `forceMount`.
- `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`: Accept standard HTML attributes and `className`. `AlertDialogAction` & `AlertDialogCancel` also accept `asChild`.

---

## Alert (UI)

**Path:** `src/components/ui/alert.tsx`

**Description:**
Displays a callout for user attention. Supports default and destructive variants. (ShadCN UI Component)

**Props:**
- `Alert`: Root div. Props: `variant ('default' | 'destructive')`, `className`, standard HTML attributes.
- `AlertTitle`: Heading element. Props: `className`, standard HTML attributes.
- `AlertDescription`: Paragraph element for description. Props: `className`, standard HTML attributes.

---

## AspectRatio (UI)

**Path:** `src/components/ui/aspect-ratio.tsx`

**Description:**
A component for maintaining a specific aspect ratio for its child. Based on Radix UI Aspect Ratio primitive. (ShadCN UI Component)

**Props:**
- `AspectRatio`: Root component. Props: `ratio (number)`, `className`, standard HTML attributes.

---

## Avatar (UI)

**Path:** `src/components/ui/avatar.tsx`

**Description:**
An image element with a fallback for representing a user or entity. (ShadCN UI Component)
- `Avatar`: The main container for the avatar.
- `AvatarImage`: The image element. Props include `src`, `alt`, `onLoadingStatusChange`.
- `AvatarFallback`: Content displayed if the image fails to load. Can contain text (e.g., initials).
All components accept `className` and standard HTML attributes.

**Props:**
This component and its parts accept standard HTML attributes and `className`. `AvatarImage` takes image-specific props.

---

## Badge (UI)

**Path:** `src/components/ui/badge.tsx`

**Description:**
Displays a small badge or tag. Supports different visual variants. (ShadCN UI Component)

**Props:**

| Name    | Type                                               | Optional | Default   | Description                     |
| :------ | :------------------------------------------------- | :------- | :-------- | :------------------------------ |
| `variant`| `'default' \| 'secondary' \| 'destructive' \| 'outline'` | Yes   | `default` | The visual style of the badge.  |
| _Other_ | `React.HTMLAttributes<HTMLDivElement>`             | Yes      |           | Standard HTML div attributes.   |

---

## Breadcrumb (UI)

**Path:** `src/components/ui/breadcrumb.tsx`

**Description:**
Displays a breadcrumb navigation trail. (ShadCN UI Component)
Consists of `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`.

**Props:**
Each part accepts `className`. `BreadcrumbLink` accepts `asChild`. `Breadcrumb` accepts `separator`. Standard HTML attributes apply.

---

## Calendar (UI)

**Path:** `src/components/ui/calendar.tsx`

**Description:**
A calendar component for date selection. Based on `react-day-picker`. (ShadCN UI Component)

**Props:**
Accepts all props from `react-day-picker`'s `DayPicker` component, such as `mode`, `selected`, `onSelect`, `month`, `onMonthChange`, `disabled`, `modifiers`, etc. Also `className` and `classNames` for custom styling.

---

## Card (UI)

**Path:** `src/components/ui/card.tsx`

**Description:**
A container for content, often used to group related information. (ShadCN UI Component)
Consists of `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, `CardContent`.

**Props:**
All parts accept `className` and standard HTML attributes.

---

## Carousel (UI)

**Path:** `src/components/ui/carousel.tsx`

**Description:**
A carousel component for cycling through elements. Based on `embla-carousel-react`. (ShadCN UI Component)
Consists of `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`.

**Props:**
- `Carousel`: Root. Props: `opts` (Embla options), `plugins`, `orientation`, `setApi`.
- `CarouselPrevious`, `CarouselNext`: Button props (`variant`, `size`).
All parts accept `className` and standard HTML attributes.

---

## Chart (UI)

**Path:** `src/components/ui/chart.tsx`

**Description:**
A wrapper around Recharts for creating responsive charts with consistent styling. (ShadCN UI Component)
Consists of `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`.

**Props:**
- `ChartContainer`: Props: `config (ChartConfig)`, `className`. `ChartConfig` defines series colors, labels, icons.
- `ChartTooltipContent`: Props from Recharts Tooltip & div, plus `hideLabel`, `hideIndicator`, `indicator`, `nameKey`, `labelKey`.
- `ChartLegendContent`: Props from div & Recharts Legend, plus `hideIcon`, `nameKey`.

---

## Checkbox (UI)

**Path:** `src/components/ui/checkbox.tsx`

**Description:**
A checkbox component that allows users to select one or more options. Based on Radix UI Checkbox primitive. (ShadCN UI Component)

**Props:**
Accepts all props from `@radix-ui/react-checkbox`'s `Root` component, such as `checked`, `onCheckedChange`, `disabled`, `required`, `name`, `value`. Also `className`.

---

## Collapsible (UI)

**Path:** `src/components/ui/collapsible.tsx`

**Description:**
An interactive component that expands or collapses a section of content. Based on Radix UI Collapsible primitives. (ShadCN UI Component)
Consists of `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`.

**Props:**
- `Collapsible`: Root. Props: `open`, `onOpenChange`, `defaultOpen`, `disabled`.
- `CollapsibleTrigger`, `CollapsibleContent`: Accept `asChild`, `className`, standard HTML attributes.

---

## Command (UI)

**Path:** `src/components/ui/command.tsx`

**Description:**
A command menu component, often used for search and navigation. Based on `cmdk`. (ShadCN UI Component)
Consists of `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator`.

**Props:**
- `Command`: Root. Standard div attributes.
- `CommandDialog`: Wraps `Command` in a `Dialog`. `DialogProps`.
- `CommandInput`: Input field. `CommandPrimitive.Input` props.
- Other parts: Standard HTML attributes, `className`.

---

## ContextMenu (UI)

**Path:** `src/components/ui/context-menu.tsx`

**Description:**
Displays a menu to the user — such as a set of actions or functions — when they right-click. Based on Radix UI ContextMenu primitives. (ShadCN UI Component)

**Props:**
Includes `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioItem`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuGroup`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger`. Most accept `className`, `inset`, `asChild`, and standard HTML/Radix props.

---

## Dialog (UI)

**Path:** `src/components/ui/dialog.tsx`

**Description:**
A window overlaid on either the primary window or another dialog window, rendering the content underneath inert. Based on Radix UI Dialog primitives. (ShadCN UI Component)

**Props:**
Includes `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`.
- `Dialog`: Root. Props: `open`, `onOpenChange`, `defaultOpen`, `modal`.
- `DialogContent`: Props include `onEscapeKeyDown`, `onPointerDownOutside`, `forceMount`.
Most parts accept `className`, `asChild`, and standard HTML/Radix props.

---

## Drawer (UI)

**Path:** `src/components/ui/drawer.tsx`

**Description:**
A panel that slides in from the edge of the screen. Based on `vaul`. (ShadCN UI Component)

**Props:**
Includes `Drawer`, `DrawerTrigger`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription`, `DrawerClose`, `DrawerOverlay`.
- `Drawer`: Root. Props: `shouldScaleBackground`.
- `DrawerContent`: Props include `onOpenAutoFocus`, `onCloseAutoFocus`.
Most parts accept `className`, `asChild`, and standard HTML/Vaul props.

---

## DropdownMenu (UI)

**Path:** `src/components/ui/dropdown-menu.tsx`

**Description:**
Displays a menu to the user — such as a list of actions or functions — triggered by a button. Based on Radix UI DropdownMenu primitives. (ShadCN UI Component)

**Props:**
Includes `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`. Most accept `className`, `inset`, `asChild`, and standard HTML/Radix props. `DropdownMenuContent` has `sideOffset`, `align`.

---

## Form (UI)

**Path:** `src/components/ui/form.tsx`

**Description:**
Provides form building utilities using React Hook Form and Radix UI Label. Includes components like `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`. (ShadCN UI Component)

**Props:**
- `Form`: `FormProvider` from React Hook Form.
- `FormField`: Controller from React Hook Form. Takes `name`, `control`, `render` props.
- Other components are for structuring and styling, accept `className`.

---

## HoverCard (UI)

**Path:** `src/components/ui/hover-card.tsx`

**Description:**
For sighted users to preview content available behind a link. Based on Radix UI HoverCard primitives. (ShadCN UI Component)

**Props:**
- `HoverCard`: Root. Props: `openDelay`, `closeDelay`, `open`, `onOpenChange`, `defaultOpen`.
- `HoverCardTrigger`: Trigger element. Props: `asChild`.
- `HoverCardContent`: Content of the card. Props: `side`, `align`, `sideOffset`, `alignOffset`, `avoidCollisions`, `collisionBoundary`, `collisionPadding`, `arrowPadding`, `sticky`, `hideWhenDetached`, `forceMount`. Accepts `className`.

---

## InputOTP (UI)

**Path:** `src/components/ui/input-otp.tsx`

**Description:**
A set of input fields for one-time passwords. Based on `input-otp`. (ShadCN UI Component)
Consists of `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator`.

**Props:**
- `InputOTP`: Main component. Props from `input-otp` like `value`, `onChange`, `maxLength`, `render`.
- `InputOTPSlot`: Individual slot. Prop: `index`.
All parts accept `className`.

---

## Input (UI)

**Path:** `src/components/ui/input.tsx`

**Description:**
A standard HTML input field with default styling. (ShadCN UI Component)

**Props:**
Accepts standard HTML input attributes (`type`, `placeholder`, `value`, `onChange`, `disabled`, etc.) and `className`.

---

## Label (UI)

**Path:** `src/components/ui/label.tsx`

**Description:**
Renders an accessible label associated with controls. Based on Radix UI Label primitive. (ShadCN UI Component)

**Props:**
Accepts props from Radix UI Label `Root` (like `htmlFor`) and standard HTML attributes, `className`.

---

## Menubar (UI)

**Path:** `src/components/ui/menubar.tsx`

**Description:**
A visually persistent menu bar typically found at the top of an application. Based on Radix UI Menubar primitives. (ShadCN UI Component)

**Props:**
Includes `Menubar`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarItem`, `MenubarSeparator`, `MenubarLabel`, `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSub`, `MenubarSubContent`, `MenubarSubTrigger`. Most accept `className`, `inset`, `asChild`, and standard HTML/Radix props.

---

## NavigationMenu (UI)

**Path:** `src/components/ui/navigation-menu.tsx`

**Description:**
A collection of links for navigating a website. Based on Radix UI NavigationMenu primitives. (ShadCN UI Component)

**Props:**
Includes `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `NavigationMenuViewport`, `NavigationMenuIndicator`.
- `NavigationMenu`: Root. Props: `value`, `onValueChange`, `defaultValue`, `delayDuration`, `skipDelayDuration`, `orientation`, `dir`.
Most parts accept `className`, `asChild`, and standard HTML/Radix props.

---

## Pagination (UI)

**Path:** `src/components/ui/pagination.tsx`

**Description:**
Pagination components for navigating through pages of content. (ShadCN UI Component)
Consists of `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`.

**Props:**
- `PaginationLink`: Props: `isActive`, `size`.
All parts accept `className` and standard HTML attributes. `PaginationLink`, `PaginationPrevious`, `PaginationNext` are anchor tags.

---

## Popover (UI)

**Path:** `src/components/ui/popover.tsx`

**Description:**
Displays rich content in a portal, triggered by a button. Based on Radix UI Popover primitives. (ShadCN UI Component)

**Props:**
- `Popover`: Root. Props: `open`, `onOpenChange`, `defaultOpen`, `modal`.
- `PopoverTrigger`: Trigger element. Props: `asChild`.
- `PopoverContent`: Content of the popover. Props: `side`, `align`, `sideOffset`, `alignOffset`, `avoidCollisions`, `collisionBoundary`, `collisionPadding`, `arrowPadding`, `sticky`, `hideWhenDetached`, `forceMount`. Accepts `className`.

---

## Progress (UI)

**Path:** `src/components/ui/progress.tsx`

**Description:**
Displays an indicator showing the completion progress of a task. Based on Radix UI Progress primitives. (ShadCN UI Component)

**Props:**
Accepts props from Radix UI Progress `Root` (like `value`, `max`) and standard HTML attributes, `className`.

---

## RadioGroup (UI)

**Path:** `src/components/ui/radio-group.tsx`

**Description:**
A set of checkable buttons, known as radio buttons, where no more than one can be checked at a time. Based on Radix UI RadioGroup primitives. (ShadCN UI Component)
Consists of `RadioGroup` and `RadioGroupItem`.

**Props:**
- `RadioGroup`: Root. Props: `value`, `onValueChange`, `defaultValue`, `disabled`, `name`, `required`, `orientation`, `dir`, `loop`.
- `RadioGroupItem`: Individual item. Props: `value`, `id`, `disabled`.
Both accept `className`.

---

## Resizable (UI)

**Path:** `src/components/ui/resizable.tsx`

**Description:**
Components for creating resizable panel layouts. Based on `react-resizable-panels`. (ShadCN UI Component)
Consists of `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle`.

**Props:**
- `ResizablePanelGroup`: Props from `react-resizable-panels` `PanelGroup` (e.g., `direction`, `autoSaveId`, `onLayout`).
- `ResizablePanel`: Props from `react-resizable-panels` `Panel` (e.g., `defaultSize`, `minSize`, `maxSize`, `collapsible`).
- `ResizableHandle`: Prop: `withHandle` (boolean).
All accept `className`.

---

## ScrollArea (UI)

**Path:** `src/components/ui/scroll-area.tsx`

**Description:**
Augments native scroll functionality for custom, cross-browser styling. Based on Radix UI ScrollArea primitives. (ShadCN UI Component)
Consists of `ScrollArea` and `ScrollBar`.

**Props:**
- `ScrollArea`: Root. Props: `type`, `scrollHideDelay`, `dir`.
- `ScrollBar`: Props: `orientation ('vertical' | 'horizontal')`.
Both accept `className`.

---

## Select (UI)

**Path:** `src/components/ui/select.tsx`

**Description:**
Displays a list of options for the user to pick from—triggered by a button. Based on Radix UI Select primitives. (ShadCN UI Component)

**Props:**
Includes `Select`, `SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectLabel`, `SelectSeparator`.
- `Select`: Root. Props: `value`, `onValueChange`, `defaultValue`, `open`, `onOpenChange`, `defaultOpen`, `disabled`, `name`, `required`, `dir`.
- `SelectContent`: Props: `position ('item-aligned' | 'popper')`.
Most parts accept `className`, `asChild`, and standard HTML/Radix props.

---

## Separator (UI)

**Path:** `src/components/ui/separator.tsx`

**Description:**
A visual separator line. Based on Radix UI Separator primitive. (ShadCN UI Component)

**Props:**
Accepts props from Radix UI Separator `Root` (`orientation ('horizontal' | 'vertical')`, `decorative`) and standard HTML attributes, `className`.

---

## Sheet (UI)

**Path:** `src/components/ui/sheet.tsx`

**Description:**
Extends the Dialog component to display content that complements the main content of the screen. Based on Radix UI Dialog primitives. (ShadCN UI Component)

**Props:**
Includes `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`, `SheetClose`.
- `SheetContent`: Prop `side ('top' | 'bottom' | 'left' | 'right')`.
Most parts accept `className`, `asChild`, and standard HTML/Radix Dialog props.

---

## Sidebar (UI)

**Path:** `src/components/ui/sidebar.tsx`

**Description:**
A custom, highly configurable sidebar component. Includes context provider (`SidebarProvider`), main `Sidebar` container, trigger, content sections, menu items, and sub-menus. Supports different variants, collapsible states, and mobile off-canvas behavior. (Custom Component)

**Props:**
- `SidebarProvider`: `defaultOpen`, `open`, `onOpenChange`.
- `Sidebar`: `side ('left' | 'right')`, `variant ('sidebar' | 'floating' | 'inset')`, `collapsible ('offcanvas' | 'icon' | 'none')`.
- `SidebarMenuButton`: `isActive`, `tooltip`, `variant`, `size`.
Many other sub-components for structure and styling. Most accept `className` and `asChild`.

---

## Skeleton (UI)

**Path:** `src/components/ui/skeleton.tsx`

**Description:**
Used to show a placeholder preview of content before it loads. (ShadCN UI Component)

**Props:**
Accepts `className` and standard HTML div attributes.

---

## Slider (UI)

**Path:** `src/components/ui/slider.tsx`

**Description:**
A control for selecting a value from a range. Based on Radix UI Slider primitive. (ShadCN UI Component)

**Props:**
Accepts props from Radix UI Slider `Root` (e.g., `value`, `onValueChange`, `defaultValue`, `min`, `max`, `step`, `disabled`, `orientation`, `inverted`, `dir`) and standard HTML attributes, `className`.

---

## Sonner (UI)

**Path:** `src/components/ui/sonner.tsx`

**Description:**
A toaster component for displaying notifications. Based on `sonner`. (ShadCN UI Component)

**Props:**
Accepts props from `sonner`'s `Toaster` component (e.g., `position`, `hotkey`, `richColors`, `expand`, `duration`, `visibleToasts`, `closeButton`, `toastOptions`, `offset`). Default theme is "dark".

---

## Switch (UI)

**Path:** `src/components/ui/switch.tsx`

**Description:**
A control that allows the user to toggle between checked and not checked. Based on Radix UI Switch primitive. (ShadCN UI Component)

**Props:**
Accepts props from Radix UI Switch `Root` (e.g., `checked`, `onCheckedChange`, `defaultChecked`, `disabled`, `required`, `name`, `value`) and standard HTML button attributes, `className`.

---

## Table (UI)

**Path:** `src/components/ui/table.tsx`

**Description:**
Components for displaying tabular data. (ShadCN UI Component)
Consists of `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`.

**Props:**
All parts accept `className` and standard HTML table element attributes.

---

## Tabs (UI)

**Path:** `src/components/ui/tabs.tsx`

**Description:**
A set of layered sections of content—known as tab panels—that are displayed one at a time. Based on Radix UI Tabs primitives. (ShadCN UI Component)
Consists of `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`.

**Props:**
- `Tabs`: Root. Props: `value`, `onValueChange`, `defaultValue`, `orientation`, `dir`, `activationMode`.
- `TabsTrigger`: Props: `value`, `disabled`.
All parts accept `className`.

---

## Textarea (UI)

**Path:** `src/components/ui/textarea.tsx`

**Description:**
A standard HTML textarea field with default styling. (ShadCN UI Component)

**Props:**
Accepts standard HTML textarea attributes (`value`, `onChange`, `placeholder`, `disabled`, `rows`, etc.) and `className`.

---

## Toast (UI) & Toaster (Hook)

**Path:** `src/components/ui/toast.tsx` (and `src/hooks/use-toast.ts`, `src/components/ui/toaster.tsx`)

**Description:**
`Toast`: Displays a succinct message that is triggered by a user action. Based on Radix UI Toast primitives. (ShadCN UI Component)
`Toaster`: Renders the toasts. The `useToast` hook provides `toast()` function to trigger toasts.

**Props (`Toast`):**
- `ToastProvider`: Props: `label`, `swipeDirection`, `swipeThreshold`, `duration`.
- `Toast`: Root. Props: `variant ('default' | 'destructive')`, `duration`, `onOpenChange`, `open`, `defaultOpen`, `onEscapeKeyDown`, `onPause`, `onResume`, `onSwipeStart`, `onSwipeMove`, `onSwipeCancel`, `onSwipeEnd`, `forceMount`.
- `ToastAction`: Props: `altText`.
- `ToastClose`, `ToastTitle`, `ToastDescription`: Standard HTML attributes.
All accept `className`.

---

## Toggle (UI)

**Path:** `src/components/ui/toggle.tsx`

**Description:**
A two-state button that can be either on or off. (ShadCN UI Component)

**Props:**

| Name     | Type                               | Optional | Default   | Description                     |
| :------- | :--------------------------------- | :------- | :-------- | :------------------------------ |
| `variant`| `'default' \| 'outline'`           | Yes      | `default` | The visual style of the toggle. |
| `size`   | `'default' \| 'sm' \| 'lg'`        | Yes      | `default` | The size of the toggle.         |
| _Other_  | `React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>` | Yes   |           | Radix UI Toggle props (`pressed`, `onPressedChange`, `defaultPressed`, `disabled`). |

---

## ToggleGroup (UI)

**Path:** `src/components/ui/toggle-group.tsx`

**Description:**
A set of two-state buttons that can be toggled on or off. Can be configured to allow single or multiple pressed items. (ShadCN UI Component)
Consists of `ToggleGroup` and `ToggleGroupItem`.

**Props:**
- `ToggleGroup`: Root. Props: `type ('single' | 'multiple')`, `variant`, `size`, `value`, `onValueChange`, `defaultValue`, `rovingFocus`, `disabled`, `orientation`, `dir`, `loop`.
- `ToggleGroupItem`: Props: `value`, `disabled`. `variant` and `size` are inherited from context or can be overridden.
Both accept `className`.

---

## Tooltip (UI)

**Path:** `src/components/ui/tooltip.tsx`

**Description:**
A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it. Based on Radix UI Tooltip primitives. (ShadCN UI Component)

**Props:**
- `TooltipProvider`: Props: `delayDuration`, `skipDelayDuration`, `disableHoverableContent`.
- `Tooltip`: Root. Props: `open`, `onOpenChange`, `defaultOpen`, `delayDuration`, `disableHoverableContent`.
- `TooltipTrigger`: Trigger element. Props: `asChild`.
- `TooltipContent`: Content of the tooltip. Props: `side`, `align`, `sideOffset`, `alignOffset`, `avoidCollisions`, `collisionBoundary`, `collisionPadding`, `arrowPadding`, `sticky`, `hideWhenDetached`, `forceMount`. Accepts `className`.

---
