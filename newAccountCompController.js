({
    createAccount1 : function(component, event, helper) {
        console.log('in createAccount');
        var newAccount = component.get("v.newAcc");
        var action = component.get("c.createAccount");
        action.setParams({ 
            "acc": newAccount
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue());
                var accList = component.get("v.accountList");
                accList.unshift(response.getReturnValue());
                component.set("v.accountList", accList);
                console.log( accList);
                var newAccount = {'sobjectType': 'Account',
                                  'Name': '',
                                  'Type': '',
                                  'Phone': '',
                                  'Website': '' 
                                 };
                
                //resetting the Values in the form
                component.set("v.newAcc",newAccount);
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
})