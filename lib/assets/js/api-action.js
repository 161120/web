'use strict';

(function(root, $, Api) {

	$(root.document).ready(function() {
		$('body').on('click', '.api-action', function(event) {
			event.preventDefault();
			var form = $(this);
			var data = form.data('data') || {};

			Api.action(form.data('action'), form.data('method'), data);

			return false;
		});
	});

})(window, jQuery, Api);
