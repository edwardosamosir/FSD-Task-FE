import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee, IEmployeeApiResponse, IEmployeeCreateUpdate } from '../Interfaces/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeUrl = "https://localhost:7257/api/Employee"

  constructor(private http: HttpClient) { }

  getemployees(): Observable<IEmployeeApiResponse>{
    return this.http.get<IEmployeeApiResponse>(this.employeeUrl)
  }

  createEmployee(Employee: IEmployeeCreateUpdate): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.employeeUrl, Employee)
  }

  updateEmployee(employeeId: number, employee: IEmployeeCreateUpdate): Observable<IEmployee> {
    const updateUrl = `${this.employeeUrl}/${employeeId}`;
    return this.http.put<IEmployee>(updateUrl, employee);
  }

  deleteEmployee(employeeId: number): Observable<void> {
    const deleteUrl = `${this.employeeUrl}/${employeeId}`;
    return this.http.delete<void>(deleteUrl);
  }
}
