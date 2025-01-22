import { Injectable } from '@nestjs/common';
import * as forge from 'node-forge';
import * as fs from 'fs';

class CertificadoDigital {
  private p7: any;

  constructor(pfx: Buffer, password: string) {
    const p12Der = forge.util.decode64(pfx.toString('base64'));
    const p12Asn1 = forge.asn1.fromDer(p12Der);
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, password);

    const certBags = p12.getBags({ bagType: forge.pki.oids.certBag });
    const cert = certBags[forge.pki.oids.certBag][0];

    const keyBags = p12.getBags({ bagType: forge.pki.oids.keyBag });
    const key = keyBags[forge.pki.oids.keyBag];

    this.p7 = {
      key: key,
      cert: cert.cert,
    };
  }

  signXml(xml: string): string {
    const p7 = forge.pkcs7.createSignedData();
    p7.content = forge.util.createBuffer(xml, 'utf8');
    p7.addCertificate(this.p7.cert);
    p7.sign(this.p7.key);
    return forge.util.encode64(forge.asn1.toDer(p7.toAsn1()).getBytes());
  }
}

@Injectable()
export class CertificadoService {
  private certificado: CertificadoDigital;

  async getCertificado(): Promise<CertificadoDigital> {
    if (!this.certificado) {
      const pfx = fs.readFileSync('Ferdinand Georg Frobenius.pfx');
      const password = '1234';
      this.certificado = new CertificadoDigital(pfx, password);
    }
    return this.certificado;
  }
}
