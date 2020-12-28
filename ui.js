

// ///UI Controller////



const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addBtn:'.add-btn',
        ListItemAll:'.collection-item',
        updateBtn:'.update-btn',
        deleteBtn:'.delete-btn',
        backBtn:'.back-btn',
        itemName:'#item-name',
        itemCalories:'#item-calories',
        totalCalories:'.total-calories',
        clearBtn:'.clear-btn',
      }

    //Public Method/
    return{
        populateList : function(items){
            let html = ''; //while defining empty to concat html init outside froeach
            items.forEach(function(item){
                
                html += `<li class="collection-item" id="items-${item.id}">
                <strong>${item.name}:</strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>
                </li>`
         });
            document.querySelector(UISelectors.itemList).innerHTML = html;
            debugger;
        },
        
        getItemInput: function(){
            return{
                name:document.querySelector(UISelectors.itemName).value,
                calories:document.querySelector(UISelectors.itemCalories).value
            }
            
        },
    //     updateListItem:function(items){
    //         // Update Using ID
    //         document.getElementById(`items-${items.id}`).innerHTML = `
    //         <strong>${items.name}:</strong><em>${items.calories} Calories</em>
    //     <a href="#" class="secondary-content">
    //       <i class="edit-item fa fa-pencil"></i>
    //     </a>`;
    //    },
    updateListItem: function(item){
        let ListItemAll = document.querySelectorAll(UISelectors.ListItemAll);
  
        // Turn Node list into array
        ListItemAll = Array.from(ListItemAll);
  
        ListItemAll.forEach(function(ListItemAll){
          const itemID = ListItemAll.getAttribute('id');
  
          if(itemID === `items-${item.id}`){
            document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
              <i class="edit-item fa fa-pencil"></i>
            </a>`;
          }
        });
    },
       showTotalCalories:function(totalCalories){
        document.querySelector(UICtrl.totalCalories).textContent = totalCalories;
       },

        addItemToForm: function(){
            document.querySelector(UISelectors.itemName).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCalories).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
          },

        addListItem:function(items){
            
            // Show the Items///
            document.querySelector(UISelectors.itemList).style.display = 'block';
            //Create li to push UI user data to list
            const li = document.createElement('li');
            //Create a class//
            li.className = 'collection-item';
            //Create ID//
            li.id = `items-${items.id}`;
            li.innerHTML = `<strong>${items.name}: </strong><em>${items.calories} Calories</em>
            <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
            </a>`;
            ///Insert into UI
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
        },
        clearAllItems:function(){
            lisItems = document.querySelector(UISelectors.ListItemAll);
            console.log(lisItems);
        },

        deleteListItem: function(id){
            const itemID = `#items-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
          },

        clearfields:function(){
            document.querySelector(UISelectors.itemName).value= '';
            document.querySelector(UISelectors.itemCalories).value= '';

        },

        clearEditState:function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        
        showEditState:function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },

        showTotalCalories:function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },

        hideList:function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        getSelection: function(){
            return UISelectors;
        }
    }

})();
