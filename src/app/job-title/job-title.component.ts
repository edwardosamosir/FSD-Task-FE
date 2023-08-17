import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { JobTitleService } from '../services/job-title.service';
import { IJobTitle, IJobTitleApiResponse, IJobTitleCreateUpdate } from '../Interfaces/job-title.interface';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss']
})
export class JobTitleComponent implements OnInit {

  constructor(private _jobTitleService: JobTitleService) { }

  public jobTitles: IJobTitle[] = []

  ngOnInit(): void {
    this.fetchJobTitles()
  }

  fetchJobTitles(): void {
    this._jobTitleService.getJobTitles()
      .subscribe(
        (response: IJobTitleApiResponse) => {
          this.jobTitles = response.data
        }
      )
  }


  @ViewChild('gridContainer') gridContainer!: DxDataGridComponent;

  save(e: any, isNew: boolean) {
    const jobTitleData = e.row.data;

    if (isNew) {
      const newJobTitle: IJobTitleCreateUpdate = {
        code: jobTitleData.code,
        name: jobTitleData.name
      };

      this._jobTitleService.createJobTitle(newJobTitle).subscribe(
        (response: IJobTitle) => {
          // console.log(response);
          this.fetchJobTitles()
          this.gridContainer.instance.refresh();
          this.cancel()
        },
        (error) => {
          console.error("Error creating job title:", error);
        }
      );
    } else {
      const updatedJobTitle: IJobTitleCreateUpdate = {
        code: jobTitleData.code,
        name: jobTitleData.name
      };

      this._jobTitleService.updateJobTitle(jobTitleData.id, updatedJobTitle).subscribe(
        (response: IJobTitle) => {
          // console.log(response);
          this.fetchJobTitles()
          this.gridContainer.instance.refresh();
          this.cancel()
        },
        (error) => {
          console.error("Error updating job title:", error);
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
    const jobTitleId = e.id;
    const indexRow = this.gridContainer.instance.getRowIndexByKey(jobTitleId);

    if (indexRow >= 0) {
      this._jobTitleService.deleteJobTitle(jobTitleId).subscribe(
        () => {
          this.gridContainer.instance.deleteRow(indexRow);
        },
        (error) => {
          console.error("Error deleting job title:", error);
        }
      );
    }
  }

  addRow() {
    this.gridContainer.instance.addRow();
  }

}
