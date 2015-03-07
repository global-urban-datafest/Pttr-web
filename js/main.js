smoothScroll.init({
    speed: 1000,
    easing: 'easeInOutCubic',
    offset: 0,
    updateURL: true,
    callbackBefore: function(toggle, anchor) {},
    callbackAfter: function(toggle, anchor) {}
});
$(document).ready(function() {
    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    })

})
