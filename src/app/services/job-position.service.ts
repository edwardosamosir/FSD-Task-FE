import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IJobPosition, IJobPositionCreateUpdate, IJobPostionApiResponse } from '../Interfaces/job-position.interface';

@Injectable({
  providedIn: 'root'
})
export class JobPositionService {
  
  private jobPositionUrl = "https://localhost:7257/api/JobPosition"

  constructor(private http: HttpClient) { }

  getJobPositions(): Observable<IJobPostionApiResponse>{
    return this.http.get<IJobPostionApiResponse>(this.jobPositionUrl)
  }

  createJobPosition(JobPosition: IJobPositionCreateUpdate): Observable<IJobPosition> {
    return this.http.post<IJobPosition>(this.jobPositionUrl, JobPosition)
  }

  updateJobPosition(jobPositionId: number, jobPosition: IJobPositionCreateUpdate): Observable<IJobPosition> {
    const updateUrl = `${this.jobPositionUrl}/${jobPositionId}`;
    return this.http.put<IJobPosition>(updateUrl, jobPosition);
  }

  deleteJobPosition(jobPositionId: number): Observable<void> {
    const deleteUrl = `${this.jobPositionUrl}/${jobPositionId}`;
    return this.http.delete<void>(deleteUrl);
  }
}
