import { Injectable } from '@angular/core';
import { Task } from './task';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

/** GET tasklist from the server */
getTasklist(): Observable<Task[]> {
  return this.http.get<Task[]>(this.tasklistUrl)
    .pipe(
      tap(_ => this.log('fetched tasklist')),
      catchError(this.handleError<Task[]>('getTasklist', []))
    );
}

/** GET donelist from the server */
getDonelist(): Observable<Task[]> {
  return this.http.get<Task[]>(this.donelistUrl)
    .pipe(
      tap(_ => this.log('fetched donelist')),
      catchError(this.handleError<Task[]>('getDonelist', []))
    );
}

  /** GET task by id. Will 404 if id not found */
  getTask(id: number): Observable<Task> {
    const url = `${this.tasklistUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_ => this.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** PUT: update the task on the server */
updateTask(task: Task): Observable<any> {
  return this.http.put(this.tasklistUrl, task, this.httpOptions).pipe(
    tap(_ => this.log(`updated task id=${task.id}`)),
    catchError(this.handleError<any>('updateTask'))
  );
}

/** POST: add a new task to the server */
addTask(task: Task): Observable<Task> {
  return this.http.post<Task>(this.tasklistUrl, task, this.httpOptions).pipe(
    tap((newTask: Task) => this.log(`added task w/ id=${newTask.id}`)),
    catchError(this.handleError<Task>('addTask'))
  );
}

/** DELETE: delete the task from the server */
deleteTask(task: Task | number): Observable<Task> {
  const id = typeof task === 'number' ? task : task.id;
  const url = `${this.tasklistUrl}/${id}`;

  return this.http.delete<Task>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted task id=${id}`)),
    catchError(this.handleError<Task>('deleteTask'))
  );
}

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Log a TaskService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TaskService: ${message}`);
  }

  private tasklistUrl = 'api/tasklist';  // URL to web api
  private donelistUrl = 'api/donelist';  // URL to web api
}
