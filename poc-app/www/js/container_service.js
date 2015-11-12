angular
  .module('starter.containerservice', [])

.factory(
  'containerService',

  function containerService($http, $q, $rootScope) 
  {
	var userInfo;
	
    return {
      getUserInfo: function() 
      {
    	  return userInfo;
    	
      },
      setUserInfo : function(userInfoFromService)
      {
    	  userInfo = userInfoFromService;
      }
    }
  }
)