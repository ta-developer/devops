angular
		.module('starter.services', [])

		.factory(
				'registrationService',

				function registrationService($http, $rootScope, $q, containerService) 
				{

					var baseUrl = 'http://<domain>/register';
					return {
						registerUser : function(userRequest) {
							console.log("INSIDE SERVICE " + angular.toJson(userRequest));
							return $http.post(baseUrl, angular.toJson(userRequest), {
								headers : {
									'Content-Type' : 'application/json'
								}
							});

						}
					}

				}
			);