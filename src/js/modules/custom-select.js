const customSelect = (($) => {
  function init() {
    $('select').selectric({
      forceRenderBelow: true,
    });
  }
  return { init };
})(jQuery);


export default customSelect;
