/* npx tsc src\index.ts ou npm run start 
node src\index.js nome salarioBruto horaExtra
*/
interface DadosUsuario {
    nome: String;
    salarioBase: number;
    valorHorasExtras: number; 
    aliquotaBase: number;
    valorBaseFaixa: number;
    valorAgregado: number;
    faixaDescontoInss: number;
}

let dadoUsuario: DadosUsuario = {
    nome: process.argv[2],
    salarioBase: parseInt(process.argv[3]),
    valorHorasExtras: parseInt(process.argv[4]),
    aliquotaBase: 0,
    valorBaseFaixa: 0,
    valorAgregado: 0,
    faixaDescontoInss: 0 
}

function tabelaInss(salario: number): void{
    if (salario <= 1212.00){
        dadoUsuario.aliquotaBase =  0.075;
        dadoUsuario.valorBaseFaixa = 0;
        dadoUsuario.valorAgregado = 0;
    }
    if (salario >= 1212.01 && salario <= 2427.35){
        dadoUsuario.aliquotaBase = 0.9;
        dadoUsuario.valorBaseFaixa = 1212.01;
        dadoUsuario.valorAgregado = 90.90;
    }
    if (salario >= 2427.36 && salario <= 3641.03){
        dadoUsuario.aliquotaBase = 0.12;
        dadoUsuario.valorBaseFaixa = 2427.36;
        dadoUsuario.valorAgregado = 200.28;
    }
    if (salario >= 3641.04 && salario <= 7087.22){
        dadoUsuario.aliquotaBase = 0.14;
        dadoUsuario.valorBaseFaixa = 3641.04;
        dadoUsuario.valorAgregado = 345.92;
    }
}

function descontoInss(salario: number) {
    return ((dadoUsuario.salarioBase - dadoUsuario.valorBaseFaixa) * dadoUsuario.aliquotaBase ) + dadoUsuario.valorAgregado;
}

tabelaInss(dadoUsuario.salarioBase);

const valorDescontoInss = descontoInss(dadoUsuario.salarioBase);
dadoUsuario.faixaDescontoInss = ((valorDescontoInss * 100)/dadoUsuario.salarioBase);

console.log(' Nome: ' + dadoUsuario.nome + ' \n Salario bruto: ' + dadoUsuario.salarioBase + ' \n Faixa de desconto do INSS: ' + dadoUsuario.faixaDescontoInss.toFixed(1) + '% \n Valor descontado para o INSS: ' + valorDescontoInss.toFixed(2));