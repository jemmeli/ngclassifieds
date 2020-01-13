(function(){

	"use strict"

	angular.module("ngClassifieds").factory("classifiedsFactory" , function($http){

		function getClassifieds(){
			//the promise will handle in our controller
			return $http.get('data/classifieds.json');
		}

		return{
			getClassifieds:getClassifieds
		}

	});

})();