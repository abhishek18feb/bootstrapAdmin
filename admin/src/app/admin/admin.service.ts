import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
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
  deleteBranch(branchid){
    return this._http.delete<any>('/api/branch/delete_branch/'+branchid)
  }
  getSingleBranch(branchid){
      return this._http.get<any>('/api/branch/get_single_branch/'+branchid)
  }
  updateBranch(id, branchData){
    // let result = JSON.stringify(branchData)
    // console.log(branchData)
    return this._http.patch<any>('/api/branch/update_branch/'+id, branchData)
  }
  addNewStudent(studentData){
    let result = JSON.stringify(studentData)
     console.log(studentData)
     const HttpUploadOptions = {
       headers: new HttpHeaders({ "Accept": "application/json" })
     }

    return this._http.post<any>('/api/student/add_student', studentData, HttpUploadOptions);
  }

}
