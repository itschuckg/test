# LearnAngular – Guided Fix Exercises

This repository now doubles as a **practice workbook**.  
Use the exercises below to intentionally break/fix features so you learn Angular by doing.

---

## How to use this README

For every topic you will see:

1. **Goal** – what you are learning.
2. **Exercise** – what to implement or fix.
3. **Common mistakes** – what usually goes wrong.
4. **Solution** – a working example.

> Tip: Try the exercise first without reading the solution. Then compare.

---

## 0) Project setup (Basics)

### Goal
Run the app and understand where code lives.

### Exercise
1. Install dependencies.
2. Start the dev server.
3. Identify where template and logic are in the main app component.

### Common mistakes
- Running commands outside project folder.
- Editing generated Angular files without understanding purpose.

### Solution
```bash
npm install
npm run start
```

Main files:
- `src/main.ts` → bootstraps app.
- `src/app/app.ts` → component class (logic).
- `src/app/app.html` → component template (UI).

---

## 1) Interpolation + property binding

### Goal
Display values from TypeScript and bind DOM properties.

### Exercise
In `app.ts` add:
- `title = 'Angular Fix Lab';`
- `logoUrl = 'https://angular.dev/assets/images/press-kit/angular_icon_gradient.gif';`

In `app.html`, render title and image using proper bindings.

### Common mistakes
- Using `{{ }}` inside HTML attributes for DOM properties (`src="{{logoUrl}}"`) in situations where property binding is preferred.
- Misspelling class property names.

### Solution
```ts
// app.ts
export class App {
  title = 'Angular Fix Lab';
  logoUrl = 'https://angular.dev/assets/images/press-kit/angular_icon_gradient.gif';
}
```

```html
<!-- app.html -->
<h1>{{ title }}</h1>
<img [src]="logoUrl" [alt]="title" width="120" />
```

---

## 2) Event binding + two-way style workflow

### Goal
React to user actions and update view state.

### Exercise
Create a counter with + and - buttons.

### Common mistakes
- Forgetting to initialize `count`.
- Calling a method in template that does not exist.

### Solution
```ts
// app.ts
export class App {
  count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
```

```html
<!-- app.html -->
<p>Count: {{ count }}</p>
<button (click)="decrement()">-</button>
<button (click)="increment()">+</button>
```

---

## 3) Conditional rendering

### Goal
Show/hide blocks based on state.

### Exercise
Display a message only when count is greater than 5.

### Common mistakes
- Using assignment (`=`) instead of comparison (`>`, `===`).
- Writing very complex logic directly in template.

### Solution
```html
@if (count > 5) {
  <p>You crossed 5 🎉</p>
}
```

---

## 4) Looping (`@for`) and tracking

### Goal
Render lists efficiently.

### Exercise
Render a task list and support add/remove behavior.

### Common mistakes
- Forgetting `track` expression (hurts rendering performance).
- Mutating array in ways that make debugging hard.

### Solution
```ts
// app.ts
export class App {
  tasks = [
    { id: 1, name: 'Learn interpolation' },
    { id: 2, name: 'Practice @for' },
  ];

  removeTask(id: number) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
```

```html
<!-- app.html -->
<ul>
  @for (task of tasks; track task.id) {
    <li>
      {{ task.name }}
      <button (click)="removeTask(task.id)">Remove</button>
    </li>
  }
</ul>
```

---

## 5) Signals (Angular reactive primitives)

### Goal
Use `signal`, `computed`, and `effect` to manage reactive state.

### Exercise
Refactor counter to signals and create derived text.

### Common mistakes
- Reading signal without calling it (`count` instead of `count()`).
- Mutating signal value directly.

### Solution
```ts
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  count = signal(0);
  label = computed(() => (this.count() >= 10 ? 'High' : 'Low'));

  constructor() {
    effect(() => {
      console.log('count changed:', this.count());
    });
  }

  increment() {
    this.count.update((v) => v + 1);
  }
}
```

```html
<p>Count: {{ count() }}</p>
<p>Level: {{ label() }}</p>
<button (click)="increment()">+</button>
```

---

## 6) Adding components (parent ↔ child)

### Goal
Split UI into reusable components and pass data.

### Exercise
Generate `task-item` component that accepts one task and emits remove event.

### Common mistakes
- Not importing standalone child component into parent.
- Forgetting to emit output event from child.
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

### Solution
Generate component:
```bash
ng generate component task-item
```

Child component:
```ts
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-task-item',
  template: `
    <span>{{ task().name }}</span>
    <button (click)="removed.emit(task().id)">Remove</button>
  `,
})
export class TaskItemComponent {
  task = input.required<{ id: number; name: string }>();
  removed = output<number>();
}
```

Parent usage:
```html
@for (task of tasks; track task.id) {
  <app-task-item [task]="task" (removed)="removeTask($event)" />
}
```

---

## 7) HTTP invocation with `HttpClient`

### Goal
Fetch API data and render loading/error states.

### Exercise
Call a public API (example: JSONPlaceholder todos) and render first 5 items.

### Common mistakes
- Forgetting to provide `HttpClient` support in app config.
- Not handling loading or error state.

### Solution
In `app.config.ts`:
```ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};
```

In `app.ts`:
```ts
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

type Todo = { id: number; title: string; completed: boolean };

export class App {
  private http = inject(HttpClient);
  todos: Todo[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .subscribe({
        next: (data) => {
          this.todos = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load todos';
          this.loading = false;
        },
      });
  }
}
```

In `app.html`:
```html
@if (loading) {
  <p>Loading...</p>
} @else if (error) {
  <p>{{ error }}</p>
} @else {
  <ul>
    @for (todo of todos; track todo.id) {
      <li>{{ todo.title }} - {{ todo.completed ? 'Done' : 'Pending' }}</li>
    }
  </ul>
}
```

---

## 8) Suggested “Fix-It” challenge order

1. Hardcode a value in template → move it to class with interpolation.
2. Add a button click handler.
3. Render list with `@for` + `track`.
4. Convert mutable primitive state to `signal`.
5. Extract one part into child component.
6. Replace hardcoded list with HTTP response.

If something breaks, debug in this order:
1. Template binding names.
2. Component imports/providers.
3. Data shape from API.
4. Console errors.

---

## 9) Useful commands

```bash
npm run start
npm run build
npm run test
ng generate component my-component
```

---

Happy learning 🚀
npm start      # dev server
npm run build  # production build
npm test       # unit tests
```
