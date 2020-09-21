import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-assing',
  templateUrl: './assing.component.html',
  styleUrls: ['./assing.component.scss']
})
export class AssingComponent implements OnInit {
  tasks : any[] = []
  constructor(private taskService: TaskService, 
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    let id = this.authenticationService.currentUserValue.id;
    this.taskService.getAssing(id).subscribe(r => {
      this.tasks = (r as any[]) || [];
    })
  }
}
