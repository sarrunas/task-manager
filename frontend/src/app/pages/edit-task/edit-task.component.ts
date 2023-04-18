import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  taskId: string;
  listId: string;
  task?: Task;

  ngOnInit(): void {
      this.route.params.subscribe(
        (params: Params) => {
          if(params['taskId']) {
            this.taskService.getTask(params['listId'], params['taskId']).subscribe((task: any) => {
              this.listId = params['listId'];
              this.taskId = params['taskId'];
            })
          }
          else {
            this.task = undefined;
          }
      })
  }

  updateTask(title: string) {
    this.taskService.updateTask(this.listId, this.taskId, title).subscribe(() => {
      this.router.navigate(['/lists', this.listId]);
    })
  }
}