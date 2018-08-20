angular.module('myApp')
    .controller('BindOverCtrl',function ($scope,$http,$state,$interval,projectService,modalBox) {
        let vm=this;
        vm.id=JSON.parse(sessionStorage.getItem('userId'));
        vm.second=59;
        vm.coded=false;
        vm.TelDescription='获取验证码';
        vm.EmailDescription='获取验证码';
        vm.back=function(){$state.go('bindingInfo')};
        vm.choice=1;//默认为手机绑定界面
        vm.mobile=function () {vm.choice=1;};
        vm.Email=function () {vm.choice=2;};
        //获取手机验证码
        if(!vm.clickTel){//设置点击条件，倒计时无法点击
            vm.toGetTelCode=function(){
                projectService.getTelCode(vm.id,vm.newTel).then(function(res){
                    if(res.data.code===0){
                        if(res.data.data===0){
                            console.log(res);
                            modalBox.alert('验证码已发送');
                            vm.Telvcode=$interval(function(){//1min倒计数
                                if(vm.second <= 0){
                                    $interval.cancel(vm.Telvcode);
                                    vm.second=59;
                                    vm.TelDescription="获取验证码";
                                    vm.clickTel=false;
                                }else{
                                    vm.TelDescription=vm.second+"s后获取";
                                    vm.clickTel=true;
                                    vm.second--;
                                }
                            },1000);
                        }else if(res.data.data===1){
                            modalBox.alert('该手机号已被绑定');
                        }else if(res.data.data===2){
                            modalBox.alert('该手机号为空号');
                        }else{
                            modalBox.alert(res.data.msg);
                        }
                    }
                })
            };
        }
        //获取邮箱验证码
        if(!vm.clickEmail){//设置点击条件，倒计时无法点击
            vm.toGetEmailCode=function(){
                console.log(vm.newEmail);
                projectService.getEmailCode(vm.id,vm.newEmail).then(function(res){
                    if(res.data.code===0){
                        console.log(res);
                        if(res.data.data===0){
                            modalBox.alert('验证码发送成功');
                            vm.Emailvcode=$interval(function(){
                                if(vm.second <= 0){
                                    $interval.cancel(vm.Emailvcode);
                                    vm.second=59;
                                    vm.EmailDescription="获取验证码";
                                    vm.clickEmail=false;
                                }else{
                                    vm.EmailDescription=vm.second+"s后获取";
                                    vm.clickEmail=true;
                                    vm.second--;
                                }
                            },1000);
                        }else if(res.data.data===1){
                            modalBox.alert('该邮箱已被绑定');
                        } else if(res.data.data===2){
                            modalBox.alert('该邮箱不存在');
                        } else{
                            modalBox.alert(res.data.msg);
                        }
                    }
                })
            };
        }
        //提交手机绑定修改
        vm.saveModify=function () {
            vm.bt= {
                id: vm.id,
                vCode: vm.telCode,
                bindingTool: vm.newTel
            };
            projectService.bindTel(vm.bt).then(function (res) {
                console.log(res);
                if(res.data.code===0){
                    if(res.data.data===0){
                        modalBox.alert('绑定成功',function(){
                            $state.go('bindingInfo');
                        });
                    }else if(res.data.data===1){
                        modalBox.alert('请求超时，或填写错误')
                    }else if(res.data.data===2){
                        modalBox.alert('验证码不正确')
                    }else if(res.data.data===3){
                        modalBox.alert('当天验证已达3次，请明日再试')
                    }else if(res.data.data===4){
                        modalBox.alert('请求格式不正确，请检查')
                    }else if(res.data.data===10){
                        modalBox.alert('第一次绑定成功，获得10个逆袭豆！！！');
                        $state.go('bindingInfo');
                    }
                }
            });
        };
        //提交邮箱绑定修改
        vm.saveModify1=function () {
            vm.be={
                id: vm.id,
                vCode: vm.emailCode,
                bindingTool: vm.newEmail
            };
            projectService.bindEmail(vm.be).then(function (res) {
                if(res.data.code===0){
                    console.log(res);
                    if(res.data.data===0){
                        modalBox.alert('绑定成功',function () {
                            $state.go('bindingInfo')
                        });
                    }else if(res.data.data===1){
                        modalBox.alert('请求超时（请在获取验证码后20分钟内填写）')
                    }else if(res.data.data===2){
                        modalBox.alert('验证码不正确')
                    }else if(res.data.data===3){
                        modalBox.alert('当天验证已达3次，请明日再试')
                    }else if(res.data.data===4){
                        modalBox.alert('请求格式不正确，请检查')
                    }else if(res.data.data===10){
                        modalBox.alert('第一次绑定成功，获得10个逆袭豆！！！');
                        $state.go('bindingInfo')
                    }

                }
            })
        }
    });