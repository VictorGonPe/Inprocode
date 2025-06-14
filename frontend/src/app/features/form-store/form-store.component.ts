import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../core/services/store.service';
import { Store } from '../../core/interfaces/store.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-store',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-store.component.html',
  styleUrl: './form-store.component.scss'
})
export class FormStoreComponent implements OnInit {
  private fb = inject(FormBuilder);
  private storeService = inject(StoreService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  titleSection = '';

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    location: ['', Validators.required],
    description: [''],
    image: [''],
  });

  storeId: string | null = null;

  ngOnInit(): void {
    this.titleSection = this.route.snapshot.data['titleSection'] || '';
    
    this.route.paramMap.subscribe(params => {
      this.storeId = params.get('id');
      if (this.storeId) {
        this.storeService.getStore(this.storeId).subscribe((store: Store) => {
          this.form.patchValue(store);
        });
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    if (this.storeId) {
      this.storeService.updateStore(this.storeId, this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.storeService.createStore(this.form.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
