
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { loadAllCourses } from './course.actions';
// import {areCoursesLoaded} from './courses.selectors.ts.bak';
import { areCoursesLoaded } from './courses.selectors';


@Injectable()
export class CoursesResolver implements Resolve<any> {

  loading = false;

  constructor(private store: Store<AppState>) {

  }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<any> {
    return this.store
      .pipe(
        // tap(() => {
        //   if (!this.loading) {
        //     this.loading = true;
        //     this.store.dispatch(loadAllCourses());
        //   }
        // }),
        select(areCoursesLoaded),
        tap(cousersLoaded => {
          if (!this.loading && !cousersLoaded) {
            this.loading = true;
            this.store.dispatch(loadAllCourses());
          }
        }),
        filter(coursesLoaded => coursesLoaded), // indica que hay data cargado en el store
        first(),
        finalize(() => this.loading = false)
        // select(areCoursesLoaded),
        // tap(coursesLoaded => {
        //     if (!this.loading && !coursesLoaded) {
        //         this.loading = true;
        //         this.store.dispatch(loadAllCourses());
        //     }
        // }),
        // filter(coursesLoaded => coursesLoaded),
        // first(),
        // finalize(() => this.loading = false)
      );

  }

}
