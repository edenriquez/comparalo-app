<script>
  export let params;
  import Chart from "chart.js";
  import { onMount } from "svelte";
  onMount(async () => {
    var chart = document.getElementById("chart").getContext("2d"),
      gradient = chart.createLinearGradient(0, 0, 0, 450);

    gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    var data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Custom Label Name",
          backgroundColor: gradient,
          pointBackgroundColor: "white",
          borderWidth: 1,
          borderColor: "#911215",
          data: [50, 55, 80, 81, 54, 50]
        }
      ]
    };

    var options = {
      responsive: true,
      maintainAspectRatio: true,
      animation: {
        easing: "easeInOutQuad",
        duration: 520
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: "rgba(200, 200, 200, 0.05)",
              lineWidth: 1
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              color: "rgba(200, 200, 200, 0.08)",
              lineWidth: 1
            }
          }
        ]
      },
      elements: {
        line: {
          tension: 0.4
        }
      },
      legend: {
        display: false
      },
      point: {
        backgroundColor: "white"
      },
      tooltips: {
        titleFontFamily: "Open Sans",
        backgroundColor: "rgba(0,0,0,0.3)",
        titleFontColor: "red",
        caretSize: 5,
        cornerRadius: 2,
        xPadding: 10,
        yPadding: 10
      }
    };

    var chartInstance = new Chart(chart, {
      type: "line",
      data: data,
      options: options
    });
  });
</script>

<style>
  html,
  body {
    height: 100%;
  }

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: #252429;
  }

  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    padding: 20px;
  }

  .line-chart {
    -webkit-animation: fadeIn 600ms cubic-bezier(0.57, 0.25, 0.65, 1) 1 forwards;
    animation: fadeIn 600ms cubic-bezier(0.57, 0.25, 0.65, 1) 1 forwards;
    opacity: 0;
    max-width: 640px;
    width: 100%;
  }

  .aspect-ratio {
    height: 0;
    padding-bottom: 50%;
  }

  @-webkit-keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
</style>

<div>
  <div class="line-chart">
    <div class="aspect-ratio">
      <canvas id="chart" />
    </div>
  </div>
  <h1 class="text-blue-500">Product {params.search_id}</h1>
</div>
