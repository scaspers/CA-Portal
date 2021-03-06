import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { remove, sortBy } from 'lodash-es';
import { first } from 'rxjs/operators';

import { VehicleOverview } from './vehicle.models';
import { VehiclesHttpService } from './vehicles-http.service';

@Component({
	selector: 'ma-my-vehicles',
	templateUrl: './my-vehicles.component.html',
	styleUrls: [ './my-vehicles.component.scss' ],
	encapsulation: ViewEncapsulation.Emulated
})
export class MyVehiclesComponent implements OnInit {

	public vehicles: VehicleOverview[] = [];

	constructor(private vehiclesHttpService: VehiclesHttpService) {
	}

	public ngOnInit(): void {
		this.vehiclesHttpService.getVehiclesForClient()
			.pipe(first())
			.subscribe((vehicles) => {
				this.vehicles = sortBy(vehicles, 'aggregateSeverity', 'make', 'model');
				console.log(this.vehicles);
			});
	}

	public onVehicleDeleted(vehicleID: string): void {
		remove(this.vehicles, (v) => v.vehicleID === vehicleID);
	}
}
