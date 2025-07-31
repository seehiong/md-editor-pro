import React, { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import MermaidDiagram from './MermaidDiagram';
import { Eye, Edit3, Copy, Download, Upload, HelpCircle } from 'lucide-react';
import MarkdownGuide from './MarkdownGuide';
import 'katex/dist/katex.min.css';

const markdownStyles = `
  /* Light theme styles */
  .markdown-content {
    color: #24292f;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    word-wrap: break-word;
  }
  
  .markdown-content h1 {
    font-size: 2rem;
    font-weight: 600;
    color: #24292f;
    margin-top: 0;
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 1px solid #d1d9e0;
  }
  
  .markdown-content h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #24292f;
    margin-top: 24px;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #d8dee4;
  }
  
  .markdown-content h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #24292f;
    margin-top: 24px;
    margin-bottom: 16px;
  }
  
  .markdown-content h4 {
    font-size: 1.125rem;
    font-weight: 600;
    color: #24292f;
    margin-top: 24px;
    margin-bottom: 16px;
  }
  
  .markdown-content h5 {
    font-size: 1rem;
    font-weight: 600;
    color: #24292f;
    margin-top: 24px;
    margin-bottom: 16px;
  }
  
  .markdown-content h6 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #656d76;
    margin-top: 24px;
    margin-bottom: 16px;
  }
  
  .markdown-content p {
    margin-top: 0;
    margin-bottom: 16px;
  }
  
  .markdown-content ul {
    margin-top: 0;
    margin-bottom: 16px;
    padding-left: 2rem;
  }
  
  .markdown-content ul li {
    list-style-type: disc;
    margin-bottom: 4px;
    word-wrap: break-all;
  }
  
  .markdown-content ol {
    margin-top: 0;
    margin-bottom: 16px;
    padding-left: 2rem;
  }
  
  .markdown-content ol li {
    list-style-type: decimal;
    margin-bottom: 4px;
    word-wrap: break-all;
  }
  
  .markdown-content blockquote {
    margin: 0 0 16px 0;
    padding: 0 1rem;
    color: #656d76;
    border-left: 0.25rem solid #d1d9e0;
  }
  
  .markdown-content code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    white-space: break-spaces;
    background-color: #afb8c133;
    border-radius: 6px;
    font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
    color: #24292f;
  }
  
  .markdown-content pre {
    padding: 16px;
    overflow-x: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 6px;
    margin-top: 0;
    margin-bottom: 16px;
    font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
    color: #24292f;
    border: 1px solid #d1d9e0;
  }
  
  .markdown-content pre code {
    background-color: transparent;
    padding: 0;
    margin: 0;
    font-size: 100%;
    color: inherit;
    white-space: pre;
    border: 0;
    border-radius: 0;
  }
  
  .markdown-content table {
    width: 100%;
    overflow: auto;
    border-collapse: collapse;
    margin-top: 0;
    margin-bottom: 16px;
    border-spacing: 0;
  }
  
  .markdown-content th {
    padding: 6px 13px;
    border: 1px solid #d1d9e0;
    font-weight: 600;
    background-color: #f6f8fa;
  }
  
  .markdown-content td {
    padding: 6px 13px;
    border: 1px solid #d1d9e0;
  }
  
  .markdown-content hr {
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: #d1d9e0;
    border: 0;
  }
  
  .markdown-content a {
    color: #0969da;
    text-decoration: underline;
  }
  
  .markdown-content a:hover {
    color: #0550ae;
  }
  
  .markdown-content strong {
    font-weight: 600;
  }
  
  .markdown-content em {
    font-style: italic;
  }
  
  .markdown-content input[type="checkbox"] {
    margin: 0 0.2em 0.25em -1.4em;
    vertical-align: middle;
    accent-color: #0969da;
  }
  
  .markdown-content del {
    text-decoration: line-through;
  }
  
  .markdown-content img {
    max-width: 100%;
    height: auto;
    border-style: none;
    box-sizing: content-box;
    background-color: #ffffff;
  }
  
  /* Dark theme styles */
  .dark .markdown-content {
    color: #e6edf3;
  }
  
  .dark .markdown-content h1,
  .dark .markdown-content h2,
  .dark .markdown-content h3,
  .dark .markdown-content h4,
  .dark .markdown-content h5 {
    color: #f0f6fc;
  }
  
  .dark .markdown-content h6 {
    color: #7d8590;
  }
  
  .dark .markdown-content h1 {
    border-bottom-color: #21262d;
  }
  
  .dark .markdown-content h2 {
    border-bottom-color: #21262d;
  }
  
  .dark .markdown-content blockquote {
    color: #7d8590;
    border-left-color: #30363d;
    background-color: #0d1117;
  }
  
  .dark .markdown-content code {
    background-color: rgba(110, 118, 129, 0.4);
    color: #f85149;
  }
  
  .dark .markdown-content pre {
    background-color: #0d1117;
    color: #e6edf3;
    border-color: #30363d;
  }
  
  .dark .markdown-content pre code {
    color: #e6edf3;
    background-color: transparent;
  }
  
  .dark .markdown-content table {
    border-color: #30363d;
  }
  
  .dark .markdown-content th {
    border-color: #30363d;
    background-color: #21262d;
    color: #f0f6fc;
  }
  
  .dark .markdown-content td {
    border-color: #30363d;
    color: #e6edf3;
  }
  
  .dark .markdown-content hr {
    background-color: #30363d;
  }
  
  .dark .markdown-content a {
    color: #58a6ff;
  }
  
  .dark .markdown-content a:hover {
    color: #79c0ff;
  }
  
  .dark .markdown-content input[type="checkbox"] {
    accent-color: #58a6ff;
  }
  
  .dark .markdown-content img {
    background-color: #0d1117;
  }
  
  /* Scrollbar styling for both themes */
  .markdown-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  .markdown-scrollbar::-webkit-scrollbar-track {
    background: #f6f8fa;
  }
  
  .dark .markdown-scrollbar::-webkit-scrollbar-track {
    background: #21262d;
  }
  
  .markdown-scrollbar::-webkit-scrollbar-thumb {
    background: #d1d9e0;
    border-radius: 4px;
  }
  
  .dark .markdown-scrollbar::-webkit-scrollbar-thumb {
    background: #30363d;
  }
  
  .markdown-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #8d96a0;
  }
  
  .dark .markdown-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #484f58;
  }
  
  /* Textarea styling */
  .markdown-textarea {
    font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
    line-height: 1.5;
    tab-size: 2;
    font-size: 14px;
  }
`;

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

## Mermaid Diagrams

\`\`\`mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
\`\`\`

\`\`\`mermaid
sequenceDiagram
    participant A as Alice
    participant B as Bob
    A->>B: Hello Bob, how are you?
    B-->>A: I am good thanks!
\`\`\`

\`\`\`mermaid
classDiagram
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

  // Custom renderer for code blocks to handle Mermaid diagrams
  const components = {
    code: ({ node, inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      
      if (!inline && language === 'mermaid') {
        const chart = String(children).replace(/\n$/, '');
        const id = Math.random().toString(36).substr(2, 9);
        return <MermaidDiagram chart={chart} id={id} />;
      }
      
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

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
    if (file && (file.type === 'text/markdown' || file.name.endsWith('.md'))) {
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
    <>
      <style>{markdownStyles}</style>
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
            <div className="bg-gray-50 dark:bg-[#21262d] px-4 py-2 text-sm text-gray-600 dark:text-[#7d8590] border-b dark:border-[#30363d]">
              <span>Markdown Source</span>
              <span className="ml-4 text-xs">Tip: Use $...$ for inline math, $$...$$ for block math</span>
            </div>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="markdown-textarea flex-1 p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset bg-white text-gray-900 dark:bg-[#0d1117] dark:text-[#e6edf3] dark:border-[#30363d]"
              placeholder="Type your markdown here..."
              spellCheck={false}
            />
          </div>
        ) : (
          /* Preview Mode */
          <div className="w-full flex flex-col">
            <div className="bg-gray-50 dark:bg-[#21262d] px-4 py-2 text-sm text-gray-600 dark:text-[#7d8590] border-b dark:border-[#30363d]">
              <span>Preview</span>
            </div>
            <div className="flex-1 overflow-auto p-6 markdown-scrollbar bg-white dark:bg-[#0d1117]">
              <div className="markdown-content max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkMath, remarkGfm]}
                  rehypePlugins={[rehypeKatex]}
                  components={components}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-gray-100 dark:bg-[#21262d] px-4 py-2 text-xs text-gray-600 dark:text-[#7d8590] border-t dark:border-[#30363d] flex justify-between items-center">
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
    </>
  );
};

export default MarkdownEditor;