import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProjectService } from '../project.service';
import { Message } from '../../shared/message/message';

@Component({
  selector: 'app-project-delete',
  templateUrl: './project-delete.component.html',
  styleUrls: ['./project-delete.component.scss']
})
export class ProjectDeleteComponent implements OnInit {

  private deleteLoading: boolean = false;
  private deleteForm: FormGroup;
  private title: AbstractControl;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProjectDeleteComponent>,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private message: Message,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createDeleteForm();
  }

  ngOnInit() {
  }

  // dialog close event
  private onClose(): void {
    this.dialogRef.close();
  }

  // create delete form
  private createDeleteForm() {
    this.deleteForm = this.fb.group({
      title: ['', Validators.compose([Validators.required])]
    });
    this.title = this.deleteForm.controls['title'];
  }

  // deleteform submit event
  private onSubmit(value): any {
    // not valid
    if (this.deleteForm.invalid) {
      return false;
    };
    // not equal
    if (this.data.title !== value.title) {
      this.snackBar.open(this.message.notEqualTitle, 'CLOSE', {duration: 3000});
      return false;
    };

    // loading start
    this.deleteLoading = true;
    // delete project
    this.projectService.deleteProjectFile(this.data.createdAt, `thumbnail${this.data.thumbnail.split('thumbnail')[1].split('?')[0]}`)
    .then((res) => {
      this.projectService.deleteProjectFileMulti(this.data)
      .then(() => {
        this.projectService.deleteProject(this.data.key)
        .then(() => {
          // loading end
          this.deleteLoading = false;
          // close dialog
          this.onClose();
          // redirect
          this.router.navigate(['/project']);
          // alert
          this.snackBar.open(this.message.successDeleteProject, 'CLOSE', {duration: 3000});
        })
        .catch((err) => {
          // loading end
          this.deleteLoading = false;
          // alert
          this.snackBar.open(this.message.failedDeleteProject, 'CLOSE', {duration: 3000});
        })
      })
    })
    .catch((err) => {
      // loading end
      this.deleteLoading = false;
      // alert
      this.snackBar.open(this.message.failedDeleteProjectPhoto, 'CLOSE', {duration: 3000});
    });

  }

}
