import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
// import {areCoursesLoaded} from './courses.selectors.ts.bak';
import { CourseEntityService } from './course-entity.service';


@Injectable()
export class CoursesResolver implements Resolve<boolean> {

  loading = false;

  constructor(private coursesService: CourseEntityService) {

  }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.coursesService.loaded$
      .pipe(
        tap(loaded => {
          if(!loaded) {
            this.coursesService.getAll();
          }
        }),
        filter(loaded => !!loaded),
        first()
      )
      // return this.coursesService.getAll()
    //     .pipe(
    //         map(courses => !!courses)
    //     );

  }

}