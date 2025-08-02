# Project Structure & Organization

## Overview
Project OurCreativity telah direorganisasi untuk meningkatkan maintainability, scalability, dan developer experience dengan struktur folder yang lebih teratur dan mudah dipahami.

## New Folder Structure

```
src/
├── components/                    # All React components
│   ├── features/                 # Feature-based components
│   │   ├── admin/               # Admin dashboard components
│   │   │   ├── AdminActivityLog.tsx
│   │   │   ├── AdminDashboardHeader.tsx
│   │   │   ├── AdminDashboardStats.tsx
│   │   │   ├── AnnouncementEditor.tsx
│   │   │   ├── AnnouncementManager.tsx
│   │   │   ├── ContentEditor.tsx
│   │   │   ├── KaryaModeration.tsx
│   │   │   ├── RequireAuth.tsx
│   │   │   └── TeamEditor.tsx
│   │   ├── announcement/        # Announcement components
│   │   │   ├── AnnouncementCard.tsx
│   │   │   ├── AnnouncementDetail.tsx
│   │   │   ├── AnnouncementDetailModal.tsx
│   │   │   ├── AnnouncementErrorState.tsx
│   │   │   ├── AnnouncementFilters.tsx
│   │   │   ├── AnnouncementGrid.tsx
│   │   │   ├── AnnouncementLoading.tsx
│   │   │   ├── AnnouncementLoadingState.tsx
│   │   │   ├── CleanAnnouncementCard.tsx
│   │   │   ├── EmptyAnnouncementState.tsx
│   │   │   ├── FeaturedAnnouncement.tsx
│   │   │   ├── FeaturedAnnouncementCard.tsx
│   │   │   ├── FilterButton.tsx
│   │   │   ├── GlowarCard.tsx
│   │   │   ├── GlowarFeaturedCard.tsx
│   │   │   ├── GlowarFilterBar.tsx
│   │   │   ├── GlowarGrid.tsx
│   │   │   └── VersionBadge.tsx
│   │   ├── cerita/              # Story/About page components
│   │   │   ├── GrowthSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── OriginStorySection.tsx
│   │   │   └── VisionSection.tsx
│   │   ├── informasi/           # Information page components
│   │   │   ├── CTASection.tsx
│   │   │   ├── GlowarAccordion.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProgramsSection.tsx
│   │   │   ├── ValueCard.tsx
│   │   │   └── ValuesSection.tsx
│   │   ├── karya/               # Works/Portfolio components
│   │   │   ├── AdvancedFilters.tsx
│   │   │   ├── CategoryExplorer.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── FeaturedWork.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   ├── KaryaGallery.tsx
│   │   │   ├── MasonryGrid.tsx
│   │   │   ├── ParticleBackground.tsx
│   │   │   ├── ScrollProgressIndicator.tsx
│   │   │   ├── SpotlightCarousel.tsx
│   │   │   ├── SpotlightSection.tsx
│   │   │   ├── UploadButton.tsx
│   │   │   ├── UploadModal.tsx
│   │   │   ├── UploadWizard/
│   │   │   │   └── index.tsx
│   │   │   └── detail/          # Karya detail components
│   │   │       ├── KaryaActionButtons.tsx
│   │   │       ├── KaryaDialogHeader.tsx
│   │   │       ├── KaryaDialogNavigation.tsx
│   │   │       ├── KaryaInfoPanel.tsx
│   │   │       └── KaryaMediaViewer.tsx
│   │   └── terms/               # Terms & conditions components
│   │       ├── TermsList.tsx
│   │       ├── TermsNavigation.tsx
│   │       └── TermsSection.tsx
│   ├── layouts/                 # Layout components
│   │   ├── PageLayout.tsx
│   │   └── page-layout/
│   │       ├── DesktopNav.tsx
│   │       ├── Footer.tsx
│   │       ├── Header.tsx
│   │       ├── MobileMenu.tsx
│   │       ├── PageHeader.tsx
│   │       └── types.ts
│   ├── ui/                      # Base UI components (shadcn/ui)
│   │   ├── BentoCard.tsx
│   │   ├── BentoGrid.tsx
│   │   ├── CategoryButton.tsx
│   │   ├── CategoryShowcase.tsx
│   │   ├── FeaturedMemberCard.tsx
│   │   ├── GlassBentoCard.tsx
│   │   ├── IconDisplay.tsx
│   │   ├── IconTitleRow.tsx
│   │   ├── MemberCard.tsx
│   │   ├── StandardCard.tsx
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── aspect-ratio.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── button.tsx
│   │   ├── calendar.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── chart.tsx
│   │   ├── checkbox.tsx
│   │   ├── collapsible.tsx
│   │   ├── command.tsx
│   │   ├── context-menu.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── hover-card.tsx
│   │   ├── input-otp.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── menubar.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── pagination.tsx
│   │   ├── popover.tsx
│   │   ├── progress.tsx
│   │   ├── radio-group.tsx
│   │   ├── resizable.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── sidebar.tsx
│   │   ├── skeleton.tsx
│   │   ├── slider.tsx
│   │   ├── sonner.tsx
│   │   ├── switch.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── toggle-group.tsx
│   │   ├── toggle.tsx
│   │   ├── tooltip.tsx
│   │   └── use-toast.ts
│   ├── About.tsx               # Standalone components
│   ├── Contact.tsx
│   ├── FlowingBackground.tsx
│   ├── GlobalAnimations.tsx
│   ├── Hero.tsx
│   ├── JoinCommunityDialog.tsx
│   ├── KaryaCard.tsx
│   ├── KaryaDetailDialog.tsx
│   ├── KaryaDetailDialogV2.tsx
│   ├── KaryaUploadForm.tsx
│   ├── PageTransition.tsx
│   ├── TeamMember.tsx
│   ├── TeamMemberBio.tsx
│   └── TeamMemberCard.tsx
├── pages/                       # Route-level page components
│   ├── AdminLogin.tsx
│   ├── CeritaKami.tsx
│   ├── Index.tsx
│   ├── Informasi.tsx
│   ├── KaryaKami.tsx
│   ├── OurAdmin.tsx
│   ├── Pengumuman.tsx
│   ├── Terms.tsx
│   └── TimKami.tsx
├── hooks/                       # Custom React hooks
│   ├── use-media-query.tsx
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   ├── useAnnouncements.ts
│   ├── useElementInView.tsx
│   └── useLocalAnnouncements.ts
├── services/                    # API and business logic
│   ├── adminAnnouncementService.ts
│   ├── announcementService.ts
│   ├── localAnnouncementService.ts
│   └── teamService.ts
├── contexts/                    # React context providers
│   ├── AdminAuthContext.tsx
│   └── ThemeContext.tsx
├── lib/                         # Utility functions
│   ├── karyaUtils.ts
│   └── utils.ts
├── types/                       # TypeScript type definitions
│   └── motion.d.ts
├── models/                      # Data models
│   └── Announcement.ts
├── data/                        # Static data files
│   └── team.json
├── integrations/                # External service integrations
│   └── supabase/
│       ├── client.ts
│       └── types.ts
├── App.tsx                      # Main application component
├── App.css                      # Application styles
├── main.tsx                     # Application entry point
├── index.css                    # Global styles and design system
└── vite-env.d.ts               # Vite type definitions
```

## Benefits of New Structure

### 1. **Feature-Based Organization**
- Components diorganisir berdasarkan fitur/halaman
- Mudah menemukan komponen yang terkait
- Mengurangi coupling antar fitur

### 2. **Better Scalability**
- Struktur yang jelas untuk penambahan fitur baru
- Separation of concerns yang baik
- Mudah di-maintain oleh multiple developers

### 3. **Improved Developer Experience**
- Import paths yang lebih intuitif
- Reduced cognitive load saat mencari file
- Consistent naming conventions

### 4. **Enhanced Code Reusability**
- UI components terpisah dari business logic
- Shared components mudah diakses
- Clear separation antara generic dan specific components

## Import Path Changes

Setelah reorganisasi, import paths harus diupdate:

```tsx
// Before
import { AdminDashboardHeader } from '@/components/admin/AdminDashboardHeader';
import { GlowarGrid } from '@/components/announcement/GlowarGrid';
import { HeroSection } from '@/components/cerita/HeroSection';

// After
import { AdminDashboardHeader } from '@/components/features/admin/AdminDashboardHeader';
import { GlowarGrid } from '@/components/features/announcement/GlowarGrid';
import { HeroSection } from '@/components/features/cerita/HeroSection';
```

## Component Categories

### **Core UI Components** (`/ui/`)
- shadcn/ui base components
- Generic reusable components
- Design system implementations

### **Feature Components** (`/features/`)
- Business logic specific components
- Page-specific components
- Feature-specific functionality

### **Layout Components** (`/layouts/`)
- Page layout structures
- Navigation components
- Global layout elements

### **Standalone Components** (`/components/`)
- Shared across multiple features
- Generic utility components
- Global app components

## File Naming Conventions

- **PascalCase** untuk React components (`ComponentName.tsx`)
- **camelCase** untuk utility files (`utilityName.ts`)
- **kebab-case** untuk folder names (`folder-name/`)
- **index.ts/tsx** untuk folder entry points

## Migration Status

✅ **Completed:**
- Feature-based component organization
- Import path updates
- Build error fixes
- Documentation updates

📋 **Next Steps:**
- Performance optimization review
- Component dependency analysis
- Further modularization if needed

## Best Practices

1. **Keep features isolated** - Avoid cross-feature dependencies
2. **Use index files** for clean imports
3. **Follow naming conventions** consistently
4. **Group related components** in subdirectories
5. **Maintain clear separation** between UI and business logic

This new structure provides a solid foundation for continued development and makes the codebase more maintainable and scalable.