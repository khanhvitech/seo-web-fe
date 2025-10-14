# MKT SEO Web - Design Guidelines

## Design Approach: Utility-First System

**Selected System**: Shadcn/ui with Linear & Vercel influences
**Rationale**: This is a data-intensive productivity tool requiring efficient workflows, clear information hierarchy, and professional aesthetics. The existing tech stack (Shadcn/ui) aligns perfectly with a clean, functional design system.

**Core Principles**:
- Information density over visual flourish
- Clear visual hierarchy for complex data
- Workflow efficiency through intuitive navigation
- Professional, trustworthy aesthetic for enterprise use

---

## Color Palette

### Dark Mode (Primary)
- **Background Base**: 222 47% 11% (deep slate)
- **Surface**: 217 33% 17% (elevated slate)
- **Border**: 217 20% 25%
- **Primary Brand**: 217 91% 60% (vibrant blue - representing reliability and tech)
- **Success**: 142 76% 36% (publishing success indicators)
- **Warning**: 38 92% 50% (scheduling alerts)
- **Destructive**: 0 84% 60% (failed posts, errors)
- **Text Primary**: 210 40% 98%
- **Text Secondary**: 215 20% 65%

### Light Mode (Secondary)
- **Background Base**: 0 0% 100%
- **Surface**: 0 0% 98%
- **Border**: 214 32% 91%
- **Primary Brand**: 217 91% 60% (consistent across modes)
- **Text Primary**: 222 47% 11%
- **Text Secondary**: 215 16% 47%

### Accent Colors (Minimal Use)
- **Highlight**: 271 91% 65% (SEO features, premium indicators)
- Use sparingly for feature differentiation only

---

## Typography

**Font Family**: 
- Primary: Inter (via Google Fonts) - clean, professional, excellent Vietnamese character support
- Monospace: JetBrains Mono - for code snippets, IDs, technical data

**Scale & Weights**:
- **Hero/Page Titles**: text-3xl (30px) font-bold tracking-tight
- **Section Headers**: text-xl (20px) font-semibold
- **Card Titles**: text-base (16px) font-medium
- **Body Text**: text-sm (14px) font-normal leading-relaxed
- **Metadata/Captions**: text-xs (12px) font-normal text-muted-foreground
- **Table Headers**: text-xs (12px) font-medium uppercase tracking-wide

**Key Contrast**: Use font-semibold for Vietnamese text to maintain readability with diacritics

---

## Layout System

**Spacing Primitives**: 
- Core units: **2, 3, 4, 6, 8, 12** (Tailwind scale)
- Common patterns: p-6 (cards), gap-4 (grids), space-y-6 (sections)
- Dense data tables: p-3, gap-2

**Grid Structure**:
- Dashboard: 12-column responsive grid
- Sidebar: Fixed 256px width (w-64)
- Content area: max-w-7xl with px-6 py-8
- Cards: Consistent rounded-lg (8px radius)

**Container Widths**:
- Full dashboard: w-full
- Content sections: max-w-7xl
- Modals/Dialogs: max-w-2xl
- Forms: max-w-xl

---

## Component Library

### Navigation
- **Sidebar**: Fixed left, 64px header height, menu items with icons + labels + badges
- **Header**: 64px height, breadcrumbs, user menu, notification bell
- **Active States**: Subtle bg-accent with border-l-2 border-primary indicator

### Data Display
- **Tables**: Striped rows (odd:bg-muted/50), sticky headers, action columns
- **Cards**: border border-border bg-card with shadow-sm, hover:shadow-md transition
- **Stats Cards**: Large numbers (text-3xl font-bold), change indicators with arrows
- **Badges**: Rounded-full for status (published, pending, failed), ghost variant for counts

### Forms & Inputs
- **Input Fields**: border-input bg-background, focus:ring-2 ring-ring
- **Buttons**: Primary (solid primary), Secondary (outline), Ghost (minimal)
- **Select Menus**: Shadcn Select with search for long lists
- **Date Pickers**: Calendar-based for scheduling interface
- **Rich Text**: Minimal toolbar, focus on content (for article editor)

### Feedback
- **Toast Notifications**: Bottom-right, auto-dismiss, status-colored icons
- **Loading States**: Skeleton loaders for tables, spinner for actions
- **Empty States**: Centered icon + message + CTA button
- **Error Messages**: Inline below fields, destructive color with warning icon

### Overlays
- **Modals**: Centered, max-w-2xl, dimmed backdrop (bg-black/50)
- **Sheets**: Slide from right for details/forms, w-96 to w-full responsive
- **Popovers**: Minimal border, shadow-lg for dropdowns and tooltips

---

## Key Page Patterns

### Dashboard
- **4-column stat cards** at top (grid-cols-1 md:grid-cols-2 lg:grid-cols-4)
- **2-column layout** below: Recent activity (left 2/3) + Quick actions sidebar (right 1/3)
- **Charts**: Line charts for publishing trends (minimal, accent colors)

### Content Management
- **Table view** with inline actions, filters in header
- **Bulk actions** toolbar appears on selection
- **Preview panel** slides from right on row click

### Scheduling Calendar
- **Month/Week toggle** view
- **Drag-drop** time slots (visual: border-2 border-dashed on drag)
- **Color-coded** by website destination

### Publishing Queue
- **Kanban-style columns**: Pending → Processing → Success/Failed
- **Real-time updates** with pulse animation on status change
- **Expandable cards** for logs/details

---

## Animations (Minimal)

- **Transitions**: transition-colors duration-200 for interactive elements
- **Micro-interactions**: scale-105 on card hover, slide-in for toasts
- **Loading**: Indeterminate progress bars for queue processing
- **NO**: Complex scroll animations, excessive motion

---

## Vietnamese Interface Considerations

- Generous line-height (leading-relaxed) for text with diacritics
- Font-medium minimum for headers to ensure readability
- Avoid all-caps for Vietnamese text (use uppercase tracking-wide for English labels only)
- Right-align numbers in tables, left-align Vietnamese text

---

## Dark Mode Implementation

- Consistent across ALL components including modals, inputs, dropdowns
- Form inputs: bg-background border-input (not default white)
- Text fields maintain dark theme: text-foreground not forced white
- Preserve contrast ratios: 4.5:1 minimum for body text

---

## Images & Visual Assets

**Icon System**: Lucide React (already in tech stack)
- Consistent 20px size for navigation
- 16px for inline/table icons
- 24px for page headers

**Illustrations**: 
- Empty states: Simple line illustrations in muted colors
- Error states: Minimal iconography, not decorative

**No Hero Images**: This is a dashboard application - focus on data, not marketing visuals