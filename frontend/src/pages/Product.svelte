<script>
  // export let params;
  let items = [
    { name: "Monitor", price: "123", vendor: "mercado libre" },
    { name: "Monitor", price: "123", vendor: "amazon" },
    { name: "Monitor", price: "123", vendor: "liverpool" },
    { name: "Monitor", price: "123", vendor: "ebay" },
    { name: "Monitor", price: "123", vendor: "elektra" }
  ];

  import { location, link } from "svelte-spa-router";
  import { onMount } from "svelte";
  import ApexCharts from "apexcharts";

  const getBeadCrumbRoutest = location => {
    return location.split("/").filter(i => i != "");
  };

  let routes = ["index", ...getBeadCrumbRoutest($location)];

  onMount(async () => {
    var options = {
      chart: {
        height: 350,
        type: "area",
        toolbar: { tools: { download: false } }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [7, 5, 5],
        curve: "smooth",
        dashArray: [0, 8, 5]
      },
      series: [
        {
          name: "Amazon",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "Mercado libre",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
          name: "Elektra",
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }
      ],
      title: {
        text: "",
        align: "left"
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      legend: {
        onItemHover: {
          highlightDataSeries: true // false disable opacity on hover
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100]
        }
      },
      yaxis: {
        show: false
      },
      xaxis: {
        categories: [
          "01 Jan",
          "02 Jan",
          "03 Jan",
          "04 Jan",
          "05 Jan",
          "06 Jan",
          "07 Jan",
          "08 Jan",
          "09 Jan",
          "10 Jan",
          "11 Jan",
          "12 Jan"
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();
  });
</script>

<style>
  .beadcrumb {
    border: 1px solid #f2f1f1;
  }
  .beadcrumb-gray {
    color: #ccc;
  }
  .beadcrumb-active {
    color: #4299e1;
  }
  .product-item {
    border: 1px solid #f2f1f1;
  }
  /* #chart {
    width: 800px;
  } */
</style>

<div class="beadcrumb shadow-lg rounded p-4 my-4 mx-4">
  {#each routes as route, i}
    {#if i == 0}
      <a class="beadcrumb-gray" href="/{route}" use:link>{route}</a>
    {:else if i == routes.length - 1}
      <span class="beadcrumb-gray px-2">></span>
      <a class="beadcrumb-active" href="/{route}" use:link>{route}</a>
    {:else}
      <span class="beadcrumb-gray px-2">></span>
      <a class="beadcrumb-gray" href="/{route}" use:link>{route}</a>
    {/if}
  {/each}

</div>

<div class=" justify-center flex flex-wrap w-full">
  <div class="w-full line-chart ">
    <div class="text-center">
      <span class="text-2xl text-gray-500">Lowest Price:</span>
      <span class="text-5xl font-bold block">$500.00</span>
    </div>
    <div id="chart" />
  </div>
</div>

<div class="w-full">
  {#each items as item}
    <div class="product-item rounded shadow-lg my-8 mx-4 p-4">
      <p class="text-gray-5000">{item.name}</p>
      <p>{item.price}</p>
      <p class="text-gray-400">{item.vendor}</p>
    </div>
  {/each}
</div>
