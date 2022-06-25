import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}

  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    const s3 = new S3();
    const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('S3_BUCKET'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    return uploadResult.Location;
  }

  async deletePublicFile(fileKey: string) {
    const s3 = new S3();
    await s3
      .deleteObject({
        Bucket: this.configService.get('S3_BUCKET'),
        Key: fileKey,
      })
      .promise();
  }
}
