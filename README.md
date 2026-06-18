# ⚔️ The Crimson Blade — Interactive Light Novel Platform

A modern, cinematic, and highly immersive multi-page frontend platform built for an independent manga/light novel series. This application combines raw modern typography, seamless layout transitions, and interactive visual elements to make readers feel like they are experiencing a film rather than reading a static document.

---

## 💎 Core Key Features

*   **Cinematic Audio Persistence Engine:** Background ambient music automatically starts on user interaction and seamlessly carries over across separate HTML page loads using `SessionStorage` tracking variables without cutting off or restarting.
*   **Sharp Velocity Wind Particles:** An HTML5 Canvas engine simulates razor-sharp wind streaks blowing from the upper-left quadrant directly toward the right side of the viewport, carrying minimal floating red grass structures.
*   **Horizontal Paragraph Slider:** Replaces bulky text containers in chapters with an app-like horizontal page slider that snaps cleanly using CSS scroll-snapping, coupled with dynamic navigation tracking (`Page: ${num}`).
*   **Interactive Character Profile Drawers:** A clean vertical grid array of character entries that dynamically injects data models into a frosted glass detail profile drawer sliding smoothly from the right side of the display view.
*   **Animated Morphing Theme Switch:** A high-impact toggle button that triggers CSS custom variable shifts, creating an intense neon-crimson glow effect for dark mode while spinning/morphing the icon smoothly from a sun to a moon.
*   **Landscape View Safety Lock API:** Forces the mobile viewport into landscape (widescreen) mode using the Screen Orientation API, featuring an automated screen protector overlay prompting portrait users to rotate their devices horizontally.
*   **Fully Fluid Responsiveness:** Calibrated scaling metrics from compact smartphones (**350px**) up to ultra-widescreen desktop configurations (**1500px**).

---

## 🛠️ Built With (Tech Stack)

*   **HTML5:** Semantic architecture grid framework.
*   **CSS3 Custom Properties:** Fluid layout configurations, responsive media query tracks, cross-fading micro-interactions, and glassmorphism styling layers.
*   **Vanilla JavaScript (ES6+):** System interface animation ticks, SessionStorage tracking handlers, and Canvas rendering physics.
*   **Google Fonts API:** Styled entirely with a single, high-performance, geometric layout typeface family (`Montserrat`).

---

## 📂 Project Directory Structure

```text
├── assets/
│   ├── audio/
│   |   └── samurai-ambient.mp3      # Niche ambient background audio track
│   └── images/
│       ├── characters/
│       │    ├── kenji.png           # Main Lead Character Kenji 
│       │    ├── lord-kurada.png     # Villain Lord Kurada 
│       │    ├── tomoe.png           # Female Lead Tomoe
│       │    └── traitor.png         # Kazuma ex brother-in-arms  
│       ├── icons/
│       │    ├── favicon-16x16.png   # Favicon 16px
│       │    ├── favicon-32x32.png   # Favicon 32px
│       │    ├── favicon.ico         # Favicon 
│       │    └── logo.png            # Site Logo
│       ├──  chapter-bg-unblurred.png      # chapters.html background
│       ├──  chapter1-bg-portrait.jpeg     # chapter1.html background (Portrait)
│       ├──  chapter1-bg.png               # chapter1.html background (Landscape)
│       ├──  chapter-bg-portrait.png       # chapters.html background (Portrait)
│       ├──  characters-bg-portrait.png    # characters.html background (Portrait)
│       ├──  characters-bg-unblurred.png   # charaters.html background (Landscape)
│       ├──  cover-bg-portrait.png         # index.html background (Portrait)
│       ├──  cover-bg.png                  # index.html background (Landscape)
│       ├──  story-bg-portrait.png         # story.html background (Portrait)
│       ├──  story-bg.png                  # story.html background (Landscape)
│       └──  story.txt                     # Main Story, Characters bio and Story text
├── css/
│   ├── style.css           # Unified core style properties 
│   └── responsive.css      # Responsive Queries
├── js/
│   └── app.js              # Consolidated particle engine, audio trackers, and sliders
├── chapters/
│   └── chapter1.html       # Chapter one horizontal reader panel card layout
├── index.html              # Homepage / Synopsis directory landing node
├── chapters.html           # Chapter catalog interface
├── characters.html         # Dramatis Personae character overview grid
├── coming-soon.html        # Expansion countdown screen with author profile link
├── story.html              # Short story about the novel
└── README.md               # Project documentation file
```

---


## 🔗 Author Social Connections
*   **Discord User Profile:** [Contact Author](https://discord.com) — Click to send a direct message or add me on Discord.
