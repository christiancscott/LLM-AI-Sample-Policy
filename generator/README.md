# Generator definitions

These files are the machine-readable version of the sample policy, as used by the free [LLM AI Policy Generator](https://tantalum.security/llm-ai-policy-generator) on the Tantalum Security website. They are published here so the structured form of the template is open alongside the prose version in the main README.

| File | What it defines |
|---|---|
| `policyTypes.ts` | The answer model (`WizardState`), the decision keys, and the renderer-agnostic document block types |
| `wizardConfig.ts` | The wizard questions: every 🔧 KEY DECISION with its options, the plain-language explanations, the exact policy language each option inserts, preset approved tools, and the profile-driven defaults |
| `buildPolicy.ts` | The full document: every section's text, tables, and callouts, plus the assembly logic (placeholder filling, optional sections, dynamic section numbering and cross-references) |
