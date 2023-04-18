import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from './models/task.model';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  createList(title: string) {
    return this.webReqService.post('lists', { title });
  }

  deleteList(id: string) {
    return this.webReqService.delete(`lists/${id}`);
  }

  deleteTask(listId: string, taskId: string) {
    return this.webReqService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  updateList(listId: string, title: string) {
    return this.webReqService.put(`lists/${listId}`, { title });
  }

  updateTask(listId: string, taskId: string, title: string) {
    return this.webReqService.put(`lists/${listId}/tasks/${taskId}`, { title });
  }

  getLists() {
    return this.webReqService.get('lists');
  }

  getList(listId: string) {
    return this.webReqService.get(`lists/${listId}`);
  }

  getTasks(listId: string) {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }

  getTask(listId: string, taskId: string) {
    return this.webReqService.get(`lists/${listId}/tasks/${taskId}`);
  }

  createTask(title: string, listId: string) {
    return this.webReqService.post(`lists/${listId}/tasks`, { title });
  }

  complete(task: Task) {
    return this.webReqService.put(`lists/${task.listId}/tasks/${task.id}`, {
      completed: !task.completed,
      title: task.title
    });
  }

}
