import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from 'src/app/models/task';
import { IUser } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  taskForm: FormGroup;
  loading = false;
  submitted = false;
  users: any[] = []
  constructor(private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private taskService: TaskService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      description: ['', Validators.required],
      startTime: [new Date(), Validators.required],
      endTime: [new Date(), Validators.required],
      assignUserId: ['', Validators.required]
    })


    this.route.url.subscribe(t => {
      if(t[0].path == 'edit'){
        let id = Number(t[1].path);
        this.taskService.getById(id).subscribe(r => {
          let task = r as ITask;
          this.taskForm.patchValue({
            id: task.id,
            name: task.name,
            description: task.description,
            startTime: new Date(task.startTime).toISOString().split("T")[0],
            endTime: new Date(task.endTime).toISOString().split("T")[0],
            assignUserId: task.assignUserId
          })
        });
      }
    })

    this.authenticationService.getAllUser().subscribe(r => {
      this.users = (r as any[]) || [];
    })
  }

  get t() {
    return this.taskForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.taskForm.value.id){
      this.loading = true;
      this.taskService.update(this.taskForm.value).subscribe(e => {
        this.loading = false;
        this.alertService.success('task update has been success', true)
        this.router.navigateByUrl('/task')
      })
    } else {
      this.loading = true;
      this.taskService.add(this.taskForm.value).subscribe(e => {
        this.submitted = false;
        this.loading = false;
        this.taskForm.reset()
        this.taskForm.patchValue({
          id: 0,
          name: '',
          description: '',
          startTime: new Date().toISOString().split("T")[0],
          endTime: new Date().toISOString().split("T")[0],
          assignUserId: ''
        })
        this.alertService.success('task has been save success')
      })
    }
  }

}
