/**
 * StudyVault AI — Professional Academic Textbook Formatter & AST Parser
 * Converts raw textbook text, uploaded PDF extracts, AI tutor responses, and past examination answers
 * into clean, structured, typographically aligned semantic blocks.
 */

export type BlockType =
  | 'heading'
  | 'subheading'
  | 'paragraph'
  | 'bullet_list'
  | 'numbered_list'
  | 'table'
  | 'blockquote'
  | 'key_term'
  | 'math_or_code';

export interface FormattedBlock {
  type: BlockType;
  level?: 2 | 3 | 4;
  numberPrefix?: string;
  title?: string;
  text?: string;
  items?: {
    number?: string;
    term?: string;
    text: string;
    subItems?: string[];
  }[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  citation?: string;
  raw?: string;
}

/**
 * Normalizes raw textbook text by safely resolving collapsed line breaks,
 * inline bullet markers, section numbering, and unescaped entities without
 * dropping or altering any words.
 */
export function normalizeTextbookContent(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';

  let text = raw
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\u00A0/g, ' '); // Non-breaking space

  // 1. Separate section headings (e.g., "3.1 Global Variation...", "3.2 Shareholder Activism...")
  // Ensure clear paragraph spacing before and after section headings
  text = text.replace(/([^\n])\n(\d+\.\d+(?:\.\d+)?\s+[A-Z][^\n]+)/g, '$1\n\n$2');
  text = text.replace(/(\d+\.\d+(?:\.\d+)?\s+[A-Z][A-Za-z0-9\s,\-\&\/\(\)\'\"]+?[:\s]*)\n([^\n])/g, '$1\n\n$2');

  // 2. Unpack inline bullets after sentence terminators or colons: e.g. ": - Item" -> ":\n- Item", ". - Item" -> ".\n- Item"
  text = text.replace(/([:\.\?!])\s*[-•*–—]\s+/g, '$1\n- ');

  // 3. Unpack inline numbered items after sentence terminators or colons: e.g. ": 1. Item" -> ":\n1. Item"
  text = text.replace(/([:\.\?!])\s*(\d+[\.\)])\s+/g, '$1\n$2 ');

  // 4. Ensure sub-headers like "- Germany:" or "- Japan:" start on a clean line (only when dash is bullet marker, not word hyphen)
  text = text.replace(/([^\n])\n?((?:^|\n)\s*[-*•]\s+[A-Z][A-Za-z0-9\s,\(\)\/–—]+:)\s*\n?/g, '$1\n\n$2\n');

  // 5. Standardize bullet characters
  text = text.replace(/^[\s]*[•*–—]\s+/gm, '- ');

  // 6. Collapse excessive blank lines to max 2
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
}

/**
 * Parses normalized textbook content into structured, semantic visual blocks.
 */
export function parseTextbookBlocks(rawContent: string): FormattedBlock[] {
  if (!rawContent || !rawContent.trim()) return [];

  const text = normalizeTextbookContent(rawContent);
  const lines = text.split('\n');
  const blocks: FormattedBlock[] = [];
  let currentParagraphLines: string[] = [];

  const flushParagraph = () => {
    if (currentParagraphLines.length > 0) {
      const pText = currentParagraphLines.join(' ').replace(/\s+/g, ' ').trim();
      if (pText) {
        blocks.push({
          type: 'paragraph',
          text: pText,
          raw: pText,
        });
      }
      currentParagraphLines = [];
    }
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line separates paragraphs
    if (!trimmed) {
      flushParagraph();
      i++;
      continue;
    }

    // A. Markdown Heading (#, ##, ###, ####)
    const mdHeaderMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (mdHeaderMatch) {
      flushParagraph();
      const level = Math.min(4, mdHeaderMatch[1].length + 1) as 2 | 3 | 4;
      blocks.push({
        type: 'heading',
        level,
        title: mdHeaderMatch[2].replace(/^[*_]+|[*_]+$/g, '').trim(),
        text: mdHeaderMatch[2].trim(),
        raw: trimmed,
      });
      i++;
      continue;
    }

    // B. Explicit Numbered Section Heading: e.g. "3.1 Global Variation in Corporate Governance Systems"
    const secHeadingMatch = trimmed.match(/^(\d+\.\d+(?:\.\d+)?)\s+([A-Z][A-Za-z0-9\s,\-\&\/\(\)\'\"]+?)[:\s]*$/);
    if (secHeadingMatch && secHeadingMatch[2].length < 100 && !trimmed.includes('. ')) {
      flushParagraph();
      const prefix = secHeadingMatch[1];
      const isDeeper = prefix.split('.').length > 2;
      blocks.push({
        type: 'heading',
        level: isDeeper ? 4 : 3,
        numberPrefix: prefix,
        title: secHeadingMatch[2].trim(),
        text: trimmed,
        raw: trimmed,
      });
      i++;
      continue;
    }

    // C. Unit or Module Heading: e.g. "UNIT 1: The Concept of Family Business", "Module 2: ..."
    const unitHeadingMatch = trimmed.match(/^(UNIT|MODULE|CHAPTER)\s+(\d+[:\-\s].*)$/i);
    if (unitHeadingMatch && trimmed.length < 90) {
      flushParagraph();
      blocks.push({
        type: 'heading',
        level: 2,
        title: trimmed,
        text: trimmed,
        raw: trimmed,
      });
      i++;
      continue;
    }

    // D. Standalone Country, System or Classification Subheading: e.g. "- Germany:", "Germany:", "**Germany**"
    const subheadColonMatch = trimmed.match(/^(?:[-*•]\s*)?(\*\*[^*]+\*\*|[A-Z][A-Za-z0-9\s,\(\)\/–—]+):$/);
    if (subheadColonMatch && subheadColonMatch[1].length < 75 && !trimmed.includes('. ')) {
      flushParagraph();
      const cleanSub = subheadColonMatch[1].replace(/\*\*/g, '').replace(/^[-*•]\s*/, '').trim();
      blocks.push({
        type: 'subheading',
        title: cleanSub,
        text: cleanSub,
        raw: trimmed,
      });
      i++;
      continue;
    }

    // E. Markdown Table Detection: line starting and ending with "|"
    if (trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.includes('|', 1)) {
      flushParagraph();
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const rawHeaders = tableLines[0]
          .slice(1, -1)
          .split('|')
          .map((c) => c.trim());
        // Filter out markdown delimiter line (| --- | --- |)
        const rowLines = tableLines.slice(1).filter((l) => !l.replace(/[\|\s\-:]/g, '').length === false || !/^[\|\s\-:]+$/.test(l));

        const rows = rowLines.map((l) =>
          l
            .slice(1, -1)
            .split('|')
            .map((c) => c.trim())
        );

        blocks.push({
          type: 'table',
          table: {
            headers: rawHeaders,
            rows,
          },
        });
        continue;
      }
    }

    // F. Blockquote: lines starting with "> "
    if (trimmed.startsWith('>')) {
      flushParagraph();
      let quoteText = trimmed.replace(/^>\s*/, '');
      i++;
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteText += ' ' + lines[i].trim().replace(/^>\s*/, '');
        i++;
      }
      blocks.push({
        type: 'blockquote',
        text: quoteText.trim(),
        raw: trimmed,
      });
      continue;
    }

    // G. Numbered List: e.g. "1. Management Board...", "2. Supervisory Board...", "(a) ...", "i) ..."
    const numMatch = trimmed.match(/^(\d+|[a-zA-Z]|\([a-zA-Z0-9]+\)|[ivxLCDM]+)[\.\)]\s+(.+)$/);
    if (numMatch && (numMatch[1].length <= 3 || numMatch[1].startsWith('('))) {
      flushParagraph();
      const numItems: { number: string; term?: string; text: string }[] = [];

      while (i < lines.length) {
        const nLine = lines[i].trim();
        const nMatch = nLine.match(/^(\d+|[a-zA-Z]|\([a-zA-Z0-9]+\)|[ivxLCDM]+)[\.\)]\s+(.+)$/);
        if (!nMatch) break;

        const numPrefix = nMatch[1].endsWith('.') || nMatch[1].endsWith(')') ? nMatch[1] : `${nMatch[1]}.`;
        let itemBody = nMatch[2].trim();
        i++;

        // Consume multi-line continuation for this numbered item
        while (
          i < lines.length &&
          lines[i].trim() &&
          !lines[i].trim().match(/^(\d+|[a-zA-Z]|\([a-zA-Z0-9]+\)|[ivxLCDM]+)[\.\)]\s+/) &&
          !lines[i].trim().match(/^[-*•–—]\s+/) &&
          !lines[i].trim().match(/^\d+\.\d+\s+[A-Z]/)
        ) {
          itemBody += ' ' + lines[i].trim();
          i++;
        }

        // Check if item has a bold or term before colon: e.g. "Management Board (Vorstand): Executive managers..."
        const colonMatch = itemBody.match(/^(\*\*[^*]+\*\*|[A-Z][A-Za-z0-9\s\(\)\/–—]+):\s*(.+)$/);
        if (colonMatch) {
          numItems.push({
            number: numPrefix,
            term: colonMatch[1].replace(/\*\*/g, '').trim(),
            text: colonMatch[2].trim(),
          });
        } else {
          numItems.push({
            number: numPrefix,
            text: itemBody,
          });
        }
      }

      if (numItems.length > 0) {
        blocks.push({
          type: 'numbered_list',
          items: numItems,
        });
      }
      continue;
    }

    // H. Bullet List: lines starting with "- ", "* ", "• "
    const bulletMatch = trimmed.match(/^[-*•–—]\s+(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      const bulletItems: { term?: string; text: string; subItems?: string[] }[] = [];

      while (i < lines.length) {
        const bLine = lines[i].trim();
        const bMatch = bLine.match(/^[-*•–—]\s+(.+)$/);
        if (!bMatch) break;

        let itemBody = bMatch[1].trim();
        i++;

        // Consume multi-line continuation
        while (
          i < lines.length &&
          lines[i].trim() &&
          !lines[i].trim().match(/^[-*•–—]\s+/) &&
          !lines[i].trim().match(/^(\d+|[a-zA-Z]|\([a-zA-Z0-9]+\)|[ivxLCDM]+)[\.\)]\s+/) &&
          !lines[i].trim().match(/^\d+\.\d+\s+[A-Z]/)
        ) {
          itemBody += ' ' + lines[i].trim();
          i++;
        }

        // Special handling: if bullet is a major system header with multiple sentences,
        // e.g. "Highly Dispersed System (United States & United Kingdom): Shareholding is widely dispersed..."
        const colonMatch = itemBody.match(/^(\*\*[^*]+\*\*|[A-Z][A-Za-z0-9\s\(\)\/–—\&]+):\s*(.*)$/);
        if (colonMatch) {
          const term = colonMatch[1].replace(/\*\*/g, '').trim();
          const desc = colonMatch[2].trim();

          // If the description contains multiple discrete sentences that act as points,
          // break them down into readable sub-points if >= 2 sentences
          const sentences = desc ? desc.split(/(?<=[.?!])\s+(?=[A-Z"])/).filter(Boolean) : [];
          if (sentences.length > 1) {
            bulletItems.push({
              term,
              text: sentences[0],
              subItems: sentences.slice(1),
            });
          } else {
            bulletItems.push({
              term,
              text: desc,
            });
          }
        } else {
          bulletItems.push({
            text: itemBody,
          });
        }
      }

      if (bulletItems.length > 0) {
        blocks.push({
          type: 'bullet_list',
          items: bulletItems,
        });
      }
      continue;
    }

    // I. Standard body paragraph line
    currentParagraphLines.push(trimmed);
    i++;
  }

  flushParagraph();
  return blocks;
}
