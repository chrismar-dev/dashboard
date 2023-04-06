import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function CatBreedChart({ catBreeds, selectedBreed }) {
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartOptions({
      chart: {
        type: "column",
      },
      title: {
        text: "Cat Breeds Lifespan Comparison",
      },
      xAxis: {
        categories: catBreeds.map((cat) => cat.name),
      },
      yAxis: {
        title: {
          text: "Lifespan (years)",
        },
      },
      series: chartSeries(catBreeds, selectedBreed),
    });
  }, [catBreeds, selectedBreed]);

  function chartSeries(catBreeds, selectedBreed) {
    return catBreeds.map((cat) => ({
      name: cat.name,
      data: [
        {
          x: cat.name,
          y: parseInt(cat.life_span),
          color: cat.name === selectedBreed ? "#FFC107" : "#2196F3",
        },
      ],
    }));
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}

export default CatBreedChart;
