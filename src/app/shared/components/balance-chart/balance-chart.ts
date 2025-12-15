import { Component } from '@angular/core';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-balance-chart',
  standalone: true,
  imports: [NgxEchartsModule],
  templateUrl: './balance-chart.html',
  styleUrls: ['./balance-chart.scss'],
})
export class BalanceChartComponent {
  data = [
    { month: 'Ene', balance: 35000 },
    { month: 'Feb', balance: 38000 },
    { month: 'Mar', balance: 36500 },
    { month: 'Abr', balance: 40000 },
    { month: 'May', balance: 42000 },
    { month: 'Jun', balance: 41500 },
    { month: 'Jul', balance: 45678 },
  ];

  chartOptions: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1e293b',
      borderWidth: 0,
      textStyle: { color: '#fff' },
      formatter: (params: any) => {
        const value = params[0].value[1];
        return `<div>
          <strong>Balance</strong><br/>
          $${value.toLocaleString()}
        </div>`;
      },
    },

    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      top: '10%',
      containLabel: true,
    },

    xAxis: {
      type: 'category',
      data: this.data.map((d) => d.month),
      axisLine: { lineStyle: { color: '#64748b' } },
      axisLabel: { fontSize: 12 },
    },

    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#64748b' } },
      axisLabel: {
        fontSize: 12,
        formatter: (v: number) => `$${(v / 1000).toFixed(0)}k`,
      },
      splitLine: { lineStyle: { color: '#e2e8f0' } },
    },

    series: [
      {
        name: 'Balance',
        type: 'line',
        smooth: true,
        showSymbol: false,
        data: this.data.map((d) => d.balance),
        lineStyle: {
          width: 2,
          color: '#2563eb',
        },
        areaStyle: {
          opacity: 1,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(37, 99, 235, 0.3)' },
            { offset: 1, color: 'rgba(37, 99, 235, 0)' },
          ]),
        },
      },
    ],
  };
}
