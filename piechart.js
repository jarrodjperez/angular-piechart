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

			scope.setStyle = function(clip, transform) {
				var styleObj = {};
				
				if(clip === 1){
					styleObj.clip = 'rect(0,'+ scope.size/2 + 'px,'+ scope.size +'px, 0)';
				} else {
					styleObj.clip = 'rect(0,'+ scope.size + 'px,'+ scope.size +'px,' +scope.size/2 + 'px)';
				}

				if(transform) {
					if(transform === 1) {
						var value = scope.value > 50 ? 50 : scope.value;
						var degree = 360 - (360 * (value / 100));
						
						styleObj.transform = 'rotate(' + degree + 'deg)';
					} else {
						var totalDegrees = 360 * scope.value / 100;
						var leftOverDegree = totalDegrees - 180;

						styleObj.transform = 'rotate(' + leftOverDegree + 'deg)';
					}
				}
				
				return styleObj;
			};
		}
	}
});