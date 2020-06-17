import { Component, OnInit } from '@angular/core';

import { CrudService } from './service/cookies.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'Firestore CRUD Operations Cookies App';

  cookies: any;
  cookieName: string;
  cookieType: string;
  cookieDescription: string;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.crudService.read_Cookies().subscribe(data => {

      this.cookies = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Name: e.payload.doc.data()['Name'],
          Type: e.payload.doc.data()['Type'],
          Description: e.payload.doc.data()['Description'],
        };
      })
      console.log(this.cookies);

    });
  }

  CreateRecord() {
    let record = {};
    record['Name'] = this.cookieName;
    record['Type'] = this.cookieType;
    record['Description'] = this.cookieDescription;
    this.crudService.create_NewCookie(record).then(resp => {
      this.cookieName = "";
      this.cookieType = "";
      this.cookieDescription = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.crudService.delete_Cookie(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditType = record.Type;
    record.EditDescription = record.Description;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Name'] = recordRow.EditName;
    record['Type'] = recordRow.EditType;
    record['Description'] = recordRow.EditDescription;
    this.crudService.update_Cookie(recordRow.id, record);
    recordRow.isEdit = false;
  }

}