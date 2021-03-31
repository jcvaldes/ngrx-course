// Las entities es un objeto persistente que puede escribir o leer en la db
import { compareCourses, Course } from '../model/course';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CourseActions } from '../action-types';

// sin entity
// export interface CoursesState {
//     courses: Course[];
// }
//  export interface CoursesState {
//   entities: {[key: number]: Course};
//   ids: number[];
// }
// con entity
export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean
}
// tiene todas las operaciones de crud y otras custom
export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses // la uso para ordenar por seqNo
});


export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false
});


export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded,
    // addAll: agrega el payload al store
    // (state, action) => adapter.addAll(
    //   action.courses, state
    // )
    (state, action) => adapter.addAll(
      action.courses,
      {
        ...state,
        allCoursesLoaded: true
      }
    )
  ),
  on(CourseActions.courseUpdated, (state, action) => {
    return adapter.updateOne(action.update, state);
  })
);

// exporto todo los selectores para poder usarlos desde otros lados
export const {
  selectAll
} = adapter.getSelectors();
