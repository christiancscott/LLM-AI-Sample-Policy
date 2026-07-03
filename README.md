# 🤖 A Sample Company Policy for Large Language Model Artificial Intelligence (LLM AI)

**Short description:** A practical, customizable policy template for the responsible use of LLM AI (e.g., ChatGPT, Microsoft Copilot, Gemini, Claude). It is designed to protect the confidentiality of company data, the security of systems, the privacy of customer data, and the accuracy of AI outputs, without being so heavy that only a large enterprise could adopt it.

**Author(s):** [Christian Scott](https://tantalum.security/about)

**License:** [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/)

> ⚠️ **No warranty / not legal advice.** There is no warranty as to the completeness or accuracy of this sample policy. I am not a lawyer, and this is not legal advice. If you use this policy, you do so at your own discretion. Curate it to your organization's specific needs and have it reviewed by your own legal counsel before adoption.

---

## Why this template exists

Three years ago, most companies had no guidance on how staff should safely use large language model artificial intelligence (LLM AI). Today, tools like ChatGPT, Microsoft Copilot, Google Gemini, and Claude are part of daily work. Staff use them to write code, draft reports, summarize documents, and create content.

Without guidance, staff can unintentionally endanger the confidentiality of sensitive information, weaken the security of company systems, and violate company policies, contracts, or laws.

This template gives small and mid-sized businesses (SMBs) a solid starting point for governing the ethical, lawful, and secure use of LLM AI. It is deliberately scoped for a typical SMB: comprehensive enough to be credible with customers and auditors, but light enough to actually adopt and maintain. Where a topic involves a real business decision, the template gives you **sample language to choose from** rather than forcing one answer.

---

## Prefer a guided experience?

You can build a customized, branded version of this policy, with your company details, logo, and colors, using the free **[LLM AI Policy Generator](https://tantalum.security/llm-ai-policy-generator)** on the Tantalum Security website. It walks you through every 🔧 KEY DECISION below in plain language and produces a polished Word / PDF draft. It runs entirely in your browser (no registration, and your answers never leave your device). The same ⚠️ no-warranty / not-legal-advice notice above applies to anything it generates.

---

## How to use this template

1. **Replace every `[bracketed placeholder]`** with your own details (company name, contacts, tool names, dates).
2. **Resolve each 🔧 KEY DECISION block.** These mark the choices every company has to make (e.g., whether to allow meeting transcription). Each one offers ready-to-paste sample language at different risk levels. Pick one, paste it into the policy body, and delete the others.
3. **Delete sections you don't need.** Smaller teams can remove the risk-tier table, build-vs-buy section, or multi-jurisdictional section and still have a complete policy.
4. **Have legal counsel review** the result before you publish or enforce it.

> 💡 **How the KEY DECISION blocks work.** Each block presents two or three options, usually labeled **Permissive**, **Balanced**, and **Strict**. The ✅ marks the option that fits most SMBs. There is no universally correct choice; it depends on your industry, data sensitivity, and regulatory exposure.

---

# Corporate Policy on the Use of Large Language Model Artificial Intelligence (LLM AI)

## Document control

| Field | Value |
|---|---|
| Policy title | LLM AI Risk Management & Acceptable Use Policy |
| Version | [1.0] |
| Status | [Draft / Approved] |
| Policy author(s) & maintainer(s) | [Name, role] |
| Policy owner / approver | [Name, role, e.g., owner, COO, or AI/IT lead] |
| Authorization (approval) date | [Date] |
| Last reviewed | [Date] |
| Next review | [Date, at minimum annually, or sooner on material change] |
| Applies to | All staff (employees, contractors, temporaries) and all devices used for company work |

---

## Section 1: Purpose and scope

The purpose of this policy is to establish requirements and guidelines for the use of LLM AI (such as ChatGPT, Microsoft Copilot, Google Gemini, Claude, or similar solutions) by employees, contractors, and temporary workers (collectively, **"staff members"**) of **[Company Name]**, whether on company-owned devices or personal devices used for work (BYOD).

This policy aims to ensure that the use of LLM AI is **ethical, lawful, secure, and consistent** with all company policies, applicable laws, and regulations.

**This policy applies to:**

- All staff members using AI for any company-related purpose.
- All AI systems used for company business, whether company-provided, accessed through company accounts, or independently accessed by staff for work purposes.
- All AI-assisted content, code, decisions, and communications produced in connection with company business.

**Relationship to other policies.** This policy operates alongside and reinforces the company's other policies, including the [Acceptable Use Policy], [Information Security Policy], [Data Classification & Handling Standard], [Code of Conduct], and [Incident Response Plan]. Where this policy addresses a topic more specifically than another policy, the more specific provision governs. Apparent conflicts should be escalated to [policy owner] for resolution.

---

## Section 2: Definitions

- **AI system / LLM AI:** Any large language model, generative AI tool, machine learning model, or algorithmic tool that processes inputs and generates outputs (text, code, images, audio, decisions) used to inform, assist, or automate company work. This includes externally hosted services (e.g., ChatGPT, Copilot), AI features embedded in other software, and any AI built or fine-tuned internally.
- **Approved AI tool:** An AI system that the company has reviewed and authorized for defined uses (see Section 5).
- **Confidential information:** Any non-public company, customer, or employee information, including trade secrets, source code, financial data, strategic plans, and personally identifiable information (PII). See Section 7 for the prohibited-data list.
- **Agentic AI:** An AI system that can take autonomous, multi-step actions, connect to other systems or data, or execute tasks without per-step human instruction (see Section 12).
- **Hallucination:** Plausible-sounding but inaccurate or fabricated AI output.
- **Human in the loop:** A qualified person reviews and is accountable for AI output before it is used or acted upon.

> Standard rules-based automation and classical statistics that do **not** incorporate machine learning are not "AI systems" under this policy, unless combined with AI components that produce generative or probabilistic outputs.

---

## Section 3: Guiding principles

These principles govern how every provision of this policy is interpreted and applied. They are intentionally short so that staff can remember them.

1. **AI assists; humans decide.** AI tools support human judgment; they do not replace it. For any material decision, a qualified human reviews the output and is accountable for it. *"The AI said so"* is never an acceptable basis for a decision.
2. **Accountability traces to a person, not a system.** Whoever uses an AI output owns its accuracy and appropriateness.
3. **Confidentiality first.** When in doubt about whether information is safe to enter into an AI tool, leave it out and ask.
4. **Security and privacy are prerequisites, not afterthoughts.** Tools are vetted before use, not remediated after a problem.
5. **Transparency.** Staff are honest about how AI was used when asked.
6. **Governance enables, not just restricts.** The goal is to help staff use AI confidently and well. Controls are proportionate to risk.
7. **Continuous improvement.** AI changes fast; this is a living document, reviewed and updated as tools, risks, and laws evolve.

---

## Section 4: Key AI risks staff must understand

Before using LLM AI, staff must understand the following inherent risks.

| Risk | What it means | Everyday example |
|---|---|---|
| **Data confidentiality & privacy** | Information entered into AI may be stored, exposed, or used to train the provider's models, potentially disclosing sensitive data, breaching contracts, or violating privacy laws. Provider privacy terms vary widely. | An employee pastes a confidential customer pricing proposal into a public chatbot to improve the wording. That data may now be outside the company's control. |
| **Accuracy & quality (hallucinations)** | AI can produce confident but false information. Decisions or deliverables based on unreviewed output carry real risk. | A team member shares an AI-generated summary of a spec with a customer; it contains an error. The employee, not the tool, is accountable. |
| **Intellectual property & ownership** | Purely AI-generated content may not be copyrightable, may be a derivative of training data, and AI-generated code may carry open-source license obligations (attribution, redistribution, commercial-use limits). | A developer pastes proprietary code into a public AI for debugging; the code may be used in training and AI-suggested code may embed licensed open-source components. |
| **Bias & objectionable content** | AI reflects biases in its training data and may produce discriminatory, offensive, or off-brand content. | An AI used to screen candidates disadvantages a protected group, creating legal and reputational exposure. |
| **Security** | AI introduces threat vectors: prompt injection, data exfiltration via AI interfaces, jailbreaking, and AI-enabled impersonation (deepfake audio/video). | An employee uses AI to summarize an external document that contains hidden prompt-injection instructions; deepfake voice calls impersonate executives. |

> 📌 **Copyright note (United States).** As of the U.S. Copyright Office guidance (88 FR 59942, March 2023), purely AI-generated material without sufficient human authorship cannot be copyrighted, though works with meaningful human selection, arrangement, or modification of AI output may qualify. Source: <https://www.federalregister.gov/documents/2023/03/16/2023-05321/copyright-registration-guidance-works-containing-material-generated-by-artificial-intelligence>. Confirm current guidance and the rules in your jurisdictions with counsel.

---

## Section 5: Approved AI tools and tool approval

Only AI tools that the company has reviewed and approved may be used for company work. The current approved list is maintained at **[location, e.g., intranet page or ticketing catalog]**, which is the authoritative source.

**Currently approved tools:**

| Approved tool | Approved use | Who can use it | Notes / conditions |
|---|---|---|---|
| [e.g., Microsoft 365 Copilot] | [General productivity, drafting, summarizing] | [All staff] | [Company data protection must be confirmed active] |
| [e.g., ChatGPT Team/Enterprise] | [Research, drafting non-confidential content] | [Approved staff] | [Personal/free ChatGPT not permitted for work] |
| [e.g., GitHub Copilot] | [Code assistance] | [Developers] | [Open-source license obligations must be checked] |
| [Add tool] | [Use] | [Audience] | [Conditions] |

**Approval process for new tools.** Any AI tool not on the approved list is prohibited until reviewed. To request one, [submit a request to [contact/process]]. Review covers, at minimum: vendor data-handling and training commitments (Section 7), security posture, license/IP terms, and intended use and risk level. Approval, conditional approval, or denial is recorded on the approved tool list.

> 🔧 **KEY DECISION: Who approves new AI tools?** Match this to your size.
>
> - **Lean (recommended for small teams):** *"AI tool requests are reviewed and approved by [the IT/AI lead], in consultation with [owner/management] for any tool that will touch confidential or customer data."*
> - **Committee:** *"A cross-functional group (IT/Security, Legal/Compliance, and a business sponsor) reviews and approves AI tools. Higher-risk tools require sign-off from [executive sponsor]."*

> 🔧 **KEY DECISION: Shadow AI (staff using unapproved tools).** Pick your posture.
>
> - **Constructive (✅ recommended):** *"Staff who find an unapproved AI tool useful are encouraged to submit it for review rather than using it quietly. The company's concern is protecting data, not penalizing initiative. However, knowingly entering confidential, customer, or regulated data into an unapproved tool is a policy violation."*
> - **Strict:** *"Use of any AI tool not on the approved list for company work is prohibited and treated as a policy violation. The company may technically block access to unapproved AI services."*

---

## Section 6: Risk tiers *(optional, recommended once you have more than a couple of approved tools)*

Classifying AI use into tiers keeps oversight proportionate. Most everyday use is low risk; only a small fraction requires extra scrutiny.

| Tier | What it covers | What's required |
|---|---|---|
| **Tier 1: Standard** | Approved tools, non-confidential data, routine tasks (drafting emails, summarizing public info, brainstorming). | Use an approved tool; apply normal human review before use. No extra approval. |
| **Tier 2: Elevated** | AI use involving confidential company/customer data, outputs feeding a significant decision, or a new tool/use case. | Documented business justification; enhanced human review; [owner/IT] awareness. |
| **Tier 3: High** | Agentic AI connected to company systems; AI in hiring/personnel, customer-facing decisions at scale, or regulated data. | Formal approval from [owner/committee]; named accountable owner; documented risk review and human-oversight design (see Sections 9 and 12). |

> 💡 If your team is small, you can skip formal tiers and simply apply the rule: *"non-confidential plus approved tool equals go; anything involving confidential data or an automated decision means get approval first."*

---

## Section 7: Data protection and confidentiality

Staff must follow all applicable privacy laws and company data policies when using AI.

**Never enter the following into any AI tool unless that specific tool has been explicitly approved to handle it:**

| Prohibited data category | Examples |
|---|---|
| Confidential company information | Strategic plans, unreleased financials, operational secrets, internal-only documents |
| Trade secrets & proprietary IP | Source code for company products, designs, formulas, R&D / unreleased product info |
| Customer confidential data | Customer PII, pricing, contracts, or anything covered by a confidentiality agreement |
| Employee personal information | Employee PII, compensation, health/medical, HR records |
| Regulated data | Anything subject to specific regulatory handling (e.g., financial reporting, health, payment data) |
| Credentials & security details | Passwords, API keys, system architecture, security configurations |

**If confidential data is unintentionally entered into an AI tool**, report it immediately to **[security contact]** and **[legal/compliance contact]** so the exposure can be assessed and contained.

> 🔧 **KEY DECISION: Vendor training on your data.** This is the single most important AI data choice. Pick one.
>
> - **Strict (✅ recommended whenever confidential data is in scope):** *"Confidential, customer, employee, or regulated data may only be used with AI tools that contractually guarantee they will not train their models on the company's prompts, queries, or business data, and that the company retains ownership of all inputs and outputs. Tools without this guarantee may be used for non-confidential data only."*
> - **Balanced:** *"Staff must verify and use available privacy/no-training settings (e.g., business/enterprise tiers, 'chat history & training' turned off) before using any AI tool for work, and must never enter prohibited-category data into consumer tiers."*
> - **Minimum:** *"Confidential information of any kind must never be entered into any public/consumer AI tool, regardless of settings."*

> 🔧 **KEY DECISION: Data retention of AI interactions.** Pick one (consider legal hold, privacy-law minimization, and your industry).
>
> - **Provider default (✅ simplest for most SMBs):** *"AI interaction data is retained according to the approved tool's standard configuration; staff should assume prompts may be logged."*
> - **Defined retention:** *"AI prompts and outputs on company systems are retained for [e.g., 1 year] consistent with the company's records-retention schedule, then disposed of."*
> - **Regulated/long retention:** *"AI interactions (prompts, outputs, timestamps) are retained for [e.g., 5 years] for compliance and audit purposes; audit trails of AI access changes are maintained."*

**Data minimization.** AI tools should be granted access only to the data needed for their function. Overly broad access (e.g., a connected assistant that can read all files) is a security risk and must be reviewed before enabling.

---

## Section 8: Acceptable use, do's and don'ts

**Staff members MUST:**

- Use only approved AI tools, accessed through company accounts where provided.
- Treat all AI output as an *informed first draft, not a finished product*. Apply critical thinking and fact-check before use.
- Verify facts, statistics, citations, and sources in AI output before relying on it.
- Edit AI output for accuracy, clarity, tone, spelling, and grammar appropriate to the audience.
- Keep confidential and prohibited-category data out of AI tools (Section 7).
- Report AI-related security or compliance concerns promptly (Section 19).
- Complete required AI training (Section 18).

**Staff members MUST NOT:**

- Enter prohibited-category data (Section 7) into any tool not approved for it.
- Use AI to generate content that is discriminatory, harassing, offensive, illegal, or contrary to company values.
- Use AI as the *sole* basis for materially important decisions (see Section 9).
- Present substantially AI-generated work as their own original analysis when asked about it.
- Attempt to jailbreak or bypass an AI tool's safety guardrails, or use AI to circumvent company security controls.
- Use unapproved AI tools for company work (see Section 5 shadow-AI decision).

---

## Section 9: Human oversight and accountability

> 🟧 **The core requirement.** AI supports staff judgment; it does not replace it. For any material business decision, a qualified human reviews the output and is accountable for it. *"The AI said so"* is not an acceptable basis for a company decision.

All AI-generated or AI-assisted output used in a material decision, external communication, customer interaction, or compliance-sensitive context must be reviewed by a qualified person before use. A *qualified reviewer* is someone with the knowledge and authority to judge whether the output is accurate and appropriate for its use.

**These decisions always require documented human review** (AI may assist but must not be the sole basis):

- Hiring, performance evaluation, promotion, or discipline of staff.
- Customer pricing, credit, or contractual decisions of material value.
- Safety-related operational decisions.
- Legal or compliance determinations and regulatory reporting.
- Financial reporting, forecasting, or audit-relevant calculations.

---

## Section 10: Transparency and disclosure

Staff should be honest about the role AI played in their work. When a manager, colleague, customer, or reviewer asks whether and how AI was used, staff must answer accurately.

> 🔧 **KEY DECISION: Labeling AI-generated content.** Companies differ here. Pick one.
>
> - **Disclose-on-request (✅ recommended for most SMBs):** *"Internal AI-assisted content does not need a label, but staff must disclose how AI was used when asked, and must not pass off substantially AI-generated work as their own original analysis."*
> - **Label external/public content:** *"AI-assisted material shared externally or published should carry a brief notice such as 'AI assistance was used in creating this document' in the footer or notes. Routine autocomplete (e.g., email suggestions) is exempt."*
> - **Label broadly (most conservative):** *"All AI-generated or AI-assisted content must be clearly labeled as such, internally and externally."*

> 💡 **A note on staff privacy.** If you monitor AI use (e.g., logging prompts on company systems), say so here and in your Acceptable Use Policy. Sample: *"Staff have no special expectation of privacy in their use of AI on company systems or accounts; the company may review AI interaction records to validate appropriate use."*

---

## Section 11: Meeting recording and transcription

AI meeting assistants (auto-recording, transcription, "recap" bots) raise consent, accuracy, and confidentiality concerns, and may be regulated under recording-consent laws.

> 🔧 **KEY DECISION: AI meeting transcription.** Pick one.
>
> - **Prohibit (most conservative; common in regulated or financial firms):** *"Using AI to automatically record or transcribe meetings, calls, or conversations is prohibited. Staff should be aware that automated transcripts can be inaccurate."*
> - **Allow with consent (✅ recommended):** *"AI transcription is permitted only with an approved tool and only when all participants are clearly notified that recording/transcription is active. Transcripts containing confidential content must be handled per Section 7. Do not transcribe meetings where any participant objects or where the subject matter is sensitive (e.g., HR, legal, M&A)."*
> - **Allow broadly:** *"AI transcription with approved tools is permitted for internal meetings; notify participants as a courtesy and handle sensitive transcripts per data-classification rules."*

---

## Section 12: Agentic AI

Agentic AI (systems that take autonomous, multi-step actions, connect to other systems, or act without per-step human instruction) carries a higher risk because errors and security incidents can propagate quickly and broadly.

> 🔧 **KEY DECISION: Agentic / autonomous AI.** Pick one as your starting posture.
>
> - **Prohibit for now (✅ recommended until you're ready):** *"Autonomous/agentic AI that acts on company systems or data without a human in the loop is prohibited. Future use requires advance approval from [owner/committee] with documented controls."*
> - **Allow within approved tools only:** *"Agentic features inside already-approved tools (e.g., Copilot agents operating within the company's configured environment) are permitted under their existing security configuration and the same rules as all other AI use. Net-new agentic systems require approval."*
> - **Allow with controls (for higher-maturity teams):** *"New agentic deployments require, before go-live: [owner/committee] approval; a named accountable owner; documented limits on data access and action authority; a tested human-in-the-loop or intervention mechanism; and an incident-response path for autonomous failures."*

> 💡 If you allow agentic AI that integrates other tools/data (e.g., via Model Context Protocol or similar), additionally require: documented data flows and trust boundaries, data minimization at the integration layer (strip credentials/PII by default), and periodic security testing.

---

## Section 13: AI-generated content, deliverables, and code

AI can be a helpful starting point, but it does not replace the critical thinking, creativity, and judgment of people. Treat every AI output as an initial draft.

- **Trade secrets / core IP:** Do not use AI to generate content intended to become a company trade secret or core intellectual property, where AI involvement could weaken protection. When AI substantially contributes to material meant for IP protection, document the nature and extent of human authorship and AI assistance.
- **Code in company products:**

> 🔧 **KEY DECISION: AI-generated code.** Pick one.
>
> - **Restrict (✅ recommended for product/closed-source code):** *"AI must not be used to generate code incorporated into the company's closed-source products. AI may assist with throwaway scripts and tedious automation (e.g., sorting a dataset). Any such code must be labeled as AI-generated, peer-reviewed, and comply with the company's secure-development and security policies."*
> - **Allow with review:** *"AI coding assistants are permitted for development. AI-suggested code must be reviewed by a developer, checked for open-source license obligations before incorporation, and meet the same quality/security standards as any other code."*

---

## Section 14: Security requirements *(scale to your maturity)*

At minimum:

- AI tools are approved only after a basic security review (Section 5).
- Approved tools must have appropriate safeguards against prompt injection and misuse for any tool with access to company data.
- Where vendors offer configurable safety/jailbreak-resistance settings, enable them at the highest level consistent with the approved use.
- Maintain audit logs of AI tool access changes where the platform supports it.
- Apply data minimization (Section 7) to any AI tool with access to company data.
- Source AI tools from reputable providers; treat any vendor incident involving model tampering or data exposure as a security incident (Section 19).

---

## Section 15: Evaluating bigger AI investments (build vs. buy) *(optional)*

For any significant AI investment (a paid platform, custom build, or anything touching confidential/customer data), do a short, documented evaluation before committing:

- **Problem & fit:** What specific problem does it solve? Does an approved tool already cover it?
- **Cost:** Realistic total cost over roughly three years (licensing or build, integration, maintenance, training, governance).
- **Data profile & risk tier:** What data does it touch, and what tier/approvals does that require (Section 6)?
- **Vendor due diligence (buy):** No-training and data-ownership guarantees; security testing evidence; breach-notification commitments; IP/data-residency terms reviewed by counsel; alignment with a recognized standard (e.g., ISO/IEC 42001, NIST AI RMF, OWASP LLM Top 10) where available.
- **Build governance:** Named owner; documented intended use and human-oversight design; security review before touching production data.
- **Pilot first:** Run a limited-scope pilot with defined success criteria before broad rollout.

---

## Section 16: Multi-jurisdictional considerations *(include only if you operate across borders)*

If the company operates in or serves customers in multiple jurisdictions, AI use may be subject to local rules. [Owner/Legal] monitors developments relevant to the company's operations. Examples to consider:

- **EU:** EU AI Act (phased) and GDPR Article 22 (automated decisions affecting individuals).
- **UK:** Sector-led AI guidance is developing separately from the EU.
- **US:** Sector and state-level rules; FTC guidance on AI claims.

> This policy is not a legal compliance determination for any jurisdiction. Confirm obligations with counsel where AI processes personal data or supports consequential decisions.

---

## Section 17: Insurance

The company should confirm that its insurance coverage (e.g., cyber, professional liability / E&O, general liability) reasonably addresses AI-related scenarios. [Owner/Finance], with the broker, reviews coverage for AI exposure at least annually as the program grows.

---

## Section 18: Training and awareness

All staff complete AI training before or shortly after they begin using AI for work, and **at least annually** thereafter. Training covers: this policy and acceptable use; approved tools and their permitted uses; prohibited data categories; recognizing hallucinations, bias, and AI-specific security risks (prompt injection, deepfake impersonation); and how to report incidents.

> 💡 **Annual training is a floor, not the whole program.** AI changes faster than a yearly cycle. Supplement annual training with brief, ad-hoc updates (new approved tools, new risks) through your normal channels.

---

## Section 19: Incident response

Staff must immediately report suspected AI-related incidents. *Prompt reporting is the most important thing a staff member can do.*

**Report to:** [security contact] and/or [legal/compliance contact]. **Report:**

- Confidential, customer, or regulated data exposed to an AI tool.
- Prompt injection, jailbreaking, or other adversarial AI events.
- Unauthorized AI use, or AI use that may trigger legal/contractual notification duties.
- AI output errors that caused or could cause material harm.
- Suspected deepfake impersonation of staff, executives, or partners.

AI incidents are handled through the company's existing [Incident Response Plan].

---

## Section 20: Governance and roles

> 🔧 **KEY DECISION: Governance model.** Match to your size.
>
> - **Single owner (✅ recommended for small teams):** *"[Role, e.g., IT/AI lead] owns this policy, maintains the approved-tool list, handles tool requests and incidents, and reviews the policy at least annually with [owner/management]."*
> - **Small committee:** *"An AI governance group with representatives from IT/Security, Legal/Compliance, HR, and a business sponsor owns this policy, approves higher-risk tools and use cases, and reviews the program at least annually."*

Typical responsibilities to assign: policy ownership and review; approved tool list maintenance; tool/use-case approvals; incident handling; training delivery; and (if applicable) vendor and regulatory monitoring.

---

## Section 21: Compliance and enforcement

Staff who do not comply with this policy are subject to the company's standard disciplinary process. Knowing or willful misuse of AI, for example, deliberately entering prohibited data into an unapproved tool or using AI for unlawful purposes, may result in further action up to and including termination and, where warranted, legal action.

---

## Section 22: Review and updates

This policy is a living document, reviewed and updated at least annually, and sooner whenever a material change occurs in the company's AI tools, the risk landscape, applicable law, or following an AI incident. Material changes require [owner/committee] approval and are recorded in the revision history.

---

## Section 23: Acknowledgment and acceptance

By using LLM AI for company work, staff members acknowledge that they have read, understood, and agree to comply with this policy. Staff must report any suspected violation to [legal/compliance contact].

> *I acknowledge that I have read and understood the [Company Name] LLM AI Risk Management & Acceptable Use Policy and agree to comply with it.*
>
> Name: ______________________  Signature: ______________________  Date: ____________

---

## Appendix A: Key decisions checklist

Before publishing, confirm you have resolved each 🔧 KEY DECISION:

- [ ] Who approves new AI tools (Section 5)
- [ ] Shadow-AI posture (Section 5)
- [ ] Vendor training on your data (Section 7)
- [ ] Data retention of AI interactions (Section 7)
- [ ] Labeling AI-generated content (Section 10)
- [ ] Meeting transcription (Section 11)
- [ ] Agentic / autonomous AI (Section 12)
- [ ] AI-generated code (Section 13)
- [ ] Governance model (Section 20)
- [ ] All `[bracketed placeholders]` replaced
- [ ] Optional sections (6, 15, 16) kept or removed
- [ ] Reviewed by legal counsel

## Appendix B: Revision history

| Version | Date | Author | Summary of changes |
|---|---|---|---|
| [1.0] | [Date] | [Name] | Initial adoption |

## Appendix C: Useful references

- U.S. Copyright Office guidance on AI-generated works (88 FR 59942): <https://www.federalregister.gov/documents/2023/03/16/2023-05321/copyright-registration-guidance-works-containing-material-generated-by-artificial-intelligence>
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework): voluntary framework for managing AI risks.
- [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/): the most critical security risks for LLM and generative AI applications.
- [OWASP LLM Applications Cybersecurity and Governance Checklist](https://genai.owasp.org/resource/llm-applications-cybersecurity-and-governance-checklist-english/): a practical checklist for securing and governing LLM applications.
- [OWASP State of Agentic AI Security and Governance](https://genai.owasp.org/resource/state-of-agentic-ai-security-and-governance/): guidance on the current state of agentic AI security, governance, and emerging risks.
- [OWASP AI Security Solutions Landscape](https://genai.owasp.org/resource/al-security-solutions-landscape-for-llm-and-gen-al-apps-q2-q3-2025/): an overview of AI security technologies and components across the LLM and generative AI space.
- [OWASP AI Bill of Materials Generator](https://genai.owasp.org/resource/owasp-aibom-generator/): a resource for generating an AI Bill of Materials to inventory models, datasets, prompts, tools, and dependencies.
- ISO/IEC 42001:2023 (AI management systems).

---

*This template is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Attribution: [Christian Scott](https://enclave-regenerous.com/). Not legal advice. Review with your own counsel before use.*
