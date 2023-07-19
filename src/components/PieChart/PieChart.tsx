import React, { useEffect, useState } from 'react';

import styles from './PieChart.module.sass';
import { IPieChartProps } from '../../types/pieChartProps';
import { PieChartSector } from '../PieChartSector';
import { IPieChartSector } from '../../types/pieChartSectorProps';
import { EXPENSE_CATEGORY as expenseCategory } from '../../constants/selectOptions';
import { IData } from '../../types/pieChartData';
import { ISelectOption } from '../../types/selectOption';

const DURATION: number = 800;

const PieChart: React.FC<IPieChartProps> = ({ data, radius }) => {
  const [chartSectors, setChartSectors] = useState<IPieChartSector[]>([]);

  useEffect(() => {
    const dataTotal = data.reduce((accumulator: IData[], current: IData): IData[] => {
      const existingItem = accumulator.find(item => item.type === current.type);

      if (existingItem) {
        existingItem.value = existingItem.value && current.value ? existingItem.value + current.value : current.value;
      } else {
        accumulator.push({ type: current.type, value: current.value });
      }

      return accumulator;
    }, []);

    const categoryList = expenseCategory.map((expense: ISelectOption) => {
      let total = 0;
      dataTotal.forEach(item => {
        if (item.type === expense.value) {
          total = item.value || 0;
        }
      })

      return { ...expense, total, color: expense.color }
    });

    const chartData = categoryList
      .filter(item => item.total)
      .sort((a, b) => b.total - a.total);

    const expenseTotal = chartData.reduce((accumulator: number, currentValue) => accumulator + currentValue.total, 0);

    let accumulator: number = 0;

    const sectors = chartData.map((item): IPieChartSector => {
      const angle = accumulator;
      accumulator = accumulator + (item.total / expenseTotal) * 360;

      return {
        duration: DURATION,
        sectorFraction: item.total !== expenseTotal ? item.total / expenseTotal : 0.9999,
        radius: radius,
        color: item.color,
        angleRotate: angle,
        label: item.label,
        value: item.total,
      }
    });

    setChartSectors(sectors);
  }, [data]);

  return (
    <div className={styles['pie-chart']}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${2 * radius} ${2 * radius}`} width={2 * radius} height={2 * radius}>
        {
          chartSectors && chartSectors.length ?
            chartSectors.map(sector => {
              return (<PieChartSector {...sector} key={sector.color} />)
            }) : null
        }
      </svg>
      {
        chartSectors && chartSectors.length ?

          <div className={styles['chart-legends']}>
            {
              chartSectors.map(sector => {
                return (<div
                  key={`legend-item-${sector.color}`}
                  className={styles['legend-item']}
                >
                  <div className={styles['legend-item-value']}>{sector.value}</div>
                  <div className={styles['legend-item-color']} style={{ backgroundColor: sector.color }} />
                  <div className={styles['legend-item-label']}>{sector.label}</div>
                </div>)
              })
            }
          </div> : null
      }
    </div>
  )
};

export { PieChart };