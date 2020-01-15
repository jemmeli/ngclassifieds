(function(){

	"use strict"

	angular.module("ngClassifieds").factory("classifiedsFactory" , function($http, $firebaseArray){

		//var ref = new Firebase('https://ngclassifieds-c7a55.firebaseio.com/');
		 var ref = firebase.database().ref();

		return{
			ref : $firebaseArray(ref)
		}

	});

})();