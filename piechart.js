myApp.directive('piechart', function($window) {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: '/directives/piechart/piechart.html',
		link: function(scope, elem, attrs) {
			scope.size = Number(attrs.size);
			scope.value = attrs.value;

			if(scope.value > 50) {
				scope.overHalf = true;
			}

			scope.pieStyle = function () {
				return {
					height: scope.size + 'px',
					width: scope.size + 'px'
				}
			};

			scope.sliceStyle = function () {
				return {
					clip: 'rect('+0+'px,'+ scope.size +'px,' + scope.size + 'px,' + scope.size/2 + 'px)'
				}
			};

			scope.innerStyle = function () {
				var value = scope.value > 50 ? 50 : scope.value;
				var degree = 360 - (360 * (value / 100));

				return {
					'-webkit-transform': 'rotate(' + degree + 'deg)',
					'transform': 'rotate(' + degree + 'deg)',
					'clip': 'rect('+0+'px,'+ scope.size/2 +'px,' + scope.size + 'px,'+0+'px)'
				}
			};

			scope.inner2Style = function () {
				var value = scope.value - 50;
				var degree = 360 - (360 * (value / 100));

				console.log(degree);

				return {
					'-webkit-transform': 'rotate(' + degree + 'deg)',
					'transform': 'rotate(' + degree + 'deg)',
					'clip': 'rect('+0+'px,'+ scope.size/2 +'px,' + scope.size + 'px,'+0+'px)'
				}
			};
		}
	}
});