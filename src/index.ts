/* npx tsc src\index.ts */
interface DadosUsuario {
    nome: String;
    salarioBase: number;
    valorHorasExtras: number;
    faixaDescontoInss: number;
    valorDescontadoInss: number;
    faixaDescontoIr: number;
    valorDescontadoIr: number;
    salarioLiquido: number;    
}
//calculo INSS

class dadosUsuario {
    constructor() {
        
    }

private dadosUsuario = {} as DadosUsuario;

    setNome(novoNome: string): void {
        this.dadosUsuario.nome = novoNome;
    }

    setSalarioBase(novoSalarioBase: number): void {
        this.dadosUsuario.salarioBase = novoSalarioBase;
    }

    setValorHorasExtras(novoValorHorasExtras: number): void {
        this.dadosUsuario.valorHorasExtras = novoValorHorasExtras;
    }

    setFaixaDescontoInss(novoFaixaDescontoInss: number): void {
        this.dadosUsuario.faixaDescontoInss = novoFaixaDescontoInss;
    }

    setDescontadoInss(novoDescontadoInss: number): void {
        this.dadosUsuario.valorDescontadoInss = novoDescontadoInss;
    }

    setFaixaDescontoIr(novoFaixaDescontoIr: number): void {
        this.dadosUsuario.faixaDescontoIr = novoFaixaDescontoIr;
    }

    setValorDescontadoIr(novoValorDescontadoIr: number): void {
        this.dadosUsuario.valorDescontadoIr = novoValorDescontadoIr;
    }

    setSalarioLiquido(novoSalarioLiquido: number): void {
        this.dadosUsuario.salarioLiquido = novoSalarioLiquido;
    }
}


let nomeEmpregado: string = 'Gabis';
let aliquotaBase: number;
let valorBaseFaixa: number;
let valorAgregado: number;
let salarioBruto: number = 1500;

function tabelaInss(salario: number): void{
    if (salario <= 1212.00){
        aliquotaBase =  0.075;
    }
    if (salario >= 1212.01 && salario <= 2427.35){
        aliquotaBase = 0.9;
        valorBaseFaixa = 1212.01;
        valorAgregado = 90.90;
    }
    if (salario >= 2427.36 && salario <= 3641.03){
        aliquotaBase = 0.12;
        valorBaseFaixa = 2427.36;
        valorAgregado = 200.28;
    }
    if (salario >= 3641.04 && salario <= 7087.22){
        aliquotaBase = 0.14;
        valorBaseFaixa = 3641.04;
        valorAgregado = 345.92;
    }
}
function descontoInss(salarioBruto: number) {
    return ((salarioBruto - valorBaseFaixa) * aliquotaBase ) + valorAgregado;
}

tabelaInss(salarioBruto);

const valorDescontoInss = descontoInss(salarioBruto);

console.log('Nome: ' + nomeEmpregado + ' | Salario bruto: ' + salarioBruto + ' | Faixa de desconto do INSS: ' + aliquotaBase + ' | Valor descontado para o INSS: ' + valorDescontoInss.toFixed(2))