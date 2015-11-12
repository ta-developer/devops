angular.module('starter.menucontrollers', [])

.controller('menuController', function ($scope, $ionicModal, $timeout, containerService) 
{
	
	$scope.$on('event:userInfo', function(event) {
		
		$scope.userInfo = containerService.getUserInfo();
		$scope.setDefaultSin();
		
	});
	
	$scope.selectAccount = function(sin,alias)
	{
		$scope.defaultAlias = alias;
		$scope.defaultSin = sin;
		   
		angular.element('#panel').slideToggle();

	}
	
	$scope.setDefaultSin = function()
	{
		var defaultAlias;
		var defaultSin;
		
		var serviceIds = $scope.userInfo.serviceIds;
		
		if (serviceIds.length > 0)
		{
			defaultAlias = serviceIds[0].alias; 
			defaultSin = serviceIds[0].sin;
		}
		
		$scope.defaultAlias = defaultAlias;
		$scope.defaultSin = defaultSin;
		
	}
	
	
})
