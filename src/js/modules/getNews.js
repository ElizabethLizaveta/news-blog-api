/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
const getNews = (($) => {
  function getFunc() {
    const url = 'https://newsapi.org/v2/top-headlines?'
          + 'country=us&'
          + 'apiKey=f872c395e4394a89b171abde4b0aabe6';
    const req = new Request(url);

    function appendData(data) {
      const mainContainer = document.getElementById('myData');
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const div = document.createElement('div');
        div.innerHTML = `Title: ${data[i].title}`;
        mainContainer.appendChild(div);
      }
    }

    fetch(req)
      .then((response) => {
        const data = response.json();
        return (data);
      })
      .then((data) => {
        const articles = data.articles;
        appendData(articles);
      })
      .catch((err) => {
        console.log(`error: ${err}`);
      });
  }

  function init() {
    getFunc();
  }

  return { init };
})(jQuery);

export default getNews;
