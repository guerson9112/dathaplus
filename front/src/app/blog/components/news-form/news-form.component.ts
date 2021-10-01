import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { RemoteplusService } from '../../services/remoteplus.service';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {

  newsFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewsFormComponent>,
    public remotePlusSrv: RemoteplusService,
    @Inject(MAT_DIALOG_DATA) public data:any) {
    
     }

  ngOnInit(): void {
    console.log(this.data);
    this.newsFormGroup = this.formBuilder.group(
      {
       name : [ '' , [Validators.required]],
       lastname : [ '' , [Validators.required]],
      }
    );

    if(!this.data.new){
      this.newsFormGroup.get('name')?.setValue(this.data.name);
      this.newsFormGroup.get('lastname')?.setValue(this.data.lastname);
    }
  }

  newsSubmit(){
    
    console.log(this.newsFormGroup.value);
    if( this.data.new ){
      this.save();
    } else {
      this.update();
    }
  }

  save(){
    let id =  Date.now();
    
      this.remotePlusSrv.createApiRemote( String(id), this.newsFormGroup.value  ).pipe(first())
      .toPromise().then(
          data => {
              console.log(data);
              this.dialogRef.close();
          }).catch( 
            error => {
                console.error(error);
            })
    
  }

  update(){
    
  
      this.remotePlusSrv.updateApiRemote(this.data.userId, this.newsFormGroup.value  ).pipe(first())
      .toPromise().then(
          data => {
              console.log(data);
              this.dialogRef.close();
          }).catch( 
            error => {
                console.error(error);
            })
    
  }



}
