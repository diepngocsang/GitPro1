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
        $urlRouterProvider.otherwise('/home'); 
        $stateProvider
            .state('home', {    
                url: '/home',  
                templateUrl: 'my_template/home.html'
                })
            .state('product-men', {   
                        url: '/product-men/:type',  
                        templateUrl: 'my_template/product.html',  
                        controller: 'ProductMenCtrl'                                 
                })
            .state('product-women', {   
                        url: '/product-women/:type',  
                        templateUrl: 'my_template/product.html',  
                        controller: 'ProductWomenCtrl'                                 
                })
            .state('detail', {    
                        url: '/detail/:code', 
                        templateUrl: 'my_template/productdetail.html', 
                        controller: 'DetailProductCtrl'                                 
                })
            .state('search-product', {    
                        url: '/search-product/:name', 
                        templateUrl: 'my_template/product.html', 
                        controller: 'SearchProductCtrl'                                 
                })
            .state('cart', {   
                        url: '/cart',  // khai báo Url hiển thị
                        templateUrl: 'my_template/cartproduct.html'                                   
                })
                        
    })
    
    //CONTROLLER
    .controller("ProductMenCtrl",['$scope','$firebaseObject','$stateParams',function($scope,$firebaseObject,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product/product_men");
         var type = $stateParams.type;
        $scope.data = $firebaseObject(ref.orderByChild('type').equalTo(type).limitToFirst(4));
    }])
    .controller("ProductWomenCtrl",['$scope','$firebaseObject','$stateParams',function($scope,$firebaseObject,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product_women");
         var type = $stateParams.type;
        $scope.data = $firebaseObject(ref.orderByChild('type').equalTo(type));
    }])
    .controller("SearchProductCtrl",['$scope','$firebaseObject','$stateParams',function($scope,$firebaseObject,$stateParams){          
         var inputvalue = $stateParams.name;

    }])
    .controller("DetailProductCtrl",['$scope','$firebaseObject','$stateParams',function($scope,$firebaseObject,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product/product_men");
         var code = $stateParams.code;
        $scope.data = $firebaseObject(ref.orderByChild('code').equalTo(code));
    }])
    
    .controller('homeController',['$scope', function ($scope){
        $scope.numcart=0;
        $scope.choose=1;
        $scope.shopcart=[];
        $scope.user={};
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
        $scope.addCartToFirebase = function(){
          var ref = new Firebase("https://finalassignment.firebaseio.com/cart");
          var postsRef = ref.child("post");
          var newPostRef = postsRef.push($scope.user);
          newPostRef.set({
            first_name: $scope.user.first,
            last_name: $scope.user.last,
            email: $scope.user.email,
            address: $scope.user.address,
            phone: $scope.user.phone,  
          });
          // we can also chain the two calls together
//          postsRef.push().set({
//            author: "alanisawesome",
//            title: "The Turing Machine"
//          });
        }
    }])
//    .controller('CartProductController',['$scope',function ($scope){
//        $scope.choose=1;
//    }]);
    
    
	