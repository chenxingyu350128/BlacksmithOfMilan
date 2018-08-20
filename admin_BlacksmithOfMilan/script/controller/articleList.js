angular.module('myApp')
.controller('ArticleList',function ($scope,$http,$log,$state,$stateParams,articleService,modalBox,sites,types) {
  var params = {
    page: $stateParams.page,
    status:$stateParams.status,
    type : $stateParams.type,
    title : $stateParams.title,
    author : $stateParams.author,
    minLike : $stateParams.minLike,
    maxLike : $stateParams.maxLike,
    minCollection : $stateParams.minCollection,
    maxCollection : $stateParams.maxCollection,
  }
  articleService.getArticleList(params).then(function (response) {
    //打印列表数据
    console.log(response);
    if (response.data.code===0) {
      //列表数据渲染
      $scope.list = response.data.data.rows;
      //获取总数据条数
      $scope.bigTotalItems = response.data.data.total;
      $scope.bigCurrentPage = $stateParams.page;
      $scope.maxSize = 5;
      //  状态保存
      $scope.vmstatus =$stateParams.status;
      //分类保存
      $scope.vmtype =$stateParams.type;
      //页数保存
      $scope.pagenum = $stateParams.page
      // 收藏保存
      $scope.minCollection = $stateParams.minCollection;
      $scope.maxCollection = $stateParams.maxCollection;
      //点赞保存
      $scope.minLike = $stateParams.minLike;
      $scope.maxLike = $stateParams.maxLike;
      // 标题保存
      $scope.text1 = $stateParams.title;
      // 作者保存
      $scope.text2 = $stateParams.author;  
    }else{
      modalBox.alert(response.data.msg)
    }
    
  });
  //分页功能
  $scope.pageChanged = function() {
    $log.log('Page changed to: ' + $scope.bigCurrentPage);
    $state.go("pageTab.articleList",{
      page:$scope.bigCurrentPage
    },{
      reload:true
    })
  };
  $scope.sites = sites;
  $scope.types = types;
  //搜索功能
  $scope.onsearch = function () {
    $state.go("pageTab.articleList",{
      status:$scope.vmstatus,
      type : $scope.vmtype,
      title : $scope.text1,
      author : $scope.text2,
      minLike : $scope.minLike,
      maxLike : $scope.maxLike,
      minCollection : $scope.minCollection,
      maxCollection : $scope.maxCollection,
    },{
      reload: true
    });
  };
  //重置功能
  $scope.clickRest = function () {
    $state.go("pageTab.articleList",{
      status:null,
      type : null,
      title : null,
      author : null,
      minLike : null,
      maxLike : null,
      minCollection : null,
      maxCollection : null,
    },{
      reload:true
    });
  };
  //跳页正则判断
  $scope.changepage = function () {
    $scope.pagenum = $scope.pagenum.replace(/[^\d]/g,'');
    if (parseInt($scope.pagenum)===0) {
      $scope.pagenum=1
      
    }  
  }
  //点击跳转页数
  $scope.entry = function () {
    $state.go("pageTab.articleList",{
      page:$scope.pagenum
    },{
      reload:true
    })
  }
  $scope.change1text = function () {
    console.log("这是文章管理页面");
  };
  //新增文章详情
  $scope.addText = function () {
    $state.go('pageTab.articleDetails');
  };
  //编辑
  $scope.onlineEditor =function (id) {
    $state.go("pageTab.articleDetails",{
      id:id
    },{
    });
  };
  //查看
  $scope.watch =function (id,author) {
    $state.go("pageTab.articleDetails",{
      id:id,
      author:author,
    },{
    });
  };
  //上下架
  $scope.online = function (id,status) {
    var newstatus;
    var newmessage;
    if (status == 0) {
      newstatus = 1
      newmessage = "是否需要上架"
    }else{
      newstatus = 0
      newmessage = "是否需要下架"
    }
    modalBox.confirm(  newmessage,function () {
      $state.go("pageTab.accountManage") 
      var cid = id
      console.log(cid)
      articleService.putArticleList(cid).then(function successCallback(response) {
        console.log(response)
        if (response.data.data===-1) {
          alert("文章banner已经上传超过8个，请先下架")
        }else{
          $state.go("pageTab.articleList",{
          },{
            reload:true
          })
        }    
      });                   
    }) 
  }
});
