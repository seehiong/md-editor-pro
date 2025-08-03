import React from 'react';
import { X, Hash, Bold, Link, List, Code, Table, Calculator } from 'lucide-react';

interface MarkdownGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

const MarkdownGuide: React.FC<MarkdownGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const examples = [
    {
      title: 'Headers',
      icon: <Hash size={16} />,
      syntax: '# H1\n## H2\n### H3',
      description: 'Create headers using # symbols. More # means smaller header.'
    },
    {
      title: 'Text Formatting',
      icon: <Bold size={16} />,
      syntax: '**bold text**\n*italic text*\n~~strikethrough~~',
      description: 'Format text with asterisks and tildes.'
    },
    {
      title: 'Links',
      icon: <Link size={16} />,
      syntax: '[Link text](https://example.com)\n[Reference link][1]\n\n[1]: https://example.com',
      description: 'Create clickable links to websites or references.'
    },
    {
      title: 'Lists',
      icon: <List size={16} />,
      syntax: '- Item 1\n- Item 2\n  - Nested item\n\n1. Numbered item\n2. Another item',
      description: 'Create bulleted or numbered lists with nesting support.'
    },
    {
      title: 'Code',
      icon: <Code size={16} />,
      syntax: '`inline code`\n\n```javascript\nfunction hello() {\n  console.log("Hello!");\n}\n```',
      description: 'Display code inline or in blocks with syntax highlighting.'
    },
    {
      title: 'Tables',
      icon: <Table size={16} />,
      syntax: '| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |',
      description: 'Create tables with headers and aligned columns.'
    },
    {
      title: 'Math Equations',
      icon: <Calculator size={16} />,
      syntax: 'Inline: $E = mc^2$\n\nBlock:\n$$\n\\int_0^1 x^2 dx = \\frac{1}{3}\n$$',
      description: 'Write mathematical equations using LaTeX syntax with KaTeX.'
    },
    {
      title: 'PlantUML Diagrams',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" /></svg>,
      syntax: '```plantuml\n@startuml\nAlice -> Bob: Hello!\nBob --> Alice: Hi there!\n@enduml\n```',
      description: 'Create UML diagrams, flowcharts, and other diagrams using PlantUML syntax.'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Markdown Guide</h2>
            <p className="text-blue-100 mt-1">Learn how to write beautiful documents with Markdown</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[calc(90vh-120px)]">
          <div className="p-6">
            {/* Introduction */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What is Markdown?</h3>
              <p className="text-gray-600 leading-relaxed">
                Markdown is a lightweight markup language that allows you to format text using simple,
                readable syntax. It's widely used for documentation, README files, and content creation
                because it's easy to write and converts beautifully to HTML.
              </p>
            </div>

            {/* Examples Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {examples.map((example, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="text-blue-600">{example.icon}</div>
                      <h4 className="font-semibold text-gray-900">{example.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{example.description}</p>
                  </div>
                  <div className="p-4">
                    <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
                      <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">
                        {example.syntax}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Tips */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Pro Tips</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Use two spaces at the end of a line to create a line break</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Escape special characters with backslash: \*not italic\*</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Use &gt; for blockquotes and --- for horizontal rules</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Math equations support full LaTeX syntax via KaTeX</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Task lists: - [x] completed task, - [ ] incomplete task</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>PlantUML diagrams: Use ```plantuml code blocks for UML diagrams</span>
                </li>
              </ul>
            </div>

            {/* Quick Reference */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Reference</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="font-medium text-gray-700">Emphasis</p>
                  <p className="text-gray-600 font-mono">*italic* **bold**</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-700">Code</p>
                  <p className="text-gray-600 font-mono">`code` ```block```</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-700">Math</p>
                  <p className="text-gray-600 font-mono">$inline$ $$block$$</p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-gray-700">Diagrams</p>
                  <p className="text-gray-600 font-mono">```plantuml</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Need more help? Check out the{' '}
              <a
                href="https://www.markdownguide.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                official Markdown guide
              </a>
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownGuide;