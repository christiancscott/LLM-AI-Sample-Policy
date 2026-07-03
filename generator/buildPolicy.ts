/**
 * Assembles the final policy document from wizard answers.
 *
 * Content is adapted from the Tantalum Security "LLM AI Sample Policy"
 * (github.com/christiancscott/LLM-AI-Sample-Policy, CC BY 4.0, by
 * Christian Scott). The template's KEY DECISION blocks are resolved to the
 * language the user selected, placeholders are filled from their answers,
 * and optional sections are included or dropped. Section numbers and
 * cross-references are computed dynamically so the document stays
 * consistent whichever sections are present.
 */

import type { Block, WizardState } from './policyTypes';
import { ALL_DECISIONS } from './wizardConfig';

export const POLICY_TITLE = 'LLM AI Risk Management & Acceptable Use Policy';
export const GENERATED_VERSION = '2.0';
export const TEMPLATE_VERSION = '1.0';
export const TEMPLATE_DATE = 'July 2026';
export const GENERATOR_URL = 'https://tantalum.security/llm-ai-policy-generator';

export interface PolicyDoc {
  meta: {
    companyName: string;
    title: string;
    version: string;
    status: string;
    effectiveDate: string;
    generatedDate: string;
  };
  blocks: Block[];
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function plusOneYear(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  // Date.UTC rolls invalid days over (29 Feb -> 1 March) so the printed
  // "next review" date is always a real calendar date.
  const next = new Date(Date.UTC(y + 1, m - 1, d));
  return `${next.getUTCDate()} ${MONTHS[next.getUTCMonth()]} ${next.getUTCFullYear()}`;
}

type SectionId =
  | 'purpose' | 'definitions' | 'principles' | 'risks' | 'tools' | 'riskTiers'
  | 'data' | 'acceptableUse' | 'oversight' | 'transparency' | 'transcription'
  | 'agentic' | 'content' | 'security' | 'buildVsBuy' | 'jurisdictions'
  | 'insurance' | 'training' | 'incidents' | 'governance' | 'compliance'
  | 'review' | 'acknowledgment';

export function buildPolicy(state: WizardState, generatedIso: string): PolicyDoc {
  const { company, people, tools, sections } = state;
  // The date input can be cleared; fall back to the generation date so the
  // document control table and cover page never print blank dates.
  const effectiveIso = people.effectiveDate || generatedIso;

  // Function replacers so user-entered values containing `$` substitution
  // patterns ($$, $&, $') are inserted literally, not interpreted.
  const fill = (text: string): string =>
    text
      .replaceAll('{companyName}', () => company.name || '[Company Name]')
      .replaceAll('{policyOwner}', () => people.policyOwner || '[policy owner]')
      .replaceAll('{securityContact}', () => people.securityContact || '[security contact]')
      .replaceAll('{legalContact}', () => people.legalContact || '[legal/compliance contact]');

  const decision = (key: string) => {
    const def = ALL_DECISIONS.find((d) => d.key === key)!;
    return def.options.find((o) => o.id === state.decisions[key as never]) ?? def.options[0];
  };

  /* Pass 1: which sections are in, and what number each gets. */
  const order: SectionId[] = (
    [
      'purpose', 'definitions', 'principles', 'risks', 'tools',
      sections.riskTiers && 'riskTiers',
      'data', 'acceptableUse', 'oversight', 'transparency', 'transcription',
      'agentic', 'content', 'security',
      sections.buildVsBuy && 'buildVsBuy',
      sections.multiJurisdictional && 'jurisdictions',
      'insurance', 'training', 'incidents', 'governance', 'compliance',
      'review', 'acknowledgment',
    ] as (SectionId | false)[]
  ).filter((s): s is SectionId => Boolean(s));

  const num = new Map<SectionId, number>(order.map((id, i) => [id, i + 1]));
  const ref = (id: SectionId) => `Section ${num.get(id)}`;

  const blocks: Block[] = [];
  const push = (...b: Block[]) => blocks.push(...b);
  const heading = (id: SectionId, title: string) => push({ kind: 'h1', text: `Section ${num.get(id)}: ${title}` });
  const p = (text: string) => push({ kind: 'p', text: fill(text) });
  const callout = (text: string) => push({ kind: 'callout', text: fill(text) });
  const bullets = (items: string[]) => push({ kind: 'bullets', items: items.map(fill) });
  const numbered = (items: string[]) => push({ kind: 'numbered', items: items.map(fill) });

  /* ── Document control ────────────────────────────────────────────── */
  push({ kind: 'h1', text: 'Document Control' });
  push({
    kind: 'table',
    header: ['Field', 'Value'],
    widths: [32, 68],
    rows: [
      ['Policy Title', POLICY_TITLE],
      ['Version', GENERATED_VERSION],
      ['Status', 'Draft, pending legal review and formal approval'],
      ['Policy Author(s) & Maintainer(s)', people.generatorRole ? `${people.generatorName}, ${people.generatorRole}` : people.generatorName],
      ['Policy Owner / Approver', people.policyOwner],
      ['Authorization (Approval) Date', 'To be completed upon approval'],
      ['Last Reviewed', formatDate(effectiveIso)],
      ['Next Review', `${plusOneYear(effectiveIso)} (at minimum annually, or sooner on material change)`],
      ['Applies To', 'All staff (employees, contractors, temporaries) and all devices used for company work'],
    ],
  });

  /* ── Purpose and scope ───────────────────────────────────────────── */
  heading('purpose', 'Purpose and Scope');
  p('The purpose of this policy is to establish requirements and guidelines for the use of LLM AI (such as ChatGPT, Microsoft Copilot, Google Gemini, Claude, or similar solutions) by employees, contractors, and temporary workers (collectively, **"staff members"**) of **{companyName}**, whether on company-owned devices or personal devices used for work (BYOD).');
  p('This policy aims to ensure that the use of LLM AI is **ethical, lawful, secure, and consistent** with all company policies, applicable laws, and regulations.');
  p('**This policy applies to:**');
  bullets([
    'All staff members using AI for any company-related purpose.',
    'All AI systems used for company business, whether company-provided, accessed through company accounts, or independently accessed by staff for work purposes.',
    'All AI-assisted content, code, decisions, and communications produced in connection with company business.',
  ]);
  p("**Relationship to other policies.** This policy operates alongside and reinforces the company's other policies, including the Acceptable Use Policy, Information Security Policy, Data Classification & Handling Standard, Code of Conduct, and Incident Response Plan (or their equivalents). Where this policy addresses a topic more specifically than another policy, the more specific provision governs. Apparent conflicts should be escalated to {policyOwner} for resolution.");

  /* ── Definitions ─────────────────────────────────────────────────── */
  heading('definitions', 'Definitions');
  bullets([
    '**AI system / LLM AI:** Any large language model, generative AI tool, machine learning model, or algorithmic tool that processes inputs and generates outputs (text, code, images, audio, decisions) used to inform, assist, or automate company work. This includes externally hosted services (e.g., ChatGPT, Copilot), AI features embedded in other software, and any AI built or fine-tuned internally.',
    `**Approved AI tool:** An AI system that the company has reviewed and authorized for defined uses (see ${ref('tools')}).`,
    `**Confidential information:** Any non-public company, customer, or employee information, including trade secrets, source code, financial data, strategic plans, and personally identifiable information (PII). See ${ref('data')} for the prohibited-data list.`,
    `**Agentic AI:** An AI system that can take autonomous, multi-step actions, connect to other systems or data, or execute tasks without per-step human instruction (see ${ref('agentic')}).`,
    '**Hallucination:** Plausible-sounding but inaccurate or fabricated AI output.',
    '**Human in the loop:** A qualified person reviews and is accountable for AI output before it is used or acted upon.',
  ]);
  callout('Standard rules-based automation and classical statistics that do **not** incorporate machine learning are not "AI systems" under this policy, unless combined with AI components that produce generative or probabilistic outputs.');

  /* ── Guiding principles ──────────────────────────────────────────── */
  heading('principles', 'Guiding Principles');
  p('These principles govern how every provision of this policy is interpreted and applied. They are intentionally short so that staff can remember them.');
  numbered([
    '**AI assists; humans decide.** AI tools support human judgment; they do not replace it. For any material decision, a qualified human reviews the output and is accountable for it. *"The AI said so"* is never an acceptable basis for a decision.',
    '**Accountability traces to a person, not a system.** Whoever uses an AI output owns its accuracy and appropriateness.',
    '**Confidentiality first.** When in doubt about whether information is safe to enter into an AI tool, leave it out and ask.',
    '**Security and privacy are prerequisites, not afterthoughts.** Tools are vetted before use, not remediated after a problem.',
    '**Transparency.** Staff are honest about how AI was used when asked.',
    '**Governance enables, not just restricts.** The goal is to help staff use AI confidently and well. Controls are proportionate to risk.',
    '**Continuous improvement.** AI changes fast; this is a living document, reviewed and updated as tools, risks, and laws evolve.',
  ]);

  /* ── Key AI risks ────────────────────────────────────────────────── */
  heading('risks', 'Key AI Risks Staff Must Understand');
  p('Before using LLM AI, staff must understand the following inherent risks.');
  push({
    kind: 'table',
    header: ['Risk', 'What It Means', 'Everyday Example'],
    widths: [22, 40, 38],
    rows: [
      [
        'Data Confidentiality & Privacy',
        "Information entered into AI may be stored, exposed, or used to train the provider's models, potentially disclosing sensitive data, breaching contracts, or violating privacy laws. Provider privacy terms vary widely.",
        "An employee pastes a confidential customer pricing proposal into a public chatbot to improve the wording. That data may now be outside the company's control.",
      ],
      [
        'Accuracy & Quality (Hallucinations)',
        'AI can produce confident but false information. Decisions or deliverables based on unreviewed output carry real risk.',
        'A team member shares an AI-generated summary of a spec with a customer; it contains an error. The employee, not the tool, is accountable.',
      ],
      [
        'Intellectual Property & Ownership',
        'Purely AI-generated content may not be copyrightable, may be a derivative of training data, and AI-generated code may carry open-source license obligations (attribution, redistribution, commercial-use limits).',
        'A developer pastes proprietary code into a public AI for debugging; the code may be used in training, and AI-suggested code may embed licensed open-source components.',
      ],
      [
        'Bias & Objectionable Content',
        'AI reflects biases in its training data and may produce discriminatory, offensive, or off-brand content.',
        'An AI used to screen candidates disadvantages a protected group, creating legal and reputational exposure.',
      ],
      [
        'Security',
        'AI introduces threat vectors: prompt injection, data exfiltration via AI interfaces, jailbreaking, and AI-enabled impersonation (deepfake audio/video).',
        'An employee uses AI to summarize an external document that contains hidden prompt-injection instructions; deepfake voice calls impersonate executives.',
      ],
    ],
  });
  callout('**Copyright note (United States).** Under U.S. Copyright Office guidance (88 FR 59942, March 2023), purely AI-generated material without sufficient human authorship cannot be copyrighted, though works with meaningful human selection, arrangement, or modification of AI output may qualify. Confirm current guidance and the rules in your jurisdictions with counsel.');

  /* ── Approved tools ──────────────────────────────────────────────── */
  heading('tools', 'Approved AI Tools and Tool Approval');
  p('Only AI tools that the company has reviewed and approved may be used for company work. The current approved list below is maintained by {policyOwner} and is the authoritative source.');
  p('**Currently approved tools:**');
  push({
    kind: 'table',
    header: ['Approved Tool', 'Approved Use', 'Who Can Use It', 'Notes / Conditions'],
    widths: [24, 30, 18, 28],
    rows: tools.length
      ? tools.map((t) => [t.name, t.use, t.audience, t.notes])
      : [['To be determined', 'To be determined', 'N/A', 'No tools approved yet; submit requests per the process below']],
  });
  p(`**Approval process for new tools.** Any AI tool not on the approved list is prohibited until reviewed. ${decision('toolApprover').policy} Review covers, at minimum: vendor data-handling and training commitments (${ref('data')}), security posture, license and IP terms, and intended use and risk level. Approval, conditional approval, or denial is recorded on the approved tool list.`);
  p(`**Unapproved tools ("shadow AI").** ${decision('shadowAi').policy}`);

  /* ── Risk tiers (optional) ───────────────────────────────────────── */
  if (sections.riskTiers) {
    heading('riskTiers', 'Risk Tiers');
    p('Classifying AI use into tiers keeps oversight proportionate. Most everyday use is low risk; only a small fraction requires extra scrutiny.');
    push({
      kind: 'table',
      header: ['Tier', 'What It Covers', "What's Required"],
      widths: [18, 42, 40],
      rows: [
        [
          'Tier 1: Standard',
          'Approved tools, non-confidential data, routine tasks (drafting emails, summarizing public info, brainstorming).',
          'Use an approved tool; apply normal human review before use. No extra approval.',
        ],
        [
          'Tier 2: Elevated',
          'AI use involving confidential company or customer data, outputs feeding a significant decision, or a new tool or use case.',
          `Documented business justification; enhanced human review; awareness of ${people.policyOwner || '[policy owner]'}.`,
        ],
        [
          'Tier 3: High',
          'Agentic AI connected to company systems; AI in hiring or personnel matters, customer-facing decisions at scale, or regulated data.',
          `Formal approval from ${people.policyOwner || '[policy owner]'}; named accountable owner; documented risk review and human-oversight design (see ${ref('oversight')} and ${ref('agentic')}).`,
        ],
      ],
    });
  }

  /* ── Data protection ─────────────────────────────────────────────── */
  heading('data', 'Data Protection and Confidentiality');
  p('Staff must follow all applicable privacy laws and company data policies when using AI.');
  p('**Never enter the following into any AI tool unless that specific tool has been explicitly approved to handle it:**');
  push({
    kind: 'table',
    header: ['Prohibited Data Category', 'Examples'],
    widths: [36, 64],
    rows: [
      ['Confidential Company Information', 'Strategic plans, unreleased financials, operational secrets, internal-only documents'],
      ['Trade Secrets & Proprietary IP', 'Source code for company products, designs, formulas, R&D and unreleased product information'],
      ['Customer Confidential Data', 'Customer PII, pricing, contracts, or anything covered by a confidentiality agreement'],
      ['Employee Personal Information', 'Employee PII, compensation, health/medical information, HR records'],
      ['Regulated Data', 'Anything subject to specific regulatory handling (e.g., financial reporting, health, payment data)'],
      ['Credentials & Security Details', 'Passwords, API keys, system architecture, security configurations'],
    ],
  });
  p('**If confidential data is unintentionally entered into an AI tool**, report it immediately to **{securityContact}** and **{legalContact}** so the exposure can be assessed and contained.');
  p(`**Vendor training on company data.** ${decision('vendorTraining').policy}`);
  p(`**Retention of AI interactions.** ${decision('dataRetention').policy}`);
  p('**Data minimization.** AI tools should be granted access only to the data needed for their function. Overly broad access (e.g., a connected assistant that can read all files) is a security risk and must be reviewed before enabling.');

  /* ── Acceptable use ──────────────────────────────────────────────── */
  heading('acceptableUse', "Acceptable Use: Do's and Don'ts");
  p('**Staff members MUST:**');
  bullets([
    'Use only approved AI tools, accessed through company accounts where provided.',
    'Treat all AI output as an *informed first draft, not a finished product*. Apply critical thinking and fact-check before use.',
    'Verify facts, statistics, citations, and sources in AI output before relying on it.',
    'Edit AI output for accuracy, clarity, tone, spelling, and grammar appropriate to the audience.',
    `Keep confidential and prohibited-category data out of AI tools (${ref('data')}).`,
    `Report AI-related security or compliance concerns promptly (${ref('incidents')}).`,
    `Complete required AI training (${ref('training')}).`,
  ]);
  p('**Staff members MUST NOT:**');
  bullets([
    `Enter prohibited-category data (${ref('data')}) into any tool not approved for it.`,
    'Use AI to generate content that is discriminatory, harassing, offensive, illegal, or contrary to company values.',
    `Use AI as the *sole* basis for materially important decisions (see ${ref('oversight')}).`,
    'Present substantially AI-generated work as their own original analysis when asked about it.',
    "Attempt to jailbreak or bypass an AI tool's safety guardrails, or use AI to circumvent company security controls.",
    `Use unapproved AI tools for company work (see ${ref('tools')}).`,
  ]);

  /* ── Human oversight ─────────────────────────────────────────────── */
  heading('oversight', 'Human Oversight and Accountability');
  callout('**The core requirement.** AI supports staff judgment; it does not replace it. For any material business decision, a qualified human reviews the output and is accountable for it. *"The AI said so"* is not an acceptable basis for a company decision.');
  p('All AI-generated or AI-assisted output used in a material decision, external communication, customer interaction, or compliance-sensitive context must be reviewed by a qualified person before use. A *qualified reviewer* is someone with the knowledge and authority to judge whether the output is accurate and appropriate for its use.');
  p('**These decisions always require documented human review** (AI may assist but must not be the sole basis):');
  bullets([
    'Hiring, performance evaluation, promotion, or discipline of staff.',
    'Customer pricing, credit, or contractual decisions of material value.',
    'Safety-related operational decisions.',
    'Legal or compliance determinations and regulatory reporting.',
    'Financial reporting, forecasting, or audit-relevant calculations.',
  ]);

  /* ── Transparency ────────────────────────────────────────────────── */
  heading('transparency', 'Transparency and Disclosure');
  p('Staff should be honest about the role AI played in their work. When a manager, colleague, customer, or reviewer asks whether and how AI was used, staff must answer accurately.');
  p(`**Labeling AI-assisted content.** ${decision('labeling').policy}`);
  if (state.monitorsAiUse) {
    p('**Monitoring.** Staff have no special expectation of privacy in their use of AI on company systems or accounts; the company may review AI interaction records to validate appropriate use.');
  }

  /* ── Meeting transcription ───────────────────────────────────────── */
  heading('transcription', 'Meeting Recording and Transcription');
  p('AI meeting assistants (auto-recording, transcription, "recap" bots) raise consent, accuracy, and confidentiality concerns, and may be regulated under recording-consent laws.');
  p(decision('transcription').policy);

  /* ── Agentic AI ──────────────────────────────────────────────────── */
  heading('agentic', 'Agentic AI');
  p('Agentic AI (systems that take autonomous, multi-step actions, connect to other systems, or act without per-step human instruction) carries a higher risk because errors and security incidents can propagate quickly and broadly.');
  p(decision('agenticAi').policy);
  if (decision('agenticAi').policyBullets?.length) {
    bullets(decision('agenticAi').policyBullets!);
  }

  /* ── Content, deliverables, code ─────────────────────────────────── */
  heading('content', 'AI-Generated Content, Deliverables, and Code');
  p('AI can be a helpful starting point, but it does not replace the critical thinking, creativity, and judgment of people. Treat every AI output as an initial draft.');
  p('**Trade secrets and core IP.** Do not use AI to generate content intended to become a company trade secret or core intellectual property, where AI involvement could weaken protection. When AI substantially contributes to material meant for IP protection, document the nature and extent of human authorship and AI assistance.');
  p(`**Code in company products.** ${decision('aiCode').policy}`);

  /* ── Security requirements ───────────────────────────────────────── */
  heading('security', 'Security Requirements');
  p('At minimum:');
  bullets([
    `AI tools are approved only after a basic security review (${ref('tools')}).`,
    'Approved tools must have appropriate safeguards against prompt injection and misuse for any tool with access to company data.',
    'Where vendors offer configurable safety or jailbreak-resistance settings, enable them at the highest level consistent with the approved use.',
    'Maintain audit logs of AI tool access changes where the platform supports it.',
    `Apply data minimization (${ref('data')}) to any AI tool with access to company data.`,
    `Source AI tools from reputable providers; treat any vendor incident involving model tampering or data exposure as a security incident (${ref('incidents')}).`,
  ]);

  /* ── Build vs. buy (optional) ────────────────────────────────────── */
  if (sections.buildVsBuy) {
    heading('buildVsBuy', 'Evaluating Bigger AI Investments (Build vs. Buy)');
    p('For any significant AI investment (a paid platform, custom build, or anything touching confidential or customer data), complete a short, documented evaluation before committing:');
    bullets([
      '**Problem & fit:** What specific problem does it solve? Does an approved tool already cover it?',
      '**Cost:** Realistic total cost over roughly three years (licensing or build, integration, maintenance, training, governance).',
      sections.riskTiers
        ? `**Data profile & risk tier:** What data does it touch, and what tier and approvals does that require (${ref('riskTiers')})?`
        : '**Data profile & risk:** What data does it touch, and what approvals does that require?',
      '**Vendor due diligence (buy):** No-training and data-ownership guarantees; security testing evidence; breach-notification commitments; IP and data-residency terms reviewed by counsel; alignment with a recognized standard (e.g., ISO/IEC 42001, NIST AI RMF, OWASP LLM Top 10) where available.',
      '**Build governance:** Named owner; documented intended use and human-oversight design; security review before touching production data.',
      '**Pilot first:** Run a limited-scope pilot with defined success criteria before broad rollout.',
    ]);
  }

  /* ── Multi-jurisdictional (optional) ─────────────────────────────── */
  if (sections.multiJurisdictional) {
    heading('jurisdictions', 'Multi-Jurisdictional Considerations');
    p('Because the company operates in or serves customers in multiple jurisdictions, AI use may be subject to local rules. {policyOwner} monitors developments relevant to the company\'s operations. Examples to consider:');
    bullets([
      '**EU:** EU AI Act (phased) and GDPR Article 22 (automated decisions affecting individuals).',
      '**UK:** Sector-led AI guidance is developing separately from the EU.',
      '**US:** Sector and state-level rules; FTC guidance on AI claims.',
    ]);
    callout('This policy is not a legal compliance determination for any jurisdiction. Confirm obligations with counsel where AI processes personal data or supports consequential decisions.');
  }

  /* ── Insurance ───────────────────────────────────────────────────── */
  heading('insurance', 'Insurance');
  p('The company should confirm that its insurance coverage (e.g., cyber, professional liability / E&O, general liability) reasonably addresses AI-related scenarios. {policyOwner}, with the company\'s broker, reviews coverage for AI exposure at least annually as the program grows.');

  /* ── Training ────────────────────────────────────────────────────── */
  heading('training', 'Training and Awareness');
  p('All staff complete AI training before or shortly after they begin using AI for work, and **at least annually** thereafter. Training covers: this policy and acceptable use; approved tools and their permitted uses; prohibited data categories; recognizing hallucinations, bias, and AI-specific security risks (prompt injection, deepfake impersonation); and how to report incidents.');
  p('Annual training is a floor, not the whole program. AI changes faster than a yearly cycle, so annual training is supplemented with brief, ad-hoc updates (new approved tools, new risks) through the company\'s normal communication channels.');

  /* ── Incident response ───────────────────────────────────────────── */
  heading('incidents', 'Incident Response');
  p('Staff must immediately report suspected AI-related incidents. *Prompt reporting is the most important thing a staff member can do.*');
  p('**Report to:** {securityContact} and/or {legalContact}. **Report:**');
  bullets([
    'Confidential, customer, or regulated data exposed to an AI tool.',
    'Prompt injection, jailbreaking, or other adversarial AI events.',
    'Unauthorized AI use, or AI use that may trigger legal or contractual notification duties.',
    'AI output errors that caused or could cause material harm.',
    'Suspected deepfake impersonation of staff, executives, or partners.',
  ]);
  p("AI incidents are handled through the company's existing Incident Response Plan.");

  /* ── Governance and roles ────────────────────────────────────────── */
  heading('governance', 'Governance and Roles');
  p(decision('governance').policy);
  p('Responsibilities under this policy include: policy ownership and review; approved-tool list maintenance; tool and use-case approvals; incident handling; training delivery; and, where applicable, vendor and regulatory monitoring.');

  /* ── Compliance and enforcement ──────────────────────────────────── */
  heading('compliance', 'Compliance and Enforcement');
  p("Staff who do not comply with this policy are subject to the company's standard disciplinary process. Knowing or willful misuse of AI, for example deliberately entering prohibited data into an unapproved tool or using AI for unlawful purposes, may result in further action up to and including termination and, where warranted, legal action.");

  /* ── Review and updates ──────────────────────────────────────────── */
  heading('review', 'Review and Updates');
  p("This policy is a living document, reviewed and updated at least annually, and sooner whenever a material change occurs in the company's AI tools, the risk landscape, applicable law, or following an AI incident. Material changes require approval from {policyOwner} and are recorded in the revision history.");

  /* ── Acknowledgment ──────────────────────────────────────────────── */
  heading('acknowledgment', 'Acknowledgment and Acceptance');
  p('By using LLM AI for company work, staff members acknowledge that they have read, understood, and agree to comply with this policy. Staff must report any suspected violation to {legalContact}.');
  callout('*I acknowledge that I have read and understood the {companyName} LLM AI Risk Management & Acceptable Use Policy and agree to comply with it.*');
  push({ kind: 'signature' });

  /* ── Appendix A: Revision history (attribution lives here) ───────── */
  push({ kind: 'pagebreak' });
  push({ kind: 'h1', text: 'Appendix A: Revision History' });
  push({
    kind: 'table',
    header: ['Version', 'Date', 'Author', 'Summary of Changes'],
    widths: [12, 18, 30, 40],
    rows: [
      [
        TEMPLATE_VERSION,
        TEMPLATE_DATE,
        'Tantalum Security & the Active Compliance and Ethics Group (ACEG)',
        'Original LLM AI sample policy template, published under CC BY 4.0',
      ],
      [
        GENERATED_VERSION,
        formatDate(generatedIso),
        people.generatorRole ? `${people.generatorName}, ${people.generatorRole}` : (people.generatorName || '[Name]'),
        `Customized for ${company.name || '[Company Name]'} using the Tantalum Security LLM AI Policy Generator (${GENERATOR_URL})`,
      ],
    ],
  });

  /* ── Appendix B: Useful references ───────────────────────────────── */
  push({ kind: 'h1', text: 'Appendix B: Useful References' });
  bullets([
    'NIST AI Risk Management Framework: a voluntary framework for managing AI risks (nist.gov/itl/ai-risk-management-framework).',
    'OWASP Top 10 for LLM Applications: the most critical security risks for LLM and generative AI applications (genai.owasp.org/llm-top-10).',
    'OWASP LLM Applications Cybersecurity and Governance Checklist: a practical checklist for securing and governing LLM applications (genai.owasp.org).',
    'ISO/IEC 42001:2023, the AI management systems standard.',
    'U.S. Copyright Office guidance on AI-generated works (88 FR 59942).',
  ]);

  /* ── Appendix C: Important notice & next steps ───────────────────── */
  push({ kind: 'pagebreak' });
  push({ kind: 'h1', text: 'Appendix C: Important Notice and Next Steps' });
  callout('**This document is not legal advice, and no warranty is provided.** It was generated from a general-purpose template and the answers provided during generation. It is provided "as is", without warranty of any kind as to its completeness, accuracy, or fitness for any particular purpose. It does not constitute legal advice, and using it does not create any advisor-client relationship with Tantalum Security or the template authors. {companyName} is solely responsible for reviewing, adapting, approving, and enforcing this policy.');
  p('**Before adopting this policy, complete these steps:**');
  numbered([
    'Read the full document and adjust any language that does not fit how the company actually operates.',
    `Confirm the approved AI tool list (${ref('tools')}) is accurate and complete, and verify each tool's data-protection settings and contract terms.`,
    '**Have the policy reviewed by qualified legal counsel**, including for employment-law, privacy, and industry-specific regulatory requirements in every jurisdiction where the company operates.',
    'Obtain formal approval from the policy owner or approver, and record the authorization date in the document control table.',
    `Publish the policy, deliver the initial staff training (${ref('training')}), and collect staff acknowledgments.`,
    'Calendar the next review date (at minimum annually).',
  ]);
  p(`*Prepared using the free LLM AI Policy Generator by Tantalum Security (${GENERATOR_URL}), based on the open LLM AI Sample Policy by Christian Scott, published by Tantalum Security and the Active Compliance and Ethics Group (ACEG) under CC BY 4.0. Template version ${TEMPLATE_VERSION}; generated ${formatDate(generatedIso)}.*`);

  return {
    meta: {
      companyName: company.name || '[Company Name]',
      title: POLICY_TITLE,
      version: GENERATED_VERSION,
      status: 'Draft, pending legal review',
      effectiveDate: formatDate(effectiveIso),
      generatedDate: formatDate(generatedIso),
    },
    blocks,
  };
}
