import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create_NewCookie(record) {
    return this.firestore.collection('Cookies').add(record);
  }

  read_Cookies() {
    return this.firestore.collection('Cookies').snapshotChanges();
  }

  update_Cookie(recordID,record){
    this.firestore.doc('Cookies/' + recordID).update(record);
  }

  delete_Cookie(record_id) {
    this.firestore.doc('Cookies/' + record_id).delete();
  }
}
