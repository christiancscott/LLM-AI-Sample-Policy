# Generator definitions

These files are the machine-readable version of the sample policy, as used by the free [LLM AI Policy Generator](https://tantalum.security/llm-ai-policy-generator) on the Tantalum Security website. They are published here so the structured form of the template is open alongside the prose version in the main README.

| File | What it defines |
|---|---|
| `policyTypes.ts` | The answer model (`WizardState`), the decision keys, and the renderer-agnostic document block types |
| `wizardConfig.ts` | The wizard questions: every 🔧 KEY DECISION with its options, the plain-language explanations, the exact policy language each option inserts, preset approved tools, and the profile-driven defaults |
| `buildPolicy.ts` | The full document: every section's text, tables, and callouts, plus the assembly logic (placeholder filling, optional sections, dynamic section numbering and cross-references) |

## Keeping the copies in sync

The source of truth for the running generator is the website repository (`Tantalum-Labs/company-website`, under `src/app/(site)/llm-ai-policy-generator/`). The copies here are kept **byte-identical** to those, so you can verify sync with a plain diff:

```sh
diff -r generator/ ../company-website/src/app/\(site\)/llm-ai-policy-generator/ \
  --exclude='*.tsx' --exclude='README.md'
```

When the policy template changes, update three places together:

1. The prose template in this repository's main `README.md`
2. These definition files (and bump `TEMPLATE_VERSION` / `TEMPLATE_DATE` in `buildPolicy.ts`)
3. The website copies of the same files

## License

Same terms as the rest of this repository: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), no warranty, not legal advice.
