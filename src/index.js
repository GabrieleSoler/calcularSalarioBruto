var dadoUsuario = {
    nome: process.argv[2],
    salarioBruto: parseInt(process.argv[3]),
    quantidadeHorasExtras: parseInt(process.argv[4]),
    aliquotaBase: null,
    valorBaseFaixa: null,
    valorAgregado: null,
    faixaDescontoInss: null,
    descontoIr: null,
    faixaDescontoIr: null,
    valorDescontadoIr: null,
    parcelaDedutivelIr: null,
    salarioLiquido: null
};
function tabelaInss(salario) {
    if (salario <= 1212.00) {
        dadoUsuario.aliquotaBase = 0.075;
        dadoUsuario.valorBaseFaixa = null;
        dadoUsuario.valorAgregado = null;
    }
    if (salario >= 1212.01 && salario <= 2427.35) {
        dadoUsuario.aliquotaBase = 0.09;
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
    if (salario >= 7087.23) {
        dadoUsuario.aliquotaBase = null;
        dadoUsuario.valorBaseFaixa = 7087.23;
        dadoUsuario.valorAgregado = 828.39;
    }
}
function descontoInss(salario) {
    return ((salarioBase - dadoUsuario.valorBaseFaixa) * dadoUsuario.aliquotaBase) + dadoUsuario.valorAgregado;
}
function descontoIr(salarioComDescontoInss) {
    if (salarioComDescontoInss <= 1903.98) {
        dadoUsuario.descontoIr = null;
        dadoUsuario.parcelaDedutivelIr = null;
    }
    if (salarioComDescontoInss >= 1903.99 && salarioComDescontoInss <= 2826.65) {
        dadoUsuario.descontoIr = 0.075;
        dadoUsuario.parcelaDedutivelIr = 142.80;
    }
    if (salarioComDescontoInss >= 2826.66 && salarioComDescontoInss <= 3751.05) {
        dadoUsuario.descontoIr = 0.15;
        dadoUsuario.parcelaDedutivelIr = 354.80;
    }
    if (salarioComDescontoInss >= 3751.06 && salarioComDescontoInss <= 4664.68) {
        dadoUsuario.descontoIr = 0.225;
        dadoUsuario.parcelaDedutivelIr = 636.13;
    }
    if (salarioComDescontoInss > 4664.68) {
        dadoUsuario.descontoIr = 0.275;
        dadoUsuario.parcelaDedutivelIr = 869.36;
    }
}
/*
    Referencia para calculo do valor da hora extra -> https://tangerino.com.br/blog/rh/hora-extra/
    CONSIDERAÇÕES: base mensal de horas é 200,
                   periodo de segunda a sexta,
                   entre 05:00hrs e 22:00hrs.
                   
    - Hora extra vale 50% a mais que a hora normal de trabalho
*/
var valorPorHoraExtra = (dadoUsuario.salarioBruto / 200) * 1.5;
var valorHorasExtras = valorPorHoraExtra * dadoUsuario.quantidadeHorasExtras;
var salarioBase = (dadoUsuario.salarioBruto + valorHorasExtras);
tabelaInss(salarioBase);
//DESCONTO DO INSS
var valorDescontoInss = descontoInss(salarioBase);
dadoUsuario.faixaDescontoInss = ((valorDescontoInss * 100) / salarioBase);
var valorComDescontoInss = salarioBase - valorDescontoInss;
//DESCONTO DO IR
descontoIr(valorComDescontoInss);
dadoUsuario.valorDescontadoIr = ((valorComDescontoInss * dadoUsuario.descontoIr) - dadoUsuario.parcelaDedutivelIr);
dadoUsuario.faixaDescontoIr = ((dadoUsuario.valorDescontadoIr * 100) / valorComDescontoInss);
//SALARIO LIQUIDO
dadoUsuario.salarioLiquido = (salarioBase - dadoUsuario.valorDescontadoIr - valorDescontoInss);
if (valorComDescontoInss < 1903.98) {
    console.log(dadoUsuario.nome + ' você esta isento de receber o recolhimento do Imposto de Renda!');
}
else {
    console.log(' Nome: ' + dadoUsuario.nome + ' \n Salario bruto: R$' + dadoUsuario.salarioBruto + '\n Valor total de hora extra: R$' + valorHorasExtras + ' \n Porcentagem de desconto do INSS: ' + dadoUsuario.faixaDescontoInss.toFixed(2) + '% \n Valor descontado para o INSS: R$' + valorDescontoInss.toFixed(2) + ' \n Porcentagem de desconto do IR: ' + dadoUsuario.faixaDescontoIr.toFixed(2) + '% \n Valor descontado para o Ir: R$' + dadoUsuario.valorDescontadoIr.toFixed(2) + ' \n Valor do salário líquido: R$' + dadoUsuario.salarioLiquido.toFixed(2));
}
