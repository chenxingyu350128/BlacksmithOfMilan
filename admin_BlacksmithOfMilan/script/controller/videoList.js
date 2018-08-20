console.log("这是视频列表")
angular.module('myApp')
.controller('VideoList',function ($scope,$http,$log,$state,$stateParams,videoService,gradesites,subjectsites,sites,types,modalBox) {
  console.log()
  var params={
    page:$stateParams.page,
    pagesize:$stateParams.pagesize,
    status:$stateParams.status,
    type : $stateParams.type,
    title : $stateParams.title,
    nickName :$stateParams.nickName,
    subject : $stateParams.subject,
    grade: $stateParams.grade,
    minLike : $stateParams.minLike,
    maxLike : $stateParams.maxLike,
    minCollection : $stateParams.minCollection,
    maxCollection : $stateParams.maxCollection,
  };
  videoService.getVideoList(params).then(function successCallback(response) {
    console.log(response);
    if (response.data.code==0) {
      //列表数据渲染
      $scope.liste = response.data.data.rows;
      //获取总数据条数
      $scope.bigTotalItems = response.data.data.total;
      $scope.bigCurrentPage = $stateParams.page;
      $scope.maxSize = 5;
      //状态保存
      $scope.statusselect = $stateParams.status;
      //页数保存
      $scope.pagenum = $stateParams.page
      //分类保存
      $scope.classification = $stateParams.type;
      //标题保存
      $scope.text1 = $stateParams.title;
      //老师昵称
      $scope.teacher = $stateParams.nickName;
      //年级
      $scope.gradeselect = $stateParams.grade;
      //科目
      $scope.subjectselect = $stateParams.subject ;
      //点赞
      $scope.smallAgree = $stateParams.minLike;
      $scope.bigAgree = $stateParams.maxLike;
      //收藏
      $scope.smallcollection = $stateParams.minCollection;
      $scope.bigcollection = $stateParams.maxCollection;
    }else{
      modalBox.alert(response.data.msg)
    }
  });
  //下拉菜单数据
  //card/banner
  $scope.sites =types
  //年级
  $scope.gradesites = gradesites
  //学科
  $scope.subjectsites = subjectsites
  //上下架
  $scope.statussites = sites
  $scope.test =function () {
  };
  //搜索功能
  $scope.onsearch = function () {
    $state.go("pageTab.videoList",{
      status:$scope.statusselect,
      type : $scope.classification,
      title : $scope.text1,
      nickName :$scope.teacher,
      subject : $scope.subjectselect,
      grade: $scope.gradeselect,
      minLike : $scope.smallAgree,
      maxLike : $scope.bigAgree,
      minCollection : $scope.smallcollection,
      maxCollection : $scope.bigcollection,
    },{
      reload: true
    });
  };
  //重置
  $scope.clickRest = function () {
    $state.go("pageTab.videoList",{
      status:null,
      type : null,
      title : null,
      author : null,
      nickName :null,
      subject : null,
      grade: null,
      minLike :null,
      maxLike : null,
      minCollection : null,
      maxCollection : null,
    },{
      reload: true
    })
  }
  //点击跳转页数
  $scope.entry = function () {
    $state.go("pageTab.videoList",{
      page:$scope.pagenum
    },{
      reload:true
    })
  }
  //编辑
  $scope.onlineEditor = function (id) {
    $state.go("pageTab.videoDetails",{
      id:id
    },{
    });
  };
  //查看
  $scope.watch = function (id,nickName) {
    $state.go("pageTab.videoDetails",{
      id:id,
      nickName:nickName
    },{
    });
  };
  //新增功能
  $scope.addText = function () {
    $state.go('pageTab.videoDetails');
  };
  //上线下线
  $scope.online = function (id,status,type) {
    var newStatus;
    var news;
    if (status == 0) {
      newStatus = 1
      news = "是否需要上架"
    }else{
      newStatus = 0
      news = "是否需要下架"
    };
    modalBox.confirm(news,function () {
      var data={
        id:id,
        status:newStatus,
        type:type
      };
      videoService. putVideoList(data).then(function successCallback(response) {
        console.log(response)
        var data = response.data.data
        if (data==-1) {
          modalBox.alert("上架超过8个，请下架一个")
        }else  {
          $state.go("pageTab.videoList",{
          },{
            reload:true
          });
        };
      });
    }) 
  };
  //跳页正则判断
  $scope.changepage = function () {
    $scope.pagenum = $scope.pagenum.replace(/[^\d]/g,'');
    if (parseInt($scope.pagenum)===0) {
      $scope.pagenum=1
      
    }  
  }
  //分页功能
  $scope.pageChanged = function() {
    $log.log('Page changed to: ' + $scope.bigCurrentPage);
    $state.go("pageTab.videoList",{
      page:$scope.bigCurrentPage
    },{
      reload:true
    });
  };
});