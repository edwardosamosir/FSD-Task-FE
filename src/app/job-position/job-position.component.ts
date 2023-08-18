import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { IJobPosition, IJobPositionCreateUpdate, IJobPostionApiResponse } from '../Interfaces/job-position.interface';
import { JobPositionService } from '../services/job-position.service';
import { IJobTitle, IJobTitleApiResponse } from '../Interfaces/job-title.interface';
import { JobTitleService } from '../services/job-title.service';
import { switchMap } from 'rxjs/operators';
import { EmployeeService } from '../services/employee.service';
import { IEmployeeApiResponse } from '../Interfaces/employee.interface';

@Component({
  selector: 'app-job-position',
  templateUrl: './job-position.component.html',
  styleUrls: ['./job-position.component.scss']
})
export class JobPositionComponent implements OnInit {

  constructor(
    private _jobPositionService: JobPositionService,
    private _jobTitleService: JobTitleService,
    private _employeeService: EmployeeService
  ) { }

  public jobPositions: IJobPosition[] = []
  public jobTitles: IJobTitle[] = []
  public usedJobPositions: Map<number, boolean> = new Map();


  customJobTitleTemplate: any;

  ngOnInit(): void {
    this.customJobTitleTemplate = (container: any, options: any) => {
      const data = options.data;
      container.textContent = this.getCustomJobTitle(data);
    };

    this.fetchJobPositions();
    this.fetchJobTitles()
  }
  
  fetchJobPositions(): void {
    this._employeeService.getEmployees() 
        .pipe(
            switchMap((employeeResponse: IEmployeeApiResponse) => {
                employeeResponse.data.forEach((employee) => {
                    if (employee.jobPosition && employee.jobPosition.id) {
                        this.usedJobPositions.set(employee.jobPosition.id, true);
                    }
                });
                return this._jobPositionService.getJobPositions();
            })
        )
        .subscribe((response: IJobPostionApiResponse) => {
            this.jobPositions = response.data.map((position) => {
                return {
                    ...position,
                    isUsed: this.usedJobPositions.has(position.id),
                };
            });
        });
}


  // fetchJobPositions(): void {
  //   this._jobPositionService.getJobPositions()
  //     .subscribe(
  //       (response: IJobPostionApiResponse) => {
  //         this.jobPositions = response.data
  //       }
  //     )
  // }

  fetchJobTitles(): void {
    this._jobTitleService.getJobTitles()
      .subscribe(
        (response: IJobTitleApiResponse) => {
          this.jobTitles = response.data
          // console.log(this.jobTitles)
        }
      )
  }

  @ViewChild('gridContainer') gridContainer!: DxDataGridComponent;

  getCustomJobTitle(jobPositions: IJobPosition): string {
    return jobPositions.jobTitle.code + ' - ' + jobPositions.jobTitle.name; 
  }

  getCustomJobTitleOptions(jobTitles: IJobTitle): string {
    return jobTitles.code + ' - ' + jobTitles.name; 
  }

  save(e: any, isNew: boolean) {
    const jobPositionData = e.row.data;

    if (isNew) {
      const newJobPosition: IJobPositionCreateUpdate = {
        code: jobPositionData.code,
        name: jobPositionData.name,
        jobTitleId: jobPositionData.jobTitle.id
      };

      this._jobPositionService.createJobPosition(newJobPosition).subscribe(
        (response: IJobPosition) => {
          // console.log(response);
          this.fetchJobPositions()
          this.gridContainer.instance.refresh();
          this.cancel()
        },
        (error) => {
          console.error("Error creating job position:", error);
        }
      );
    } else {
      const updatedJobPosition: IJobPositionCreateUpdate = {
        code: jobPositionData.code,
        name: jobPositionData.name,
        jobTitleId: jobPositionData.jobTitle.id
      };
      
      this._jobPositionService.updateJobPosition(jobPositionData.id, updatedJobPosition).subscribe(
        (response: IJobPosition) => {
          // console.log(response);
          this.fetchJobPositions()
          this.gridContainer.instance.refresh();
          this.cancel()
        },
        (error) => {
          console.error("Error updating job position:", error);
        }
      );
    }
  }

  cancel() {
    this.gridContainer.instance.cancelEditData();
  }

  edit(e: any) {
    const indexRow = this.gridContainer.instance.getRowIndexByKey(e.id);
    this.gridContainer.instance.editRow(indexRow);
    
  }

  delete(e: any) {
    const jobPositionId = e.id;
    const indexRow = this.gridContainer.instance.getRowIndexByKey(jobPositionId);

    if (indexRow >= 0) {
      this._jobPositionService.deleteJobPosition(jobPositionId).subscribe(
        () => {
          this.gridContainer.instance.deleteRow(indexRow);
        },
        (error) => {
          console.error("Error deleting job position:", error);
        }
      );
    }
  }

  addRow() {
    this.gridContainer.instance.addRow();
  }

}
