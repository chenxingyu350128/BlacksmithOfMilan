angular.module('myApp')
    .controller('SignCtrl',function ($scope,$http,$state,$stateParams,$timeout,projectService,modalBox) {
        let vm=this;
        vm.userId = JSON.parse(sessionStorage.getItem('userId'));
        console.log(vm.userId);
        // vm.handle=vm.handled===null?true:vm.handled;
        //请求签到数据
        projectService.getSignList(vm.userId)
            .then(function successCallback(res) {
            console.log(res);
            if(res.data.code===0){
                //处理签到数据
                vm.signData=res.data.data;
                vm.signStatus=res.data.data.signStatus;
                vm.signDays=res.data.data.signDays;
                // sessionStorage.setItem('signData',JSON.stringify(vm.signData));
                // sessionStorage.setItem('signStatus',JSON.stringify(vm.signStatus));
                // sessionStorage.setItem('signDays',JSON.stringify(vm.signDays));
                //判断是否已签到
                // vm.signData=JSON.parse(sessionStorage.getItem('signData'));
                // vm.signStatus=JSON.parse(sessionStorage.getItem('signStatus'));
                vm.handle=!vm.signStatus;
                //数组的split方法，获取签到日期
                // vm.signDays=JSON.parse(sessionStorage.getItem('signDays'));
                console.log(vm.signData);
                vm.signDaysArr=vm.signDays.split("");
                vm.longestLast=vm.signData.signContinuityMax;//最长持续签到天数
                vm.currentLast=vm.signData.signContinuity;//当前持续签到天数
                vm.beanCount=vm.currentLast>=4?5:vm.currentLast+1;//计算应该获得的签到逆袭豆
                vm.signArr=[];
                console.log(vm.signData);
                for (let i=0;i<vm.signDaysArr.length;i++){
                    if(vm.signDaysArr[i]==="1"){
                        vm.signArr.push(i)
                    }
                }
                //生成日历准备工作
                vm.dateBox = $("#js-sign-list");
                vm.currentDate = $(".current-date");
                vm.signBnt = $(".just-sign");
                vm._html = '';
                vm.myDate = new Date();//需要改为服务器时间
                vm.currentDate.text(vm.myDate.getFullYear() + '年' + (vm.myDate.getMonth() + 1) + '月' + vm.myDate.getDate() + '日');
                vm.monthFirst = new Date(vm.myDate.getFullYear(),vm.myDate.getMonth(), 0).getDay();//上月最后一天
                console.log(vm.monthFirst);
                //当月最后一天
                vm.d = new Date(vm.myDate.getFullYear(), (vm.myDate.getMonth())+ 1, 0);
                vm.totalDay = vm.d.getDate(); //获取当前月最后一天的日期即当月天数
                //生成日历网格
                for (let i = 0; i < 42; i++) {
                    vm._html += '<li> </li>'
                }
                vm.dateBox.html(vm._html);
                vm.dateLi = vm.dateBox.find("li");
                for (let i = 0; i < vm.totalDay; i++) {//生成当月的日历且含已签到
                    vm.dateLi.eq(i +vm.monthFirst).addClass("date" + (i + 1)).html((i + 1) +"<div class=\"sign-icon\"></div>");
                    for (let j = 0; j < vm.signArr.length; j++) {
                        if (i === vm.signArr[j]) {
                            vm.dateLi.eq(i + vm.monthFirst).addClass("sign");
                        }
                    }
                }
                if (vm.handle){
                    let today=$(".date" + vm.myDate.getDate());
                    if(!today.hasClass('sign')){//根据当天的class名来判断是否已签到，再改变handle的值
                        today.addClass('able-sign');//当天标记为可签到
                        //未签到情况，日期点击事件生效
                        $(".able-sign").on("click",function (){
                            $(this).addClass('sign');
                            openLayer("sign-active");
                            vm.handle=!vm.handle;
                            sessionStorage.setItem('handle',vm.handle);
                            vm.signComplete();
                        });
                    }else{//已签到情况，日期点击事件不生效
                        vm.handle=!vm.handle;
                        sessionStorage.setItem('handle',vm.handle);
                    }
                }
                else{
                    $(".date" + vm.myDate.getDate()).removeClass('able-sign');
                }

            }else{
                modalBox.alert(res.data.message)
            }
        });

        //增加的逆袭豆个数
        // vm.currentLast=JSON.parse(sessionStorage.getItem('currentLast'));
        //签到事件
        vm.signComplete= function() {
            console.log("ajax请求--发送签到苏剧");
            projectService.putSignList(vm.userId).then(function(res) {//有返回参数data
                console.log(res);
                if(res.data.code===0){
                    if(vm.handle===true){
                        openLayer("sign-active");
                        vm.handle=!vm.handle;
                        $timeout(function(){
                            $state.go($state.current,{},{reload:true});
                        },1000);
                    }else{
                        modalBox.alert('今日已签到')
                    }
                }
                else if(res.data.code===99){
                    modalBox.alert(res.data.message)
                }
            })
        };
        //弹出函数
        function openLayer(a) {
            $('.' + a).fadeIn()
        }
        //隐藏签到规则弹窗
        $(".sign-msg-switch").on("click", function() {
            $(".signInRule").fadeOut();
        });
        //隐藏签到弹窗
        $(".sign-switch").on("click",function() {
            vm.handle=false;
            $(".sign-active").fadeOut();
        });
        //打开规则弹窗
        $("#js-sign-history").on("click", function() {
            openLayer("signInRule", myFun);
            function myFun() {
                console.log(1)
            }
        });//右上角签到按钮，打开签到弹窗，已设置显示条件，仅在未签到的情况下暴露
        $("#js-just-sign").on("click", function() {
            $(".date" + vm.myDate.getDate()).addClass('sign');
            // openLayer("sign-active", myFun);
            vm.signComplete();
        })
    });