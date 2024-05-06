import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RequestClientsService {
  URL = 'http://localhost:3000/requestsClients';
  constructor(private http: HttpClient) {}

  postClient(client: any) {
    this.http.post(this.URL, {...client})
      .subscribe((data) => {
        console.log(data);
      });
  }
}
