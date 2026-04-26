"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface FormattedContentProps {
  content: string;
}

export default function FormattedContent({ content }: FormattedContentProps) {
  if (!content) return <p className="text-gray-400 italic">No content available</p>;

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-bold text-gray-900 mt-5 mb-2">{children}</h3>,
          h4: ({ children }) => <h4 className="text-base font-bold text-gray-900 mt-4 mb-2">{children}</h4>,
          p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside space-y-2 my-4 text-gray-700">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 my-4 text-gray-700">{children}</ol>,
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
          blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4">{children}</blockquote>,
          code: ({ children }) => <code className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-800">{children}</code>,
          a: ({ children, href }) => <a href={href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
