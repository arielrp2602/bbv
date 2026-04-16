import { IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString() name!: string;
  @IsString() @IsOptional() address!: string;
  @IsString() @IsOptional() facebookAlias!: string;
  @IsString() @IsOptional() phone1!: string;
  @IsString() @IsOptional() phone2!: string;
}
