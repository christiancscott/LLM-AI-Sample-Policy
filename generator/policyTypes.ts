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

export function parseRuns(text: string): Run[] {
  const runs: Run[] = [];
  // Split on **bold** first, then *italic* within the remainder.
  for (const seg of text.split(/(\*\*[^*]+\*\*)/g)) {
    if (!seg) continue;
    if (seg.startsWith('**') && seg.endsWith('**')) {
      runs.push({ text: seg.slice(2, -2), bold: true });
      continue;
    }
    for (const sub of seg.split(/(\*[^*]+\*)/g)) {
      if (!sub) continue;
      if (sub.startsWith('*') && sub.endsWith('*') && sub.length > 2) {
        runs.push({ text: sub.slice(1, -1), italic: true });
      } else {
        runs.push({ text: sub });
      }
    }
  }
  return runs;
}
