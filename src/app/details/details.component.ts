import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
  <article>
    <img class="listing-photo" [src]="housingLocation?.photo"
      alt="Exterior photo of {{housingLocation?.name}}"/>
    <section class="listing-description">
      <a [routerLink]="['/']" class="section-heading">Retour</a>
      <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li>Units available: {{housingLocation?.availableUnits}}</li>
        <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
        <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
      </ul>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">Apply now to live here</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input type="text" formControlName="firstName" id="first-name">

        <label for="last-name">Last Name</label>
        <input type="text" formControlName="lastName" id="last-name">

        <label for="email">First Name</label>
        <input type="email" formControlName="email" id="email">
        <button type="submit" class=" primary">Apply Now</button>
      </form>
    </section>
  </article>
`,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route:ActivatedRoute=inject(ActivatedRoute);
  housingService=inject(HousingService);
  housingLocationId=-1;
  housingLocation:HousingLocation | undefined;
  applyForm=new FormGroup({
    firstName:new FormControl(''),
    lastName:new FormControl(''),
    email:new FormControl(''),
  });
  constructor(){
    this.housingLocationId=Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(this.housingLocationId).then(housingLocation=>{
      this.housingLocation=housingLocation;
    })
  }
  submitApplication()
  {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',

    )
  } 
}
