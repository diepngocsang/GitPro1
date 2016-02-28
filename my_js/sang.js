//function ItemService() {}
angular.module('myProject', ['firebase','ui.router'])
    //DIRECTIVE
	.directive('headerDirective', function () {
		return {
			templateUrl: 'my_template/header.html'			
			}
		})
	.directive('footerDirective', function () {
		return {
			templateUrl: 'my_template/footer.html'			
			}
		})
	.directive('productDirective', [function () {
	        return {
	            restrict: 'AE',
	            templateUrl: 'my_template/product.html',
	            scope:{
	                data: '=it'
	            }	            
	      };
	}])
	.directive('detailDirective', [function () {
	        return {
	            restrict: 'AE',
	            templateUrl: 'my_template/productdetail.html',
	            scope:{
	                data: '=it'
	            }	            
	      };
	}])
    
    //CONFIG
	.config(function($stateProvider, $urlRouterProvider) {    
        $urlRouterProvider.otherwise('/home'); // Mọi đường dẫn không hợp lệ đều được chuyển đến state home
        $stateProvider
            .state('home', {    // Định ngĩa 1 state home
                url: '/home',  // khai báo Url hiển thị
                templateUrl: 'my_template/home.html'  // đường dẫn view
                })
            .state('tshirt-men', {    // Định ngĩa 1 state home
                    url: '/tshirt-men',  // khai báo Url hiển thị
                    templateUrl: 'my_template/product.html',  // đường dẫn view
                    controller: 'TShirtMenProductCtrl'             
                })
            .state('shirt-men', {    // Định ngĩa 1 state home
                        url: '/shirt-men',  // khai báo Url hiển thị
                        templateUrl: 'my_template/product.html',  // đường dẫn view
                        controller: 'ShirtMenProductCtrl'             
                    })
            .state('jean-men', {    // Định ngĩa 1 state home
                        url: '/jean-men',  // khai báo Url hiển thị
                        templateUrl: 'my_template/product.html',  // đường dẫn view
                        controller: 'JeanMenProductCtrl'             
                    })
            .state('suit-men', {    // Định ngĩa 1 state home
                        url: '/suit-men',  // khai báo Url hiển thị
                        templateUrl: 'my_template/product.html',  // đường dẫn view
                        controller: 'SuitMenProductCtrl'             
                    })
            .state('pant-men', {    // Định ngĩa 1 state home
                        url: '/pant-men',  // khai báo Url hiển thị
                        templateUrl: 'my_template/product.html',  // đường dẫn view
                        controller: 'PantMenProductCtrl'             
                    })
        //------------------------------------------------------------------------------------------------//
            .state('dress-girl', {    // Định ngĩa 1 state home
                    url: '/tshirt-men',  // khai báo Url hiển thị
                    templateUrl: 'my_template/product.html',  // đường dẫn view
                    controller: 'DressGirlProductCtrl'             
                })
            .state('jean-girl', {    // Định ngĩa 1 state home
                        url: '/shirt-men',  // khai báo Url hiển thị
                        templateUrl: 'my_template/product.html',  // đường dẫn view
                        controller: 'JeanGirlProductCtrl'             
                    })
            .state('shirt-girl', {    // Định ngĩa 1 state home
                        url: '/jean-men',  // khai báo Url hiển thị
                        templateUrl: 'my_template/product.html',  // đường dẫn view
                        controller: 'ShirtGirlProductCtrl'             
                    })
            .state('suit-girl', {    // Định ngĩa 1 state home
                        url: '/suit-men',  // khai báo Url hiển thị
                        templateUrl: 'my_template/product.html',  // đường dẫn view
                        controller: 'SuitGirlProductCtrl'             
                    })
        //-----------------------------------------------------------------------------------------------------//
            .state('detail', {    // Định ngĩa 1 state home
                        url: '/detail/:code',  // khai báo Url hiển thị
                        templateUrl: 'my_template/productdetail.html',  // đường dẫn view
                        controller: 'DetailProductCtrl'                                 
                })
            .state('cart', {    // Định ngĩa 1 state home
                        url: '/cart',  // khai báo Url hiển thị
                        templateUrl: 'my_template/cartproduct.html'  // đường dẫn view
//                        controller: 'CartProductController'                                 
                })
            
    })
    
    //CONTROLLER
    .controller("TShirtMenProductCtrl",['$scope','$firebaseObject','$stateParams',function($scope,$firebaseObject,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product_men");
         $scope.data = $firebaseObject(ref.orderByChild('type').equalTo('T-shirt'));
    }])
    .controller("ShirtMenProductCtrl",['$scope','$firebaseObject','$stateParams',function($scope,$firebaseObject,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product_men");
         $scope.data = $firebaseObject(ref.orderByChild('type').equalTo('Shirt'));
    }])
    .controller("JeanMenProductCtrl",['$scope','$firebaseObject','$stateParams',function($scope,$firebaseObject,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product_men");
         $scope.data = $firebaseObject(ref.orderByChild('type').equalTo('Jean'));
    }])
    .controller("SuitMenProductCtrl",['$scope','$firebaseObject','$stateParams',function($scope,$firebaseObject,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product_men");
         $scope.data = $firebaseObject(ref.orderByChild('type').equalTo('Suit'));
    }])
    .controller("PantMenProductCtrl",['$scope','$firebaseObject','$stateParams',function($scope,$firebaseObject,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product_men");
         $scope.data = $firebaseObject(ref.orderByChild('type').equalTo('Pant'));
    }])
//--------------------------------------------------------------------------------------------------//
    .controller("DressGirlProductCtrl",['$scope','$firebaseObject','$stateParams',function($scope,$firebaseObject,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product_women");
         $scope.data = $firebaseObject(ref.orderByChild('type').equalTo('Dress'));
    }])
    .controller("JeanGirlProductCtrl",['$scope','$firebaseObject','$stateParams',function($scope,$firebaseObject,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product_women");
         $scope.data = $firebaseObject(ref.orderByChild('type').equalTo('Jean'));
    }])
    .controller("ShirtGirlProductCtrl",['$scope','$firebaseObject','$stateParams',function($scope,$firebaseObject,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product_women");
         $scope.data = $firebaseObject(ref.orderByChild('type').equalTo('Shirt'));
    }])
    .controller("SuitGirlProductCtrl",['$scope','$firebaseObject','$stateParams',function($scope,$firebaseObject,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product_women");
         $scope.data = $firebaseObject(ref.orderByChild('type').equalTo('Suit'));
    }])
//-----------------------------------------------------------------------------------------------------//
    .controller("DetailProductCtrl",['$scope','$firebaseObject','$stateParams',function($scope,$firebaseObject,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product_men");
         var code = $stateParams.code;
        $scope.data = $firebaseObject(ref.orderByChild('code').equalTo(code));
    }])
    .controller('homeController',['$scope', function ($scope){
        $scope.numcart=0;
        $scope.choose=1;
        $scope.shopcart=[];
        $scope.delProductItem = function(code){
            $scope.shopcart.splice($scope.shopcart.indexOf(code),1);
            $scope.numcart = $scope.numcart - 1;
        };
        $scope.addProductItem = function(code){    
        if($scope.shopcart.indexOf(code)<0){//do not allow add to cart with duplicate code
            $scope.shopcart.push(code);
            $scope.numcart =$scope.numcart +1;
            window.alert('Added this product into your cart');
        }else{
            window.alert('This product that contained in your cart');
            };
        };
    }])
//    .controller('CartProductController',['$scope',function ($scope){
//        $scope.choose=1;
//    }]);
    
    
	