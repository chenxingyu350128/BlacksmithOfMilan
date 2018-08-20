angular.module('myApp')
    .factory('modalBox', function () {
        return {
            alert: function (message,callback) {
                bootbox.alert({
                    title: "提示",
                    backdrop: 'false',
                    message: "<div style='text-align: center!important;color: #03A9F4'>" + message + "</div>",
                    buttons: {
                        ok: {
                            label: '确定',
                            className: 'btn-success'
                        }
                    },
                    callback: function () {
                        if(callback){
                            callback();
                        }

                    }
                });
            },
            confirm: function (message, callback,cancel) {
                bootbox.confirm({
                    message: "<div style='text-align: center !important;color: #03A9F4'>" + message + "</div>",
                    title: "提示",
                    backdrop: 'false',
                    onEscape: true,
                    buttons: {
                        confirm: {
                            label: '确定',
                            className: 'btn-danger'
                        },
                        cancel: {
                            label: '取消',
                            className: 'btn-success'
                        }
                    },
                    callback: function (result) {
                        if (result) {
                            callback();    //callback 为传入的回调函数
                        }else if(!result && cancel){
                            cancel();
                        }
                    }
                });
            }
        }
    });
  