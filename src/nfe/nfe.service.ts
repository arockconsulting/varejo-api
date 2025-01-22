/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { format } from 'date-fns';
import { Model } from 'mongoose';
import { NFe } from 'node-nfe';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import { ClientService } from 'src/client/client.service';
import { Nfe } from 'src/infra/entities/nfe.schema';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/products/product.service';
import { UserService } from 'src/user/user.service';
import { CertificadoService } from './certificado.service';
import { CreateNfeDto } from './dto/create-nfe.dto';
import { UpdateNfeDto } from './dto/update-nfe.dto';
@Injectable()
export class NfeService {
  constructor(
    @InjectModel(Nfe.name) private nfeModel: Model<Nfe>,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
    private productService: ProductService,
    private clientService: ClientService,
    private userService: UserService,
    private certificadoService: CertificadoService,
  ) {}

  async create(createNfeDto: CreateNfeDto): Promise<Nfe> {
    const order = await this.orderService.findOne(createNfeDto.order);
    if (!order) {
      throw new Error('Pedido não encontrado.');
    }

    const client = await this.clientService.findOne(
      order.client._id.toString(),
    );
    if (!client) {
      throw new Error('Cliente não encontrado.');
    }

    const seller = await this.userService.findOneById(order.seller._id);
    if (!seller) {
      throw new Error('Vendedor não encontrado.');
    }

    const items = await Promise.all(
      order.items.map(async (item) => {
        const product = await this.productService.findOne(
          item.product._id.toString(),
        );
        if (!product) {
          throw new Error(`Produto com ID ${item.product} não encontrado.`);
        }
        return {
          product: product._id,
          quantity: item.quantity,
          price: item.price,
          discount: item.discount,
          icms: product.icms,
          ipi: product.ipi,
          pis: product.pis,
          cofins: product.cofins,
        };
      }),
    );

    const accessKey = this.generateAccessKey();
    const nfeData = {
      ...createNfeDto,
      accessKey: accessKey,
      client: client._id,
      seller: order.seller._id,
      items,
      total: order.total,
      totalDiscount: order.totalDiscount,
      dataEmissao: new Date(),
    };

    const createdNfe = new this.nfeModel(nfeData);
    return createdNfe.save();
  }

  private generateAccessKey(): string {
    // Implemente a lógica para gerar a chave de acesso da NFe aqui
    // Este é um exemplo básico, você precisará adaptar para o seu formato de chave de acesso
    return Math.random().toString(36).substring(2, 17).toUpperCase();
  }

  async findAll(): Promise<Nfe[]> {
    return this.nfeModel.find().populate('client').populate('seller').exec();
  }

  async findOne(id: string): Promise<Nfe | null> {
    return this.nfeModel
      .findById(id)
      .populate('client')
      .populate('seller')
      .populate('order')
      .exec();
  }

  async update(id: string, updateNfeDto: UpdateNfeDto): Promise<Nfe | null> {
    return this.nfeModel
      .findByIdAndUpdate(id, updateNfeDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<void> {
    await this.nfeModel.findByIdAndDelete(id).exec();
  }

  async emitirNFe(dadosNfe: any): Promise<Nfe> {
    const certificado = await this.certificadoService.getCertificado();

    const nfe = new NFe(certificado, {
      cUF: '35', // Código do Estado de São Paulo
      tpAmb: '2', // 1=Produção, 2=Homologação
      CNPJ: 'seu-cnpj', //cnpj
      modelo: '55', //NFe
      serie: '1',
      numero: '1',
      codigo: 'seu-codigo',
      id_token: 'seu-token', //token do ibge
      csc: 'seu-csc',
      chave_acesso: 'sua-chave',
    });

    const xmlNFe = await nfe.gerarXml(dadosNfe);
    const retorno = await nfe.enviar(xmlNFe);

    if (retorno && retorno.status === 200) {
      const nfeSalva = await this.nfeModel.create({
        xml: xmlNFe,
        protocolo: retorno,
        dataEmissao: new Date(),
        status: 'Emitida',
      });
      return nfeSalva;
    } else {
      throw new Error('Erro ao emitir a NFe');
    }
  }

  async cancelarNFe(dadosCancelamento: any): Promise<any> {
    const certificado = await this.certificadoService.getCertificado();
    const nfe = new NFe(certificado, {
      cUF: '35', // Código do Estado de São Paulo
      tpAmb: '2', // 1=Produção, 2=Homologação
      CNPJ: 'seu-cnpj', //cnpj
      modelo: '55', //NFe
      serie: '1',
      numero: '1',
      codigo: 'seu-codigo',
      id_token: 'seu-token', //token do ibge
      csc: 'seu-csc',
      chave_acesso: 'sua-chave',
    });

    const cancelamento = await nfe.cancelar(dadosCancelamento);

    return cancelamento;
  }

  async consultarNFe(chave: string): Promise<any> {
    const certificado = await this.certificadoService.getCertificado();
    const nfe = new NFe(certificado, {
      cUF: '35', // Código do Estado de São Paulo
      tpAmb: '2', // 1=Produção, 2=Homologação
      CNPJ: 'seu-cnpj', //cnpj
      modelo: '55', //NFe
      serie: '1',
      numero: '1',
      codigo: 'seu-codigo',
      id_token: 'seu-token', //token do ibge
      csc: 'seu-csc',
      chave_acesso: 'sua-chave',
    });
    const consulta = await nfe.consultar(chave);

    return consulta;
  }

  async gerarDanfe(chave: string): Promise<any> {
    const certificado = await this.certificadoService.getCertificado();
    const nfe = new NFe(certificado, {
      cUF: '35', // Código do Estado de São Paulo
      tpAmb: '2', // 1=Produção, 2=Homologação
      CNPJ: 'seu-cnpj', //cnpj
      modelo: '55', //NFe
      serie: '1',
      numero: '1',
      codigo: 'seu-codigo',
      id_token: 'seu-token', //token do ibge
      csc: 'seu-csc',
      chave_acesso: 'sua-chave',
    });
    const danfe = await nfe.gerarDanfe(chave, 'pasta/onde/salvar');
    return danfe;
  }

  async generateXml(nfeId: string): Promise<string> {
    const nfe = await this.nfeModel
      .findById(nfeId)
      .populate('client')
      .populate('seller')
      .populate('items.product')
      .exec();
    if (!nfe) {
      throw new NotFoundException('NFe não encontrada');
    }

    const xml = this.buildXml(nfe);
    return xml;
  }

  private buildXml(nfe: any): string {
    const escapeXml = (unsafe: string) =>
      unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '&': return '&amp;';
          case '\'': return '&apos;';
          case '"': return '&quot;';
          default: return c;
        }
      });

    const formattedDate = format(
      new Date(nfe.dataEmissao),
      'yyyy-MM-ddTHH:mm:ss',
    );

    const xml = `<NFe xmlns="http://www.portalfiscal.inf.br/nfe">
                <infNFe Id="NFe${nfe.accessKey}" versao="4.00">
                    <ide>
                        <cUF>35</cUF>
                        <cNF>${nfe.accessKey.slice(-9)}</cNF>
                        <natOp>${nfe.naturezaOperacao}</natOp>
                        <indPag>0</indPag>
                        <mod>55</mod>
                        <serie>1</serie>
                        <nNF>1</nNF>
                        <dEmi>${formattedDate}</dEmi>
                        <dSaiEnt>${formattedDate}</dSaiEnt>
                        <tpNF>0</tpNF>
                        <cMunFG>3550308</cMunFG>
                        <tpImp>1</tpImp>
                        <tpEmis>${nfe.tipoEmissao}</tpEmis>
                        <cDV>${nfe.accessKey.slice(-1)}</cDV>
                        <tpAmb>2</tpAmb>
                        <finNFe>${nfe.finalidadeEmissao}</finNFe>
                        <procEmi>0</procEmi>
                        <verProc>NF-eletronica.com</verProc>
                    </ide>
                    <emit>
                        <CNPJ>99999090910270</CNPJ>
                        <xNome>NF-e Associacao NF-e</xNome>
                        <xFant>NF-e</xFant>
                        <enderEmit>
                            <xLgr>Rua Central</xLgr>
                            <nro>100</nro>
                            <xCpl>Fundos</xCpl>
                            <xBairro>Distrito Industrial</xBairro>
                            <cMun>3502200</cMun>
                            <xMun>Angatuba</xMun>
                            <UF>SP</UF>
                            <CEP>17100171</CEP>
                            <cPais>1058</cPais>
                            <xPais>Brasil</xPais>
                            <fone>1733021717</fone>
                        </enderEmit>
                        <IE>123456789012</IE>
                    </emit>
                    <dest>
                        <CNPJ>${nfe.client.cnpj}</CNPJ>
                        <xNome>${nfe.client.name}</xNome>
                        <enderDest>
                            <xLgr>AV DAS FONTES</xLgr>
                            <nro>1777</nro>
                            <xCpl>10 ANDAR</xCpl>
                            <xBairro>PARQUE FONTES</xBairro>
                            <cMun>5030801</cMun>
                            <xMun>Sao Paulo</xMun>
                            <UF>SP</UF>
                            <CEP>13950000</CEP>
                            <cPais>1058</cPais>
                            <xPais>BRASIL</xPais>
                            <fone>1932011234</fone>
                        </enderDest>
                        <IE> </IE>
                    </dest>
                    <det>
                    ${nfe.items.map((item, index) => `
                        <item nItem="${index + 1}">
                            <prod>
                                <cProd>${item.product.cProd}</cProd>
                                <cEAN>${item.product.barcode}</cEAN>
                                <xProd>${item.product.name}</xProd>
                                <NCM>${item.product.ncm}</NCM>
                                <CFOP>${item.product.cfop}</CFOP>
                                <uCom>${item.product.uCom}</uCom>
                                <qCom>${item.quantity}</qCom>
                                <vUnCom>${item.price}</vUnCom>
                                <vProd>${item.price * item.quantity}</vProd>
                                <cEANTrib>${item.product.cEANTrib}</cEANTrib>
                                <uTrib>${item.product.uTrib}</uTrib>
                                <qTrib>${item.quantity}</qTrib>
                                <vUnTrib>${item.price}</vUnTrib>
                                <indTot>1</indTot>
                            </prod>
                            <imposto>
                                <ICMS>
                                    <ICMS00>
                                        <orig>${item.product.orig}</orig>
                                        <CST>${item.product.cst}</CST>
                                        <modBC>0</modBC>
                                        <vBC>${(item.price * item.quantity).toFixed(2)}</vBC>
                                        <pICMS>${item.product.vAliqIcms.toFixed(2)}</pICMS>
                                        <vICMS>${(item.price * item.quantity * (item.product.vAliqIcms / 100)).toFixed(2)}</vICMS>
                                    </ICMS00>
                                </ICMS>
                                <PIS>
                                    <PISAliq>
                                        <CST>01</CST>
                                        <vBC>${(item.price * item.quantity).toFixed(2)}</vBC>
                                        <pPIS>${item.product.vAliqPis.toFixed(2)}</pPIS>
                                        <vPIS>${(item.price * item.quantity * (item.product.vAliqPis / 100)).toFixed(2)}</vPIS>
                                    </PISAliq>
                                </PIS>
                                <COFINS>
                                    <COFINSAliq>
                                        <CST>01</CST>
                                        <vBC>${(item.price * item.quantity).toFixed(2)}</vBC>
                                        <pCOFINS>${item.product.vAliqCofins.toFixed(2)}</pCOFINS>
                                        <vCOFINS>${(item.price * item.quantity * (item.product.vAliqCofins / 100)).toFixed(2)}</vCOFINS>
                                    </COFINSAliq>
                                </COFINS>
                            </imposto>
                        </item>
                    `).join('')}
                    </det>
                    <total>
                        <ICMSTot>
                            <vBC>0</vBC>
                            <vICMS>0</vICMS>
                            <vBCST>0</vBCST>
                            <vST>0</vST>
                            <vProd>${nfe.total}</vProd>
                            <vFrete>0</vFrete>
                            <vSeg>0</vSeg>
                            <vDesc>0</vDesc>
                            <vII>0</vII>
                            <vIPI>0</vIPI>
                            <vPIS>0</vPIS>
                            <vCOFINS>0</vCOFINS>
                            <vOutro>0</vOutro>
                            <vNF>${nfe.total}</vNF>
                        </ICMSTot>
                    </total>
                    <transp>
                        <modFrete>0</modFrete>
                    </transp>
                    <infAdic>
                        <infAdFisco>Nota Fiscal de exemplo NF-eletronica.com</infAdFisco>
                    </infAdic>
                </infNFe>
            </NFe>`;

    const cleanXml = xml.replace(/\s*\n\s*/g, '').replace(/>\s+</g, '><');

    return cleanXml;
  }

  private async signXml(xml: string): Promise<string> {
    const certificado = await this.certificadoService.getCertificado();
    const p7 = certificado.signXml(xml);
    return p7;
  }

  async generateDanfe(nfeId: string): Promise<Buffer> {
    const nfe = await this.nfeModel.findById(nfeId).populate('client').populate('seller').populate('items.product').exec();
    if (!nfe) {
        throw new NotFoundException('NFe não encontrada');
    }

    const xml = this.buildXml(nfe);
    //const signedXml = await this.signXml(xml);

    const browser = await puppeteer.launch({ headless: 'shell' });
    const page = await browser.newPage();
    await page.setContent(fs.readFileSync('./danfe-template.html', 'utf-8'));
    await page.evaluate((nfe, xml) => {
        // @ts-ignore
        window.nfe = nfe;
        // @ts-ignore
        window.xml = xml;
    }, nfe, xml);

    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    return Buffer.from(pdfBuffer);
}
}
