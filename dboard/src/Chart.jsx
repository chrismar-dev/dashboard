import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from './Dashboard'

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartOptions: {
        chart: {
          type: 'column'
        },
        title: {
          text: "Cat Breeds Lifespan Comparison"
        },
        xAxis: {
          categories: ['This breed', 'Similar breed1', 'Similar breed2']
        },
        yAxis: {
          title: {
            text: 'years'
          }
        },
        series: [{
          name: '1 - 15 years',
          data: [1.5, 10, 4]
        }, {
          name: '15 - 20 years',
          data: [5, 19, 8]
        }, 

        {
          name: '20+ years',
          data: [12, 71, 3]
        }
      ]
      }
    };
  }

  render() {
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={this.state.chartOptions}
      />
    );
  }
}

export default Chart;
