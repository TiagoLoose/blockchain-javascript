const Blockchain = require('./blockchain')

//blockchain de registros de termo de inscrição
//Objeto termo
//{
//  beneficiario: CNPJ RO,
//  devedor: CNPJ/CPF,
//  valorJuros,
//  valorMulta,
//  valorTotal,
//  codReceita,
//  origem,
//  numeroProcesso,
//  inscritoEm: timestamp,
//  numeroCda,
//  criadoPor: CPF do usuario que realizou a inscrição
//}

//blockchain ocorrencias
//tudo o que aconteceu relacionado a uma cda
//EX.
//INSCRITO
//VALOR JUROS ATUALIZADO
//VALOR MULTA ATUALIZADO
//VALOR TOTAL ATUALIZADO
//SUSPENSA POR PARCELAMENTO
//EXTINTA PAGO
//objeto ocorrencia
//{
//  hashTermoInscricao:
//  tipo: INICIAL |ALTERACAO DE SITUACAO|ATUALIZACAO DE JUROS| ATUALIZACAO DE MULTA| ATUALIZACAO DE VALOR TOTAL
//  situacaoInscricao: as mesmas do mapinguari
//  valorJuros,
//  valorMulta,
//  valorTotal,
//  informacaoComplementar: 'texto digitado pelo usuario ou gerado automaticamente',
//  criadoPor: CPF do usuario que realizou a inscrição
//}

const blockchainTermo = new Blockchain()
blockchainTermo.addBlock({
    beneficiario: '394585000171',
    devedor: '12112112155',
    valorJuros: 2.33,
    valorMulta: 50.34,
    valorTotal: 198.21,
    origem: 'IPVA referente ao ano de 2019',
    numeroProcesso: null,
    inscritoEm: new Date(),
    numeroCda: '202002031982',
    criadoPor: '01444659227'
})
console.log(blockchainTermo.isValid())

const blockchainOcorrencias = new Blockchain();
blockchainOcorrencias.addBlock({
    hashTermoInscricao: blockchainTermo.blocks[0].hash,
    tipo: 'INICIAL',
    situacaoInscricao: '1',
    valorJuros: 2.33,
    valorMulta: 50.34,
    valorTotal: 198.21,
    informacaoComplementar: null,
    criadoPor: '01444659227'
})
console.log(blockchainOcorrencias.isValid())
blockchainOcorrencias.addBlock({
    hashTermoInscricao: blockchainTermo.blocks[0].hash,
    tipo: 'ALTERACAO DE SITUACAO',
    situacaoInscricao: '3',
    valorJuros: 2.33,
    valorMulta: 50.34,
    valorTotal: 198.21,
    informacaoComplementar: 'Suspensa por decisao judicial',
    criadoPor: '01444659227'
})
console.log(blockchainOcorrencias.isValid())
blockchainOcorrencias.addBlock({
    hashTermoInscricao: blockchainTermo.blocks[0].hash,
    tipo: 'ATUALIZACAO DE VALOR TOTAL',
    situacaoInscricao: '3',
    valorJuros: 2.33,
    valorMulta: 50.34,
    valorTotal: 210.44,
    informacaoComplementar: 'Atualização monetaria. UPF 78.33',
    criadoPor: '01444659227'
})
console.log(blockchainOcorrencias.isValid())
blockchainOcorrencias.addBlock({
    hashTermoInscricao: blockchainTermo.blocks[1].hash,
    tipo: 'ALTERACAO DE SITUACAO',
    situacaoInscricao: '2',
    valorJuros: 2.33,
    valorMulta: 50.34,
    valorTotal: 210.44,
    informacaoComplementar: null,
    criadoPor: '01444659227'
})
console.log(blockchainOcorrencias.isValid())
blockchainOcorrencias.blocks.forEach(element => {
    console.log(element)
});
console.log('CDA')
termo = blockchainTermo.blocks[1]
console.log(termo)
console.log('Situacao atual')
situacaoAtual = blockchainOcorrencias.blocks.reduce((previos, current) => {
    const { hashTermoInscricao, situacaoInscricao, valorJuros, valorMulta, valorTotal } = current.data
    if(hashTermoInscricao !== termo.hash) return previos
    return previos = {
        atualizadoEm: current.timestamp,
        situacaoInscricao,
        valorJuros,
        valorMulta,
        valorTotal
    }
})
console.log(situacaoAtual)
