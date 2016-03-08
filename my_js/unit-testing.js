describe('gulp-jasmine-browser', function () {
    var scope,
        controller;
    beforeEach(function () {
        module('myProject');
    });
    describe('MyController',function () {
        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('homeController', {
                '$scope': scope
            });
        }));
        it('check numcart begin 0', function () {
            expect(scope.numcart).toBe(0);
        });
        it('add numcart', function () {
            scope.numcart=scope.numcart+1;
            expect(scope.numcart).toBe(1);
        });
        it('remove numcart', function () {
            scope.numcart=scope.numcart-1;
            expect(scope.numcart).toBe(-1);
        });
        
    });
});