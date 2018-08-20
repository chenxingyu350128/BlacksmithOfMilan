angular.module('myApp')
     .directive('pageModel1',function ($state) {
         return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'script/directive/rolePagination/rolePagination.html',
        scope: {
            total: '=',
            size: '=',
            page: '='
        },
        link: function (scope) {
            //点击页码
            scope.totalPage=Math.ceil(scope.total/scope.size);
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
                    scope.size=5;
                }
            };
            //certain button of page module
            scope.getNewPage=function () {
                $state.go($state.current,
                    {
                        page: scope.setPage,
                        pagesize: scope.size,
                    },{reload: false});
            };
        }
    }
});