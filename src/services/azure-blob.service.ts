import { Injectable } from '@angular/core';

import { BlobService, UploadConfig, UploadParams } from 'angular-azure-blob-service';

export const Config: UploadParams = {
    // tslint:disable-next-line:max-line-length
    sas: 'shared access token',
    storageAccount: 'blob storage domain name',
    containerName: 'blob container name'
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
