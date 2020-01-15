(function(){
	"use strict"

	angular.module("ngClassifieds").controller("classifiedsController", function($scope, $state , $http, classifiedsFactory,$mdSidenav, $mdToast, $mdDialog ){

		var vm = this;

		//capture variables
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

		vm.classifieds = classifiedsFactory.ref;//get all data from firebase
		//to get our select filter categories we have to wait till firebase loaded
		vm.classifieds.$loaded().then(function(classifieds){
			vm.categories = getCategories(classifieds);
		})


		/*
		classifiedsFactory.getClassifieds().then(function(classifieds){
			vm.classifieds = classifieds.data;
			vm.categories = getCategories(vm.classifieds);//get categories
		});
		*/

		/*
		$http.get('https://api.github.com/users').then(function(users){
			console.log(users);
		})
		*/

		$scope.$on('newClassified', function(event, classified){
			//dont need id because firebase provide it's own id
			vm.classifieds.$add(classified);
			showToast('Classified saved !');

		});

		$scope.$on('editSaved', function(event, msg){
			showToast(msg);
		})


		/*
		$scope.$broadcast('newModifiedClassified', vm.classified);
		*/

		

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
			$state.go('classifieds.edit' , { 
				id : classified.$id , //$id the id from firebase Array
			});
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





      });

})();