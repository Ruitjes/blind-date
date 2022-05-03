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

import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';
import { UsersComponent } from './users/users.component';
import { QuestionsComponent } from './questions/questions.component';
import { AuthButtonComponent } from './auth0/login.component';
import { UserProfileComponent } from './auth0/user.component';
import { UserMetadataComponent } from './auth0/metadata.component';
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';

// Import the injector module and the HTTP client module from Angular
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Import the HTTP interceptor from the Auth0 Angular SDK
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupDialogComponent,
    UsersComponent,
    QuestionsComponent,
    AuthButtonComponent,
    UserProfileComponent,
    UserMetadataComponent,
    ReportsComponent
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
    AuthModule.forRoot({
      // The domain and clientId were configured in the previous chapter
      domain: 'blind-date.eu.auth0.com',
      clientId: 'rlY1Q7b4fqUEk44phOc7JDvXcfEPcT3K',
    
      // Request this audience at user authentication time
      audience: 'https://blind-date.eu.auth0.com/api/v2/',
    
      // Request this scope at user authentication time
      scope: 'read:current_user',
    
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
            }
          }
        ]
      }
    }),    
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
