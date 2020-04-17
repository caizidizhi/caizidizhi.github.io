var urlvars = avshow.getUrlVars();
var timeout = urlvars.timeout || avshow.timeout || 1500;
timeout = parseInt(timeout);


var go_to_f = function () {
    var go_to_url_interval = setTimeout(function () {

        var go_to_url = jQuery('#go_to_url').val();
        avshow.go_to_url(go_to_url, {
            'redirect_id': '{{redirect_id}}'
        });

        var tracker = avshow.get_tracker();

        setTimeout(function () {
            var href = location.href;
            var backup_host = jQuery('#backup_host').val();
            if (!backup_host || backup_host.length < 3) {
                if (tracker) {
                    tracker.send("event", 'redirect-fail', 'redirect', go_to_url);
                }
                return go_to_f();
            }
            if (len(backup_host) > 10) {
                avshow.go_to_url(backup_host, {
                    'redirect_id': '{{redirect_id}}'
                });
            }

            if (tracker) {
                tracker.send("event", 'redirect-fail', 'redirect', go_to_url);
            }

            setTimeout(function () {
                if (tracker) {
                    tracker.send("event", 'redirect-fail', 'redirect', backup_host);
                }
            }, 2000)

        }, 4250);

    }, timeout);
};

jQuery('.go-to-url a').click(function () {
    clearInterval(go_to_url_interval);
    ga('send', {
        hitType: 'event',
        eventCategory: 'click-redirect',
        eventAction: 'click',
        eventLabel: 'click'
    });
    return true;
});


go_to_f();