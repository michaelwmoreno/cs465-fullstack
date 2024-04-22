import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from "../services/trip-data.service";

@Component({
  selector: "app-edit-trip",
  templateUrl: "./edit-trip.component.html",
  styleUrls: ["./edit-trip.component.css"],
})
export class EditTripComponent {
  editForm!: FormGroup;
  submitted = false;
  private tripCode: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    // retrieve stashed tripId
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate([""]);
      return;
    }
    console.log("EditTripComponent#onInit found tripCode " + this.tripCode);
    // initialize form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ["", Validators.required],
      length: ["", Validators.required],
      start: ["", Validators.required],
      resort: ["", Validators.required],
      perPerson: ["", Validators.required],
      image: ["", Validators.required],
      description: ["", Validators.required],
    });

    console.log(
      `EditTripComponent#onInit calling TripDataService#getTrip('${this.tripCode}')`);
      //Retrieve the most recent trip data from the database
      this.tripDataService.getTrip(tripCode).then((data)=> {
        console.log('EditTripComponent#onInit data', data);
        this.editForm.patchValue(data[0]);
      })
  }

   onSubmit() {
    console.log(`EditTripComponent#onSubmit calling TripDataService#updateTrip(${this.tripCode}')`);
      this.submitted = true;
      if(this.editForm.valid)
      {
        this.tripDataService.updateTrip(this.editForm.value).then((data)=> {
          console.log('EditTripComponent#onSubmit data', data);
          this.router.navigate(['']);
        });
    }
  }

    // get the form short name to access the form fields
    get f() { 
      return this.editForm.controls;
     } 
    }
