# Markdown Editor Pro

A powerful, feature-rich markdown editor built with React, TypeScript, and Tailwind CSS. This editor provides a seamless writing experience with live preview, math equation support, and beautiful GitHub-inspired styling.

🔗 **[Live Demo](https://endearing-frangollo-73728e.netlify.app/)**

## ✨ Features

- 📝 **Live Preview** - Switch between edit and preview modes instantly
- 🧮 **Math Support** - Full LaTeX equation support via KaTeX
- 📋 **GitHub Flavored Markdown** - Tables, task lists, strikethrough, and more
- 🎨 **Dark/Light Theme** - Automatic theme detection with beautiful styling
- 📁 **File Operations** - Import and export markdown files
- 📋 **Copy to Clipboard** - One-click copying of markdown content
- 🖥️ **Fullscreen Mode** - Distraction-free writing experience
- 📖 **Built-in Guide** - Comprehensive markdown syntax reference
- 📊 **Real-time Stats** - Character, word, and line count
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🔧 **Easy Integration** - Drop into any React application

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd markdown-editor-pro

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Integration into Your React App

```tsx
import { MarkdownEditor } from './components/MarkdownEditor';

function App() {
  return (
    <div className="container mx-auto p-4">
      <MarkdownEditor />
    </div>
  );
}
```

## 📝 Markdown Features

### Basic Formatting
- **Headers** - `# H1` through `###### H6`
- **Emphasis** - `*italic*`, `**bold**`, `~~strikethrough~~`
- **Links** - `[text](url)` and reference-style links
- **Images** - `![alt text](image-url)` with automatic sizing

### Advanced Features
- **Code Blocks** - Syntax highlighting with fenced code blocks
- **Tables** - Full table support with column alignment
- **Lists** - Bulleted, numbered, and interactive task lists
- **Blockquotes** - `> quoted text` with nested support
- **Math Equations** - LaTeX support for inline and block equations
- **Horizontal Rules** - `---` or `***`

### Math Equation Examples

**Inline math:** `$E = mc^2$` renders as $E = mc^2$

**Block math:**
```latex
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

## 🎨 Theming

The editor automatically adapts to your application's theme system:

```tsx
// Light mode (default)
<MarkdownEditor />

// Dark mode - add 'dark' class to any parent element
<div className="dark">
  <MarkdownEditor />
</div>
```

### Theme Features
- Clean, GitHub-inspired light theme
- Beautiful dark mode with proper contrast ratios
- Smooth transitions between themes
- Respects system preferences

## 🛠️ Tech Stack

- **React 18** - Modern UI framework
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **react-markdown** - Markdown parsing and rendering
- **KaTeX** - High-quality math typesetting
- **Lucide React** - Beautiful, consistent icons

## 📦 Project Structure

```
src/
├── components/
│   ├── MarkdownEditor.tsx     # Main editor component
│   ├── MarkdownGuide.tsx      # Interactive help guide
│   └── MermaidDiagram.tsx     # Mermaid diagram support
├── App.tsx                    # Root component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles and Tailwind imports
```

## ⚙️ Configuration

### Customizing Features

```tsx
// Disable specific features
<MarkdownEditor 
  showStats={false}
  allowFileOperations={false}
  enableMath={false}
/>
```

### Styling Customization

The editor uses Tailwind CSS classes and can be customized by:
- Modifying the component's className props
- Overriding CSS custom properties
- Extending the Tailwind configuration

### Adding Plugins

```tsx
// Add custom remark/rehype plugins
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

// Configure in MarkdownEditor component
```

## 🚀 Usage Examples

### Basic Implementation
```tsx
import { MarkdownEditor } from './components/MarkdownEditor';

export default function MyApp() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">My Markdown Editor</h1>
        <MarkdownEditor />
      </div>
    </div>
  );
}
```

### With Custom Styling
```tsx
<div className="max-w-4xl mx-auto">
  <MarkdownEditor className="border border-gray-200 rounded-lg shadow-lg" />
</div>
```

## 📱 Responsive Behavior

- **Desktop** - Full feature set with side-by-side edit/preview
- **Tablet** - Adaptive layout with toggle between edit/preview
- **Mobile** - Optimized touch interface with swipe gestures

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain existing code style
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GitHub](https://github.com) for design inspiration and markdown standards
- [React Markdown](https://github.com/remarkjs/react-markdown) community for excellent tooling
- [KaTeX](https://katex.org/) for beautiful mathematical typesetting
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling philosophy
- [Lucide](https://lucide.dev/) for the beautiful icon set

## 📧 Support

If you have questions or need help integrating this editor:
- Open an [issue](../../issues) for bugs or feature requests
- Check out the [live demo](https://endearing-frangollo-73728e.netlify.app/) for examples
- Review the built-in help guide within the editor

---

**Made with ❤️ for the React community**

*Star ⭐ this repo if you find it useful!*