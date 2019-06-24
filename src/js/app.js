// You can write a call and import your functions in this file.
//
// This file will be compiled into app.js and will not be minified.
// Feel free with using ES6 here.

import getNews from './modules/getNews';
import customSelect from './modules/custom-select';

(($) => {
  // When DOM is ready
  $(() => {
    customSelect.init();
    getNews.init();
  });
})(jQuery);
