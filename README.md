# Before You Click Send

**An interactive onboarding module for using AI at work without causing a disaster.**
Ten decisions, two weeks, one nervous new hire.

**Two editions, same engine:**

| Edition | For | Live |
|---------|-----|------|
| 🏢 **Workplace** | new hires & staff at any org rolling out AI | https://before-you-click-send.vercel.app |
| 🎓 **AP Classroom** (*Before You Hit Post*) | high-school / AP teachers | https://before-you-click-send.vercel.app/teachers |

Each edition is a single, self-contained HTML file — no server, no dependencies, no tracking, nothing leaves the browser. Open it and it runs.

## How the two editions stay in sync

The whole point of the module is that the ten scenarios are **structured data** — an
organisation can reskin them without touching the engine. This repo demonstrates that
literally: one shared engine, one dataset per edition, assembled by a tiny zero-dependency build.

```
src/shell.html          the engine + styles + doodle SVG (edition-agnostic)
src/data.workplace.js    → index.html      (workplace edition)
src/data.school.js       → teachers.html   (AP classroom edition)
build.js                node build.js  →  writes both HTML files
```

To spin up your own edition, copy a `src/data.*.js`, rewrite the ten scenarios / sources /
labels for your context, add it to the `EDITIONS` list in `build.js`, and run `node build.js`.
The generated HTML files are committed so the site deploys as pure static with no build needed.

---

## What it is

A consequence-based training game. You play a new hire's first fortnight with a
company AI assistant. Each day presents one decision — draft a customer reply,
hand a spreadsheet to an AI, wire up an autonomous agent — with three plausible
options. You pick, you watch what happens, and the "AI's confidence it
understands your company" meter creeps up every time you over-share. String
together enough unsafe calls and the module escalates from awkward to **The
Incident**. Either way, you get a certificate.

The ten scenarios escalate deliberately, mirroring how the field frames
defence-in-depth:

| Day | Scenario | Lesson |
|----|----------|--------|
| 1 | The First Draft | Never paste what you can't un-paste |
| 2 | The Spreadsheet | Anonymise before you analyse |
| 3 | The Automation | Test automations on yourself first |
| 4 | The Confident Number | If it has no source, it's a rumour |
| 5 | The Poisoned Inbox | Indirect prompt injection — every input is untrusted |
| 6 | The Lethal Trifecta | Private data + untrusted input + a way to send |
| 7 | The Coding Agent | The agent proposes; a human commits |
| 8 | The Urgent Call | Verify the person, not the voice (deepfakes) |
| 9 | The Rubber Stamp | Automation bias & gradual disempowerment |
| 10 | The Off Switch | Keep an off-switch a human controls |

## Why it exists

Most employees get AI tools at work before they get any guidance on using them.
Security policies exist, but they're long, abstract, and read once. The failure
mode is rarely malice — it's a well-meaning person pasting the wrong thing into a
helpful box on a busy Tuesday. Rules tell people what *not* to do; consequence-based
practice changes behaviour. This lets someone make the mistake in a
consequence-free scenario and *watch it compound*, building felt heuristics that
survive contact with a real deadline.

## Grounding

Every scenario maps to a documented incident or the current literature — Samsung's
2023 chatbot data leak, *Mata v. Avianca*, Air Canada's chatbot refund ruling,
the OWASP LLM Top 10 (LLM01: prompt injection) and *State of Agentic AI Security*,
Simon Willison's "lethal trifecta," the Arup US$25M deepfake fraud, *Gradual
Disempowerment* (Kulveit et al.), and Palisade Research's shutdown-resistance
findings. The in-app **"Why this exists"** page lists all sources and is explicit
about what's dramatised, what's cited, and where the framing is contested rather
than settled.

The **AP Classroom** edition (`src/data.school.js`) reskins all ten into a teacher's
grading week — FERPA-safe drafting, anonymising the gradebook, AI-writing-detector bias,
a deepfake "principal" call, a grade-changing agent — grounded in the same literature plus
the PowerSchool breach and Stanford's detector-bias findings.

## Run / deploy

```bash
# build both editions from source (no dependencies)
node build.js

# preview locally — just open the generated files
open index.html        # workplace     (or double-click)
open teachers.html     # AP classroom

# deploy (static, zero config; /teachers is served via cleanUrls)
vercel --prod
```

## Credits & license

Hand-drawn doodle aesthetic (Patrick Hand + Courier Prime), all artwork authored
as inline SVG. Released under the [MIT License](LICENSE).
