import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class BasicService<T> {
  constructor(
    private http: HttpClient,
    private endpoint: string
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.endpoint);
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.endpoint, item);
  }

  update(id: string, item: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.endpoint}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
