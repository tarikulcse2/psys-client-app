import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "task",
    loadChildren: () =>
      import("./task/task.module").then(m => m.TaskModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
