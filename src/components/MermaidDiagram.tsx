import React, { useEffect, useRef } from 'react';
import mermaid from '@mermaid-js/mermaid';

interface MermaidDiagramProps {
  chart: string;
  id: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, id }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // Initialize mermaid with theme detection
      const isDark = document.documentElement.classList.contains('dark') || 
                    document.body.classList.contains('dark') ||
                    ref.current.closest('.dark') !== null;

      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        themeVariables: {
          primaryColor: isDark ? '#58a6ff' : '#0969da',
          primaryTextColor: isDark ? '#e6edf3' : '#24292f',
          primaryBorderColor: isDark ? '#30363d' : '#d1d9e0',
          lineColor: isDark ? '#484f58' : '#656d76',
          secondaryColor: isDark ? '#21262d' : '#f6f8fa',
          tertiaryColor: isDark ? '#161b22' : '#ffffff',
          background: isDark ? '#0d1117' : '#ffffff',
          mainBkg: isDark ? '#21262d' : '#f6f8fa',
          secondBkg: isDark ? '#30363d' : '#ffffff',
          tertiaryBkg: isDark ? '#161b22' : '#f6f8fa'
        },
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
        fontSize: 14,
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true
        },
        sequence: {
          useMaxWidth: true,
          wrap: true
        },
        gantt: {
          useMaxWidth: true
        }
      });

      // Clear previous content
      ref.current.innerHTML = '';
      
      // Render the diagram
      mermaid.render(`mermaid-${id}`, chart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      }).catch((error) => {
        console.error('Mermaid rendering error:', error);
        if (ref.current) {
          ref.current.innerHTML = `
            <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p class="text-red-700 dark:text-red-400 text-sm font-medium">Mermaid Diagram Error</p>
              <p class="text-red-600 dark:text-red-300 text-xs mt-1">Failed to render diagram. Please check your syntax.</p>
            </div>
          `;
        }
      });
    }
  }, [chart, id]);

  return (
    <div 
      ref={ref} 
      className="my-4 flex justify-center overflow-x-auto"
      style={{ minHeight: '100px' }}
    />
  );
};

export default MermaidDiagram;