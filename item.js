///Item Contorller///



const ItemCtrl = (function(){
    
    const Item = function(id,name,calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data Structure or State => React Structure of Building Application///
    const data = {
        item: [
            // {id:0,name:'Briyani',calories:1000},
            // {id:1,name:'Dosa',calories:350},
            // {id:2,name:'Parota',calories:1500},
            // {id:3,name:'Chicken Roast',calories:800},
        ],
        currentItem:null,
        totalCalories:0
    };

    //Public Method//
    return{
        getItems: function(){
            return data.item;
        },
        getItemById:function(id){
            let found = null;
            data.item.forEach(function(items){
                if(items.id === id)
                    found = items;
                
            })
            return found;
        },
        
        setCurrentItem:function(items){
            data.currentItem = items;

        },
        getCurrentItem:function(){
            return data.currentItem;
        },
        updateItem:function(name,calories){
            calories=parseInt(calories);
            let found = null;
            data.item.forEach(function(items){
                if(items.id===data.currentItem.id){
                    items.name = name;
                    items.calories = calories;
                }
                found = items;
            })
            return found;
        },

        addItem:function(name,calories){
            let ID;
            //Create ID for new Item//
            if(data.item.length>0){
                ID = data.item[data.item.length -1].id + 1;
            }else{
                ID = 0;
            }

            //Calories to Number
            calories = parseInt(calories);

            //Create a New Item
            const newItem = new Item(ID,name,calories);

            //Push items to array//
            data.item.push(newItem);

            return newItem;
        },

        deleteItem:function(id){
            //get DB id//
            const ids = data.item.map(function(items){
                return items.id
            })
           //indexof current id with db id//
           const index = ids.indexOf(id);
           ///remove item//
           data.item.splice(index,1);
        },
        
        getTotalCalories:function(){
            let total = 0;

            data.item.forEach(function(items){
                total += items.calories;
               
            })
            data.totalCalories = total;
            

            return data.totalCalories;
        },

        clearAllItems:function(){
            data.items = [];
        },

        logData:function(){
            return data.item;
        },
        
    }
})();

