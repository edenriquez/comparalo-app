<script>
  export let params;
  import {location, link} from 'svelte-spa-router'
  import Chart from "chart.js";
  import { onMount } from "svelte";
  const getBeadCrumbRoutest = (location) =>{
    return location.split('/').filter((i)=> i != "")
  } 
  
  let routes = ["index",...getBeadCrumbRoutest($location)];
  onMount(async () => {
    var chart = document.getElementById("chart").getContext("2d"),
      gradient = chart.createLinearGradient(0, 0, 0, 450);

    gradient.addColorStop(0, "rgb(93, 209, 167)");
    gradient.addColorStop(0.5, "rgba(93, 209, 167, 0.49)");
    gradient.addColorStop(1, "rgba(0, 255, 34, 0)");

    var data = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          backgroundColor: gradient,
          pointBackgroundColor: "white",
          pointBorderWidth: 10,
          borderWidth: 3,
          borderColor: "#48bb78",
          data: [50, 55, 80, 81, 54, 50],
          // borderDash: [10,5] // dotted
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
              lineWidth: 0.5
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              color: "rgba(200, 200, 200, 0.08)",
              lineWidth: 0.5
            },
            ticks: {
              display: false // TODO: check this
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
        backgroundColor: "rgba(0,0,0,0.3)",
        titleFontColor: "red",
        caretSize: 5,
        cornerRadius: 5,
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

  .cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: #fff;
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
    max-width: 1000px;
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

 <div class=" justify-center flex flex-wrap w-full">
 <!-- TODO: make this as a external component -->
  <div class="beadcrumb">
    {#each routes as route}
      <a href="/{route}" use:link>/{route}</a>
    {/each}
    
  </div>
  <h1 class=" w-full text-center my-10 text-blue-500">Product {params.search_id}</h1>
  <div class="w-full line-chart">
  <div class="text-center">
    <span class="text-4xl text-gray-500">Lowest Price:</span>
    <span class="text-5xl font-bold block">$500.00</span>
  </div>
    <div class=" aspect-ratio">
      <canvas id="chart" />
    </div>
  </div>
</div>
