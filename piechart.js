myApp.directive('piechart', function($interval) {
	return {
		restrict: 'E',
		scope: {
			value: '='
		},
		templateUrl: '/directives/piechart/piechart.html',
		link: function(scope, elem, attrs) {
			scope.size = Number(attrs.size);
			scope.label = attrs.label;
			scope.icon = attrs.icon;
			scope.animate = attrs.animate != undefined ? true : false;
			scope.duration = Number(attrs.duration) || 1000;

			var currentValue = scope.animate ? 0 : null;

			scope.pieStyle = function () {
				return {
					height: scope.size + 'px',
					width: scope.size + 'px'
				}
			};

			var runAnimate = function () {

				var deltaT = 1000 / 60;
				var slices = scope.duration / deltaT;
				var deltaValue = scope.value / slices;

				var interval = $interval(function(){	
					if(currentValue < scope.value) {				
						currentValue += deltaValue;
					}else {
						$interval.cancel(interval);
					}
				}, deltaT);	
			};

			if(scope.animate) {
				runAnimate();
			}
			

			scope.setStyle = function(clip, transform) {
				var styleObj = {};
				
				if(clip === 1){
					styleObj.clip = 'rect(0,'+ scope.size/2 + 'px,'+ scope.size +'px, 0)';
				} else {
					styleObj.clip = 'rect(0,'+ scope.size + 'px,'+ scope.size +'px,' +scope.size/2 + 'px)';
				}

				var value = Math.min(100, Math.max(currentValue || scope.value, 0));

				if(transform) {
					if(transform === 1) {
						var value = value > 50 ? 50 : value;
						var degree = 360 * (value / 100);
						
						styleObj.transform = 'rotate(' + degree + 'deg)';
					} else {
						var totalDegrees = 360 * value / 100;
						var leftOverDegree = totalDegrees - 180;

						styleObj.transform = 'rotate(' + leftOverDegree + 'deg)';
					}
				}
				
				return styleObj;
			};
		}
	}
});