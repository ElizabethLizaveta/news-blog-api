
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-useless-concat */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
const getNews = (($) => {
  let array = [];
  let arrayPages = [];
  let $pagination;
  let $page;
  let $newsContainer;
  let pageNumber;
  let count = 2;

  function getData(url) {
    const req = new Request(url);

    fetch(req, {
      method: 'GET',
    })
      .then((response) => {
        const data = response.json();
        return (data);
      })
      .then((data) => {
        const articles = data.articles;
        console.log(data);
        appendData(articles);
        generatePagination(articles);
        appendNews();
        alertMessage(data);
      })
      .catch((err) => {
        console.log(`error: ${err}`);
      });
  }

  function alertMessage(data) {
    if (data.totalResults === 0) {
      clearData();
      const $alertMessage = $('<div class="alert-messsage">No results</div>');
      $newsContainer.append($alertMessage);
    }
  }

  function generatePagination(data) {
    arrayPages = [];
    const dataLength = data.length;

    pageNumber = Math.ceil(dataLength / 2);
    console.log(pageNumber);

    for (let i = 0; i < pageNumber; i++) {
      // eslint-disable-next-line no-const-assign
      $page = $('<div class="page"></div>');
      $newsContainer.append($page);
      arrayPages.push($page);
    }

    $newsContainer.find('div:eq(0)').addClass('page-active');

    if (dataLength > 4) {
      $newsContainer.append('<div class="pagination"></div>');
      $pagination = $newsContainer.find('.pagination');
      $pagination.append('<i class="arrow right"></i>').append('<i class="arrow left dots-visible"></i>');

      for (let i = 0; i < pageNumber; i++) {
        // eslint-disable-next-line no-const-assign
        $pagination.append(`<span class="dot">${i + 1}</span>`);
      }

      $pagination.find('span:eq(0)').addClass('dot-active');
      displayPagination();
      changePage();
    }
  }

  function displayPagination() {
    $pagination.find('span:eq(0)').addClass('dot-visible');
    $pagination.find('span:eq(1)').addClass('dot-visible');
    const ar = $pagination.find('.arrow.right');
    const al = $pagination.find('.arrow.left');
    const last = $pagination.find('span').last();

    last.click(() => {
      count = pageNumber - 2;
      $pagination.find('.dot').removeClass('dot-visible');
      $pagination.find('.dot').removeClass('dot-active');
      $('.page').removeClass('page-active');
      $pagination.find(`span:eq(${count})`).addClass('dot-visible').addClass('dot-active');
      arrayPages[count].addClass('page-active');
      $pagination.find(`span:eq(${count + 1})`).addClass('dot-visible');
      $('.dots').addClass('dots-visible');
      ar.addClass('dots-visible');
      al.removeClass('dots-visible');
    });

    ar.click(() => {
      al.removeClass('dots-visible');
      $pagination.find('.dot').removeClass('dot-visible');
      $pagination.find('.dot').removeClass('dot-active');
      $('.page').removeClass('page-active');
      $pagination.find('span').last().addClass('dot-visible');
      $pagination.find(`span:eq(${count})`).addClass('dot-visible').addClass('dot-active');
      arrayPages[count].addClass('page-active');
      $pagination.find(`span:eq(${count + 1})`).addClass('dot-visible');
      count += 2;
      if (count === pageNumber) {
        $('.dots').addClass('dots-visible');
        ar.addClass('dots-visible');
        count -= 2;
      }
    });

    al.click(() => {
      ar.removeClass('dots-visible');
      console.log(count);
      count -= 2;
      $pagination.find('.dot').removeClass('dot-visible');
      $pagination.find('.dot').removeClass('dot-active');
      $('.page').removeClass('page-active');
      $pagination.find('span').last().addClass('dot-visible');
      $pagination.find(`span:eq(${count})`).addClass('dot-visible').addClass('dot-active');
      arrayPages[count].addClass('page-active');
      $pagination.find(`span:eq(${count + 1})`).addClass('dot-visible');

      $('.dots').removeClass('dots-visible');

      if (count === 0) {
        al.addClass('dots-visible');
      }
    });

    $pagination.find('span').last().addClass('dot-visible');
    $pagination.find('span').last().before('<div class="dots">...</div>');
  }


  function changePage() {
    $('.dot').click((e) => {
      const target = $(e.target);
      const dotId = (target.index() - 2);
      console.log('dot id' + dotId);
      $('.dot').removeClass('dot-active');
      $('.page').removeClass('page-active');
      target.addClass('dot-active');
      arrayPages[dotId].addClass('page-active');
    });
  }

  function appendNews() {
    console.log(array.length);
    console.log(arrayPages.length);
    for (let i = 0, j = 0; i < array.length && j < arrayPages.length; i += 2, j++) {
      arrayPages[j].append(array[i]).append(array[i + 1]);
    }
  }

  function appendData(data) {
    array = [];
    $newsContainer = $('.news-container');


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
      array.push($newsCard);

      // $newsContainer.append($newsCard);
    }
    console.log(array);
  }

  function clearData() {
    $newsContainer.find('div').remove();
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

    let wordURL = `q=${keyWord}&`;
    const countryUrl = `country=${countryVal}&`;
    let categoryUrl = `category=${categoryVal}&`;
    const newsapi = 'https://newsapi.org/v2/top-headlines?';
    const apiKey = 'apiKey=103a662bbeb44526808b923516495f10';

    if (categoryVal === 'all') categoryUrl = '';
    if (!keyWord) wordURL = '';


    const url = newsapi + wordURL + countryUrl + categoryUrl + apiKey;
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


  function searchByWord() {
    const $search = $('.search-input');

    $search.keyup(() => {
      clearData();
      createUrl();
    });
  }

  function clearInput() {
    $(document).mouseup((e) => {
      const $search = $('.search-input');

      if (!$search.is(e.target)) {
        $search.val('');
      }
    });
  }

  function init() {
    createUrl();
    sortContent();
    searchByWord();
    changePage();
    displayPagination();
    clearInput();
  }

  return { init };
})(jQuery);

export default getNews;
