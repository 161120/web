'use strict';

(function(root, $, informer) {

	function processAction(action) {
		if (!action) {
			return;
		}
		switch (action.type) {
			case 'redirect':
				root.location.assign(action.url);
				break;
		}
		informer.show(action.message, action.messageType);
	}

	function processResult(result) {
		var action = result.action || result.error && { message: result.error.message, type: 'message', messageType: 'error' };
		processAction(action);
	}

	function call(options, callback) {
		$.ajax({
			method: options.method || 'GET',
			url: options.url,
			data: options.data,
			dataType: 'json',
			error: function(jqXHR, textStatus, errorThrown) {
				var json = jqXHR.responseJSON;
				processResult(json);
				callback(errorThrown || textStatus);
			},
			success: function(result) {
				processResult(result);
				callback(null, result.data);
			}
		});
	}

	var Api = {
		action: function(url, method, data, callback) {
			callback = callback || function() {};
			var options = {};

			options.data = data;
			options.url = url;
			options.method = method || 'POST';

			return call(options, callback);
		}
	};

	root.Api = Api;

})(window, jQuery, Informer);
