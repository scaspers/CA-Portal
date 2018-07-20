import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GALLERY_IMAGE } from 'ngx-image-gallery';

import {
	ImageGalleryComponent,
	MeasurementsFormDialogService
} from '../../shared/index';

import { InspectionHttpService } from '../inspection-http.service';

@Component({
	selector: 'ma-inspection-table',
	templateUrl: './inspection-table.component.html',
	styleUrls: [ './inspection-table.component.scss' ]
})
export class InspectionTableComponent implements OnInit {

	public inspectionItems;
	public showProgress = true;

	public selectedImages: GALLERY_IMAGE[] = [];

	public inspectionId: string;

	@ViewChild(ImageGalleryComponent) maImageGallery: ImageGalleryComponent;
	@ViewChild('inspectionTable') table: any;

	constructor(
		private inspectionService: InspectionHttpService,
		private route: ActivatedRoute,
		private measurementsDialog: MeasurementsFormDialogService ) {
	}

	public ngOnInit(): void {
		this.route.parent.params.subscribe((params) => {
			this.inspectionId = params.id;

			this.inspectionService.getInspectionReport(this.inspectionId, false)
				.subscribe((response) => {
					this.inspectionItems = response;
					// Need to bind images during OnInit for proper initialization of ngxImageGallery
					// These are replaced on image open click in openGallery()
					const firstIIWithImages = this.inspectionItems.find(ii => ii.Images && ii.Images.length > 0);
					this.selectedImages = firstIIWithImages && firstIIWithImages.Images;
				});
		});
	}

	public openGallery(images: GALLERY_IMAGE[], index: number = 0): void {
		// Trigger change detection and dynamically bind new images on button click
		this.selectedImages = images;

		this.maImageGallery.open(index);
	}

	public openMeasurementsDialog(row): void {
		this.measurementsDialog.open(row);
	}

	public toggleExpandRow(row): void {
		this.table.rowDetail.toggleExpandRow(row);
	}

	public onSelect({ selected }): void {
		this.toggleExpandRow(selected[0]);
	}

	public hasDetails(row): boolean {
		return (row.Measurements && row.Measurements.length > 0) ||
			(row.CannedResponses && row.CannedResponses.length > 0) ||
			(row.Note && row.Note.length > 0);
	}
}
