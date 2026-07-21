# Testing Checklist

## Automated

- [x] `npm run build` — production build succeeds
- [x] `npx oxlint` — no lint errors or warnings
- [x] End-to-end browser test (headless Chromium, mobile viewport 390×844): Welcome → Start →
      Questionnaire filled with a sample youth profile → Legacy Profile → Pathways → 30-Day Plan →
      Results → Copy Results (clipboard content verified) → Start Over → back to Welcome. No
      console errors other than the expected `/api/generate` 404 in local dev (Demo Mode
      fallback working as designed).

## Manual (recommended before final submission)

- [ ] Complete the flow on an actual mobile device (iOS/Android browser)
- [ ] Complete the flow with a second, different sample profile (e.g. "unsure" pathway
      preference) to confirm personalization varies sensibly
- [ ] Verify Print / Save as PDF produces a clean, readable printout
- [ ] Verify the educational-use disclaimer is visible on the Welcome and Results screens
- [ ] Confirm no last name / address / school / phone fields exist anywhere in the questionnaire
- [ ] If `OPENAI_API_KEY` is configured on the deployed host, verify live AI results still match
      the required JSON shape and render correctly (and that Demo Mode still works if the key is
      removed)
