import { IsOptional, IsString, IsBoolean, IsNumber, Min } from 'class-validator';

export class UpdatePaymentMethodDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  isInstallment?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  installments?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  interestRate?: number;
}