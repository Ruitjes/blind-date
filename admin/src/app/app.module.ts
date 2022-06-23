import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';
import { UsersComponent } from './users/users.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { CustomHttpInterceptor } from './interceptors/custom.http.interceptor';

// Import the injector module and the HTTP client module from Angular
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Import the module from the SDK, the HTTP interceptor from the Auth0 Angular SDK
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { ReportsComponent } from './reports/reports.component';

import { LoadingComponent } from './loading/loading.component';
import { UserProfileComponent } from './auth0/user-profile/user-profile.component';
import { UserMetadataComponent } from './auth0/metadata/user-metadata.component';
import { LoginComponent } from './auth0/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

// Environment
import { environment as env } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    PopupDialogComponent,
    UsersComponent,
    UserProfileComponent,
    UserMetadataComponent,
    ReportsComponent,
    LoadingComponent,
    LoginComponent,
    HomeComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    AppRoutingModule,

    AuthModule.forRoot({
      ...env.authManagement,

      // Specify configuration for the interceptor
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://blind-date.eu.auth0.com/api/v2/' (note the asterisk)
            uri: 'https://blind-date.eu.auth0.com/api/v2/*',
            tokenOptions: {
              // The attached token should target this audience
              audience: 'https://blind-date.eu.auth0.com/api/v2/',

              // The attached token should have these scopes
              scope: 'read:current_user'
            },
          },
          //{
          //  uri: `${env.apiUrl}/report-service/reports`,
          //  tokenOptions: {
          //    // The attached token should target this audience
          //    audience: 'seethrough'
          //  },
          //},
          {
            uri: `${env.apiUrl}/report-service/reports/*`,
            tokenOptions: {
              // The attached token should target this audience
              audience: 'seethrough'
            },
          }
        ]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
