import { Routes, RouterModule } from '@angular/router';
import { AssingComponent } from './assing/assing.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: CreateComponent },
  { path: 'assign-to', component: AssingComponent },
];

export const TaskRoutes = RouterModule.forChild(routes);
