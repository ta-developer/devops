angular.module('starter.dashboardcontrollers', [])

.controller('DashboardController', function($scope, $ionicNavBarDelegate,$compile){


	$ionicNavBarDelegate.title("Dashboard");

	$scope.cardCount  = 0;
	$scope.cardColors = ["#009688", "#3F51B5", "#F44336", "#4CAF50", "#9C27B0", "#FF5722"]
	$scope.cardList = ["outage", "consumption", "payment", "service"]
	$scope.cardN = 0;
	$scope.cardsLoaded = false

	var loginscope = angular.element($("#login_div")).scope();

	$scope.numToMonth = function(num) {
		monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		var n = parseInt(num) - 1
		return monthList[n]
	}

	$scope.loadCard = function(cardName, params){
		var myCardID = $scope.cardCount;
		cardHTML = "";
		cardHTML += "<div class = 'card' id = 'card"+myCardID+"' style = 'background-color:"+$scope.cardColors[myCardID % $scope.cardColors.length]+"; visibility:hidden;'>";
		cardHTML += "</div>"
		if($scope.cardsLoaded == false){
			angular.element('#db_page_cards').html(cardHTML);
			$scope.cardsLoaded = true
		}else{0
			angular.element('#db_page_cards').append(cardHTML);
		}
		$scope.cardCount = $scope.cardCount + 1;


		//ASYNCHRONOUS
		$.get('templates/cards/'+cardName+'Card.html', function( result ) {
			//PREPEND ID's with myCardID to maintain uniqueness
			result = result.split("id = \"").join('id = \"'+myCardID);

			angular.element("#card"+myCardID).html($compile(result)($scope));

			switch(cardName){
				case "consumption":
					$scope.consumptionCard(myCardID, params[0]);
					break;
				case "payment":
					$scope.paymentCard(myCardID, params[0]);
					break;

			}
    		angular.element("#card"+myCardID).css("visibility","")
		});

	}

	$scope.getPaymentCards = function(){
	// 	var resourceRequest = new WLResourceRequest(
	// 		    "adapters/MoveSQLAdapter/getAllLatestPayments",
	// 		    WLResourceRequest.POST
	// 	);
	// 	resourceRequest.setQueryParameter("params","["+loginscope.userID+ "]");
	// 	if(loginscope.offlineMode){
	// 		//OFFLINE MODE =====================================
			result = '{"isSuccessful":true,"resultSet":[{"payment":5624.56,"status":2,"location":"Aguirre Ave. BF Homes, Paranaque City","sin":1000000069,"date":"2015-07-01T00:00:00.000Z"},{"payment":3249.27,"status":0,"location":"President`s Ave. BF Homes, Paranaque City","sin":1000000070,"date":"2015-07-01T00:00:00.000Z"},{"payment":4286.32,"status":1,"location":"Batcave, Gotham City","sin":1000000071,"date":"2015-08-01T00:00:00.000Z"}]}'
	    	paymentsResult = JSON.parse(result);

	    	$.each( paymentsResult.resultSet, function( index, payment){
	    	   $scope.loadCard("payment", [payment])
	    	});
	//     	//======================================================
	// 	}else{
	// 		return resourceRequest.send().done(
	// 			    function(result){
  //
	// 			    	paymentsResult = JSON.parse(result.responseText);
	// 			    	console.log(result.responseText);
	// 			    	$.each( paymentsResult.resultSet, function( index, payment){
	// 			    	    $scope.loadCard("payment", [payment])
	// 			    	});
	// 			    },
	// 			    function(){
	// 			    }
	// 		)
	// 	}
	}
  //
	$scope.getConsumptionCards = function(){
	// 	var resourceRequest = new WLResourceRequest(
	// 		    "adapters/MoveSQLAdapter/consumption_latest",
	// 		    WLResourceRequest.POST
	// 	);
	// 	resourceRequest.setQueryParameter("params","["+loginscope.userID+ "]");
	// 	if(loginscope.offlineMode){
	// 		//Offline Demo =========================================
			result = '{"isSuccessful":true,"resultSet":[{"pID":6,"data":48.0,"month":"2015-12-31T00:00:00.000Z","customer_id":1}]}'
	    	consumptionResult = JSON.parse(result);
	    	$.each( consumptionResult.resultSet, function( index, consumption){
	    	    $scope.loadCard("consumption", [consumption])
	    	});
	//     	//======================================================
	// 	}else{
	// 		return resourceRequest.send().then(
	// 			    function(result){
	// 			    	console.log(result.responseText);
	// 			    	consumptionResult = JSON.parse(result.responseText);
	// 			    	$.each( consumptionResult.resultSet, function( index, consumption){
	// 			    	    $scope.loadCard("consumption", [consumption])
	// 			    	});
	// 			    },
	// 			    function(){
	// 			    }
	//		);
	//	}
	}
  //
	// //Card Loader - This specifies Order
	$scope.loadCards = function(){
		//if(loginscope.offlineMode){
			//OFFLINE MODE =====================================

			$scope.loadCard("outage")
			$scope.getPaymentCards()
			$scope.getConsumptionCards()
			$scope.loadCard("service")
			$scope.$broadcast('scroll.refreshComplete');

			//==============================================
		//}

    // else{
		// 	$scope.loadCard("outage")
		// 	$scope.getPaymentCards().done(function(){
		// 		$scope.getConsumptionCards().done(function(){
		// 			$scope.loadCard("service")
		// 			$scope.$broadcast('scroll.refreshComplete');
		// 		})
		// 	})
		// }
	}
  //
	// //Cards Init
	// if(loginscope.dashboardCache != ""){ //Reload cache if it exists
	// 	angular.element('#db_page_cards').html(loginscope.dashboardCache)
	// }else if(loginscope.userID != null){
	 	$scope.loadCards()
	// }
  //
	// //CardFunctions
	$scope.consumptionCard = function(cardNum, consumption){

		angular.element("#"+cardNum+"consumptionVal").html(consumption.data + " kWh");
    	var date = consumption.month.split("-");
    	var monYear = $scope.numToMonth(date[1]) + " " + date[0];
    	angular.element("#"+cardNum+"consumptionMon").html(monYear);
	}

	$scope.paymentCard = function(cardNum, payment){
		var date = payment.date.split("-");
		var monYear = $scope.numToMonth(date[1]) + " " + date[0];
		angular.element("#"+cardNum+"payMonth").html(monYear);
		angular.element("#"+cardNum+"payCost").html("P " + payment.payment);
		angular.element("#"+cardNum+"payLoc").html(payment.location);
		switch(payment.status){
		case 0:
			angular.element("#"+cardNum+"payStatus").html("<span style = 'color:#FFE0B2; font-weight:bold'>UNPAID</span>");
			break;
		case 1:
			angular.element("#"+cardNum+"payStatus").html("<span style = 'color:#DCEDC8; font-weight:bold'>PAID</span>");
			break;
		case 2:
			angular.element("#"+cardNum+"payStatus").html("<span style = 'color:#FFCDD2; font-weight:bold'>OVERDUE</span>");
			break;
		}
	}

    $scope.$on("$destroy", function(){
    	loginscope.dashboardCache = angular.element('#db_page_cards').html();
        console.log("EXIT")
    });


   $scope.refresh_data = function(){
     console.log("load");
	   $scope.cardsLoaded = false;
	   $scope.cardN = 0;
	   $scope.cardCount = 0;
	   //angular.element('#cardsLoading').show()
	   $scope.loadCards();
   }

});
