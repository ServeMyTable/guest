function payBill(Dish,TableNo,Id,Time){

        axios.post('/Table',{
                Dish : Dish ,
                TableNo : TableNo,
                id : Id,
                TotalBill : document.getElementById('TotalCalc').innerText,
                Time :Time,
                SubTotal : document.getElementById('totalAmt').innerText,
                CustomerName : document.getElementById('CustName').innerText,
                RazAccountID : document.getElementById('csrf_token').innerText,
                RestaurantName : document.getElementById('RestaurantName').innerText,
                RestaurantAddress : document.getElementById('RestAddress').innerText,
                RestaurantGST : document.getElementById('GSTIN').innerText,
                PaymentMode : "Online"
        }).then(response=>{
                var options = {
                        key: response.data.key,
                        amount: response.data.amount,
                        currency: response.data.currency,
                        name: response.data.name,
                        description: "SCAN | PAY | EAT",
                        image: "https://www.servemytable.in/assets/logo.png",
                        order_id: response.data.id,
                        handler: function (res){

                                const Cart = document.getElementById("FinalPageForm");

                                const PaymentID = document.createElement('input');
                                PaymentID.setAttribute('value',res.razorpay_payment_id);
                                PaymentID.setAttribute('name','paymentId');
                                Cart.appendChild(PaymentID);

                                const OrderIDRaz = document.createElement('input');
                                OrderIDRaz.setAttribute('value',res.razorpay_order_id);
                                OrderIDRaz.setAttribute('name','OrderIDRaz');
                                Cart.appendChild(OrderIDRaz);

                                const SignatureRaz = document.createElement('input');
                                SignatureRaz.setAttribute('value',res.razorpay_signature);
                                SignatureRaz.setAttribute('name','SignatureRaz');
                                Cart.appendChild(SignatureRaz);

                                const OrderIDmy = document.createElement('input');
                                OrderIDmy.setAttribute('value',response.data.id);
                                OrderIDmy.setAttribute('name','OrderIDmy');
                                Cart.appendChild(OrderIDmy);

                                document.getElementById('FinalPageBtn').click();
                        },
                        "prefill": {
                            "name": (document.getElementById('CustName').innerText).split()[2]
                        },
                        "theme": {
                            "color": "#ffd31d"
                        }
                    };
                    var rzp1 = new Razorpay(options);
                    rzp1.open();

        })
}

function payBillCash(Dish,TableNo,Id,Time){
        axios.post('/Table',{
                Dish : Dish ,
                TableNo : TableNo,
                id : Id,
                TotalBill : document.getElementById('TotalCalc').innerText,
                Time :Time,
                SubTotal : document.getElementById('totalAmt').innerText,
                CustomerName : document.getElementById('CustName').innerText,
                RestaurantName : document.getElementById('RestaurantName').innerText,
                RestaurantAddress : document.getElementById('RestAddress').innerText,
                RestaurantGST : document.getElementById('GSTIN').innerText,
                PaymentMode : "Cash"
        }).then(response => {

                if(response.data.mode === "Cash"){
                        document.getElementById('FinalPageBtn').click();
                }

        });

}
