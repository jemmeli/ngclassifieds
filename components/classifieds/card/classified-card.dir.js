(function(){

	"use strict";

	angular.module("ngClassifieds").directive("classifiedCard", function(){

		return {
			templateUrl : "components/classifieds/card/classified-card.tpl.html",
			scope:{
				classifieds:"=classifieds",//KameCase here will be Khabab case in HTML
				classifiedsFilter:"=classifiedsFilter",//KameCase here will be Khabab case in HTML
				category:"=category"
			},
			controller: classifiedCardController,
			controllerAs: "vm"
		}

		function classifiedCardController($state, $scope, $mdDialog ){

			var vm = this;
			vm.editClassified = editClassified;
			vm.deleteClassified = deleteClassified;
			vm.showToast = showToast;

			/**/
			function editClassified(classified) {
				$state.go('classifieds.edit' , { 
					id : classified.$id , //$id the id from firebase Array
				});
			}

			/**/
			function deleteClassified(event , classified) {
				

				var confirm = $mdDialog.confirm()
				.title("are you want to delete ?" + classified.title)
				.targetEvent(event)
				.ok('Yes')
				.cancel('No');

	          	//return a promise
	          	$mdDialog.show(confirm).then(function(){
	          		//deleting 
	          		vm.classifieds.$remove(classified);
	          		showToast("Classified deleted");
	          	}, function() {
					//when click cancel
				});

	        }

	        function showToast(message){
	          	$mdToast.show(
	          		$mdToast.simple().content(message).position('top, right').hideDelay(3000)
	          	);
	          }




		}


	})

})();