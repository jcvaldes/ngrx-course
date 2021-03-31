import { Injectable } from '@angular/core';
import { AppState } from '../reducers';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { isLoggedIn } from './auth.selectors';
import { tap } from 'rxjs/operators';
@Injectable()
export class AuthGuard {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }
  canActivate(route: ActivatedRoute,
    state: RouterStateSnapshot)
    : Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn),
      tap(loggedIn => {
        debugger
        if (!loggedIn) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
