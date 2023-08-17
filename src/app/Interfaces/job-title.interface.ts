export interface IJobTitleApiResponse {
    status: string;
    code: number;
    data: IJobTitle[];
  }
  
  export interface IJobTitle {
    id: number;
    code: string;
    name: string;
  }

  export interface IJobTitleCreateUpdate {
    code: string;
    name: string;
  }
  
  