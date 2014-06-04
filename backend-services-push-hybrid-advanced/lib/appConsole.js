(function ($, undefined) {
    var count = 0;

    window.appConsole = {
        log: function (message, isError, container) {
            var lastContainer = $(".console div:first", container),
                counter = lastContainer.find(".count").detach(),
                lastMessage = lastContainer.text(),
                count = 1 * (counter.text() || 1);

            lastContainer.append(counter);

            if (!lastContainer.length || message !== lastMessage) {
                $("<div" + (isError ? " class='error'" : "") + "/>")
                    .css({
                        marginTop: -24,
                        backgroundColor: isError ? "#ffbbbb" : "#bbddff"
                    })
                    .html(message)
                    .prependTo($(".console", container))
                    .animate({
                        marginTop: 0
                    }, 300)
                    .animate({
                        backgroundColor: isError ? "#ffdddd" : "#ffffff"
                    }, 800);
            } else {
                count++;

                if (counter.length) {
                    counter.html(count);
                } else {
                    lastContainer.html(lastMessage)
                        .append("<span class='count'>" + count + "</span>");
                }
            }
        },

        error: function (message) {
            this.log(message, true);
        }
    };
})(jQuery);