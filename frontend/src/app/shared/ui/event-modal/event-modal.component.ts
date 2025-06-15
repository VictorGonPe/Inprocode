import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-event-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.scss']
})
export class EventModalComponent {
  title = '';

  constructor(
    public dialogRef: MatDialogRef<EventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm() {
    this.dialogRef.close(this.title);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
