# Copy with Page Reference

一个 Tampermonkey 用户脚本，为网页复制操作提供两种增强模式：带 URL 引用复制，或转换为 Markdown 引用块格式复制。

[English](README.md) | [日本語](README.ja.md)

---

## 安装方法

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. 打开扩展管理页面，启用 **「允许用户脚本」或「开发者模式」**（部分 Chromium 系浏览器需要此步骤）
3. 用浏览器打开 `copy-with-reference.user.js`
4. Tampermonkey 会自动弹出安装页面，点击「安装」即可

---

## 使用方法

### `Ctrl + C` — 带 URL 引用复制

在网页上选中文字，按 `Ctrl+C`，剪贴板内容会自动包含当前页面 URL 和代码块格式的选中文字。

**输出示例：**
```
https://example.com/some/page

```
选中的文字内容
```
```

在文档或笔记中粘贴时，自动保留来源链接，方便溯源。

---

### `Alt + C` — 引用块格式复制

选中文字后按 `Alt+C`，每一行开头会自动加上 `> `，生成 Markdown 引用块格式。

**输出示例：**
```
> 选中文字的第一行
> 第二行
> 第三行
```

引用客户问题时，多行内容不再需要逐行手动添加 `>`，直接粘贴到 Slack 或 Notion 即可。

---

## 备注

- 未选中文字时按 `Ctrl+C` 不会拦截，正常复制
- 复制成功后会弹出预览窗口，确认内容后再粘贴。按 `Escape`、点击 `✕` 或点击背景关闭
- 适用于所有网站（`*://*/*`）
- 在 Mac 环境下使用 [Claude Code](https://claude.ai/code) 开发
