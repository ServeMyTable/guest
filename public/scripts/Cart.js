
function printDiv(){

        const docToPrint = document.getElementById('printBill').innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = docToPrint;
        window.print();
        document.body.innerHTML = originalContents;
}

function payBill(Dish,TableNo,Id,Time){

        //If Payment Successfull
        axios.post('/Table',{
                Dish : Dish ,
                TableNo : TableNo,
                id : Id,
                TotalBill : document.getElementById('TotalCalc').innerText,
                Time :Time,
                SubTotal : document.getElementById('totalAmt').innerText,
                CustomerName : document.getElementById('CustName').innerText
        }).then((response)=>{
                window.location = response.data;
        });
}