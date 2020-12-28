///App Controller///

// const { UI } = require("winjs");


const App = (function(ItemCtrl,UICtrl){
    ///Load Event Listeners//
    const loadEventListeners = function(){
        //Items data from ItemCtrl
        const UISelectors = UICtrl.getSelection();
        ///Event for add-meal//
        document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);

        ///Disable Enter Button//
        document.addEventListener('keypress',function(e){
            if(e.KeyCode === "Enter"){
                e.preventDefault();
                return false;
            }
        });
        ///Target the icon///
        document.querySelector(UISelectors.itemList).addEventListener('click',itemEditClick);
        //itemUpdatebtn//
        document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);
        //backbutton//
        document.querySelector(UISelectors.backBtn).addEventListener('click',UICtrl.clearEditState);
        //deleteitem//
        document.querySelector(UISelectors.deleteBtn).addEventListener('click',itemDeleteSubmit);
        //clear all items//
        document.querySelector(UISelectors.clearBtn).addEventListener('click',clearAllItemsClick);
    };
       
    ///getadditems//
        const itemAddSubmit = function(e){
            const input =  UICtrl.getItemInput();
            
           
            ///Pass Input to addItem or consolelog//
            if(input.name !== '' && input.calories !==''){
                const newItem = ItemCtrl.addItem(input.name,input.calories);
                
                ///Add UI items to UI list //  
                UICtrl.addListItem(newItem);

                ///Clear Fields//
                UICtrl.clearfields();

                //TotalCalories//
                const totalCalories = ItemCtrl.getTotalCalories();

                ///Total Calories to UI
                UICtrl.showTotalCalories(totalCalories);
            }
            e.preventDefault(); 
        };

        ///Target Item List and get the icon//
        const itemEditClick = function(e){
           //Target the particular icon///
            if(e.target.classList.contains('edit-item')){
                // Target the ID ///
                const listID = e.target.parentNode.parentNode.id ;
                ///split ID//
                const listIDArr = listID.split('-');
                //Create ID//
                const id = parseInt(listIDArr[1]);
                
                ///pass the id to the items//
                const itemtoEdit = ItemCtrl.getItemById(id);
                
                
                ///set to current item which is null//
                ItemCtrl.setCurrentItem(itemtoEdit);

                // ///display items on UI///
                UICtrl.addItemToForm();

            }
        }

        const itemUpdateSubmit = function(e){
            //User Input///
            const input = UICtrl.getItemInput();
            ///updateitem///
            const updatedItem = ItemCtrl.updateItem(input.name,input.calories);
            ///Update UI list item//
            UICtrl.updateListItem(updatedItem);
            //Update total Calories//
            const totalCalories = ItemCtrl.getTotalCalories();
            //Update total Calories UI//
            UICtrl.showTotalCalories(totalCalories);
            //clearstate//
            UICtrl.clearEditState();
            ///clear fields//
            UICtrl.clearfields();
        }
        
        const itemDeleteSubmit = function(e){
            //get current item
            const currentItem = ItemCtrl.getCurrentItem();
            //delete item from DB//
            ItemCtrl.deleteItem(currentItem.id);
            //delete from UI//
            UICtrl.deleteListItem(currentItem.id);
            //totalcalories from db
            const totalCalories = ItemCtrl.getTotalCalories();
            //Update total Calories UI//
            UICtrl.showTotalCalories(totalCalories);
            //clearstate//
            UICtrl.clearEditState();
            ///clear fields//
            UICtrl.clearfields();
        }
    
    const clearAllItemsClick = function(e){
        //remove items from db
        ItemCtrl.clearAllItems();
        //remove items from UI//
        UICtrl.clearAllItems();
    }
    //Public Method//
    return{
        init: function(){
                ///Clear Edit State /Remove all buttons and have only Add btn
                UICtrl.clearEditState();

                ///getitems from Data Structure//
                const items = ItemCtrl.getItems();
                
                
                
                if(items.length === 0){
                    //Hide that Unwanted Line in UI//
                    UICtrl.hideList();
                }else{
                    //Pass Items data to UI
                UICtrl.populateList(items);
                }
                
                //loadEvent Listeners//
                loadEventListeners(); 
            }
        }
    }

)(ItemCtrl,UICtrl);
App.init();

    
