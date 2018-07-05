({
    deleteAcc : function(component, event, helper) {
        var acc = event.currentTarget.id;
        if(confirm('Are you sure?'))
        {
            var action = component.get("c.deleteAccount");
            action.setParams({ 
                "accId": acc
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    console.log(response.getReturnValue());
                    component.set("v.accountList", response.getReturnValue());
                    var accList1 = component.get("v.accountList");
                    var cmpEvent = $A.get("e.c:refreshAccountListEvent");
                    cmpEvent.setParams({
                        "accounts" : accList1});
                    cmpEvent.fire();
                    console.log(component.get("v.accountList"));
                }
                else if(state == "ERROR"){
                    alert('Error in calling server side action');
                }
            });
            $A.enqueueAction(action);
            
        }
    },
    
    EditAcc : function(component, event, helper) {
        component.set("v.editMode", true);
        
    },
    
    saveAcc : function(component, event, helper) {
        var accRec = component.get("v.updateAcc");
        var accRecord = event.currentTarget.Id;
        //alert('>>>>>>>.' + accRec);
        console.log(accRecord);
        var action = component.get("c.updateAccount");
            action.setParams({
                "acc": accRec
            });
        action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    console.log(response.getReturnValue());
                    component.set("v.accountList", response.getReturnValue());
                    var accList1 = component.get("v.accountList");
                    var cmpEvent = $A.get("e.c:refreshAccountListEvent");
                    cmpEvent.setParams({
                        "accounts" : accList1});
                    cmpEvent.fire();
                }
                else if(state == "ERROR"){
                    console.log('Error in calling server side action');
                }
                
            });
            $A.enqueueAction(action);
        component.set("v.editMode", false);
    },
    
    Cancel : function(component, event, helper) {
        component.set("v.editMode", false);
        
    }
})