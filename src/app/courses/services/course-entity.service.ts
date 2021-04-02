import {Injectable} from '@angular/core';
import {EntityCollectionServiceBase, EntityCollectionServiceElementsFactory} from '@ngrx/data';
import {Course} from '../model/course';

// es un facade service que permite hacer muchas cosas entre
// las cuales permite manipular las entities en la cache y llenar los datos
// desde el backend, guardar datos y consultar los datos en el store usando
// las entites observables.
// es un facade que permite manejar nuestro course entity state

@Injectable()
export class CourseEntityService
    extends EntityCollectionServiceBase<Course> {

    constructor(
        serviceElementsFactory:
            EntityCollectionServiceElementsFactory) {

        super('Course', serviceElementsFactory);

    }

}