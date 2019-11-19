<script>
  const BACKEND_BASE_API = "http://localhost:3000";
  export let placeholderText;
  import axios from "axios";

  const debounce = (func, delay) => {
    let debounceTimer;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleSearch = event => {
    const searchValue = event.target.value;
    axios
      .get(`${BACKEND_BASE_API}/search/options?q=${searchValue}&max=10?`)
      .then(response => {
        console.log("responses", response);
      })
      .catch(console.warn);
  };
  const handleFocusOnSearch = event => {
    const searchInput = event.target;
    const span = searchInput.nextElementSibling.firstElementChild;
    span.style.display = "none";
    span.style.opacity = "0";
    span.style.transition = "opacity 1.5s ease-out .8s ";
    const searchDiv = span.parentElement;
    searchDiv.style.width = "80px";
  };
  const handleFocusOutSearch = event => {
    const searchInput = event.target;
    const span = searchInput.nextElementSibling.firstElementChild;
    span.style.display = "block";
    span.style.opacity = "1";
    const searchDiv = span.parentElement;
    searchDiv.style.width = "180px";
  };
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  body {
    background: #252525;
  }

  .container {
    position: relative;
    margin-left: auto;
    margin-right: auto;
    max-width: 800px;
    width: 100%;
    height: 100px;
  }
  .container .search {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 180px;
    height: 80px;
    border-radius: 50px;
    transition: all 1s;
    z-index: 4;
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.4);
    -webkit-transition-property: background-color, left;
    transition-property: background-color, left;
    -webkit-transition-duration: 0.5s, 0.5s;
    transition-duration: 0.5s, 0.5s;
    -webkit-transition-timing-function: ease, ease-out;
    transition-timing-function: ease, ease-out;
    background: rgb(72, 187, 120);
    background: -moz-linear-gradient(
      90deg,
      rgba(72, 187, 120, 1) 0%,
      rgba(93, 208, 169, 1) 35%,
      rgba(99, 217, 146, 1) 100%
    );
    background: -webkit-linear-gradient(
      90deg,
      rgba(72, 187, 120, 1) 0%,
      rgba(93, 208, 169, 1) 35%,
      rgba(99, 217, 146, 1) 100%
    );
    background: linear-gradient(
      90deg,
      rgba(72, 187, 120, 1) 0%,
      rgba(93, 208, 169, 1) 35%,
      rgba(99, 217, 146, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#48bb78",endColorstr="#63d992",GradientType=1);
  }
  .container .search:hover {
    cursor: pointer;
  }
  .container .search::before {
    content: "";
    position: absolute;
    margin: auto;
    top: 22px;
    right: 0;
    bottom: 0;
    left: -80px;
    width: 12px;
    height: 2px;
    background: white;
    transform: rotate(45deg);
    transition: all 0.5s;
  }
  .container .search::after {
    content: "";
    position: absolute;
    margin: auto;
    top: -5px;
    right: 0;
    bottom: 0;
    left: -110px;
    width: 25px;
    height: 25px;
    border-radius: 50px;
    border: 2px solid white;
    transition: all 0.5s;
  }
  .container .search__text {
    position: absolute;
    color: #fff;
    left: 55px;
    top: 30px;
  }
  .container input {
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 50px;
    outline: none;
    border: none;
    background: rgb(249, 249, 249);
    color: gray;
    padding: 0 80px 0 20px;
    border-radius: 30px;
    /* box-shadow: 0 0 25px 0 rgb(249, 249, 249), 0 20px 25px 0 rgba(0, 0, 0, 0.2); */
    transition: all 0.2s;
    opacity: 0;
    z-index: 5;
    font-weight: bolder;
    letter-spacing: 0.1em;
  }
  .container input:hover {
    cursor: pointer;
  }
  .container input:focus {
    min-width: 300px;
    width: 80%;
    opacity: 1;
    cursor: text;
  }
  .container input:focus::placeholder {
    color: #ccc;
  }
  .container input:focus ~ .search {
    left: 70%;
    background: #151515;
    z-index: 6;
  }
  .container input:focus ~ .search::before {
    top: 0;
    left: 0;
    width: 25px;
  }
  .container input:focus ~ .search::after {
    top: 0;
    left: 0;
    width: 25px;
    height: 2px;
    border: none;
    background: white;
    border-radius: 0%;
    transform: rotate(-45deg);
  }
  .container input::placeholder {
    color: white;
    opacity: 0.5;
    font-weight: bolder;
  }
</style>

<!-- TODO: put advanced search -->
<!-- vendor url : product name filtered by vendor -->
<div class="flex flex-wrap w-full container my-32">
  <input
    type="text"
    placeholder={placeholderText}
    on:keydown={debounce(handleSearch, 500)}
    on:focus={handleFocusOnSearch}
    on:blur={handleFocusOutSearch} />
  <div class="search">
    <span class="search__text">click to search</span>
  </div>
</div>
