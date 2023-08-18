export interface IJobPostionApiResponse {
    status: string;
    code: number;
    data: IJobPosition[];
  }
  
  export interface IJobPosition {
    id: number;
    code: string;
    name: string;
    jobTitle: IJobTitle;
  }
  
  export interface IJobTitle {
    id: number;
    code: string;
    name: string;
  }
  
  export interface IJobPositionCreateUpdate {
    code: string;
    name: string;
    jobTitleId: number;
  }