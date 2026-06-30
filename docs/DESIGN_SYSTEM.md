# Design System

## Direction

Clean, premium marketing-tech dashboard UI with a light background, dark text, restrained borders, and careful use of Fazil Waseem's accent colors.

## Brand Colors

- Blue: `#1a73e8`
- Red: `#ea4335`
- Yellow: `#fbbc04`
- Green: `#34a853`
- Text: `#172033`
- Muted text: `#647084`
- Background: `#f6f8fb`
- Surface: `#ffffff`
- Border: `#dce3ec`

Use accent colors for status bars, badges, focus states, and selected details. Avoid turning the interface into a single-color theme.

## Layout

- Use a centered dashboard shell with a max width near `1180px`.
- Use cards for planning modules and KPI blocks.
- Use grids for dashboard density on desktop.
- Stack content into one column on mobile.
- Keep dashboard controls visible and practical.

## Components

### Header

- Project title
- Portfolio positioning eyebrow
- Reset and export actions

### Status Strip

- Builder
- Focus
- Scope

### Panels

- White surface
- Thin border
- Soft shadow
- 8px radius
- Compact headings

### Badges

- Rounded pills
- Light tinted backgrounds
- Strong short labels

### KPI Blocks

- Metric label
- Large value
- Quiet surface

### Checklists

- Clear checkbox rows
- Practical launch and funnel items

## Typography

- Use system-safe fonts.
- Keep headings crisp and compact.
- Do not use oversized hero typography inside dashboard panels.
- Letter spacing should remain `0`.

## Responsive Behavior

- Desktop: multi-column dashboard grids.
- Tablet: reduce to fewer columns.
- Mobile: single-column layout, full-width buttons, readable form controls.

## Interaction Style

- Objective selector updates KPI assumptions, keywords, audience tags, and budget split.
- Monthly budget input updates allocation blocks.
- Export button downloads a JSON campaign plan.
- Reset button clears the planner to the default lead generation state.
