import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/Services/EmployeeController/Core/core.service';
import { EmployeeService } from 'src/app/Services/EmployeeController/employee.service';


//MARTIAL INTERFACE
interface MARTIAL {
  value: string;
  viewValue: string;
}

//Gender INTERFACE
interface GENDER {
  value: string;
  viewValue: string;
}
//BLOODGROUP INTERFACE
interface BLOODGROUP {
  value: string;
  viewValue: string;
}
//IsInternetAvaible INTERFACE
interface IsInternetAvaible {
  value: string;
  viewValue: string;
}
//SystemLaptop INTERFACE
interface SystemLaptop {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-add-edit-employeecontroller',
  templateUrl: './add-edit-employeecontroller.component.html',
  styleUrls: ['./add-edit-employeecontroller.component.scss']
})
export class AddEditEmployeecontrollerComponent {

  //martial status dropdown values
  martials: MARTIAL[] = [
    { value: 'SINGLE', viewValue: 'SINGLE' },
    { value: 'MARRIED', viewValue: 'MARRIED' },
  ];

  //martial status dropdown values
  genders: GENDER[] = [
    { value: 'Male', viewValue: 'Male' },
    { value: 'Female', viewValue: 'Female' },
  ];
  //IsInternetAvaible status dropdown values
  IsInternetAvaibles: IsInternetAvaible[] = [
    { value: 'Yes', viewValue: 'Yes' },
    { value: 'No', viewValue: 'No' },
  ];
  //SystemLaptop status dropdown values
  SystemLaptop: SystemLaptop[] = [
    { value: 'Yes', viewValue: 'Yes' },
    { value: 'No', viewValue: 'No' },
  ];

  //bloodgroup status dropdown values
  bloodgroups: BLOODGROUP[] = [
    { value: 'A+', viewValue: 'A+' },
    { value: 'A-', viewValue: 'A-' },
    { value: 'A1+', viewValue: 'A1+' },
    { value: 'A1B+', viewValue: 'A1B+' },
    { value: 'AB+', viewValue: 'AB+' },
    { value: 'AB-', viewValue: 'AB-' },
    { value: 'B+', viewValue: 'B+' },
    { value: 'B-', viewValue: 'B-' },
    { value: 'O+', viewValue: 'O+' },
    { value: 'O-', viewValue: 'O-' },

  ];

  //Reporting Manager 1
  rm1options: any[] | any;
  selectedmanger1Value: string | any;

  //Reporting Leader 1
  rl1options: any[] | any;
  selectedleader1Value: string | any;
  //Reporting Manager 2
  rm2options: any[] | any;
  selectedmanger2Value: string | any;

  //Reporting Leader 2
  rl2options: any[] | any;
  selectedleader2Value: string | any;

  //EmployeeProcess
  selectEmployeeprocessControl = new FormControl();
  employeeprocessOptions: any[] | any;
  //EmployeeRole
  selectEmployeeRoleControl = new FormControl();

  //EmployeeRole
  EmployeeRolesoptions: any[] | any;


  constructor(
    private _formBuilder: FormBuilder,
    private _empService: EmployeeService,
    private http: HttpClient,
    private _dialogRef: MatDialogRef<AddEditEmployeecontrollerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) { }
  isLinear = false;

  //department dropdowndeclaration
  selecteddepartmentOption: any = '';
  Departmentdropdownvalues: any[] = [];

  //EmployeeHierarchy
  selectControl = new FormControl();
  EmployeeHierarchyOptions: any[] | any;
  //designation dropdowndeclaration
  selecteddesignationOption: any = '';
  Designationdropdownvalues: any[] = [];

  //proficiency
  proficiencyoptions: any[] | any;
  ngOnInit(): void {

    // department dropdown fetch the values from the API
    this.http.get<any>('https://localhost:7208/api/Employee/GetDropDownList').subscribe(departmentdata => {
      this.Departmentdropdownvalues = departmentdata.departmentList;
    });

    // designation dropdown fetch the values from the API
    this.http.get<any>('https://localhost:7208/api/Employee/GetDropDownList').subscribe(designationdata => {
      this.Designationdropdownvalues = designationdata.designationList;
    });

    //reporting manager and leader 1 & 2 
    this.http.get<any>('https://localhost:7208/api/Employee/GetEmployeeList').subscribe(departmentdata => {
      this.rm1options = departmentdata;
      this.rm2options = departmentdata;
      this.rl1options = departmentdata;
      this.rl2options = departmentdata;
      this.EmployeeHierarchyOptions = departmentdata;
    });
    //proficiency dropdown fetch the api value to show it in dropdown
    this.http.get<any>('https://localhost:7208/api/Employee/GetDropDownList').subscribe(departmentdata => {
      this.proficiencyoptions = departmentdata.proficiencyList;
    });

    //EmployeeRoles dropdown fetch the api value to show it in dropdown
    this.http.get('https://localhost:7208/api/Employee/GetRolesList')
      .subscribe(data => {
        this.EmployeeRolesoptions = data as any[];
      });
       //Employee Process dropdown fetch the api value to show it in dropdown
    this.http.get('https://localhost:7208/api/Process/ListProcess').subscribe(employeeprocessdata => {
      this.employeeprocessOptions = employeeprocessdata;
    });


  }
  isChecked = false;
  Empregister = this._formBuilder.group({
    basic: this._formBuilder.group({
      EmployeeCode: this._formBuilder.control('', Validators.required),
      EmployeeName: this._formBuilder.control('', Validators.required),
      department: this._formBuilder.control('', Validators.required),
      dob: this._formBuilder.control('', Validators.required),
      doj: this._formBuilder.control('', Validators.required),
      martialstatus: this._formBuilder.control('', Validators.required),
      gender: this._formBuilder.control('', Validators.required),
      designation: this._formBuilder.control('', Validators.required),
      bloodgroup: this._formBuilder.control('', Validators.required),
      ischecked: this._formBuilder.control(this.data?.ischecked, Validators.required),
      IsInternetAvaible: this._formBuilder.control(this.data?.ischecked, Validators.required),
      SystemLaptop: this._formBuilder.control(this.data?.ischecked, Validators.required),


    }),
    contact: this._formBuilder.group({
      reportingManager1: this._formBuilder.control('', Validators.required),
      reportingLeader1: this._formBuilder.control('', Validators.required),
      reportingManager2: this._formBuilder.control('', Validators.required),
      reportingLeader2: this._formBuilder.control('', Validators.required),
      proficiency: this._formBuilder.control('', Validators.required),
      employeeHierachy: this._formBuilder.control('', Validators.required),

    }),
    address: this._formBuilder.group({
      presentaddress1: this._formBuilder.control('', Validators.required),

      permanentaddress1: this._formBuilder.control('', Validators.required),

      presentaddress2: this._formBuilder.control('', Validators.required),

      permanentaddress2: this._formBuilder.control('', Validators.required),

      presentaddress3: this._formBuilder.control('', Validators.required),

      permanentaddress3: this._formBuilder.control('', Validators.required),

      phonenum: this._formBuilder.control('', Validators.required),

      mobileNumber: this._formBuilder.control('', Validators.required),

      emergencyContactName: this._formBuilder.control('', Validators.required),

      emergencyMobilenumber: this._formBuilder.control('', Validators.required),

      officialemailaddress: this._formBuilder.control('', Validators.required),

      employeeProcess: this._formBuilder.control('', Validators.required),

      employeeRoles: this._formBuilder.control('', Validators.required),

      personalEmail: this._formBuilder.control('', Validators.required),

    })
  });

  get Basicform() {
    return this.Empregister.get("basic") as FormGroup;
  }
  get contactform() {
    return this.Empregister.get("contact") as FormGroup;
  }
  get addressform() {
    return this.Empregister.get("address") as FormGroup;
  }

  HandleSubmit() {
    if (this.Empregister.valid) {
      if (this.data) {
        this._empService
          .updateEmployee(this.data.id, this.Empregister.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addEmployee(this.Empregister.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  // HandleSubmit() {
  //   if (this.Empregister.valid) {
  //     console.log(this.Empregister.value)
  //   }
  // }

  formVisible = false;
  formData = {
    id: 0,
    description: '',
    companyId: 0,
    createdBy: 152,
    createdUtc: "2023-03-14T11:28:30.034Z",
    updatedBy: 0,
    updatedUtc: "2023-03-14T11:28:30.034Z",
    isActive: true

    // add more form fields here as needed
  };
  showForm() {
    this.formVisible = true;
  }

  hideForm() {
    this.formVisible = false;
  }

  newRoleSubmit() {
    // Send the form data to the backend to store in the database
    // For example, using Angular's HttpClient module:
    this.http.post('https://localhost:7208/api/Employee/AddEmpNewRoles', this.formData).subscribe(() => {
      // Show a success message to the user
      alert('Data saved successfully!');
      // Close the form
      this.hideForm();
    }, () => {
      // Show an error message to the user
      alert('An error occurred while saving the data.');
    });
  }
}

