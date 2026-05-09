# 佳質食品研發有限公司｜專業食品研發 ODM/OEM、餐飲原物料開發顧問

## Mission
Create implementation-ready, token-driven UI guidance for 佳質食品研發有限公司｜專業食品研發 ODM/OEM、餐飲原物料開發顧問 that is optimized for consistency, accessibility, and fast delivery across e-commerce storefront.

## Brand
- Product/brand: 佳質食品研發有限公司｜專業食品研發 ODM/OEM、餐飲原物料開發顧問
- URL: https://www.value-foods.com.tw/
- Audience: online shoppers and consumers
- Product surface: e-commerce storefront

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=Noto Sans TC`, `font.family.stack=Noto Sans TC, sans-serif`, `font.size.base=15px`, `font.weight.base=400`, `font.lineHeight.base=normal`
- Typography scale: `font.size.xs=13px`, `font.size.sm=14px`, `font.size.md=15px`, `font.size.lg=16px`, `font.size.xl=21.33px`, `font.size.2xl=24.67px`, `font.size.3xl=32px`, `font.size.4xl=40px`
- Color palette: `color.text.primary=#33363f`, `color.text.secondary=#0000ee`, `color.surface.base=#000000`, `color.surface.muted=#ffffff`, `color.surface.raised=#bf3131`, `color.surface.strong=#faaa2f`
- Spacing scale: `space.1=5px`, `space.2=8px`, `space.3=10px`, `space.4=15px`, `space.5=18px`, `space.6=20px`, `space.7=25px`, `space.8=25.6px`
- Radius/shadow/motion tokens: `radius.xs=50px`, `radius.sm=999px` | `shadow.1=rgba(0, 0, 0, 0.1) 0px 3px 13px 0px` | `motion.duration.instant=300ms`, `motion.duration.fast=1000ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (136), buttons (24), lists (16), inputs (2), navigation (1).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
