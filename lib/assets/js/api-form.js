'use strict';

(function(root, $, Api) {

	$(root.document).ready(function() {
		$('body').on('submit', '.api-form', function(event) {
			event.preventDefault();
			var form = $(this);
			var data = {};
			form.find('input,select,textarea').each(function() {
				var el = $(this);
				var name = el.attr('name');
				if (name) {
					var value = el.val();
					if ([null, undefined, '', '---'].indexOf(value) < 0) {
						data[name] = value;
					}
				}
			});

			Api.action(form.data('action'), form.data('method'), data);

			return false;
		});
	});

})(window, jQuery, Api);
