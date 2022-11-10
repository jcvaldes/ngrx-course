import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { CoursesHttpService } from "../services/courses-http.service";
import { CourseEntityService } from "../services/course-entity.service";

@Component({
  selector: "course-dialog",
  templateUrl: "./edit-course-dialog.component.html",
  styleUrls: ["./edit-course-dialog.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCourseDialogComponent {
  form: FormGroup;

  dialogTitle: string;

  course: Course;

  mode: "create" | "update";

  loading$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private coursesService: CourseEntityService
  ) {
    this.dialogTitle = data.dialogTitle;
    this.course = data.course;
    this.mode = data.mode;

    const formControls = {
      description: ["", Validators.required],
      category: ["", Validators.required],
      longDescription: ["", Validators.required],
      promo: ["", []],
    };

    if (this.mode == "update") {
      this.form = this.fb.group(formControls);
      this.form.patchValue({ ...data.course });
    } else if (this.mode == "create") {
      this.form = this.fb.group({
        ...formControls,
        url: ["", Validators.required],
        iconUrl: ["", Validators.required],
      });
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    const course: Course = {
      ...this.course,
      ...this.form.value,
    };

    // pesimistic update
    //   this.coursesService
    //     .saveCourse(course.id, course)
    //     .subscribe(() => this.dialogRef.close());
    if (this.mode == 'update') {
      // optimistic operation
      this.coursesService.update(course);
      this.dialogRef.close()
    } else if (this.mode == 'create' ) {
      // asume que es una pesimistic operation por defecto porque espera que 
      // finalice el response desde el backend y luego actualiza el store
      // es asi porque el id debe ser generado por el backend
      this.coursesService.add(course)
      .subscribe(
        newCourse => {
          console.log(newCourse)
          this.dialogRef.close();
        }
      )
    }
  }
}
