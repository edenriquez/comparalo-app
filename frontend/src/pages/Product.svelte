<script>
  // export let params;

  import axios from "axios";
  import { location, link } from "svelte-spa-router";
  import { onMount } from "svelte";
  import { CONSTANTS } from "../config/constants";
  import ApexCharts from "apexcharts";

  const getBeadCrumbRoutest = location => {
    return location.split("/").filter(i => i != "");
  };

  let productInfo = [];
  let historicInfo = [];
  let items = [];
  let routes = ["index", ...getBeadCrumbRoutest($location)];

  onMount(async () => {
    let itemsFromApi = [];
    axios.defaults.baseURL = CONSTANTS.BACKEND_BASE_API;
    const productRequest = axios.get(`products/${routes[2]}`);
    const historicRequest = axios.get(`products/${routes[2]}/historic`);
    await Promise.all([productRequest, historicRequest]).then(
      async response => {
        const product = await response[0];
        const historic = await response[1];
        productInfo = product.data;
        historicInfo = historic.data;
      }
    );
    itemsFromApi.push({
      name: productInfo.name,
      price: productInfo.currentPrice,
      vendor: "amazon"
    });

    items = itemsFromApi;

    const sortedPrices = historicInfo[0].metrics.sort(function(a, b) {
      a = new Date(a.datetime);
      b = new Date(b.datetime);
      return a > b ? -1 : a < b ? 1 : 0;
    });
    const amazonPrices = [];
    sortedPrices.splice(0, 5).forEach(element => {
      amazonPrices.push(element.price);
    });
    const mercadoLibrePrices = [35, 41, 62, 42, 13];
    const elektraPrices = [87, 57, 74, 99, 75];

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
          data: amazonPrices
        },
        {
          name: "Mercado libre",
          data: mercadoLibrePrices
        },
        {
          name: "Elektra",
          data: elektraPrices
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

<!-- <div class="beadcrumb shadow-lg rounded p-4 my-4 mx-4">
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

</div> -->

<div class=" justify-center flex flex-wrap w-full mt-24">
  <div class="w-full line-chart ">
    <div class="text-center">
      <span class="text-2xl text-gray-500">Precio mas bajo:</span>
      <p class="text-1xl text-blue-400">{productInfo.name}</p>
      <span class="text-5xl font-bold block">
        $ {productInfo.currentPrice} MXN
      </span>
    </div>
    <div id="chart" />
  </div>
</div>

<div class="w-full">
  {#each items as item}
    <div class="product-item rounded shadow-lg my-8 mx-4 p-4">
      <p class="text-gray-500">{item.name}</p>
      <p>$ {item.price} MXN</p>
      <p class="text-gray-400">{item.vendor}</p>
    </div>
  {/each}
</div>
