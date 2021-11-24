import { Component, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { map } from 'rxjs/operators';
import { ContaFinanceira } from 'src/app/shared/models/platform/conta-financeira.model';
import { ContaFinanceiraService } from 'src/app/shared/services/conta-financeira.service';
import { UtilService } from 'src/app/shared/services/Utils/utils-resource.service';
//import currencyFormatter from "currency-formatter";


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartData: any;
  revenueChartData: any;
  private utilService: UtilService;


  chartOptions = {
    scales:{
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  categorias: any[] = [];

  entries: ContaFinanceira[] = [];

  @ViewChild('month', { static: true }) month: ElementRef = null;
  @ViewChild('year', { static: true }) year: ElementRef = null;

  constructor(private injector: Injector, private contaFinanceiraService: ContaFinanceiraService) {
    this.utilService = new UtilService(injector);
   }

  ngOnInit() {
    this.utilService.getTodasCategorias().subscribe(
      resources => this.categorias = resources,
      error => alert("Erro ao carregar a lista de categorias")
    )
  }

  generateReports(){
    //nativeElement pega o elemento html
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if(!month || !year)
      alert("Você precisa selecionar o mês e o ano para gerar os relatórios");
    else 
      this.contaFinanceiraService.getContasByMonth(month, year).subscribe(this.setValues.bind(this));
  }

  private setValues(entries: ContaFinanceira[]){
    this.entries = entries;
    debugger
    this.calculateBalance();
    this.setChartData();
  }

  private calculateBalance(){
    debugger
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if(entry.tipoContaFinanceira == 'ContaReceber')
        revenueTotal += entry.valorPago ?? 0
      else
        expenseTotal += entry.valorPago ?? 0
    })

    this.expenseTotal = expenseTotal;
    this.revenueTotal = revenueTotal;
    this.balance = revenueTotal - expenseTotal;
  }

  private setChartData(){
    debugger
   this.revenueChartData = this.getChartData('ContaReceber', 'Gráfico de Receitas', '#9CCC65');

    this.expenseChartData = this.getChartData('ContaPagar', 'Gráfico de Despesas', '#E03131');
  }

  private getChartData(entryType: string, title: string, color: string ){
    const chartData = []; 
    this.categorias.forEach(category =>{
      //filtering entries by category and type
      const filteredEntries = this.entries.filter(
        entry => (entry.categoriaId == category.id) && (entry.tipoContaFinanceira == entryType)
      );

      //if found entries, then sum entries amount and add to chartData
      if(filteredEntries.length > 0){
        const totalAmount = filteredEntries.reduce(
          (total, entry) => total + entry.valorPrevisto, 0
        )

        chartData.push({
          categoryName: category.descricao,
          totalAmount: totalAmount
        })
      }
    })

    return {
      labels: chartData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: color,
        data: chartData.map(item => item.totalAmount)
      }]
    };
  }
}
