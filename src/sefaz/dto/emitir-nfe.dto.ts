import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsObject,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

class IdeDto {
  @IsNotEmpty()
  @IsString()
  cUF: string;

  @IsNotEmpty()
  @IsString()
  natOp: string;

  @IsNotEmpty()
  @IsString()
  mod: string;

  @IsNotEmpty()
  @IsString()
  serie: string;

  @IsNotEmpty()
  @IsString()
  nNF: string;

  @IsNotEmpty()
  @IsString()
  dhEmi: string;

  @IsNotEmpty()
  @IsString()
  tpNF: string;

  @IsNotEmpty()
  @IsString()
  idDest: string;

  @IsNotEmpty()
  @IsString()
  tpImp: string;

  @IsNotEmpty()
  @IsString()
  tpEmis: string;

  @IsNotEmpty()
  @IsString()
  tpAmb: string;

  @IsNotEmpty()
  @IsString()
  finNFe: string;

  @IsNotEmpty()
  @IsString()
  indFinal: string;

  @IsNotEmpty()
  @IsString()
  indPres: string;
}

class EnderDto {
  @IsNotEmpty()
  @IsString()
  xLgr: string;

  @IsNotEmpty()
  @IsString()
  nro: string;

  @IsString()
  xCpl: string;

  @IsNotEmpty()
  @IsString()
  xBairro: string;

  @IsNotEmpty()
  @IsString()
  cMun: string;

  @IsNotEmpty()
  @IsString()
  xMun: string;

  @IsNotEmpty()
  @IsString()
  UF: string;

  @IsNotEmpty()
  @IsString()
  CEP: string;

  @IsNotEmpty()
  @IsString()
  cPais: string;

  @IsNotEmpty()
  @IsString()
  xPais: string;
}

class EmitDto {
  @IsNotEmpty()
  @IsString()
  CNPJ: string;

  @IsNotEmpty()
  @IsString()
  xNome: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => EnderDto)
  enderEmit: EnderDto;

  @IsNotEmpty()
  @IsString()
  IE: string;

  @IsNotEmpty()
  @IsString()
  CRT: string;
}

class DestDto {
  @IsNotEmpty()
  @IsString()
  CNPJ: string;

  @IsNotEmpty()
  @IsString()
  xNome: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => EnderDto)
  enderDest: EnderDto;

  @IsNotEmpty()
  @IsString()
  indIEDest: string;

  @IsString()
  IE: string;
}

class ProdDto {
  @IsNotEmpty()
  @IsString()
  cProd: string;

  @IsNotEmpty()
  @IsString()
  cEAN: string;

  @IsNotEmpty()
  @IsString()
  xProd: string;

  @IsNotEmpty()
  @IsString()
  NCM: string;

  @IsNotEmpty()
  @IsString()
  CFOP: string;

  @IsNotEmpty()
  @IsString()
  uCom: string;

  @IsNotEmpty()
  @IsString()
  qCom: string;

  @IsNotEmpty()
  @IsString()
  vUnCom: string;

  @IsNotEmpty()
  @IsString()
  vProd: string;

  @IsNotEmpty()
  @IsString()
  cEANTrib: string;

  @IsNotEmpty()
  @IsString()
  uTrib: string;

  @IsNotEmpty()
  @IsString()
  qTrib: string;

  @IsNotEmpty()
  @IsString()
  vUnTrib: string;
}
class Icms00Dto {
  @IsNotEmpty()
  @IsString()
  orig: string;
  @IsNotEmpty()
  @IsString()
  CST: string;
  @IsNotEmpty()
  @IsString()
  modBC: string;
  @IsNotEmpty()
  @IsString()
  vBC: string;
  @IsNotEmpty()
  @IsString()
  pICMS: string;
  @IsNotEmpty()
  @IsString()
  vICMS: string;
}
class IcmsDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => Icms00Dto)
  ICMS00: Icms00Dto;
}
class IpintDto {
  @IsNotEmpty()
  @IsString()
  CST: string;
}
class IpiDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => IpintDto)
  IPINT: IpintDto;
}
class PisAliqDto {
  @IsNotEmpty()
  @IsString()
  CST: string;
  @IsNotEmpty()
  @IsString()
  vBC: string;
  @IsNotEmpty()
  @IsString()
  pPIS: string;
  @IsNotEmpty()
  @IsString()
  vPIS: string;
}
class PisDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PisAliqDto)
  PISAliq: PisAliqDto;
}
class CofinsAliqDto {
  @IsNotEmpty()
  @IsString()
  CST: string;
  @IsNotEmpty()
  @IsString()
  vBC: string;
  @IsNotEmpty()
  @IsString()
  pCOFINS: string;
  @IsNotEmpty()
  @IsString()
  vCOFINS: string;
}
class CofinsDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => CofinsAliqDto)
  COFINSAliq: CofinsAliqDto;
}
class ImpostoDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => IcmsDto)
  ICMS: IcmsDto;
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => IpiDto)
  IPI: IpiDto;
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PisDto)
  PIS: PisDto;
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => CofinsDto)
  COFINS: CofinsDto;
}

class DetDto {
  @IsNotEmpty()
  @IsString()
  nItem: string;
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ProdDto)
  prod: ProdDto;
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ImpostoDto)
  imposto: ImpostoDto;
}
class IcmsTotDto {
  @IsNotEmpty()
  @IsString()
  vBC: string;
  @IsNotEmpty()
  @IsString()
  vICMS: string;
  @IsNotEmpty()
  @IsString()
  vICMSDeson: string;
  @IsNotEmpty()
  @IsString()
  vFCP: string;
  @IsNotEmpty()
  @IsString()
  vBCST: string;
  @IsNotEmpty()
  @IsString()
  vST: string;
  @IsNotEmpty()
  @IsString()
  vFCPST: string;
  @IsNotEmpty()
  @IsString()
  vFCPSTRet: string;
  @IsNotEmpty()
  @IsString()
  vProd: string;
  @IsNotEmpty()
  @IsString()
  vFrete: string;
  @IsNotEmpty()
  @IsString()
  vSeg: string;
  @IsNotEmpty()
  @IsString()
  vDesc: string;
  @IsNotEmpty()
  @IsString()
  vII: string;
  @IsNotEmpty()
  @IsString()
  vIPI: string;
  @IsNotEmpty()
  @IsString()
  vPIS: string;
  @IsNotEmpty()
  @IsString()
  vCOFINS: string;
  @IsNotEmpty()
  @IsString()
  vOutro: string;
  @IsNotEmpty()
  @IsString()
  vNF: string;
  @IsNotEmpty()
  @IsString()
  vTotTrib: string;
}
class TotalDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => IcmsTotDto)
  ICMSTot: IcmsTotDto;
}
class TranspDto {
  @IsNotEmpty()
  @IsString()
  modFrete: string;
}
class DetPagDto {
  @IsNotEmpty()
  @IsString()
  tPag: string;
  @IsNotEmpty()
  @IsString()
  vPag: string;
}
class PagDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetPagDto)
  detPag: DetPagDto[];
}
class InfAdicDto {
  @IsNotEmpty()
  @IsString()
  infCpl: string;
}
export class EmitirNfeDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => IdeDto)
  ide: IdeDto;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => EmitDto)
  emit: EmitDto;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => DestDto)
  dest: DestDto;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetDto)
  det: DetDto[];

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => TotalDto)
  total: TotalDto;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => TranspDto)
  transp: TranspDto;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PagDto)
  pag: PagDto;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => InfAdicDto)
  infAdic: InfAdicDto;
}
