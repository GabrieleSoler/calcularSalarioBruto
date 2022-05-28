/* 
    node src/index.js Nome SalarioBruto horasExtras
*/
interface DadosUsuario {
    nome: String,
    salarioBruto: number,
    quantidadeHorasExtras: number, 
    valorHorasExtras: number,
    salarioBase: number,
    aliquotaBase: number,
    valorBaseFaixa: number,
    valorAgregado: number,
    faixaDescontoInss: number,
    descontoIr: number,
    faixaDescontoIr: number,
    valorDescontadoIr: number,
    valorDescontadoInss: number,
    parcelaDedutivelIr: number,
    salarioLiquido: number
}

class Usuario {
    constructor(nome: string, salario: number, horasExtrasAnual: number){
        this.setNome(nome),
        this.setSalarioBruto(salario);
        this.setSalarioLiquido();
        this.setQuantidadeHorasExtras(horasExtrasAnual);
        this.setTotalHorasExtras();
        this.setSalarioBase()
        this.setDescontoInss();
        this.setFaixaDescontoInss();
        this.setDescontoIr()
        this.setFaixaDescontoIr();
    }

    private dadosUsuario = {} as DadosUsuario;

    setNome(nome: string): void {
        this.dadosUsuario.nome = nome;
    }
    setSalarioBruto(salario: number): void {
        this.dadosUsuario.salarioBruto = salario;
    }
    setQuantidadeHorasExtras(horas: number): void {
        this.dadosUsuario.quantidadeHorasExtras = horas;
    }

    setTotalHorasExtras(): void {
        let valorPorHoraExtra = (this.dadosUsuario.salarioBruto / 200) * 1.5;
        this.dadosUsuario.valorHorasExtras = valorPorHoraExtra * this.dadosUsuario.quantidadeHorasExtras;   
    }

    setSalarioBase(): void {
        this.dadosUsuario.salarioBase = this.dadosUsuario.salarioBruto + this.dadosUsuario.valorHorasExtras;
    }

    setDescontoInss(): void {

        if (this.dadosUsuario.salarioBase <= 1212.00){
            this.dadosUsuario.aliquotaBase =  0.075;
            this.dadosUsuario.valorBaseFaixa = null;
            this.dadosUsuario.valorAgregado = null;
        }
        if (this.dadosUsuario.salarioBase >= 1212.01 && this.dadosUsuario.salarioBase <= 2427.35){
            this.dadosUsuario.aliquotaBase = 0.09;
            this.dadosUsuario.valorBaseFaixa = 1212.01;
            this.dadosUsuario.valorAgregado = 90.90;
        }
        if (this.dadosUsuario.salarioBase >= 2427.36 && this.dadosUsuario.salarioBase <= 3641.03){
            this.dadosUsuario.aliquotaBase = 0.12;
            this.dadosUsuario.valorBaseFaixa = 2427.36;
            this.dadosUsuario.valorAgregado = 200.28;
        }
        if (this.dadosUsuario.salarioBase >= 3641.04 && this.dadosUsuario.salarioBase <= 7087.22){
            this.dadosUsuario.aliquotaBase = 0.14;
            this.dadosUsuario.valorBaseFaixa = 3641.04;
            this.dadosUsuario.valorAgregado = 345.92;
        }
        if (this.dadosUsuario.salarioBase >= 7087.23){
            this.dadosUsuario.aliquotaBase = null;
            this.dadosUsuario.valorBaseFaixa = 7087.23;
            this.dadosUsuario.valorAgregado = 828.39;
        }

       this.dadosUsuario.valorDescontadoInss =  ((this.dadosUsuario.salarioBase - this.dadosUsuario.valorBaseFaixa) * this.dadosUsuario.aliquotaBase ) + this.dadosUsuario.valorAgregado; 
    }

    setFaixaDescontoInss(): void {
        this.dadosUsuario.faixaDescontoInss = ((this.dadosUsuario.valorDescontadoIr * 100)/this.dadosUsuario.salarioBase);
    }

    setDescontoIr(): void {
        var salarioComDescontoInss = (this.dadosUsuario.salarioBase - this.dadosUsuario.valorDescontadoInss);

        if(salarioComDescontoInss <= 1903.98 ) {
            this.dadosUsuario.descontoIr = null;
            this.dadosUsuario.parcelaDedutivelIr = null;
        }
        if(salarioComDescontoInss >= 1903.99 && salarioComDescontoInss <= 2826.65 ) {
            this.dadosUsuario.descontoIr = 0.075;
            this.dadosUsuario.parcelaDedutivelIr = 142.80;
        }
        if(salarioComDescontoInss >= 2826.66 && salarioComDescontoInss <= 3751.05 ) {
            this.dadosUsuario.descontoIr = 0.15;
            this.dadosUsuario.parcelaDedutivelIr = 354.80;
        }
        if(salarioComDescontoInss >= 3751.06 && salarioComDescontoInss <= 4664.68 ) {
            this.dadosUsuario.descontoIr = 0.225;
            this.dadosUsuario.parcelaDedutivelIr = 636.13;
        } 
        if(salarioComDescontoInss > 4664.68) {
            this.dadosUsuario.descontoIr = 0.275;
            this.dadosUsuario.parcelaDedutivelIr = 869.36;
        }

        this.dadosUsuario.valorDescontadoIr = ((salarioComDescontoInss * this.dadosUsuario.descontoIr ) - this.dadosUsuario.parcelaDedutivelIr); 
    }
    setFaixaDescontoIr(): void {
        this.dadosUsuario.faixaDescontoIr = ((this.dadosUsuario.valorDescontadoIr * 100)/(this.dadosUsuario.salarioBase - this.dadosUsuario.valorDescontadoInss));
    }

    setSalarioLiquido(): void {
        this.dadosUsuario.salarioLiquido = (this.dadosUsuario.salarioBase - this.dadosUsuario.valorDescontadoInss - this.dadosUsuario.valorDescontadoIr);

    }

    getDadosUsuario(): DadosUsuario {
        return this.dadosUsuario;
      }
}

function modelo(nome: string, salario: number, horasExtrasAnual: number): void {

    const usuario = new Usuario(nome, salario, horasExtrasAnual);
  
    console.log(usuario.getDadosUsuario());
  
}
modelo(process.argv[2], parseInt(process.argv[3]), parseInt(process.argv[4]));

if (this.dadosUsuario.salarioBase - this.dadosUsuario.valorDescontadoInss < 1903.98){
    console.log(this.dadosUsuario.nome + ' você esta isento de receber o recolhimento do Imposto de Renda!');
}else{
    console.log(' Nome: ' + this.dadosUsuario.nome + ' \n' +
                 'Salario bruto: R$' + this.dadosUsuario.salarioBruto + '\n' + 
                 ' Valor total de hora extra: R$' + this.dadosUsuario.valorHorasExtras + ' \n' +
                 ' Porcentagem de desconto do INSS: ' + this.dadosUsuario.faixaDescontoInss.toFixed(2) + '% \n' + 
                 ' Valor descontado para o INSS: R$' + this.dadosUsuario.valorDescontoInss.toFixed(2) + ' \n' + 
                 ' Porcentagem de desconto do IR: ' + this.dadosUsuario.faixaDescontoIr.toFixed(2) + '% \n ' + 
                 ' Valor descontado para o Ir: R$' + this.dadosUsuario.valorDescontadoIr.toFixed(2) + ' \n' +
                 ' Valor do salário líquido: R$' + this.dadosUsuario.salarioLiquido.toFixed(2));
}
