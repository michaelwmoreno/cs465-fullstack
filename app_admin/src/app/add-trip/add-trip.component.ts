import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Make sure to import ReactiveFormsModule
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class AddTripComponent implements OnInit {
  public addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      _id: [], // If _id is not required for form submission, consider removing it if it's not used
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  public onSubmit() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.tripService.addTrip(this.addForm.value).subscribe({
        next: (data: any) => {
          console.log('Trip added successfully:', data);
          this.router.navigate(['/']); // Make sure this route is correctly configured in your routing module
        },
        error: (error: any) => {
          console.error('Error:', error); // It's a good practice to use console.error for errors
        }
      });
    }
  }

  // Getter to access form fields easily in the template
  get f() {
    return this.addForm.controls;
  }
}
