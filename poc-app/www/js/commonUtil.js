angular
  .module('starter.commonUtil', [])

.factory(
  'commonUtil',

  function commonUtil($http, $q, $ionicLoading, $state) {
    return {

    	showLoading: function(text) {
		    $ionicLoading.show({
		        template: text
		      });
    	},
    	
    	closeLoading: function() 
    	{
		    $ionicLoading.hide();
    	},
    	
    	backToMain : function()
    	{
    		$state.go("app.main");
    	}
    	
      }
    
})