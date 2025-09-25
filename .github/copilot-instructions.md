# Copilot Instructions for fun_app

## Project Overview

- This is a Next.js app focused on a multi-step questionnaire and PDF-based comeback plan generator.
- Main logic and UI flows are in `src/components/form.tsx` and `src/files/temp.tsx`.
- PDF generation uses `@react-pdf/renderer` and includes a custom Habit Tracker.

## Architecture & Data Flow

- The app is structured around a step-based flow (`step` state, 1-5) managed in `QuestionnaireFlow`.
- User answers drive selection of a `Response` object, which contains personalized advice and action steps.
- The PDF plan is generated dynamically based on user input and selected response.
- Habit Tracker is rendered in the PDF as a table/grid, but should be a single column of days (1-31) and X columns of customizable color square checkboxes (see below for pattern).

## Key Files & Patterns

- `src/components/form.tsx`: Main React component, PDF logic, and questionnaire flow.
- `src/files/temp.tsx`: Alternative or legacy implementation of the flow.
- `src/app/start/page.tsx`: Entry point for the questionnaire.
- `src/components/ui/button.tsx`: Custom Button component for consistent UI.

## PDF Habit Tracker Implementation

- Render a table with one column for days ("Day 1", "Day 2", ... "Day 31") and N columns for habits.
- Each habit column should display a row of color square checkboxes (customizable color via prop or style).
- Example pattern:
  - | Day | Habit 1 | Habit 2 | Habit 3 |
  - |-----|---------|---------|---------|
  - | 1 | [ ] | [ ] | [ ] |
  - | 2 | [ ] | [ ] | [ ] |
- Use `View` and `Text` from `@react-pdf/renderer` for layout, and style checkboxes as colored squares.

## Developer Workflows

- **Start dev server:** `npm run dev` (see `README.md`)
- **PDF download:** Uses `PDFDownloadLink` from `@react-pdf/renderer`.
- **UI updates:** Most UI state is managed via React hooks (`useState`).
- **Styling:** Uses Tailwind CSS for web UI, and inline styles for PDF components.

## Conventions & Patterns

- All user flows are step-based, with clear separation of UI and PDF logic.
- PDF styles are defined in a `StyleSheet` object in `form.tsx`.
- Color customization for checkboxes should be handled via props or style overrides.
- Use descriptive variable names for steps, responses, and UI elements.

## Integration Points

- External: `@react-pdf/renderer`, `framer-motion`, `react-icons`, Tailwind CSS.
- Internal: Custom Button, questionnaire logic, and PDF rendering.

## Tips for AI Agents

- When updating the Habit Tracker, ensure the PDF layout matches the single day column + N habit columns pattern.
- Use the `styles` object for PDF component styling; add new styles for colored checkboxes as needed.
- Reference `QuestionnaireFlow` and `ComebackPlanPDF` for main logic.
- Keep UI and PDF logic modular and maintainable.

---

If any section is unclear or missing, please ask for clarification or provide feedback to improve these instructions.
