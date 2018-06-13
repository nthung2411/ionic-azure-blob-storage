import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AzureBlobService} from '../../services/azure-blob.service';

@Component({selector: 'page-home', templateUrl: 'home.html'})
export class HomePage {
  public sourceUri: string;
  constructor(public navCtrl : NavController, private blobService : AzureBlobService) {}

  public async onFileChange($event) {
    this.sourceUri = await this
      .blobService
      .upload($event.target.files[0]);
  }

}
