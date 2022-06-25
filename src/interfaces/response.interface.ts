import { ApiProperty } from '@nestjs/swagger';

export class IErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}

export class IAcceptedResponse {
  @ApiProperty()
  generatedMaps: [];

  @ApiProperty()
  raw: [];

  @ApiProperty()
  affected: number;
}

export class IValidationErrorResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string[];

  @ApiProperty()
  error: string;
}

export class ILoginResponse {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  token_type: string;

  @ApiProperty()
  expires_in: number;
}
