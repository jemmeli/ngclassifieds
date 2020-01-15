(function(){
	"use strict"

	angular.module("ngClassifieds").controller("classifiedsController", function($scope, $state , $http, classifiedsFactory,$mdSidenav, $mdToast, $mdDialog ){

		var vm = this;

		//vm.getCategories = getCategories;
		vm.openSidebar = openSidebar;
		vm.closeSidebar = closeSidebar;
		vm.editClassified = editClassified;
		vm.saveEdit = saveEdit;
		vm.deleteClassified = deleteClassified;
		vm.showToast = showToast;
		vm.saveClassified = saveClassified

		vm.classifieds
		vm.categories
		vm.editing
		vm.classified

		classifiedsFactory.getClassifieds().then(function(classifieds){
			vm.classifieds = classifieds.data;
			vm.categories = getCategories(vm.classifieds);//get categories
		});

		//listening to that event 'myMessage' that reside on child controller
		$scope.$on('myMessage', function(event, message){
			console.log(message);
		});

		var contact = {
			name:"najmeddine",
			phone : "(999) 99615 819",
			email : "admin@admin.com"
		}

		function getCategories(classifieds){
			var categories = [];
			//
			angular.forEach(classifieds , function(item){
				angular.forEach(item.categories, function(category){
					categories.push(category);
				})
			});
			return _.uniq(categories);//lodash
		}
		


		function openSidebar(){
			//$mdSidenav('left').open();
			$state.go('classifieds.new');//navigation 
		}

		function closeSidebar(){
			$mdSidenav('left').close(); 
		}

		function saveClassified(classified) {
			if (classified) {
				classified.contact = contact;
				vm.classifieds.push(classified);
				vm.classified = {};//clear form after save
				closeSidebar();//close sidebar after save
				showToast("Classified saved!");
			}
	    }

	    function editClassified(classified) {
			vm.editing = true;
			openSidebar();
			vm.classified = classified;
	    }

	    function saveEdit() {
			vm.editing = false;
			vm.classified = {};
			closeSidebar();
			showToast("Edit saved!");
			
	    }

	    function deleteClassified(event , classified) {
			

			var confirm = $mdDialog.confirm()
			.title("are you want to delete ?" + classified.title)
			.targetEvent(event)
			.ok('Yes')
          	.cancel('No');

          	//return a promise
			$mdDialog.show(confirm).then(function(){
				var index = vm.classifieds.indexOf(classified);
				vm.classifieds.splice(index , 1);
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