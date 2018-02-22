import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InspectionService } from '../../inspection.service';

@Component({
	selector: 'ma-inspection-report-item-list',
	templateUrl: './inspection-report-item-list.component.html',
	styleUrls: [ './inspection-report-item-list.component.scss' ]
})
export class InspectionReportItemListComponent implements OnInit {

	public inspectionItems;
	public inspectionId: string;

	constructor(private inspectionService: InspectionService, private route: ActivatedRoute) {
	}

	public ngOnInit(): void {
		this.route.parent.params.subscribe((params) => {
			this.inspectionId = params.id;

			console.log('ID is', this.inspectionId);

			this.inspectionService.getInspectionReport(this.inspectionId, false)
				.subscribe((response) => {
					this.inspectionItems = response;
				});
		});
	}

}