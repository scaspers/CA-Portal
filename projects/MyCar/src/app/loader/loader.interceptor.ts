// loader.interceptors.ts
import { Injectable } from '@angular/core';
import {
	HttpResponse,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';

import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';
import { EMPTY, Observable } from 'rxjs';

import { LoaderService } from './loader.service';
import { catchError, filter, tap } from 'rxjs/operators';

/**
 * See
 * https://www.freakyjolly.com/angular-8-7-show-global-progress-bar-loader-on-http-calls-in-3-steps-using-angular-interceptors-in-angular-4-3/
 * for more info
 */
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
	private requests: HttpRequest<any>[] = [];

	constructor(private loaderService: LoaderService, private googleAnalyticsService: NgxAnalyticsGoogleAnalytics) { }

	public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		this.requests.push(req);
		console.log('Request enqueued. Requests pending in queue:', this.requests.length, this.requests.map(r => r.url));
		this.loaderService.isLoading$.next(true);

		return next.handle(req)
				.pipe(
					// TODO DJC send RXJS signal so when logoutLocally occurs, this queue is cleared.
					filter(event => event instanceof HttpResponse),
					tap(() => {
						this.removeRequest(req);
					}),
					catchError((err) => {
						console.error('Loader.interceptor failed. Go investigate why. Error:', err, 'Request', req);
						this.removeRequest(req);

						const slimHttpErrorResponse = {
							httpStatus: err.status,
							requestUrl: err.url,
							message: err.message
						};
						this.googleAnalyticsService.eventTrack('Request Failed', {
							category: 'App Diagnostics',
							label: `HTTP ${slimHttpErrorResponse.httpStatus} Response`,
							value: JSON.stringify(slimHttpErrorResponse)
						});
						return EMPTY;
					})
				);
	}

	private removeRequest(req: HttpRequest<any>): void {
		const i = this.requests.indexOf(req);
		if (i >= 0) {
			this.requests.splice(i, 1);
			console.log('Dequeued a request. Requests pending in queue:', this.requests.length, this.requests.map(r => r.url));
		}
		this.loaderService.isLoading$.next(this.requests.length > 0);
	}
}
