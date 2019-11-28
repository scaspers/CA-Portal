import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatButtonToggleModule,
	MatCheckboxModule,
	MatChipsModule,
	MatDatepickerModule,
	MatDialogModule,
	MatIconModule,
	MatInputModule,
	MatNativeDateModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatSelectModule,
	MatStepperModule
} from '@angular/material';

import {
	CanDeactivateGuard,
	SafeUrlModule
} from 'murphy-automotive-shared-library';

import { AppointmentSchedulerRoutingModule } from './appointment-scheduler-routing.module';
import { AppointmentSchedulerComponent } from './appointment-scheduler.component';
import { AppointmentSchedulerHttpService } from './appointment-scheduler-http.service';

@NgModule({
	declarations: [ AppointmentSchedulerComponent ],
	imports: [
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,

		MatAutocompleteModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCheckboxModule,
		MatChipsModule,
		MatDatepickerModule,
		MatDialogModule,
		MatInputModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatSelectModule,
		MatStepperModule,

		SafeUrlModule,

		AppointmentSchedulerRoutingModule
	],
	entryComponents: [ AppointmentSchedulerComponent ],
	providers: [
		AppointmentSchedulerHttpService,
		CanDeactivateGuard,
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: {
				displayDefaultIndicatorType: false,
				showError: true
			}
		}
	]
})
export class AppointmentSchedulerModule {
}
