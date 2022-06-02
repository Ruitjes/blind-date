import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
	constructor() { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let contentType;
		// request headers
		let headers = request.headers;

		if (headers.has('Content-Type')) {
			contentType = headers.get('Content-Type');
		}

		contentType == undefined ?
			(headers = headers.append('Content-Type', 'application/json')) :
			(headers = headers.delete('Content-Type'));

		const clonedRequest = request.clone({ headers });

		return next.handle(clonedRequest);
	}
}
