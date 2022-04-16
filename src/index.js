//calculo INSS
var dadosUsuario = /** @class */ (function () {
    function dadosUsuario() {
        this.dadosUsuario = {};
    }
    dadosUsuario.prototype.setNome = function (novoNome) {
        this.dadosUsuario.nome = novoNome;
    };
    dadosUsuario.prototype.setSalarioBase = function (novoSalarioBase) {
        this.dadosUsuario.salarioBase = novoSalarioBase;
    };
    dadosUsuario.prototype.setValorHorasExtras = function (novoValorHorasExtras) {
        this.dadosUsuario.valorHorasExtras = novoValorHorasExtras;
    };
    dadosUsuario.prototype.setFaixaDescontoInss = function (novoFaixaDescontoInss) {
        this.dadosUsuario.faixaDescontoInss = novoFaixaDescontoInss;
    };
    dadosUsuario.prototype.setDescontadoInss = function (novoDescontadoInss) {
        this.dadosUsuario.valorDescontadoInss = novoDescontadoInss;
    };
    dadosUsuario.prototype.setFaixaDescontoIr = function (novoFaixaDescontoIr) {
        this.dadosUsuario.faixaDescontoIr = novoFaixaDescontoIr;
    };
    dadosUsuario.prototype.setValorDescontadoIr = function (novoValorDescontadoIr) {
        this.dadosUsuario.valorDescontadoIr = novoValorDescontadoIr;
    };
    dadosUsuario.prototype.setSalarioLiquido = function (novoSalarioLiquido) {
        this.dadosUsuario.salarioLiquido = novoSalarioLiquido;
    };
    return dadosUsuario;
}());
var nomeEmpregado = 'Gabis';
var aliquotaBase;
var valorBaseFaixa;
var valorAgregado;
var salarioBruto = 1500;
function tabelaInss(salario) {
    if (salario <= 1212.00) {
        aliquotaBase = 0.075;
    }
    if (salario >= 1212.01 && salario <= 2427.35) {
        aliquotaBase = 0.9;
        valorBaseFaixa = 1212.01;
        valorAgregado = 90.90;
    }
    if (salario >= 2427.36 && salario <= 3641.03) {
        aliquotaBase = 0.12;
        valorBaseFaixa = 2427.36;
        valorAgregado = 200.28;
    }
    if (salario >= 3641.04 && salario <= 7087.22) {
        aliquotaBase = 0.14;
        valorBaseFaixa = 3641.04;
        valorAgregado = 345.92;
    }
}
function descontoInss(salarioBruto) {
    return ((salarioBruto - valorBaseFaixa) * aliquotaBase) + valorAgregado;
}
tabelaInss(salarioBruto);
var valorDescontoInss = descontoInss(salarioBruto);
console.log('Nome: ' + nomeEmpregado + ' | Salario bruto: ' + salarioBruto + ' | Faixa de desconto do INSS: ' + aliquotaBase + ' | Valor descontado para o INSS: ' + valorDescontoInss);
