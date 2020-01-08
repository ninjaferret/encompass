if(typeof fg == 'undefined') {
	var fg_init = function() {
		fg.jq = jQuery.noConflict(true);
		fg.jq.ajax({
			url: fg.url.protocol+'://'+fg.url.domain+'/bundles/flipgorilla/js/flipgorilla.js',
			cache: true,
			dataType: 'script'
		});
		delete fg_init;
	};
	fg = {
		'url': {
			'protocol': (document.location.protocol == 'https:'? 'https': 'http'),
            'domain': (typeof fg_domain != 'undefined'? fg_domain: 'www.flipgorilla.com'),
			'path': (typeof fg_path != 'undefined'? fg_path: '')
		},
		'jq': document.createElement('script')
	};
	fg.jq.type = 'text/javascript';
	if(typeof fg.jq.readyState == 'undefined') {
		fg.jq.onload = fg_init;
	}
	else {
		fg.jq.onreadystatechange = function() {
			if(fg.jq.readyState == 'loaded' || fg.jq.readyState == 'complete') {
				fg.jq.onreadystatechange = null;
				fg_init();
			}
		};
	}
    fg.jq.src = fg.url.protocol + '://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(fg.jq);
}
delete fg_path;