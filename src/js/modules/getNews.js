/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
const getNews = (($) => {
  function getData(url) {
    const req = new Request(url);

    fetch(req)
      .then((response) => {
        const data = response.json();
        return (data);
      })
      .then((data) => {
        const articles = data.articles;
        console.log(data);
        appendData(articles);
      })
      .catch((err) => {
        console.log(`error: ${err}`);
      });
  }

  function appendData(data) {
    const $newsContainer = $('.news-container');

    for (let i = 0; i < data.length; i++) {
      const $newsCard = $(`<a class="news-card" href="${data[i].url}"><div></div></a>`);
      const $dateBlock = $('<div class="date"></div>');
      const $titleBlock = $('<h2 class="title"></h2>');
      const $descriptionBlock = $('<p class="description"></p>');

      const dateFull = data[i].publishedAt;
      const date = dateFull.substring(0, 10);

      $dateBlock.html(date);
      $titleBlock.html(data[i].title);
      $descriptionBlock.html(data[i].description);

      $newsCard.append($dateBlock).append($titleBlock).append($descriptionBlock);
      $newsContainer.append($newsCard);
    }
  }

  function clearData() {
    const $newsContainer = $('.news-container');
    $newsContainer.find('a').remove();
  }

  function createUrl() {
    const $country = $('#country');
    const $category = $('#category');
    const $search = $('.search-input');

    const countryVal = $country.val();
    const categoryVal = $category.val();
    const keyWord = $search.val();

    // const d = new Date();
    // const strDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

    const wordURL = `q=${keyWord}&`;
    let countryUrl = `country=${countryVal}&`;
    let categoryUrl = `category=${categoryVal}&`;
    // const date = `from=${strDate}&`;
    // const priority = 'sortBy=popularity&';
    // let sortURL = '';
    const newssapi = 'https://newsapi.org/v2/top-headlines?';

    if (categoryVal === 'all') categoryUrl = '';
    if (countryVal === 'all') countryUrl = '';

    // if (sortVal === 'popularity') {
    //   sortURL = priority;
    // } else { sortURL = date; }

    const url = newssapi + wordURL + countryUrl + categoryUrl + 'apiKey=ad8622fc80174a46a09ec1425a593b94';
    console.log('URL=' + url);
    getData(url);
  }

  function sortContent() {
    const $select = $('select');

    $select.on('change', () => {
      clearData();
      createUrl();
    });
  }

  function clearInput() {
    const $search = $('.search-input');
    $search.val('');
  }

  function searchByWord() {
    const searchForm = $('.search-form');

    searchForm.submit((event) => {
      event.preventDefault();
      clearData();
      createUrl();
      clearInput();
    });
  }

  function init() {
    createUrl();
    sortContent();
    searchByWord();
  }

  return { init };
})(jQuery);

export default getNews;
