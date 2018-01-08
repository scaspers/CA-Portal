import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InspectionService } from '../../inspection.service';

@Component({
	selector: 'ma-inspection-report',
	templateUrl: './inspection-report.component.html',
	styleUrls: [ './inspection-report.component.scss' ]
})
export class InspectionReportComponent implements OnInit {

	public inspectionGroups;
	public inspectionId: string;

	constructor(private inspectionService: InspectionService, private route: ActivatedRoute) {
	}

	public ngOnInit(): void {
		this.route.parent.params.subscribe((params) => {
			this.inspectionId = params.id;

			console.log('ID is', this.inspectionId);

			this.inspectionService.getInspectionReport(this.inspectionId, true)
				.subscribe((response) => {
					this.inspectionGroups = response;
				});
		});
	}

}
