import { CommonModule, DatePipe, DecimalPipe, JsonPipe } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

interface Lesson {
  name: string;
  complete: boolean;
}

@Component({
  selector: "app-root",
  imports: [CommonModule, FormsModule, DatePipe, DecimalPipe, JsonPipe],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = "Angular features workshop";
  protected readonly learnerName = signal("Angular Explorer");
  protected readonly currentDate = new Date();
  protected progress = 40.25;
  protected readonly showDebug = signal(false);

  protected readonly lessons = signal<Lesson[]>([
    { name: "Components + templates", complete: true },
    { name: "Data binding", complete: true },
    { name: "Directives and control flow", complete: false },
    { name: "Forms with ngModel", complete: false },
    { name: "Pipes", complete: false },
  ]);

  protected readonly completeCount = computed(
    () => this.lessons().filter((lesson) => lesson.complete).length,
  );

  protected readonly allComplete = computed(
    () => this.completeCount() === this.lessons().length,
  );

  protected readonly completionLabel = computed(() => {
    const total = this.lessons().length;
    return `${this.completeCount()} / ${total} complete`;
  });

  protected updateName(name: string): void {
    this.learnerName.set(name);
  }

  protected toggleLesson(index: number): void {
    this.lessons.update((lessons) =>
      lessons.map((lesson, lessonIndex) =>
        lessonIndex === index
          ? { ...lesson, complete: !lesson.complete }
          : lesson,
      ),
    );
  }

  protected addLesson(name: string): void {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }

    this.lessons.update((lessons) => [...lessons, { name: trimmedName, complete: false }]);
  }
}
