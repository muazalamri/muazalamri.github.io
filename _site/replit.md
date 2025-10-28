# MUAZ AL AMRI - Embedded Systems Portfolio

## Overview
A Jekyll + Markdown portfolio engineered as a living, breathing embedded circuit. This portfolio showcases embedded systems engineering projects with a futuristic neon green (#00FF99) and deep black (#000000) aesthetic.

## Current State
✅ Fully functional Jekyll static site
✅ PCB connector loader animation with GSAP
✅ Fullscreen hero section with laser-etched typography
✅ 3D microchip-style project cards with hover effects
✅ LED-style flickering tool showcase
✅ Pulsating contact section
✅ Blinking "SYSTEM ONLINE" footer LED
✅ Responsive design

## Recent Changes
**October 15, 2025 - Latest Update**
- Integrated real PCB images as backgrounds (11 high-quality transparent PNG images)
- Redesigned professional loader with:
  - MAA logo in glowing circle with SVG animation
  - Progress bar with percentage display
  - Dynamic status messages (Initializing PCB circuits, Loading embedded systems, etc.)
  - Rotating PCB background
- Enhanced responsive design with three breakpoints (1200px, 768px, 480px)
- Mobile-optimized layouts with proper button sizing and spacing
- Added PCB backgrounds to hero, projects, and contact sections
- Improved visual hierarchy for mobile devices

**Initial Build**
- Initialized Jekyll 4.4.1 with Ruby 3.2
- Created custom layouts (default, home, post, page)
- Implemented hero section with laser-etched typography
- Added floating CTA buttons with glowing effects
- Created projects grid with microchip-style cards and data flow animations
- Built tools section with LED flickering effects
- Designed contact section with heartbeat button animations
- Added engineered UI: oscilloscope cursor with canvas trail, PCB trace dividers, blinking system LED
- Integrated GSAP 3.12.5 for animations
- Added 6 sample projects showcasing embedded systems work

## Project Architecture

### Directory Structure
```
├── _config.yml           # Jekyll configuration
├── _layouts/             # Page layouts
│   ├── default.html      # Base template with fonts & GSAP
│   ├── home.html         # Homepage layout
│   ├── post.html         # Blog post layout
│   └── page.html         # Static page layout
├── _includes/            # Reusable components
│   ├── loader.html       # PCB connector animation
│   ├── navbar.html       # Navigation with CTAs
│   ├── hero.html         # Hero section
│   ├── projects.html     # Projects grid
│   ├── tools.html        # Technology stack
│   ├── contact.html      # Contact section
│   └── footer.html       # System status footer
├── _projects/            # Project markdown files
├── assets/
│   ├── css/
│   │   └── main.css      # All styling & animations
│   └── js/
│       └── main.js       # GSAP animations & interactions
└── index.markdown        # Homepage entry point
```

### Technology Stack
- **Static Site**: Jekyll 4.4.1
- **Animation**: GSAP (GreenSock)
- **Typography**: Orbitron (900), Inter (400), JetBrains Mono
- **Colors**: Neon Green (#00FF99), Deep Black (#000000), Gray (#0a0a0a)

### Key Features
1. **PCB Loader Animation**: SVG connectors emerge from holes to form "M.A.A." with spark effects
2. **Hero Section**: Laser-etched typography with pulsing circuit traces background
3. **Project Cards**: 3D microchip-style cards with green glow and animated data flow on hover
4. **Tools Display**: LED-style icons that flicker and rotate on interaction
5. **Custom Cursor**: Oscilloscope crosshair design
6. **Footer LED**: Blinking green indicator showing "SYSTEM ONLINE"

### Design Patterns
- **Visual First**: Images and animations drive engagement
- **Engineered Aesthetic**: PCB patterns, circuit traces, electronic precision
- **Motion Design**: GSAP timelines, CSS keyframes, intersection observers
- **Responsive**: Mobile-first with flexible grid layouts

## User Preferences
- Portfolio owner: Muaz Al Amri
- Theme: Embedded circuit with engineering precision
- Visual storytelling over text-heavy content
- High contrast neon green on deep black
- Futuristic, minimal, unforgettable design

## Development Commands
- Start server: `bundle exec jekyll serve --host 0.0.0.0 --port 5000 --livereload`
- Build site: `bundle exec jekyll build`
- Clean: `bundle exec jekyll clean`

## Notes
- Server runs on port 5000 with live reload enabled
- All animations use hardware-accelerated CSS and GSAP
- Projects stored in `_projects/` collection
- Custom properties defined in `_config.yml` for easy theming
