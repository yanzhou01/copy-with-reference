# Copy with Page Reference

A Tampermonkey userscript that enhances copying from web pages with two modes: copy with URL reference, or copy as a Markdown blockquote.

[日本語](README.ja.md) | [中文](README.zh.md)

---

## Installation

1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension
2. Open the extension manager and enable **"Allow user scripts"** or **"Developer mode"** (required on some Chromium-based browsers)
3. Open `copy-with-reference.user.js` in your browser
4. Click **Install** on the Tampermonkey prompt

---

## Usage

### `Ctrl + C` — Copy with URL reference

Select text on any page and press `Ctrl+C`. The clipboard will contain the page URL and the selected text wrapped in a fenced code block.

**Output:**
```
https://example.com/some/page

```
Selected text goes here
```
```

Useful for citing documentation or sharing a specific passage with its source.

---

### `Alt + C` — Copy as blockquote

Select text and press `Alt+C`. Every line will be prefixed with `> ` for Markdown blockquote formatting.

**Output:**
```
> Line one of the selected text
> Line two
> Line three
```

Great for quoting multi-line messages (e.g. customer inquiries) into Slack or Notion without manually adding `>` to each line.

---

## Notes

- `Ctrl+C` with no text selected falls through to normal browser copy
- On success, a preview popup appears so you can verify the content before pasting — close with `Escape`, `✕`, or clicking outside
- Works on all websites (`*://*/*`)
- Built on Mac with [Claude Code](https://claude.ai/code)
