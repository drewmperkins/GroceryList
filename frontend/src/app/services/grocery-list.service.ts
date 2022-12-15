import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroceryList } from '../models/grocery-list.model';
import { GlobalConstants } from '../global-constants';

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {

  constructor(private httpClient: HttpClient) { }

  get(GroceryListId?: number): Observable<GroceryList[]> {
    var params: HttpParams = new HttpParams();
    if (GroceryListId != undefined) params = params.append('GroceryListId', GroceryListId);
		return this.httpClient.get<GroceryList[]>(GlobalConstants.backendUrl + "/grocerylist", 
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }), 
      params: params 
    });
  }

  post(body: GroceryList): Observable<number> {
    return this.httpClient.post<number>(GlobalConstants.backendUrl + "/grocerylist", 
    body,
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }), 
    });
  }

  delete(GroceryListId: number): Observable<HttpResponse<any>> {
    var params: HttpParams = new HttpParams();
    params = params.append('GroceryListId', GroceryListId);
		return this.httpClient.delete<HttpResponse<any>>(GlobalConstants.backendUrl + "/grocerylist", 
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', }), 
      observe: 'response',
      params: params 
    });
  }
}