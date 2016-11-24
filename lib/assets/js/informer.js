'use strict';

(function(root, $) {

	var informer = $('#informer');
	var msg = informer.find('.message');
	var timer;

	var Informer = {
		show: function(message, type) {
			if (timer) {
				clearTimeout(timer);
			}
			type = type || 'success';
			msg.removeClass('error');
			if (type === 'error') {
				msg.addClass(type);
			}
			msg.text(message);
			informer.slideDown('fast');
			timer = setTimeout(function() {
				informer.slideUp();
			}, 1000 * 6);
		}
	};

	root.Informer = Informer;

})(window, jQuery);
