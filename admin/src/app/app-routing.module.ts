import { RouterModule, Routes } from "@angular/router";
import { NgModule  } from "@angular/core";
import { AuthGuard } from "@auth0/auth0-angular";
import { AdminAuthGuard } from "./guards/admin-auth.guard";
import { HomeComponent } from "./home/home.component";
import { ForbiddenComponent } from "./forbidden/forbidden.component";

const appRoutes: Routes = [
	{
		path: '',
    component: HomeComponent,
    // Protect a route by registering the auth guard in the `canActivate` hook
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
		path: 'forbidden',
    component: ForbiddenComponent,
	},
]

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
