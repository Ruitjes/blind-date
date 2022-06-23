import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { CustomAuthService } from '../services/custom-auth.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
	constructor(private auth: CustomAuthService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let contentType;
    let authorization;
		// request headers
		let headers = request.headers;

		if (headers.has('Content-Type')) {
			contentType = headers.get('Content-Type');
		}

		contentType == undefined ?
			(headers = headers.append('Content-Type', 'application/json')) :
      (headers = headers.delete('Content-Type'));


    let token = this.auth.getToken();

    if (headers.has('Authorization')) {
			authorization = headers.get('Authorization');
		}

		authorization == undefined ?
			(headers = headers.append('Authorization', `Bearer ${token}`)) :
      (headers = headers.delete('Authorization'));


		const clonedRequest = request.clone({ headers });

		return next.handle(clonedRequest);
	}
}
