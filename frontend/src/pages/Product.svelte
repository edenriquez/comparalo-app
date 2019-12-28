<script>
  // export let params;
  let items = [
    {name: "Monitor", price: "123"},
    {name: "Monitor", price: "123"},
    {name: "Monitor", price: "123"},
    {name: "Monitor", price: "123"},
    {name: "Monitor", price: "123"},
  ]

  import {location, link} from 'svelte-spa-router'
  import { onMount } from "svelte";
  import ApexCharts from 'apexcharts'

  
  const getBeadCrumbRoutest = (location) =>{
    return location.split('/').filter((i)=> i != "")
  } 
  
  let routes = ["index",...getBeadCrumbRoutest($location)];
  onMount(async () => {
    var options = {
      annotations: {
        yaxis: [{
          y: 30,
          borderColor: '#999',
          label: {
            show: true,
            text: 'Support',
            style: {
              color: "#fff",
              background: '#00E396'
            }
          }
        }],
        xaxis: [{
          x: new Date('14 Nov 2012').getTime(),
          borderColor: '#999',
          yAxisIndex: 0,
          label: {
            show: true,
            text: 'Rally',
            style: {
              color: "#fff",
              background: '#775DD0'
            }
          }
        }]
      },
      chart: {
        type: 'area',
        height: 350,
        toolbar:{
          show: false
        },
      },
      dataLabels: {
        enabled: false
      },
      series: [{
          name: 'serie1',
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: 'serie2',
          data: [1, 100, 22, 51, 42, 109, 100]
        }],
      markers: {
        size: 0,
        style: 'hollow',
      },
      xaxis: {
        type: 'datetime',
        min: new Date('01 Mar 2012').getTime(),
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      }
    }

    var chart = new ApexCharts(
      document.querySelector("#chart"),
      options
    );

    chart.render();

    var resetCssClasses = function (activeEl) {
      var els = document.querySelectorAll("button");
      Array.prototype.forEach.call(els, function (el) {
        el.classList.remove('active');
      });

      activeEl.target.classList.add('active')
    }

    document.querySelector("#one_month").addEventListener('click', function (e) {
      resetCssClasses(e)
      chart.updateOptions({
        xaxis: {
          min: new Date('28 Jan 2013').getTime(),
          max: new Date('27 Feb 2013').getTime(),
        }
      })
    })

    document.querySelector("#six_months").addEventListener('click', function (e) {
      resetCssClasses(e)
      chart.updateOptions({
        xaxis: {
          min: new Date('27 Sep 2012').getTime(),
          max: new Date('27 Feb 2013').getTime(),
        }
      })
    })

    document.querySelector("#one_year").addEventListener('click', function (e) {
      resetCssClasses(e)
      chart.updateOptions({
        xaxis: {
          min: new Date('27 Feb 2012').getTime(),
          max: new Date('27 Feb 2013').getTime(),
        }
      })
    })

    document.querySelector("#ytd").addEventListener('click', function (e) {
      resetCssClasses(e)
      chart.updateOptions({
        xaxis: {
          min: new Date('01 Jan 2013').getTime(),
          max: new Date('27 Feb 2013').getTime(),
        }
      })
    })

    document.querySelector("#all").addEventListener('click', function (e) {
      resetCssClasses(e)
      chart.updateOptions({
        xaxis: {
          min: undefined,
          max: undefined,
        }
      })
    })

    document.querySelector("#ytd").addEventListener('click', function () {

    })
  })
</script>

<style>
  .beadcrumb{
    border: 1px solid #f2f1f1;
  }
  .beadcrumb-gray{
    color: #ccc;
  }
  .beadcrumb-active{
    color: #4299e1;
  }
  .product-item{
    border: 1px solid #f2f1f1;
  }
</style>

  <div class="beadcrumb shadow-lg rounded p-4 my-4 mx-4">
    {#each routes as route, i}
      {#if i == 0}
        <a class="beadcrumb-gray" href="/{route}" use:link> {route}</a>
      {:else if i == routes.length -1 }
        <span class="beadcrumb-gray px-2"> > </span> 
        <a class="beadcrumb-active" href="/{route}" use:link> {route}</a>
      {:else}
          <span class="beadcrumb-gray px-2"> > </span> 
          <a class="beadcrumb-gray" href="/{route}" use:link> {route}</a>
      {/if}
    {/each}
    
  </div>
 <div class=" justify-center flex flex-wrap w-full">
  <div class="w-full line-chart ">
    <div class="text-center">
      <span class="text-2xl text-gray-500">Lowest Price:</span>
      <span class="text-5xl font-bold block">$500.00</span>
    </div>
    <div id="chart"></div>
  </div>
</div>

<div class="w-full">
  {#each items as item}
    <div class="product-item rounded shadow-lg my-8 mx-4 p-4">
      <p class="text-gray-5000">{item.name}</p>
      <p>{item.price}</p>
    </div>
  {/each}
</div>
