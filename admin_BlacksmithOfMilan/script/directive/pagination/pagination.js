angular.module('myApp')
     .directive('pageModel',function ($state) {
         return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'script/directive/pagination/pagination.html',
        scope: {
            total: '=',
            size: '=',
            page: '='
        },
        link: function (scope) {
            //点击页码
            scope.pageChange=function () {
                scope.page=parseInt(scope.page);
                console.log(scope.page);
                console.log("测试");
                $state.go($state.current, {page: scope.page},{reload: true});
            };
            //change size/page
            scope.changePage=function(){
                scope.setPage=scope.setPage.replace(/[^0-9]/g, '');
                if(parseInt(scope.setPage)===0){
                    scope.setPage=1;
                }
            };
            scope.changeSize=function(){
                scope.size=scope.size.replace(/[^0-9]/g, '');
                if(parseInt(scope.size)===0){
                    scope.size=10;
                }
            };
            //certain button of page module
            scope.getNewPage=function () {
                $state.go($state.current,
                    {
                        page: scope.setPage,
                        size: scope.size,
                    },{reload: true});
            };
        }
    }
});