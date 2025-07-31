import React, { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import { Eye, Edit3, Copy, Download, Upload, HelpCircle } from 'lucide-react';
import MarkdownGuide from './MarkdownGuide';
import 'katex/dist/katex.min.css';

const MarkdownEditor: React.FC = () => {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

This is a **powerful** markdown editor with *math support*!

## Features

- [x] Live preview
- [x] Math equations with KaTeX
- [x] GitHub Flavored Markdown
- [x] Syntax highlighting
- [ ] More features coming soon

## Math Examples

Inline math: $E = mc^2$

Block math:
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

Complex equation:
$$
f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n
$$

## PlantUML Diagrams

\`\`\`plantuml
@startuml
Alice -> Bob: Hello Bob, how are you?
Bob --> Alice: I am good thanks!
@enduml
\`\`\`

\`\`\`plantuml
@startuml
class User {
  +String name
  +String email
  +login()
  +logout()
}

class Admin {
  +manageUsers()
}

User <|-- Admin
@enduml
\`\`\`

## Code Examples

\`\`\`javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
\`\`\`

## Tables

| Feature | Supported |
|---------|-----------|
| Tables  | ✅        |
| Math    | ✅        |
| Code    | ✅        |

> This is a blockquote with some important information!

### Lists

1. First item
2. Second item
   - Nested item
   - Another nested item

---

Happy writing! 🚀`);

  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, [markdown]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [markdown]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/markdown' || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setMarkdown(content);
      };
      reader.readAsText(file);
    }
    // Reset the input
    event.target.value = '';
  }, []);

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'w-full'} bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Markdown Editor</h1>
          <div className="flex items-center space-x-2">
            {/* File Operations */}
            <button
              onClick={() => setShowGuide(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Markdown Guide"
            >
              <HelpCircle size={20} />
            </button>
            <label className="cursor-pointer p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Upload size={20} />
              <input
                type="file"
                accept=".md,.markdown"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Download as .md file"
            >
              <Download size={20} />
            </button>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Copy to clipboard"
            >
              <Copy size={20} />
            </button>
            
            {/* Mode Toggle */}
            <div className="bg-white/10 rounded-lg p-1 flex">
              <button
                onClick={() => setMode('edit')}
                className={`px-3 py-1 rounded flex items-center space-x-1 transition-all ${
                  mode === 'edit' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Edit3 size={16} />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setMode('preview')}
                className={`px-3 py-1 rounded flex items-center space-x-1 transition-all ${
                  mode === 'preview' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Eye size={16} />
                <span>Preview</span>
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Toggle fullscreen"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isFullscreen ? (
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                ) : (
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex h-96 md:h-[600px]">
        {mode === 'edit' ? (
          /* Editor Mode */
          <div className="w-full flex flex-col">
            <div className="bg-gray-50 px-4 py-2 text-sm text-gray-600 border-b">
              <span>Markdown Source</span>
              <span className="ml-4 text-xs">Tip: Use $...$ for inline math, $$...$$ for block math</span>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="flex-1 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              placeholder="Type your markdown here..."
              spellCheck={false}
            />
          </div>
        ) : (
          /* Preview Mode */
          <div className="w-full flex flex-col">
            <div className="bg-gray-50 px-4 py-2 text-sm text-gray-600 border-b">
              <span>Preview</span>
            </div>
            <div className="flex-1 overflow-auto p-6 prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex]}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-gray-100 px-4 py-2 text-xs text-gray-600 border-t flex justify-between items-center">
        <div className="flex space-x-4">
          <span>Characters: {markdown.length}</span>
          <span>Words: {markdown.trim().split(/\s+/).length}</span>
          <span>Lines: {markdown.split('\n').length}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span>Ready</span>
        </div>
      </div>

      {/* Help Guide Modal */}
      <MarkdownGuide isOpen={showGuide} onClose={() => setShowGuide(false)} />
    </div>
  );
};

export default MarkdownEditor;