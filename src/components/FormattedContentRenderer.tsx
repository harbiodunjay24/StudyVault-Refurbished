import React from 'react';
import { parseTextbookBlocks, FormattedBlock } from '../utils/textbookFormatter';

export type ReaderThemeKey = 'parchment' | 'sepia' | 'white' | 'night';

interface FormattedContentRendererProps {
  content: string;
  theme?: ReaderThemeKey;
  className?: string;
  fontSizeClass?: string;
  fontFamily?: 'serif' | 'sans';
}

/**
 * Helper to render inline formatting such as **bold**, *italic*, backticks, and citations.
 */
function renderInlineFormatting(text: string): React.ReactNode[] {
  if (!text) return [];

  // Match bold (**text** or __text__), code (`code`), or citation brackets
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*|\([A-Z][A-Za-z0-9\s,\-\&\.\;\/–—]+,\s*\d{4}[^\)]*\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={`b-${match.index}`} className="font-semibold text-inherit">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={`c-${match.index}`}
          className="font-mono text-[0.88em] bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-inherit"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={`i-${match.index}`} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith('(') && token.endsWith(')')) {
      // Academic citation styling
      parts.push(
        <span
          key={`cit-${match.index}`}
          className="font-normal opacity-85 underline decoration-dotted decoration-black/30 dark:decoration-white/30 underline-offset-2"
          title="Textbook citation"
        >
          {token}
        </span>
      );
    } else {
      parts.push(token);
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export const FormattedContentRenderer: React.FC<FormattedContentRendererProps> = ({
  content,
  theme = 'parchment',
  className = '',
  fontSizeClass = 'text-[16px] sm:text-[17.5px] leading-[1.8]',
  fontFamily = 'serif',
}) => {
  const blocks = React.useMemo(() => parseTextbookBlocks(content), [content]);

  if (!blocks || blocks.length === 0) {
    return <p className="opacity-60 italic text-sm">No textbook content available.</p>;
  }

  // Theme-specific accent colors
  const isNight = theme === 'night';
  const headingColor = isNight ? 'text-[#ECEFE8]' : 'text-[#14382B]';
  const subheadColor = isNight ? 'text-[#E2C799]' : 'text-[#14382B]';
  const bulletDot = isNight ? 'bg-[#E2C799]' : 'bg-[#14382B]';
  const numBadge = isNight
    ? 'bg-white/10 text-[#ECEFE8] border border-white/20'
    : 'bg-[#14382B]/10 text-[#14382B] border border-[#14382B]/20';
  const tableBorder = isNight ? 'border-[#22322C]' : 'border-[#E8E4DC]';
  const tableHeadBg = isNight ? 'bg-[#15201C]' : 'bg-[#FAF8F5]';
  const tableRowAlt = isNight ? 'bg-[#121B17]' : 'bg-[#FAF8F5]/50';

  return (
    <div
      className={`textbook-content-renderer space-y-4 max-w-none transition-colors ${fontSizeClass} ${
        fontFamily === 'serif' ? 'font-serif' : 'font-sans'
      } ${className}`}
    >
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'heading': {
            if (block.level === 2) {
              return (
                <h2
                  key={idx}
                  className={`text-xl sm:text-2xl font-bold font-serif tracking-tight ${headingColor} pt-8 pb-3 border-b ${tableBorder} flex items-center gap-3`}
                >
                  {block.numberPrefix && (
                    <span className="font-mono text-base font-bold opacity-75">
                      {block.numberPrefix}
                    </span>
                  )}
                  <span>{block.title || block.text}</span>
                </h2>
              );
            }
            if (block.level === 3) {
              return (
                <h3
                  key={idx}
                  className={`text-lg sm:text-xl font-bold font-serif tracking-tight ${headingColor} pt-6 pb-1.5 flex items-baseline gap-2.5`}
                >
                  {block.numberPrefix && (
                    <span className="font-mono text-sm sm:text-base font-bold text-[#C88A36] shrink-0">
                      {block.numberPrefix}
                    </span>
                  )}
                  <span>{block.title || block.text}</span>
                </h3>
              );
            }
            return (
              <h4
                key={idx}
                className={`text-base sm:text-lg font-bold tracking-tight ${headingColor} pt-4 pb-1`}
              >
                {block.numberPrefix && (
                  <span className="font-mono text-xs font-bold text-[#C88A36] mr-2">
                    {block.numberPrefix}
                  </span>
                )}
                <span>{block.title || block.text}</span>
              </h4>
            );
          }

          case 'subheading': {
            return (
              <div
                key={idx}
                className={`pt-5 pb-1 font-bold text-sm sm:text-base uppercase tracking-wider ${subheadColor} flex items-center gap-2`}
              >
                <span className="w-1.5 h-3.5 rounded-xs bg-[#C88A36] shrink-0" />
                <span>{block.title || block.text}</span>
              </div>
            );
          }

          case 'bullet_list': {
            if (!block.items || block.items.length === 0) return null;
            return (
              <ul key={idx} className="my-4 pl-1 sm:pl-3 space-y-3.5">
                {block.items.map((item, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3 leading-[1.8] group">
                    <span className={`w-1.5 h-1.5 rounded-full ${bulletDot} mt-2.5 shrink-0 opacity-80`} />
                    <div className="flex-1 min-w-0">
                      {item.term && (
                        <strong className={`font-bold block sm:inline ${subheadColor} mr-2`}>
                          {item.term}:
                        </strong>
                      )}
                      <span className="opacity-95">{renderInlineFormatting(item.text)}</span>

                      {/* Sub-points under this bullet item if applicable */}
                      {item.subItems && item.subItems.length > 0 && (
                        <ul className="mt-2 pl-4 space-y-2 border-l border-black/10 dark:border-white/10">
                          {item.subItems.map((sub, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2.5 text-[0.95em] opacity-90">
                              <span className="w-1 h-1 rounded-full bg-black/40 dark:bg-white/40 mt-2 shrink-0" />
                              <span>{renderInlineFormatting(sub)}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            );
          }

          case 'numbered_list': {
            if (!block.items || block.items.length === 0) return null;
            return (
              <ol key={idx} className="my-4 pl-1 sm:pl-3 space-y-3.5">
                {block.items.map((item, nIdx) => (
                  <li key={nIdx} className="flex items-start gap-3 leading-[1.8]">
                    <span
                      className={`font-mono font-bold text-xs ${numBadge} px-2 py-0.5 rounded-md mt-1 shrink-0`}
                    >
                      {item.number || `${nIdx + 1}.`}
                    </span>
                    <div className="flex-1 min-w-0">
                      {item.term && (
                        <strong className={`font-bold block sm:inline ${subheadColor} mr-2`}>
                          {item.term}:
                        </strong>
                      )}
                      <span className="opacity-95">{renderInlineFormatting(item.text)}</span>
                    </div>
                  </li>
                ))}
              </ol>
            );
          }

          case 'table': {
            if (!block.table || !block.table.headers) return null;
            return (
              <div
                key={idx}
                className={`my-6 overflow-x-auto rounded-xl border ${tableBorder} shadow-2xs`}
              >
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className={`${tableHeadBg} border-b ${tableBorder}`}>
                      {block.table.headers.map((h, hIdx) => (
                        <th
                          key={hIdx}
                          className="py-3 px-4 font-bold text-[#14382B] dark:text-[#E2C799] uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.table.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={`border-b last:border-b-0 ${tableBorder} ${
                          rIdx % 2 === 1 ? tableRowAlt : ''
                        }`}
                      >
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-2.5 px-4 opacity-90 leading-relaxed align-top">
                            {renderInlineFormatting(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          case 'blockquote': {
            return (
              <blockquote
                key={idx}
                className={`my-5 border-l-4 border-[#C88A36] pl-4 py-1.5 italic opacity-95 text-[0.98em] leading-relaxed`}
              >
                {renderInlineFormatting(block.text || '')}
              </blockquote>
            );
          }

          case 'paragraph':
          default: {
            return (
              <p key={idx} className="my-3.5 leading-[1.8] opacity-95 text-justify sm:text-left">
                {renderInlineFormatting(block.text || '')}
              </p>
            );
          }
        }
      })}
    </div>
  );
};
