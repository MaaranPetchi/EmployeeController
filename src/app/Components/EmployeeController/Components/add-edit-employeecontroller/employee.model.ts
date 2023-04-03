import { EmailValidator } from "@angular/forms"

export interface Employee {

    EmployeeCode: string,
    EmployeeName: string,
    department: number,
    dob: string,
    doj: string,
    martialstatus: string,
    gender: string,
    designation: number,
    bloodgroup: string,
    ischecked: boolean,
    IsInternetAvaible: string,
    SystemLaptop:string,


    reportingManager1: number,
    reportingLeader1: number,
    reportingManager2: number,
    reportingLeader2: number,
    proficiency: number,
    employeeHierachy: number,
    presentaddress1: string,
    permanentaddress1: string,
    presentaddress2: string,

    permanentaddress2: string,
    presentaddress3: string,
    permanentaddress3: string,
    phonenum: number,
    mobileNumber: number,
    emergencyContactName: string,
    emergencyMobilenumber: number,

    officialemailaddress: string,
    employeeProcess: any,
    employeeRoles: any,

    personalEmail: any,
}
