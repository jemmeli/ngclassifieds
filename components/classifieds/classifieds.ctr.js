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
			classified.id = vm.classifieds.length + 1;//give an id
			vm.classifieds.push(classified);
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
			$state.go('classifieds.edit' , { id : classified.id , classified:classified });
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


          var data = [
          {
          	"id":"1",
          	"title":"20 Foot Equipment Trailer",
          	"description":"2013 rainbow trailer 20 feet x 82 inch deck area, two 5,000 lb axels, electric brakes, two pull out ramps, break away box, spare tire.",
          	"price":6000,
          	"posted":"2015-10-24",
          	"contact": {
          		"name":"John Doe",
          		"phone":"(555) 555-5555",
          		"email":"johndoe@gmail.com"
          	},
          	"categories":[
          	"Vehicles",
          	"Parts and Accessories"
          	],
          	"image": "http://images.buysellsearch.com/image/orig/8dfc4f6c5d411130d19dedd28d61bc2b/2009-dodge-caliber-se.jpg",
          	"views":213
          },
          {
          	"id":"2",
          	"title":"Canada Goose Jacket",
          	"description":"Red woman's Canada Goose Montebello jacket. It was used for two seasons. This jacket retails for $745. The jacket has been professionally cleaned since it was last worn by anyone.",
          	"price": 500,
          	"posted": "2015-10-28",
          	"contact": {
          		"name": "Jane Doe",
          		"phone": "(555) 555-5555",
          		"email": "janedoe@gmail.com"
          	},
          	"categories": [
          	"Clothing"
          	],
          	"image":"http://canadagoose-jacket.weebly.com/uploads/9/2/3/3/9233177/9087323_orig.jpg",
          	"views": 422
          },
          {
          	"id":"3",
          	"title":"Baby Crib and Matress",
          	"description":"Good condition.",
          	"price":50,
          	"posted":"2015-10-27",
          	"contact": {
          		"name":"Jane Doe",
          		"phone":"(555) 555-5555",
          		"email":"janedoe@gmail.com"
          	},
          	"categories":[
          	"Furniture"
          	],
          	"image":"http://images.landofnod.com/is/image/LandOfNod/Crib_Anderson_Nat_V1/$web_setitem$/1308310657/andersen-crib-maple.jpg",
          	"views":23
          },
          {
          	"id":"4",
          	"title":"Leather Sofa",
          	"description":"Brown leather sofa for sale.  Good condition but small tear on one cushion.",
          	"price":250,
          	"posted":"2015-11-01",
          	"contact": {
          		"name":"John Doe",
          		"phone":"(555) 555-5555",
          		"email":"johndoe@gmail.com"
          	},
          	"categories":[
          	"Furniture"
          	],
          	"image":"http://images.buysellsearch.com/image/orig/8dfc4f6c5d411130d19dedd28d61bc2b/2009-dodge-caliber-se.jpg",
          	"views":77
          },
          {
          	"id":"5",
          	"title":"MacBook Air",
          	"description":"2013 MacBook Air. Great condition, but a few scratches.",
          	"price":1150,
          	"posted":"2015-11-02",
          	"contact": {
          		"name":"John Doe",
          		"phone":"(555) 555-5555",
          		"email":"johndoe@gmail.com"
          	},
          	"categories":[
          	"Electronics",
          	"Computer Parts and Accessories"
          	],
          	"image":"http://cdn.macrumors.com/article-new/2014/11/macbook_air_yosemite-800x450.jpg?retina",
          	"views":889
          },
          {
          	"id":"6",
          	"title":"2008 Dodge Caliber",
          	"description":"Battery blanket and block heater installed. Winter tires, good tread left are on the car currently. Car comes with 4 summer tires with also good treads left. Hydraulic power steering fluid line installed so this won't break on you in the cold Yellowknife winters! Synthetic oil used, good for 1000+ more KMs. AC/Sunroof/power doors/steering, CD player/radio. Red accented dash and upolstry.",
          	"price":4800,
          	"posted":"2015-11-03",
          	"contact": {
          		"name":"John Doe",
          		"phone":"(555) 555-5555",
          		"email":"johndoe@gmail.com"
          	},
          	"categories":[
          	"Vehicles",
          	"Cars"
          	],
          	"image":"http://images.buysellsearch.com/image/orig/8dfc4f6c5d411130d19dedd28d61bc2b/2009-dodge-caliber-se.jpg",
          	"views":423
          }
          ]


          var firebase = classifiedsFactory.ref;

          angular.forEach(data , function(item){
          	firebase.$add(item);
          });





      });

})();