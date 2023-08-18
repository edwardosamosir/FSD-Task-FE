import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { EmployeeService } from '../services/employee.service';
import { IEmployee, IEmployeeApiResponse, IEmployeeCreateUpdate } from '../Interfaces/employee.interface';
import { JobPositionService } from '../services/job-position.service';
import { IJobPosition, IJobPostionApiResponse } from '../Interfaces/job-position.interface';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private _employeeService: EmployeeService,
    private _jobPositionService: JobPositionService
  ) { }

  public employees: IEmployee[] = []
  public jobPositions: IJobPosition[] = []

  customJobTitleTemplate: any;
  customJobPositionTemplate: any;

  ngOnInit(): void {
    this.customJobTitleTemplate = (container: any, options: any) => {
      const data = options.data;
      container.textContent = this.getCustomJobTitle(data);
    };

    this.customJobPositionTemplate = (container: any, options: any) => {
      const data = options.data;
      container.textContent = this.getCustomJobPosition(data);
    };

    this.fetchEmployees();
    this.fetchJobPositions();
  }

  fetchEmployees(): void{
    this._employeeService.getEmployees()
      .subscribe(
        (response: IEmployeeApiResponse) =>{
          this.employees = response.data
        }
      )
  }

  fetchJobPositions(): void {
    this._jobPositionService.getJobPositions()
      .subscribe(
        (response: IJobPostionApiResponse) => {
          this.jobPositions = response.data
        }
      )
  }

  @ViewChild('gridContainer') gridContainer!: DxDataGridComponent;
  getCustomJobTitle(employees: IEmployee): string {
    return employees.jobPosition?.jobTitle?.code + ' - ' + employees.jobPosition?.jobTitle?.name; 
  }
  
  getCustomJobPosition(employees: IEmployee): string {
    return employees.jobPosition?.code + ' - ' + employees.jobPosition?.name; 
  }
  

  getCustomJobPositionOptions(jobPositions: IJobPosition): string {
    return jobPositions.code + ' - ' + jobPositions.name; 
  }

  save(e: any, isNew: boolean) {
    const employeeData = e.row.data;

    if (isNew) {
      const newEmployee: IEmployeeCreateUpdate = {
        name: employeeData.name,
        employeeNumber: employeeData.employeeNumber,
        address: employeeData.address,
        jobPositionId: employeeData.jobPosition.id
      };

      this._employeeService.createEmployee(newEmployee).subscribe(
        (response: IEmployee) => {
          console.log(response);
          this.fetchEmployees()
          this.gridContainer.instance.refresh();
          this.cancel()
        },
        (error) => {
          console.error("Error creating job position:", error);
        }
      );
    } else {
      const updatedEmployee: IEmployeeCreateUpdate = {
        name: employeeData.name,
        employeeNumber: employeeData.employeeNumber,
        address: employeeData.address,
        jobPositionId: employeeData.jobPosition.id
      };
      
      this._employeeService.updateEmployee(employeeData.id, updatedEmployee).subscribe(
        (response: IEmployee) => {
          console.log(response);
          this.fetchEmployees()
          this.gridContainer.instance.refresh();
          this.cancel()
        },
        (error) => {
          console.error("Error updating job position:", error);
        }
      );
    }
  }

  cancel(){
    this.gridContainer.instance.cancelEditData();
  }

  edit(e: any){
    const indexRow = this.gridContainer.instance.getRowIndexByKey(e.id);
    this.gridContainer.instance.editRow(indexRow);
  }

  delete(e: any){
    const employeeId = e.id;
    const indexRow = this.gridContainer.instance.getRowIndexByKey(employeeId);

    if (indexRow >= 0) {
      this._employeeService.deleteEmployee(employeeId).subscribe(
        () => {
          this.gridContainer.instance.deleteRow(indexRow);
        },
        (error) => {
          console.error("Error deleting job title:", error);
        }
      );
    }
  }

  addRow(){
    this.gridContainer.instance.addRow();
  }

}
