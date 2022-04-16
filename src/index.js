var dadoUsuario = {
    nome: process.argv[2],
    salarioBase: parseInt(process.argv[3]),
    valorHorasExtras: parseInt(process.argv[4]),
    aliquotaBase: 0,
    valorBaseFaixa: 0,
    valorAgregado: 0,
    faixaDescontoInss: 0,
    descontoIr: 0,
    faixaDescontoIr: 0,
    valorDescontadoIr: 0,
    parcelaDedutivelIr: 0
};
function tabelaInss(salario) {
    if (salario <= 1212.00) {
        dadoUsuario.aliquotaBase = 0.075;
        dadoUsuario.valorBaseFaixa = 0;
        dadoUsuario.valorAgregado = 0;
    }
    if (salario >= 1212.01 && salario <= 2427.35) {
        dadoUsuario.aliquotaBase = 0.9;
        dadoUsuario.valorBaseFaixa = 1212.01;
        dadoUsuario.valorAgregado = 90.90;
    }
    if (salario >= 2427.36 && salario <= 3641.03) {
        dadoUsuario.aliquotaBase = 0.12;
        dadoUsuario.valorBaseFaixa = 2427.36;
        dadoUsuario.valorAgregado = 200.28;
    }
    if (salario >= 3641.04 && salario <= 7087.22) {
        dadoUsuario.aliquotaBase = 0.14;
        dadoUsuario.valorBaseFaixa = 3641.04;
        dadoUsuario.valorAgregado = 345.92;
    }
}
function descontoInss(salario) {
    return ((dadoUsuario.salarioBase - dadoUsuario.valorBaseFaixa) * dadoUsuario.aliquotaBase) + dadoUsuario.valorAgregado;
}
function descontoIr() {
    if (valorComDescontoInss <= 1903.98) {
        dadoUsuario.descontoIr = 0;
        dadoUsuario.parcelaDedutivelIr = 0;
    }
    if (valorComDescontoInss >= 1903.99 && valorComDescontoInss <= 2826.65) {
        dadoUsuario.descontoIr = 0.075;
        dadoUsuario.parcelaDedutivelIr = 142.80;
    }
    if (valorComDescontoInss >= 2826.66 && valorComDescontoInss <= 3751.05) {
        dadoUsuario.descontoIr = 0.15;
        dadoUsuario.parcelaDedutivelIr = 354.80;
    }
    if (valorComDescontoInss >= 3751.06 && valorComDescontoInss <= 4664.68) {
        dadoUsuario.descontoIr = 0.225;
        dadoUsuario.parcelaDedutivelIr = 636.13;
    }
    if (valorComDescontoInss > 4664.68) {
        dadoUsuario.descontoIr = 0.275;
        dadoUsuario.parcelaDedutivelIr = 869.36;
    }
}
tabelaInss(dadoUsuario.salarioBase);
//Calculo para saber o Desconto do Inss
var valorDescontoInss = descontoInss(dadoUsuario.salarioBase);
dadoUsuario.faixaDescontoInss = ((valorDescontoInss * 100) / dadoUsuario.salarioBase);
var valorComDescontoInss = dadoUsuario.salarioBase - valorDescontoInss;
descontoIr();
//Calculo para saber o valor do desconto do Ir
dadoUsuario.valorDescontadoIr = ((valorComDescontoInss * dadoUsuario.descontoIr) - dadoUsuario.parcelaDedutivelIr);
console.log(' Nome: ' + dadoUsuario.nome + ' \n Salario bruto: ' + dadoUsuario.salarioBase + ' \n Faixa de desconto do INSS: ' + dadoUsuario.faixaDescontoInss.toFixed(1) + '% \n Valor descontado para o INSS: ' + valorDescontoInss.toFixed(2) + '\n Valor do Desconto Ir: ' + dadoUsuario.valorDescontadoIr.toFixed(2));
