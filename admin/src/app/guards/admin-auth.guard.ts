import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CustomAuthService } from '../services/custom-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private customAuth: CustomAuthService, private router: Router) {
  }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    let decodedToken = await this.customAuth.getDecodedToken();

    let roles : string[] = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    let isAdmin = roles.indexOf("Admin") >= 0;

    // redirect to forbidden if not admin
    if (!isAdmin) {
      this.router.navigate(['forbidden'])
    }

    return isAdmin;
  }
}
