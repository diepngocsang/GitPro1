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
            .state('product', {   
                        url: '/product/:type',  
                        templateUrl: 'my_template/product.html',  
                        controller: 'ProductCtrl'                                 
                })
            .state('detail', {    
                        url: '/detail/:code', 
                        templateUrl: 'my_template/productdetail.html', 
                        controller: 'DetailProductCtrl'                                 
                })            
            .state('search-product', {    
                        url: '/search-product/:name', 
                        templateUrl: 'my_template/productsearch.html', 
                        controller: 'SearchProductCtrl'                                 
                })
            .state('cart', {   
                        url: '/cart',  // khai báo Url hiển thị
                        templateUrl: 'my_template/cartproduct.html'                                   
                })                        
    })    
    //CONTROLLER
    .filter('Paging', function() {
        return function(input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    })
    .controller("ProductCtrl",['$scope','$firebaseArray','$stateParams',function($scope,$firebaseArray,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product");
         var type = $stateParams.type;
         $scope.data = $firebaseArray(ref.orderByChild('type').equalTo(type));
         $scope.nowPage = 0;
         $scope.sizePage = 8;
         $scope.totalPage=function(){
            return Math.ceil($scope.data.length/$scope.sizePage);                
         }
        
    }])
    .controller("SearchProductCtrl",['$scope','$firebaseArray','$stateParams',function($scope,$firebaseArray,$stateParams){          
        var ref = new Firebase("https://finalassignment.firebaseio.com/product");
        $scope.name = $stateParams.name;
        $scope.data = $firebaseArray(ref);
    }])
    .controller("DetailProductCtrl",['$scope','$firebaseArray','$stateParams',function($scope,$firebaseArray,$stateParams){
         var ref = new Firebase("https://finalassignment.firebaseio.com/product");
         var code = $stateParams.code;
         $scope.data = $firebaseArray(ref.orderByChild('code').equalTo(code));
         
    }])    
    .controller('homeController',['$scope','$firebaseArray', function ($scope,$firebaseArray){
        $scope.numcart=0;
        $scope.shopcart=[];
        $scope.user={};
        $scope.quantity=1;
        $scope.delProductItem = function(code){
            var confirmAlert = confirm("Do you want to delete this product?");
            if (confirmAlert == true) {
                $scope.shopcart.splice($scope.shopcart.indexOf(code),1);
                $scope.numcart = $scope.numcart - 1;
            }            
        };        
        $scope.addProductItem = function(code){            
            if($scope.shopcart.indexOf(code)<0){
                var checkCode = true;
                for (var i = 0;i< $scope.shopcart.length;i++) {
                    if(code.code == $scope.shopcart[i].code){
                        checkCode=false;
                    }
                }
                if(checkCode){
                    $scope.shopcart.push(code);
                    $scope.numcart =$scope.numcart +1;
                    window.alert('Added this product into your cart');
                }else{
                    window.alert('This product that contained in your cart');
                }                
            }
        };
        $scope.addCartToFirebase = function(){         
                var ref = new Firebase("https://finalassignment.firebaseio.com/cart/post");
                $scope.postsRef = $firebaseArray(ref);
                $scope.quantity= $scope.shopcart;
                $scope.user.item = $scope.shopcart;                
                $scope.postsRef.$add($scope.user);
            }
        }])



	