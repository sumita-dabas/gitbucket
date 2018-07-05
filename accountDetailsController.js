({
    doInit : function(component, event, helper) {
        console.log('in doInit');
        var action = component.get("c.getAccountList");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('in success');
                component.set("v.accountList", response.getReturnValue());
                console.log(response.getReturnValue());
                var pageSize = component.get("v.pageSize");
                component.set("v.accountList", response.getReturnValue());
                component.set("v.totalRecords", component.get("v.accountList").length);
                component.set("v.startPage",0);
                
                component.set("v.endPage",pageSize-1);
                var PaginationList = [];
                for(var i=0; i< pageSize; i++){
                    if(component.get("v.accountList").length> i)
                        PaginationList.push(response.getReturnValue()[i]);    
                }
                component.set("v.PaginationList", PaginationList);
                console.log(PaginationList);
                console.log(component.get("v.accountList"));
            }
            
        });
        $A.enqueueAction(action); 
    },
    
    handleAccountEvent : function(component, event, helper){
        console.log(event.getParam("accounts"));
        component.set("v.accountList",event.getParam("accounts"));
        console.log(component.get("v.accountList"));
        var sObjectList = component.get("v.accountList");
        var pageSize = component.get("v.pageSize");
        component.set("v.totalRecords", component.get("v.accountList").length);
        component.set("v.startPage",0);
        component.set("v.endPage",pageSize-1);
        var PaginationList = [];
        for(var i=0; i< pageSize; i++){
            if(component.get("v.accountList").length> i)
                PaginationList.push(sObjectList[i]);    
        }
        component.set("v.PaginationList", PaginationList);
        console.log(PaginationList);
        console.log(component.get("v.accountList"));
        
    },
    
    next : function(component, event, helper){
        var sObjectList = component.get("v.accountList");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var Paginationlist = [];
        var counter = 0;
        for(var i=end+1; i<end+pageSize+1; i++){
            if(sObjectList.length > i){
                Paginationlist.push(sObjectList[i]);
            }
            counter ++ ;
        }
        start = start+counter;
        end = end+counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    },
    
    previous : function(component, event, helper){
        var sObjectList = component.get("v.accountList");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var Paginationlist = [];
        var counter = 0;
        for(var i= start-pageSize; i < start ; i++){
            if(i > -1){
                Paginationlist.push(sObjectList[i]);
                counter ++;
            }else{
                start++;
            }
        }
        start = start-counter;
        end = end-counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    }
})