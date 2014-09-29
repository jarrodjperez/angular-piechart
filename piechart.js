myApp.directive('piechart', function($window) {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: '/directives/piechart/piechart.html',
		link: function(scope, elem, attrs) {
			scope.size = Number(attrs.size);
			scope.value = attrs.value;
			scope.label = attrs.label;

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
				var degree = 360 - (360 * (scope.value / 100));

				return {
					'-webkit-transform': 'rotate(' + degree + 'deg)',
					'transform': 'rotate(' + degree + 'deg)',
					'clip': 'rect('+0+'px,'+ scope.size/2 +'px,' + scope.size + 'px,'+0+'px)'
				}
			};
		}
	}
});