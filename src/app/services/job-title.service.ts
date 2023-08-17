import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IJobTitle, IJobTitleApiResponse, IJobTitleCreateUpdate } from '../Interfaces/job-title.interface';

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {

  private jobTitleUrl: string = "https://localhost:7257/api/JobTitle"

  constructor(private http: HttpClient) { }

  getJobTitles(): Observable<IJobTitleApiResponse> {
    return this.http.get<IJobTitleApiResponse>(this.jobTitleUrl)
  }

  createJobTitle(jobTitle: IJobTitleCreateUpdate): Observable<IJobTitle> {
    return this.http.post<IJobTitle>(this.jobTitleUrl, jobTitle)
  }

  updateJobTitle(jobTitleId: number, jobTitle: IJobTitleCreateUpdate): Observable<IJobTitle> {
    const updateUrl = `${this.jobTitleUrl}/${jobTitleId}`;
    return this.http.put<IJobTitle>(updateUrl, jobTitle);
  }

  deleteJobTitle(jobTitleId: number): Observable<void> {
    const deleteUrl = `${this.jobTitleUrl}/${jobTitleId}`;
    return this.http.delete<void>(deleteUrl);
  }
  
}
