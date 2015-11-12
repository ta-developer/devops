angular.module('starter.registration', [])

.controller('RegistrationController', function($scope, $state, $ionicModal, $ionicPopup, registrationService)
{

	// Exit app
    $scope.exit=function () 
    {
    	console.log("inside exit");
    	$scope.modal.hide();
    }

	//Load login modal upon loading the controller
	$scope.register=function(){

	$ionicModal.fromTemplateUrl('templates/register.html', function(modal) 
	{
		$scope.registerLoaded = true;
		$scope.modal = modal;
		$scope.modal.show();
		 },
		 {
			    scope: $scope,
			    animation: 'slide-in-up'
		 })}
	
	$scope.processRegister=function()
	{
		var data = $scope.User;
		console.log("SCOPE= " + data);
		var result = registrationService.registerUser(data);
		
		console.log("RETURN FROM SERVICE= "  + JSON.stringify(result));
		
		if(result != null)
		{
			$scope.exit();
			window.sessionStorage.setItem("loggedIn", 'true');
			window.sessionStorage.setItem("userName",data.userName);
			
			 $ionicPopup.alert({
			      title: "Registration successfull."
			    });
		}
	}



});
