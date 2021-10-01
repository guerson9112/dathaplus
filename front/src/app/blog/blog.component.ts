import { Component, OnInit, Inject } from '@angular/core';
import { first } from 'rxjs/operators';
import { RemoteplusService } from './services/remoteplus.service';
import { NewsFormComponent } from './components/news-form/news-form.component'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  animal: string = '';
  name: string = '';
  cards: any[] = []

  constructor(
    public remotePlusSrv: RemoteplusService,
    public dialog: MatDialog

  ) {

  }

  async ngOnInit() {

    this.getRemotePlus();

  }






  async getRemotePlus() {
    await this.remotePlusSrv.getApiRemote().then((response) => {
      (response.Items)
      this.cards = response.Items;
    })
      .catch(e => {
        console.error(e)
      })
  }

  addNews(type: string) {
    (type);
    const dialogRef = this.dialog.open(NewsFormComponent, {

      data: { type: type, new: true }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.getRemotePlus();

    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }


  editNews(datos: any) {
    const dialogRef = this.dialog.open(NewsFormComponent, {

      data: {
        new: false,
        userId: datos.userId,
        name: datos.name,
        lastname: datos.lastname,

      }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.getRemotePlus();

    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }


  deleteNews(datos: any) {


    this.remotePlusSrv.delteApiRemote(datos.userId).pipe(first())
      .toPromise().then(
        () => {
          this.getRemotePlus();
        }).catch(
          error => {
            console.error(error);
          })

  }

}




