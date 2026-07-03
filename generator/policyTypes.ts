/**
 * Shared types for the LLM AI Policy Generator.
 *
 * The wizard collects a `WizardState`; `buildPolicy.ts` turns it into a
 * renderer-agnostic list of `Block`s that the DOCX, PDF, and HTML preview
 * renderers all consume, so the three outputs can never drift apart.
 */

export type Headcount = '1-10' | '11-50' | '51-250' | '251-1000' | '1000+';

export type DecisionKey =
  | 'toolApprover'
  | 'shadowAi'
  | 'vendorTraining'
  | 'dataRetention'
  | 'labeling'
  | 'transcription'
  | 'agenticAi'
  | 'aiCode'
  | 'governance';

export interface ApprovedTool {
  name: string;
  use: string;
  audience: string;
  notes: string;
  /**
   * Stable id linking a row back to the preset chip it came from, so the
   * chip stays in sync even after the user edits the row's name. Custom
   * rows have no presetKey. Never rendered into the document.
   */
  presetKey?: string;
}

export interface WizardState {
  company: {
    name: string;
    industry: string;
    headcount: Headcount;
    regulated: boolean;
    hasDevelopers: boolean;
    multiJurisdiction: boolean;
  };
  people: {
    generatorName: string;
    generatorRole: string;
    policyOwner: string;
    securityContact: string;
    legalContact: string;
    effectiveDate: string; // yyyy-mm-dd
  };
  tools: ApprovedTool[];
  decisions: Record<DecisionKey, string>;
  monitorsAiUse: boolean;
  sections: {
    riskTiers: boolean;
    buildVsBuy: boolean;
    multiJurisdictional: boolean;
  };
  branding: {
    logoDataUrl: string | null;
    logoWidth: number;
    logoHeight: number;
    primaryColor: string;
    secondaryColor: string;
  };
}

/* ── Document block model ────────────────────────────────────────────── */

export type Block =
  | { kind: 'h1'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'p'; text: string }
  | { kind: 'bullets'; items: string[] }
  | { kind: 'numbered'; items: string[] }
  | { kind: 'table'; header: string[]; rows: string[][]; widths?: number[] }
  | { kind: 'callout'; text: string }
  | { kind: 'signature' }
  | { kind: 'pagebreak' };

/* ── Minimal inline markup: **bold** and *italic* ────────────────────── */

export interface Run {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

/**
 * Italic markers must sit on word boundaries (start/whitespace/bracket before,
 * end/whitespace/punctuation after) so literal asterisks inside prose or
 * user-entered values ("3*4 requests") are never swallowed as markup.
 */
const ITALIC_RE = /(?<=^|[\s([{"'])\*(\S(?:[^*]*\S)?)\*(?=$|[\s)\]}"'.,;:!?])/;

export function parseRuns(text: string): Run[] {
  const runs: Run[] = [];
  const pushWithItalics = (seg: string) => {
    let rest = seg;
    while (rest) {
      const m = ITALIC_RE.exec(rest);
      if (!m) {
        runs.push({ text: rest });
        break;
      }
      if (m.index > 0) runs.push({ text: rest.slice(0, m.index) });
      runs.push({ text: m[1], italic: true });
      rest = rest.slice(m.index + m[0].length);
    }
  };
  // ***bold italic*** first, then **bold**, then boundary-checked *italic*.
  for (const seg of text.split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*)/g)) {
    if (!seg) continue;
    if (seg.startsWith('***') && seg.endsWith('***') && seg.length > 6) {
      runs.push({ text: seg.slice(3, -3), bold: true, italic: true });
    } else if (seg.startsWith('**') && seg.endsWith('**') && seg.length > 4) {
      runs.push({ text: seg.slice(2, -2), bold: true });
    } else {
      pushWithItalics(seg);
    }
  }
  return runs;
}
