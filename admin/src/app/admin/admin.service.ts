import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:HttpClient) { }

  addNewBranch(branchData){
    let result = JSON.stringify(branchData)
    return this._http.post<any>('/api/branch/add_branch', JSON.parse(result));
  }
  getAllBranch(){
    return this._http.get<any>('/api/branch')
  }
}
