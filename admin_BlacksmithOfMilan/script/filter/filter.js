
//上架过滤器
myApp.filter("statusCode",function (sites) {
    return function (id) {
        if (id!=undefined&&id!=='') {
            return sites[id+1].site;
        }
        
        
    }
    
})
//上架按钮过滤器
myApp.filter("buttonCode",function (sitesbutton) {
    return function (id) {
        if (id!=undefined&&id!=='') {
            return sitesbutton[id+1].site;
            
        }
        
        
    }
    
})
//状态过滤器
.filter("FrozenCode",function () {
    return function (inputCode) {
        var changed = "";
        switch (inputCode) {
            case 1:
            changed = "正常";
            
            
            break;
            
            case 0:
            changed = "冻结"
            break;
        }
        return changed;
        
    }
    
})
//banner过滤器
.filter("typeCode",function (types) {
    return function (id) {
        if (id!=undefined&&id!=='') {
            return types[id+1].site;
            
        }
        
        
    }
    
})
//科目过滤器
.filter("subjectCode",function (subjectsites) {
    return function (id) {
        if (id!=undefined&&id!=='') {
            return subjectsites[id].site;
            
        }
        
    }
    
})
//年级过滤器
.filter("gradeCode",function (gradesites) {
    return function (id) {
        if (id!=undefined&&id!=='') {
            return gradesites[id].site;
        }
        if(!id){
            return "未设置"
        }
    }
})
.filter("statusHandle",function (statusList) {
    return function (id) {
        if (id!=undefined&&id!=='') {
            return statusList[id].status;
            
        }
        
    }
    
})
;
