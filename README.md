# Markdown Editor Pro

A powerful, feature-rich markdown editor built with React, TypeScript, and Tailwind CSS. This editor provides a seamless writing experience with live preview, math equation support, and beautiful GitHub-inspired styling.

## ✨ Features

- **Live Preview**: Switch between edit and preview modes instantly
- **Math Support**: Full LaTeX equation support via KaTeX
- **GitHub Flavored Markdown**: Tables, task lists, strikethrough, and more
- **Dark/Light Theme**: Automatic theme detection and beautiful styling for both modes
- **File Operations**: Import/export markdown files
- **Copy to Clipboard**: One-click copying of your markdown content
- **Fullscreen Mode**: Distraction-free writing experience
- **Built-in Guide**: Comprehensive markdown syntax reference
- **Real-time Stats**: Character, word, and line count
- **Responsive Design**: Works perfectly on desktop and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Supported Markdown Features

### Basic Formatting
- **Headers**: `# H1`, `## H2`, `### H3`, etc.
- **Emphasis**: `*italic*`, `**bold**`, `~~strikethrough~~`
- **Links**: `[text](url)` and reference-style links
- **Images**: `![alt](src)` with automatic sizing

### Advanced Features
- **Code**: Inline `code` and fenced code blocks with syntax highlighting
- **Tables**: Full table support with alignment
- **Lists**: Bulleted, numbered, and task lists
- **Blockquotes**: `> quoted text`
- **Math Equations**: Inline `$E=mc^2$` and block `$$...$$` equations
- **Horizontal Rules**: `---` or `***`

### Math Examples

Inline math: `$E = mc^2$`

Block math:
```
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

## 🎨 Theming

The editor automatically detects and adapts to your application's theme:

- **Light Theme**: Clean, GitHub-inspired styling
- **Dark Theme**: Beautiful dark mode with proper contrast
- **Automatic Detection**: Responds to parent element's `dark` class

To enable dark mode, add the `dark` class to any parent element:

```jsx
<div className="dark">
  <MarkdownEditor />
</div>
```

## 🛠️ Built With

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **react-markdown** - Markdown parsing and rendering
- **KaTeX** - Math equation rendering
- **Lucide React** - Beautiful icons

## 📦 Project Structure

```
src/
├── components/
│   ├── MarkdownEditor.tsx    # Main editor component
│   └── MarkdownGuide.tsx     # Help guide modal
├── App.tsx                   # Root component
├── main.tsx                  # Entry point
└── index.css                 # Global styles
```

## 🔧 Configuration

The editor is highly customizable. You can modify:

- **Styling**: Update the embedded styles in `MarkdownEditor.tsx`
- **Plugins**: Add or remove remark/rehype plugins
- **Features**: Enable/disable specific markdown features
- **Theme**: Customize colors and spacing

## 📱 Responsive Design

The editor is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature-name`
6. Open a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- GitHub for design inspiration
- The React Markdown community
- KaTeX for beautiful math rendering
- Tailwind CSS for utility-first styling

---

**Happy writing!** 🚀