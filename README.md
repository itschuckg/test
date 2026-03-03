# LearnAngular Workshop

This branch contains a **step-by-step Angular feature walkthrough** so you can learn by editing and running one app.

## Branch used for workshop

```bash
git checkout feat/angular-step-by-step
```

## Run locally

```bash
npm install
npm start
```

Then open `http://localhost:4200`.

## Step-by-step implementation plan

1. **Component + template basics**
   - `App` is a standalone component (`src/app/app.ts`).
   - Template lives in `src/app/app.html`, styles in `src/app/app.scss`.

2. **Data binding**
   - One-way binding with `{{ }}` interpolation.
   - Event binding with `(input)`.
   - Property binding with `[value]`.

3. **Directives and built-in control flow**
   - `@for` loops through lessons.
   - `@if` shows completion messages.

4. **Forms**
   - `[(ngModel)]` captures numeric progress.
   - Add a custom lesson with input + button event.

5. **Signals + computed state**
   - `signal()` stores name, lessons, and debug state.
   - `computed()` derives progress labels and completion state.

6. **Pipes**
   - `date` pipe for readable dates.
   - `number` and `percent` pipe for progress formatting.
   - `json` pipe for optional debug output.

## Useful scripts

```bash
npm start      # dev server
npm run build  # production build
npm test       # unit tests
```
