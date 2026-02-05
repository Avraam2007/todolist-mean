import { Routes } from '@angular/router';
import { CardField } from './card-field/card-field';
import { ErrorPage } from './error-page/error-page';

export const routes: Routes = [
    {
        path: '',
        component: CardField
    },
    {
        path: '**',
        component: ErrorPage
    },
];
