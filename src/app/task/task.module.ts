import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { TaskRoutes } from './task.routing';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AssingComponent } from './assing/assing.component';

@NgModule({
  imports: [
    CommonModule,
    TaskRoutes,
    ReactiveFormsModule
  ],
  declarations: [TaskComponent, CreateComponent, ListComponent, AssingComponent]
})
export class TaskModule { }
