export interface NFe {
  indSinc: number;
  idLote: number;
  NFe: NFeInf[];
}

export interface NFeDanfe {
  indSinc: number;
  idLote: number;
  NFe: NFeInf[];
}

export interface NFeInf {
  infNFe: {
    ide: {
      cUF: number;
      cNF: string;
      natOp: string;
      mod: number;
      serie: string;
      nNF: number;
      dhEmi: string;
      tpNF: number;
      idDest: number;
      cMunFG: number;
      tpImp: number;
      tpEmis: number;
      cDV: number;
      tpAmb: number;
      finNFe: number;
      indFinal: number;
      indPres: number;
      indIntermed: number;
      procEmi: number;
      verProc?: string;
    };
    emit: {
      CNPJCPF: string;
      xNome: string;
      xFant: string;
      enderEmit: {
        xLgr: string;
        nro: string;
        xBairro: string;
        cMun: number;
        xMun: string;
        UF: string;
        CEP: string;
        cPais: number;
        xPais: string;
        fone: string;
      };
      IE: string;
      CRT: number;
    };
    dest: {
      CNPJCPF: string;
      xNome: string;
      enderDest: {
        xLgr: string;
        nro: string;
        xBairro: string;
        cMun: number;
        xMun: string;
        UF: string;
        CEP: string;
        cPais: number;
        xPais: string;
        fone: string;
      };
      indIEDest: number;
      IE?: string;
    };
    det: NFeDet[];
    total: {
      ICMSTot: {
        vBC: string;
        vICMS: string;
        vICMSDeson: string;
        vFCP: string;
        vBCST: string;
        vST: string;
        vFCPST: string;
        vFCPSTRet: string;
        vProd: string;
        vFrete: string;
        vSeg: string;
        vDesc: string;
        vII: string;
        vIPI: string;
        vIPIDevol: string;
        vPIS: string;
        vCOFINS: string;
        vOutro: string;
        vNF: string;
      };
    };
    transp: {
      modFrete: number;
      vol?: {
        qVol: number;
        esp: string;
        marca: string;
        pesoL: string;
        pesoB: string;
      }[];
    };
    pag: {
      detPag: {
        indPag: number;
        tPag: number;
        xPag: string;
        vPag: string;
      }[];
    };
  };
}

export interface NFeDet {
  prod: {
    cProd: string;
    xProd: string;
    NCM: string;
    CFOP: number;
    uCom: string;
    qCom: number;
    cEAN: string;
    EXTIPI?: string;
    vUnCom: number;
    vProd: number;
    cEANTrib: string;
    uTrib: string;
    qTrib: number;
    vUnTrib: number;
    indTot: number;
  };
  imposto: {
    ICMS: {
      ICMS00: {
        orig: number;
        CST: string;
        modBC: number;
        vBC: string;
        pICMS: string;
        vICMS: string;
      };
    };
    PIS: {
      PISNT: {
        CST: string;
      };
    };
    COFINS: {
      COFINSNT: {
        CST: string;
      };
    };
  };
}
