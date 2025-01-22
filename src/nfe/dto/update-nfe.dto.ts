import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateNfeDto {
  @IsOptional()
  @IsString()
  accessKey?: string;

  @IsOptional()
  @IsString()
  protocol?: string;

  @IsOptional()
  @IsString()
  series?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  xml?: string;

  @IsOptional()
  @IsString()
  danfeUrl?: string;

  @IsOptional()
  @IsBoolean()
  isNfce?: boolean;

  @IsOptional()
  @IsBoolean()
  isCanceled?: boolean;
}