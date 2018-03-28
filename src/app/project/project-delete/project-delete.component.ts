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

  public deleteLoading: boolean = false;
  public deleteForm: FormGroup;
  public title: AbstractControl;

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProjectDeleteComponent>,
    public fb: FormBuilder,
    public projectService: ProjectService,
    public message: Message,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createDeleteForm();
  }

  ngOnInit() {
  }

  // dialog close event
  public onClose(): void {
    this.dialogRef.close();
  }

  // create delete form
  public createDeleteForm() {
    this.deleteForm = this.fb.group({
      title: ['', Validators.compose([Validators.required])]
    });
    this.title = this.deleteForm.controls['title'];
  }

  // deleteform submit event
  public onSubmit(value): any {
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
