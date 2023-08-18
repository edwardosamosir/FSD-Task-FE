export interface IEmployeeApiResponse {
    status: string;
    code: number;
    data: IEmployee[];
}

export interface IEmployee {
    id: number;
    name: string;
    employeeNumber: string;
    address: string;
    jobPosition: IJobPosition;
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

export interface IEmployeeCreateUpdate {
    name: string;
    employeeNumber: string;
    address: string;
    jobPositionId: number;
  }