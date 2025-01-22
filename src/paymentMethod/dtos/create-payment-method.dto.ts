import { IsNotEmpty, IsString, IsBoolean, IsNumber, Min, IsOptional } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  isInstallment: boolean;

  @IsOptional()
  @IsNumber()
  @Min(1)
  installments?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  interestRate?: number;
}