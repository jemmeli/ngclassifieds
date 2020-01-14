(function(){
	"use strict"

	angular.module("ngClassifieds").controller("classifiedsCtrl", function($scope , $http, classifiedsFactory,$mdSidenav, $mdToast, $mdDialog ){

		classifiedsFactory.getClassifieds().then(function(classifieds){
			$scope.classifieds = classifieds.data;
			$scope.categories = getCategories($scope.classifieds);//get categories
		});

		var contact = {
			name:"najmeddine",
			phone : "(999) 99615 819",
			email : "admin@admin.com"
		}

		function getCategories(classifieds){
			var categories = [];
			//NEW WAY
			angular.forEach(classifieds , function(item){
				angular.forEach(item.categories, function(category){
					categories.push(category);
				})
			});
			return _.uniq(categories);//lodash
			//OLD WAY
			/*
			for (var i = 0; i < $scope.classifieds.length; i++) {
				$scope.categories.push($scope.classifieds.categories);
			}
			*/
		}
		


		$scope.openSidebar = function(){
			$mdSidenav('left').open();
		}

		$scope.closeSidebar = function(){
			$mdSidenav('left').close();
		}

		$scope.saveClassified = function(classified) {
			if (classified) {
				classified.contact = contact;
				$scope.classifieds.push(classified);
				$scope.classified = {};//clear form after save
				$scope.closeSidebar();//close sidebar after save
				showToast("Classified saved!");
			}
	    }

	    $scope.editClassified = function(classified) {
			$scope.editing = true;
			$scope.openSidebar();
			$scope.classified = classified;
	    }

	    $scope.saveEdit = function() {
			$scope.editing = false;
			$scope.closeSidebar();
			$scope.closeSidebar();
			showToast("Edit saved!");
			
	    }

	    $scope.deleteClassified = function(event , classified) {
			

			var confirm = $mdDialog.confirm()
			.title("are you want to delete ?" + classified.title)
			.targetEvent(event)
			.ok('Yes')
          	.cancel('No');

          	//return a promise
			$mdDialog.show(confirm).then(function(){
				var index = $scope.classifieds.indexOf(classified);
				$scope.classifieds.splice(index , 1);
			}, function() {
				//when click cancel
			});
			
	    }

	    function showToast(message){
	    	$mdToast.show(
				$mdToast.simple().content(message).position('top, right').hideDelay(3000)
			);
	    }
		

		


	});

})();