// ==UserScript==
// @name         Copy with Page Reference
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Ctrl+C = copy with URL reference + code block; Alt+C = copy as blockquote (each line prefixed with "> ")
// @author       yanzhou
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  // ── Helpers ──────────────────────────────────────────────────────────────

  function getSelectedText() {
    return window.getSelection().toString();
  }

  function showPreview(label, content) {
    // Remove existing preview if any
    document.getElementById('__cpref_modal')?.remove();

    const overlay = document.createElement('div');
    overlay.id = '__cpref_modal';
    overlay.style.cssText = [
      'position:fixed', 'inset:0',
      'background:rgba(0,0,0,0.45)',
      'z-index:2147483647',
      'display:flex', 'align-items:center', 'justify-content:center',
    ].join(';');

    const box = document.createElement('div');
    box.style.cssText = [
      'background:#1e1e1e', 'color:#d4d4d4',
      'border-radius:10px', 'padding:20px 24px',
      'max-width:680px', 'width:90%', 'max-height:70vh',
      'display:flex', 'flex-direction:column', 'gap:12px',
      'box-shadow:0 8px 32px rgba(0,0,0,0.5)',
      'font:13px/1.6 "SF Mono",Menlo,monospace',
    ].join(';');

    const header = document.createElement('div');
    header.style.cssText = 'display:flex;justify-content:space-between;align-items:center';
    const title = document.createElement('span');
    title.textContent = label;
    title.style.cssText = 'color:#9cdcfe;font-weight:bold;font-size:12px;letter-spacing:.05em';
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = [
      'background:none', 'border:none', 'color:#888',
      'cursor:pointer', 'font-size:16px', 'line-height:1', 'padding:0',
    ].join(';');
    closeBtn.onclick = () => overlay.remove();
    header.append(title, closeBtn);

    const pre = document.createElement('pre');
    pre.textContent = content;
    pre.style.cssText = [
      'margin:0', 'overflow:auto', 'white-space:pre-wrap',
      'word-break:break-word', 'flex:1',
      'background:#252526', 'border-radius:6px',
      'padding:12px', 'font:inherit',
    ].join(';');

    box.append(header, pre);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // Close on overlay click or Escape
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
    });
  }

  async function writeClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // Fallback: execCommand
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    }
  }

  // ── Formatters ───────────────────────────────────────────────────────────

  function formatWithReference(text, url) {
    return `${url}\n\n\`\`\`\n${text}\n\`\`\``;
  }

  function formatAsBlockquote(text) {
    return text
      .split('\n')
      .map(line => `> ${line}`)
      .join('\n');
  }

  // ── Keyboard listener (capture phase, runs before page handlers) ─────────

  document.addEventListener('keydown', async function (e) {
    // Use e.code (physical key) instead of e.key, because Alt+C on Mac produces 'ç'

    // Ctrl+C — copy with URL reference + code block
    if (e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && e.code === 'KeyC') {
      const text = getSelectedText();
      if (!text.trim()) return; // no selection → normal copy
      e.preventDefault();
      const formatted = formatWithReference(text, location.href);
      await writeClipboard(formatted);
      showPreview('✓ 已复制（引用格式）', formatted);
      return;
    }

    // Alt+C — copy as blockquote (each line prefixed with "> ")
    if (e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey && e.code === 'KeyC') {
      const text = getSelectedText();
      if (!text.trim()) return;
      e.preventDefault();
      const formatted = formatAsBlockquote(text);
      await writeClipboard(formatted);
      showPreview('✓ 已复制（引用块格式）', formatted);
    }
  }, true); // capture: true — intercept before the page

})();
