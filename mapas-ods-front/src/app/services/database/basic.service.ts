import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export class BasicService<T> {
  constructor(
    private http: HttpClient,
    private endpoint: string
  ) { }

  getAll(): Observable<T[]> {
    return this.http.get<{ items: T[] }>(this.endpoint).pipe(
      map(response => response.items)
    );
  }
  //quebraGalho
  getFirst(): Observable<T | null> {
    return this.getAll().pipe(
      map(items => items.length > 0 ? items[0] : null)
    )
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }
  

  create(item: T): Observable<T> {
    console.log(item);
    return this.http.post<T>(this.endpoint, item);
  }

  update(id: string, item: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.endpoint}/${id}`, item);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
