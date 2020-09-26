const Order = [];

function checkElements(){
      const cart = document.getElementById('CartImage');
      if(Order.length > 0){
            cart.src = "./assets/cartwith.svg";
      }else{
            cart.src = "./assets/cart.svg";
      }
}

function addItem(position){

      const Dish = document.getElementById('DishName'+position);
      const Quantity = document.getElementById('Quantity'+position);
      const Price = document.getElementById('DishPrice'+position);

      let counter = 0;
      for(var i = 0 ; i < Order.length ; i++){
            counter++;
            if(Order[i].Dish === Dish.innerHTML){
                  Order[i].Quantity = Quantity.innerHTML;
                  counter = 0;
                  break;
            }
      }
      if(counter == Order.length){
            Order.push({Dish : Dish.innerHTML , Quantity : Quantity.innerHTML , Price : Price.innerHTML});
      }

}

function increment(position){
      const obj = document.getElementById('Quantity'+position);
      let num = Number.parseInt(obj.innerText);
      num = num + 1;
      obj.innerHTML = num;
      addItem(position)
      checkElements()
}

function decrement(position){
      const obj = document.getElementById('Quantity'+position);
      let num = Number.parseInt(obj.innerText);
      num = num - 1;
      if(num < 0){
            obj.innerHTML = 0
            checkElements()
      }else{
            obj.innerHTML = num;
            addItem(position)
      }
}

function getOrders(){

      const FinalOrder = [];
      for(var k = 0 ; k < Order.length ; k++){
            if(Order[k].Quantity != "0"){

                  FinalOrder.push(Order[k]);
            }
      }
      if(FinalOrder.length > 0){
      const Cart = document.getElementById('CartForm');
      for(var k = 0 ; k < FinalOrder.length ; k++)
      {
            const DishName = document.createElement('input');
            DishName.setAttribute('value',FinalOrder[k].Dish);
            DishName.setAttribute('name','Dish'+k);
            Cart.appendChild(DishName);

            const Quantity = document.createElement('input');
            Quantity.setAttribute('value',FinalOrder[k].Quantity);
            Quantity.setAttribute('name','Dish'+k);
            Cart.appendChild(Quantity);

            const Price = document.createElement('input');
            Price.setAttribute('value',FinalOrder[k].Price);
            Price.setAttribute('name','Dish'+k);
            Cart.appendChild(Price);

      }
      const len = document.createElement('input');
      len.setAttribute('value',FinalOrder.length);
      len.setAttribute('name','TotalItems');
      Cart.appendChild(len);

      document.getElementById('ordersSubmit').click();
      }else{
            alert('Please Give Order')
      }

}

function filterItems(){

      var input, filter, i, j, temp, NoOfDishes, h3, hr ;
      input = document.getElementById('DishToSearch');
      filter = input.value.toUpperCase();
      NoOfDishes = document.getElementById("disheslen").innerText;
      h3 = document.getElementsByTagName("h3");
      hr = document.getElementsByClassName("categorical-line");
      for(j = 0 ; j < h3.length ; j++){
                if(filter === ""){
                        h3[j].style.display = "";
                        hr[j].style.display = "";
                }
                else{
                        h3[j].style.display = "none";
                        hr[j].style.display = "none";
                }
      }

      for (i = 1; i <= NoOfDishes; i++) {
            temp = document.getElementById("DishName"+i);

            if (temp.innerText.toUpperCase().indexOf(filter) > -1) {

                  temp.parentElement.parentElement.style.display = "";

            } else {

                  temp.parentElement.parentElement.style.display = "none";
            }
}
}
