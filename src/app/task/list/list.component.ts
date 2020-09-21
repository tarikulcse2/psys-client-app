import { Component, OnInit } from '@angular/core';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { ITask } from 'src/app/models/task';
import { IUser } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tasks: ITask[] = []
  constructor(private alertService: AlertService, 
    private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getAll().subscribe(r => {
      this.tasks = (r as ITask[]) || [];
    })
  }

  delete(id: number){
    if(confirm('do you want to delete task?')){
      this.taskService.delete(id).subscribe(w => {
        this.tasks = this.tasks.filter(t => t.id != id)
        this.alertService.success('task has been delete success')
      })
    }
  }

}
