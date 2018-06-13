import { Injectable } from '@angular/core';

import { BlobService, UploadConfig, UploadParams } from 'angular-azure-blob-service';

export const Config: UploadParams = {
    // tslint:disable-next-line:max-line-length
    sas: '?sv=2017-11-09&ss=bfqt&srt=sco&sp=rwdlacup&se=2018-06-13T14:24:11Z&st=2018-06-13T06:24:11Z&spr=https&sig=jANEjXnVbdErKHo2Us4D9P3ltLWBnas%2FnQMr2Aea7Z4%3D',
    storageAccount: 'handheldphotoblobstorage',
    containerName: 'handheld-photos'
};

@Injectable()
export class AzureBlobService {

    /** The upload config */
    private config: UploadConfig;

    constructor(private blob: BlobService) {
        this.config = null;
    }

    public upload(file: File): string {
        if (file === null) {
            return;
        }

        const baseUrl = this.blob.generateBlobUrl(Config, file.name);
        this.config = {
            baseUrl: baseUrl,
            blockSize: 1024 * 32,
            sasToken: Config.sas,
            file: file,
            complete: () => {
                // tslint:disable-next-line:no-console
                console.info('complete');
            },
            error: () => {
                console.error('Error !');
            },
            progress: (percent) => {
                // tslint:disable-next-line:no-console
                console.info(`progress ${percent}`);
            }
        };

        this.blob.upload(this.config);
        return baseUrl;
    }
}
