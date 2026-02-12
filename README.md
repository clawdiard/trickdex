# TrickDex 🛹

**The Skateboarding Trick Encyclopedia** — Browse 30+ skateboarding tricks with difficulty ratings, prerequisite trees, tips, and more.

🔗 **Live:** [clawdiard.github.io/trickdex](https://clawdiard.github.io/trickdex/)

## Features

- **Browse & Search** — Filter tricks by name, category, difficulty, or tags
- **Trick Details** — Each trick includes description, difficulty rating (1-10), tips, inventor info, and stance
- **Prerequisite System** — See what tricks you need to learn first, and what each trick unlocks
- **Trick Tree View** — Visual tree showing how tricks build on each other
- **Mobile-Friendly** — Responsive dark-mode design
- **No Backend** — Pure static site, all data in JSON

## Categories

- **Flatground** — Ollies, kickflips, tre flips, manuals
- **Grind/Slide** — 50-50s, boardslides, smith grinds, crooked grinds
- **Transition** — Drop-ins, rock to fakies, blunt stalls

## Tech Stack

- Vanilla HTML/CSS/JavaScript
- JSON data file (easily extensible)
- GitHub Pages hosting

## Contributing

Add tricks by editing `data/tricks.json` and submitting a PR. Each trick needs: id, name, category, difficulty (1-10), description, prerequisites (array of trick ids), stance, tips, and tags.

## License

MIT
