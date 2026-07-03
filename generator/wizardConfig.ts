/**
 * Wizard configuration: the nine key decisions from the Tantalum Security
 * LLM AI Sample Policy, preset approved tools, and the profile-driven
 * defaults that pre-select sensible options per company.
 *
 * Each decision option carries the exact policy language that will be
 * inserted into the generated document. Text supports `{tokens}` resolved
 * in buildPolicy.ts ({companyName}, {policyOwner}, {securityContact},
 * {legalContact}) and **bold** / *italic* inline markup.
 */

import type { ApprovedTool, DecisionKey, Headcount, WizardState } from './policyTypes';

export interface DecisionOption {
  id: string;
  label: string;
  /** Shown on the option card in the wizard. */
  summary: string;
  /** The language inserted into the policy document. */
  policy: string;
  /** Extra bullets appended after the paragraph (e.g., agentic controls). */
  policyBullets?: string[];
  /**
   * Where the option sits on the strict-to-permissive spectrum. Drives the
   * color glow on the option card: strict = green, balanced = yellow,
   * open = red. Independent of which option is recommended for a profile.
   */
  risk: RiskLevel;
}

export type RiskLevel = 'strict' | 'balanced' | 'open';

/** Same accent colors as the service tiers on the home page. */
export const RISK_COLORS: Record<RiskLevel, string> = {
  strict: '#22C55E',
  balanced: '#F59E0B',
  open: '#DC2626',
};

export interface Decision {
  key: DecisionKey;
  question: string;
  whyItMatters: string;
  options: DecisionOption[];
}

export interface DecisionGroup {
  title: string;
  intro: string;
  decisions: Decision[];
}

export const DECISION_GROUPS: DecisionGroup[] = [
  {
    title: 'Governance & approval',
    intro: 'Who is in charge of AI decisions at your company, and what happens when staff find tools on their own.',
    decisions: [
      {
        key: 'toolApprover',
        question: 'Who approves new AI tools?',
        whyItMatters:
          'Every AI tool should be reviewed before it touches company data. Match the approval path to your size: a single accountable lead is faster; a committee adds scrutiny for higher-risk tools.',
        options: [
          {
            id: 'lean',
            risk: 'balanced',
            label: 'A single lead',
            summary: 'Your policy owner reviews and approves tools, consulting management for anything touching confidential or customer data. Recommended for smaller teams.',
            policy:
              'AI tool requests are reviewed and approved by {policyOwner}, in consultation with senior management for any tool that will touch confidential or customer data.',
          },
          {
            id: 'committee',
            risk: 'strict',
            label: 'A cross-functional group',
            summary: 'IT/Security, Legal/Compliance, and a business sponsor review together; higher-risk tools need executive sign-off. Better for larger or regulated organizations.',
            policy:
              'A cross-functional group (IT/Security, Legal/Compliance, and a business sponsor) reviews and approves AI tools. Higher-risk tools require sign-off from an executive sponsor.',
          },
        ],
      },
      {
        key: 'shadowAi',
        question: 'How do you treat "shadow AI" (staff using unapproved tools)?',
        whyItMatters:
          'Staff will discover useful AI tools on their own. A constructive posture surfaces them for review; a strict posture draws a hard line and may include technical blocking.',
        options: [
          {
            id: 'constructive',
            risk: 'balanced',
            label: 'Constructive',
            summary: 'Encourage staff to submit useful tools for review rather than using them quietly. Entering confidential data into an unapproved tool is still a violation. Recommended for most companies.',
            policy:
              "Staff who find an unapproved AI tool useful are encouraged to submit it for review rather than using it quietly. The company's concern is protecting data, not penalizing initiative. However, knowingly entering confidential, customer, or regulated data into an unapproved tool is a policy violation.",
          },
          {
            id: 'strict',
            risk: 'strict',
            label: 'Strict',
            summary: 'Any use of unapproved AI tools for company work is a policy violation, and the company may block unapproved AI services.',
            policy:
              'Use of any AI tool not on the approved list for company work is prohibited and treated as a policy violation. The company may technically block access to unapproved AI services.',
          },
        ],
      },
      {
        key: 'governance',
        question: 'Who owns this policy on an ongoing basis?',
        whyItMatters:
          'Someone has to maintain the approved-tool list, handle requests and incidents, and review the policy at least annually.',
        options: [
          {
            id: 'singleOwner',
            risk: 'balanced',
            label: 'Single owner',
            summary: 'Your policy owner runs the whole program and reviews it annually with management. Recommended for small teams.',
            policy:
              '{policyOwner} owns this policy, maintains the approved-tool list, handles tool requests and incidents, and reviews the policy at least annually with senior management.',
          },
          {
            id: 'committee',
            risk: 'strict',
            label: 'Governance group',
            summary: 'A cross-functional AI governance group (IT/Security, Legal/Compliance, HR, business sponsor) owns the program.',
            policy:
              'An AI governance group with representatives from IT/Security, Legal/Compliance, HR, and a business sponsor owns this policy, approves higher-risk tools and use cases, and reviews the program at least annually.',
          },
        ],
      },
    ],
  },
  {
    title: 'Data & privacy',
    intro: 'The rules that keep confidential company and customer data out of the wrong AI tools.',
    decisions: [
      {
        key: 'vendorTraining',
        question: 'Can AI vendors train their models on your data?',
        whyItMatters:
          'This is the single most important AI data decision. Consumer AI tiers may use your prompts to train their models; business tiers usually guarantee they will not.',
        options: [
          {
            id: 'strict',
            risk: 'strict',
            label: 'Strict: contractual no-training guarantee',
            summary: 'Confidential data only goes into tools that contractually guarantee no training on your data and company ownership of inputs and outputs. Recommended whenever confidential data is in scope.',
            policy:
              "Confidential, customer, employee, or regulated data may only be used with AI tools that contractually guarantee they will not train their models on the company's prompts, queries, or business data, and that the company retains ownership of all inputs and outputs. Tools without this guarantee may be used for non-confidential data only.",
          },
          {
            id: 'balanced',
            risk: 'balanced',
            label: 'Balanced: verified privacy settings',
            summary: 'Staff must verify and use available no-training settings before any work use, and never enter prohibited data into consumer tiers.',
            policy:
              "Staff must verify and use available privacy and no-training settings (e.g., business or enterprise tiers, chat history and training turned off) before using any AI tool for work, and must never enter prohibited-category data into consumer tiers.",
          },
          {
            id: 'minimum',
            risk: 'open',
            label: 'Minimum: no confidential data in public tools',
            summary: 'The floor: confidential information never goes into any public or consumer AI tool, regardless of settings.',
            policy:
              'Confidential information of any kind must never be entered into any public or consumer AI tool, regardless of settings.',
          },
        ],
      },
      {
        key: 'dataRetention',
        question: 'How long are AI prompts and outputs retained?',
        whyItMatters:
          'Consider legal hold, privacy-law data minimization, and your industry. Most SMBs simply inherit the approved tool’s configuration; regulated firms often need defined retention and audit trails.',
        options: [
          {
            id: 'providerDefault',
            risk: 'open',
            label: 'Provider default',
            summary: 'AI interaction data follows each approved tool’s standard configuration; staff should assume prompts may be logged. Simplest for most SMBs.',
            policy:
              "AI interaction data is retained according to the approved tool's standard configuration; staff should assume prompts may be logged.",
          },
          {
            id: 'defined',
            risk: 'balanced',
            label: 'Defined retention (one year)',
            summary: 'Prompts and outputs on company systems are kept for one year under your records-retention schedule, then disposed of.',
            policy:
              "AI prompts and outputs on company systems are retained for one year, consistent with the company's records-retention schedule, then disposed of.",
          },
          {
            id: 'regulated',
            risk: 'strict',
            label: 'Long retention for compliance (five years)',
            summary: 'Prompts, outputs, and timestamps are kept for five years for compliance and audit, with audit trails of AI access changes.',
            policy:
              'AI interactions (prompts, outputs, timestamps) are retained for five years for compliance and audit purposes; audit trails of AI access changes are maintained.',
          },
        ],
      },
      {
        key: 'transcription',
        question: 'Are AI meeting recording and transcription allowed?',
        whyItMatters:
          'AI meeting assistants raise consent, accuracy, and confidentiality concerns, and may be regulated under recording-consent laws.',
        options: [
          {
            id: 'prohibit',
            risk: 'strict',
            label: 'Prohibited',
            summary: 'No AI recording or transcription of meetings, calls, or conversations. Common in regulated and financial firms.',
            policy:
              'Using AI to automatically record or transcribe meetings, calls, or conversations is prohibited. Staff should be aware that automated transcripts can be inaccurate.',
          },
          {
            id: 'consent',
            risk: 'balanced',
            label: 'Allowed with notice and consent',
            summary: 'Approved tools only, all participants clearly notified, sensitive meetings (HR, legal, M&A) excluded. Recommended for most companies.',
            policy:
              'AI transcription is permitted only with an approved tool and only when all participants are clearly notified that recording or transcription is active. Transcripts containing confidential content must be handled per the data protection section of this policy. Do not transcribe meetings where any participant objects or where the subject matter is sensitive (e.g., HR, legal, M&A).',
          },
          {
            id: 'broad',
            risk: 'open',
            label: 'Allowed broadly for internal meetings',
            summary: 'Approved tools may transcribe internal meetings; participants notified as a courtesy; sensitive transcripts handled per data-classification rules.',
            policy:
              'AI transcription with approved tools is permitted for internal meetings; notify participants as a courtesy and handle sensitive transcripts per data-classification rules.',
          },
        ],
      },
    ],
  },
  {
    title: 'Content, code & autonomy',
    intro: 'How AI-assisted work products are labeled, whether AI can write production code, and whether AI can act on its own.',
    decisions: [
      {
        key: 'labeling',
        question: 'Does AI-assisted content need to be labeled?',
        whyItMatters:
          'Companies differ here. The floor everywhere: staff must answer honestly when asked how AI was used.',
        options: [
          {
            id: 'onRequest',
            risk: 'open',
            label: 'Disclose on request',
            summary: 'No labels on internal AI-assisted content, but staff must disclose AI use when asked and never pass off AI work as their own analysis. Recommended for most SMBs.',
            policy:
              'Internal AI-assisted content does not need a label, but staff must disclose how AI was used when asked, and must not pass off substantially AI-generated work as their own original analysis.',
          },
          {
            id: 'external',
            risk: 'balanced',
            label: 'Label external content',
            summary: 'AI-assisted material shared externally or published carries a brief notice; routine autocomplete is exempt.',
            policy:
              "AI-assisted material shared externally or published should carry a brief notice such as 'AI assistance was used in creating this document' in the footer or notes. Routine autocomplete (e.g., email suggestions) is exempt.",
          },
          {
            id: 'broad',
            risk: 'strict',
            label: 'Label everything',
            summary: 'All AI-generated or AI-assisted content is labeled, internally and externally. The most conservative posture.',
            policy:
              'All AI-generated or AI-assisted content must be clearly labeled as such, internally and externally.',
          },
        ],
      },
      {
        key: 'aiCode',
        question: 'Can AI write code that ships in your products?',
        whyItMatters:
          'AI-suggested code may embed open-source-licensed components and can weaken trade-secret positions in proprietary code.',
        options: [
          {
            id: 'restrict',
            risk: 'strict',
            label: 'Restrict: no AI code in products',
            summary: 'AI may help with throwaway scripts and tedious automation (labeled and peer-reviewed), but not code shipped in company products. Recommended for closed-source products.',
            policy:
              "AI must not be used to generate code incorporated into the company's closed-source products. AI may assist with throwaway scripts and tedious automation (e.g., sorting a dataset). Any such code must be labeled as AI-generated, peer-reviewed, and comply with the company's secure-development and security policies.",
          },
          {
            id: 'review',
            risk: 'balanced',
            label: 'Allow with review',
            summary: 'AI coding assistants are permitted; all AI-suggested code is developer-reviewed, license-checked, and held to normal quality and security standards.',
            policy:
              'AI coding assistants are permitted for development. AI-suggested code must be reviewed by a developer, checked for open-source license obligations before incorporation, and meet the same quality and security standards as any other code.',
          },
        ],
      },
      {
        key: 'agenticAi',
        question: 'What about agentic AI (systems that act autonomously)?',
        whyItMatters:
          'Agentic AI can take multi-step actions on company systems without per-step human instruction. Errors and security incidents propagate quickly and broadly.',
        options: [
          {
            id: 'prohibit',
            risk: 'strict',
            label: 'Prohibit for now',
            summary: 'No autonomous AI acting on company systems or data without a human in the loop; future use requires advance approval with documented controls. Recommended until you are ready.',
            policy:
              'Autonomous or agentic AI that acts on company systems or data without a human in the loop is prohibited. Future use requires advance approval from {policyOwner} with documented controls.',
          },
          {
            id: 'approvedTools',
            risk: 'balanced',
            label: 'Allow within approved tools only',
            summary: 'Agentic features inside already-approved tools are permitted under their existing security configuration; net-new agentic systems require approval.',
            policy:
              "Agentic features inside already-approved tools (e.g., assistant agents operating within the company's configured environment) are permitted under their existing security configuration and the same rules as all other AI use. Net-new agentic systems require approval.",
          },
          {
            id: 'controls',
            risk: 'open',
            label: 'Allow with controls',
            summary: 'For higher-maturity teams: agentic deployments allowed with a named owner, documented limits, tested human-in-the-loop mechanisms, and an incident-response path.',
            policy:
              'New agentic deployments require, before go-live: approval from {policyOwner}; a named accountable owner; documented limits on data access and action authority; a tested human-in-the-loop or intervention mechanism; and an incident-response path for autonomous failures.',
            policyBullets: [
              'Agentic AI that integrates other tools or data (e.g., via Model Context Protocol or similar) additionally requires documented data flows and trust boundaries, data minimization at the integration layer (strip credentials and PII by default), and periodic security testing.',
            ],
          },
        ],
      },
    ],
  },
];

export const ALL_DECISIONS: Decision[] = DECISION_GROUPS.flatMap((g) => g.decisions);

/* ── Preset approved tools ───────────────────────────────────────────── */

export const PRESET_TOOLS: ApprovedTool[] = [
  {
    name: 'Microsoft 365 Copilot',
    use: 'General productivity: drafting, summarizing, analysis',
    audience: 'All staff',
    notes: 'Commercial data protection must be confirmed active',
  },
  {
    name: 'ChatGPT (Team / Enterprise)',
    use: 'Research, drafting non-confidential content',
    audience: 'Approved staff',
    notes: 'Personal / free ChatGPT is not permitted for work',
  },
  {
    name: 'Claude (Team / Enterprise)',
    use: 'Research, analysis, drafting',
    audience: 'Approved staff',
    notes: 'Consumer accounts are not permitted for work',
  },
  {
    name: 'Google Gemini (Workspace)',
    use: 'Productivity within Google Workspace',
    audience: 'All staff',
    notes: 'Workspace data protections must be confirmed active',
  },
  {
    name: 'GitHub Copilot',
    use: 'Code assistance',
    audience: 'Developers',
    notes: 'Open-source license obligations must be checked',
  },
];

/* ── Profile-driven defaults ─────────────────────────────────────────── */

const LARGER: Headcount[] = ['251-1000', '1000+'];
const MID_UP: Headcount[] = ['51-250', '251-1000', '1000+'];

export function defaultDecisions(company: WizardState['company']): Record<DecisionKey, string> {
  const large = LARGER.includes(company.headcount);
  return {
    toolApprover: large || company.regulated ? 'committee' : 'lean',
    shadowAi: company.regulated ? 'strict' : 'constructive',
    governance: large || company.regulated ? 'committee' : 'singleOwner',
    vendorTraining: 'strict',
    dataRetention: company.regulated ? 'regulated' : 'providerDefault',
    transcription: company.regulated ? 'prohibit' : 'consent',
    labeling: 'onRequest',
    aiCode: 'restrict',
    agenticAi: 'prohibit',
  };
}

export function defaultSections(company: WizardState['company']): WizardState['sections'] {
  return {
    riskTiers: MID_UP.includes(company.headcount),
    buildVsBuy: MID_UP.includes(company.headcount),
    multiJurisdictional: company.multiJurisdiction,
  };
}

export function emptyState(): WizardState {
  const company: WizardState['company'] = {
    name: '',
    industry: '',
    headcount: '11-50',
    regulated: false,
    hasDevelopers: false,
    multiJurisdiction: false,
  };
  return {
    company,
    people: {
      generatorName: '',
      generatorRole: '',
      policyOwner: '',
      securityContact: '',
      legalContact: '',
      // Filled with today's date on mount (client-side) to avoid a
      // server/client hydration mismatch during prerendering.
      effectiveDate: '',
    },
    tools: [PRESET_TOOLS[0]],
    decisions: defaultDecisions(company),
    monitorsAiUse: false,
    sections: defaultSections(company),
    branding: {
      logoDataUrl: null,
      logoWidth: 0,
      logoHeight: 0,
      primaryColor: '#1F3864',
      secondaryColor: '#B45309',
    },
  };
}
