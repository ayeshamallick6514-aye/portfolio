# 03 — Creative Direction (v2 — "Manga page")

Version 1 (soft animation-paper, blue pencil, Shinkai lighting) was rejected on 24 Nov 2026 as looking generic. This version replaces it. It was chosen by Divyanshu from live look-dev colourways, not from swatches.

## The idea in one line

> **The portfolio is a manga volume. Every project is a chapter. He is the one who draws it and ships it.**

The site looks like a printed manga page that has come alive: bone paper, heavy black ink, one blood-red brush stroke, and motion that hits like an anime cut.

Hero line stays: **"I build every layer of a product, and I ship it."**

## Anime influences (style only — nothing is copied)

| Series | What we take | Where it shows |
|---|---|---|
| **Berserk** | Dense black ink, heavy hatching, extreme contrast | Line art, textures, overall weight |
| **Vinland Saga** | Restraint: wide quiet frames and empty space | Layout pacing, the about chapter |
| **Attack on Titan** | Scale and tension, tall compositions | Hero framing, chapter openers |
| **Jujutsu Kaisen** | Ink-brush impact frames, a flash of energy on a hit | Opening a project, primary buttons |
| **Chainsaw Man** | Film-like framing, raw unpolished edges, hard cuts | Case-study layouts, transitions |

No characters, symbols, logos, title fonts, music or footage from any of them. **No clips from the shows are used as background video** — the footage is owned by the studios. Moving backgrounds are original, made in this style.

## As built (24 Nov 2026)

- **Four colourways**, switchable from the top bar and remembered: Blood (default), Aged, **Indigo** (ink blue `#1F3FAE`) and **Moss** (deep green `#33603B`). All four pass 4.5:1 contrast for every text pair. Aged was darkened slightly from the values below to pass (`#932517` accent, `#584C37` secondary text).
- **Hero:** the name fills the screen; a red brush stroke crosses behind it; an original caped figure stands on the last letter with coat, scarf and birds animated at 12 drawings a second; halftone ink clouds drift behind and swell under the cursor.
- **Loader:** the name itself, in outline, filling with ink while a counter rolls. No cover screen.
- **Chapter 07 is a full page in the accent colour**, the one loud spread in the volume.
- **Receipts** are drawn as torn paper receipts with a stamp that lands on twos.
- **Dropped:** the 3D ring of project pages, sound, and background video. Background motion is the code-drawn ink shader. Generated anime footage was not attempted because the available image and video generators are paid per use; it remains an option if wanted.

## Second pass (24 Nov 2026): anime art and stronger motion

Feedback on the first build was that it looked too basic and had no anime in it. This pass added both.

**Artwork.** Ten original black-and-white manga illustrations, generated on AI Horde (aihorde.net), a free community-run service that needs no account and adds no watermark, using an anime-trained model (Nova Anime XL). Prompts describe generic scenes only. The request to use the actual characters from the five series was declined: those belong to their publishers and studios. The art instead takes each series' signature scene with an original character:

| Scene | In the spirit of | Where it is used |
|---|---|---|
| Coated figure on a rooftop, ink swirling, city below | Jujutsu Kaisen | Hero |
| Extreme close-up of the eyes | Jujutsu Kaisen, Berserk | The cut-in band after the stack |
| Figure wrapped in ink energy | Chainsaw Man, Jujutsu Kaisen | Services (black on the red page) |
| Figure on a cliff over a city, birds | Attack on Titan | Story, panel 1 |
| Sprint down a street, coat flying | Chainsaw Man | Story, panel 3 |
| Hooded figure at monitors at night | — | Story, panel 4 |
| Lone caped figure in a wind-blown field | Vinland Saga | Story, panel 5 |
| Figure over a night city under a crescent moon | — | Contact |
| Caped figure between colossal walls | Attack on Titan | 404 page |

One more (rubble and planted swords, after Berserk) is in `assets/art` but unused.

**The hero art moves.** It is drawn by a small shader that ripples the coat and the ink in the wind, with time quantised to 12 steps a second so it reads as hand-drawn animation. It also leans against the pointer and pushes in as the page scrolls.

**Motion added.**

- Hero stays pinned on desktop while the next chapter slides over it.
- The stack chapter is literal: each layer is a sheet that sticks under the top bar while the next slides over it, leaving its title strip showing, until all seven are stacked.
- A cut-in band: a letterboxed close-up of the eyes snaps open from a centre line while the motto slides across, tied to the scroll.
- Project panels tilt in 3D toward the pointer and their screenshots drift with the scroll.
- Receipts drop into place with a spin; the contact address punches in letter by letter.
- Marquee tapes slide against each other with the scroll.
- A pointer follower: a dot that opens into a ring over links and a labelled disc over project panels.
- A chapter indicator on the left edge names the chapter on screen.

**Removed:** the small code-drawn figure on the last letter (the hero art replaces it).

## Third pass (24 Nov 2026): 3D objects and 3D reveals

All of it is CSS 3D transforms driven by GSAP; there is still no 3D library.

- **The volume.** A manga volume built from six faces sits beside "End of volume 01" in the footer: hero art and name on the cover, the accent colour on the spine. It turns as the footer scrolls in and leans toward the pointer.
- **The shelf.** "Also on the shelf" is now a real shelf: ten small volumes (the six projects and the four archive items), spine out, on the top rule of the list. Hovering a spine, or the matching archive row, pulls that book out and turns its cover to face the reader. It is hidden from assistive technology because every link in it already exists as a panel or a row.
- **Project covers** lean back in 3D and stand up as they scroll into view.
- **Receipts** hinge down from their top edge like paper feeding out of a printer.
- **Photo prints** flip over from the side, like dealt cards.
- **The contact address** flips up letter by letter, like a split-flap board.

Tried and removed: an isometric exploded diagram of the seven stack layers beside the Stack heading. It read as a diagram, not as part of the page.

## Colour — chosen: "Blood", with "Aged" as the alternate

| Token | Blood (default) | Aged (alternate) | Role |
|---|---|---|---|
| `paper` | `#ECE7DC` | `#E3D5B8` | Page |
| `paper-2` | `#DCD6C8` | `#D3C3A2` | Alternate section |
| `ink` | `#0A0A0A` | `#17110B` | Text, line art, black panels |
| `accent` | `#B4101C` | `#9C2A1A` | The one colour: brush stroke, emphasis, CTA marks |
| `mute` | `#6A665E` | `#6F5F47` | Secondary text |

- Roughly 95% of any screen is paper and ink. Red marks one thing per screen.
- Black panels (ink background, paper text) are used for project cards and the contact chapter, for contrast.
- Matte only: no glow, no gradients, no neon.
- A theme control in the nav (idea taken from quicklive.tech) switches Blood and Aged; the other tested accents (orange, yellow, indigo) can be added to it later.
- Red text on paper is checked for WCAG AA; where it fails at small sizes, ink is used and red becomes an underline or mark.

## Typography (confirmed in look-dev)

| Use | Typeface | Notes |
|---|---|---|
| Display | **Anton** | Giant condensed caps for the name, chapter titles, project names. One word may be outlined (stroke only) against a filled word. |
| Wide labels and buttons | **Archivo** (variable width) | Buttons, small caps labels |
| Editorial voice | **Instrument Serif** italic | The one human sentence per screen |
| Data | **JetBrains Mono** | Chapter numbers, stack lists, meta lines |
| Japanese accents | **Shippori Mincho** 800 | Vertical chapter marks only |

All are SIL OFL and will be self-hosted. Fonts can still change during the build.

**Approved Japanese** (nothing else appears): 第一章…第八章 (chapter 1–8), 作品 (works), 連絡 (contact), 完 (end). Always paired with English.

## Texture and graphic language

- **Paper grain** over everything (SVG noise, overlay blend).
- **Halftone screentone** in corners and inside panels, fading out.
- **Rough brush slash** in the accent colour crossing the hero behind the name.
- **Manga panels**: black-bordered frames with angled cuts for projects.
- **Ghost chapter numbers**: huge outlined numerals behind headings.
- **Crossed marquee tapes**: black ink tapes with scrolling text between chapters.
- **Angled button corners**; no rounded cards, no glass, no purple.

## Motion

| Moment | What happens |
|---|---|
| Loader | Name in outline fills with ink rising like a wash; a rolling page counter; clears in about two seconds |
| Hero entrance | Brush slash paints across, name slams in letter by letter, screentone fades up |
| Hero background | Original anime-style loop (ink smoke, embers, wind) behind the type, low contrast so text stays readable |
| Cursor | Ink trail on desktop; halftone dots swell under the pointer |
| Scroll | Panels slide and cut in; a thin progress line on the left edge; an ink ribbon follows the scroll |
| Opening a project | Two- or three-frame ink impact flash, then the panel expands to the case study |
| Chapter breaks | Marquee tapes cross the screen |
| Work | Project cards can be browsed as a 3D ring of manga pages |

Rules: the camera (scroll, parallax) is smooth; drawn elements are stepped at 12 fps; impact frames are short and never flash more than three times a second. Reduced motion gets a complete still version, and motion can be switched off from the nav.

## Original background footage

Tested in order until one meets the bar: (1) WebGL ink and smoke shader made in code, (2) generated anime-style loop made with the image and video tools, (3) licensed footage Divyanshu supplies. No personal details go into any generation prompt.

## Anti-cringe rules

- No chibi mascots, sakura petals, skill bars as power levels, or rows of decorative Japanese.
- No recognisable character or symbol from any series.
- Test for every screen: with the word "anime" removed from the brief, would a senior designer still call it a well-made editorial site?

## Voice

Plain and confident. Short lines may keep his README tone ("shipping > scrolling"); long copy stays professional.
