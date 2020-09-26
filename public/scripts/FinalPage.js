function printDiv(){
        let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=80,left=150');

        mywindow.document.write(`<html>
                                 <head>
                                 <title>Receipt</title>
                                 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
                                 <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
                                 <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
                                 <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
                                 <style>
                                    :root{

                                        --theme-color : #ffd31d;
                                        --theme-grey : #B7B6B3;
                                        --facebook : #3B5998;
                                        --dark-red : #d63447;
                                        --theme-orange : #f57b51;
                                    }

                                    .logoFont {
                                        font-family: "PT Sans",sans-serif;
                                    }

                                    .mFont{
                                        font-family: "Noto Sans",sans-serif;
                                    }

                                    button{
                                        border: none;
                                    }

                                    button:focus{
                                        outline: none;
                                    }

                                    input:focus{
                                        outline: none;
                                    }
                                    .totalBox{
                                            background-color: var(--theme-color);
                                            color: black;
                                            padding: 10px;
                                            margin: 0;
                                    }

                                    .line-theme{

                                            border: 1px solid var(--theme-color);
                                            background-color: var(--theme-color);
                                    }

                                    .tick{
                                            margin-left: 20px;
                                            display: inline-block;
                                    }

                                    .inBlock{
                                            display: inline-block;
                                    }
                                    .verticalCenter{
                                            vertical-align: center;
                                    }
                                    img{
                                            vertical-align: inherit;
                                    }
                                    .rd{
                                            padding: 10px;
                                            color: black;
                                            background-color: var(--theme-color);
                                            margin-top: 30px;
                                    }
                                    .mb-30{
                                            margin-bottom: 30px;
                                    }
                                    table{
                                            margin: 0;
                                    }
                                    .fs-sm{
                                            font-size: small;
                                    }

                                    .pd-10{ padding: 10px;}
                                    .footerNew{
                                            color: var(--theme-color);
                                            margin-bottom: 10px;
                                    }
                                    .footerNew:hover{
                                            color: black;
                                            text-decoration: none;
                                    }

                                    td,th{
                                        font-family: "Noto Sans",sans-serif;
                                    }

                                    .logoImage{
                                        vertical-align: middle;
                                    }
                                 </style>
                                 </head>
                                 <body>                            
                                 `);
        
        mywindow.document.write(document.getElementById('printBill').innerHTML);
        mywindow.document.write(` 
                                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
                                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
                                </body>
                                </html>`);

        mywindow.document.close();
        mywindow.focus();

        mywindow.print();
        mywindow.close();

        return true;
}