(function($, undefined){
    var collectionOfHuman;
    /**
    * Called in case of error during request to the server.
    * @param {String} text. String for display.
    */   
    function error(text){
        console.log('Error is :' + text);
    }

    function createActionButtons(){
        var actionButtons = template(tActionButtons);
        $('#actionButtons').append(actionButtons);
        $('#addHuman').on('click', createFormAdd);
    }

    function createFormAdd(){
        if(!($('#parentForm').length)){
            var form = template(tForm);
            $('#wrraper').append(form);
            $('#buttonEnter').on('click', createHuman);
            $('#buttonEsc').on('click', hideForm);
            $('#form').on('keydown', pressEnterOrEsc);
            $("#form [id='yourFullName']").focus();
            form.hide();
            form.show(400);    
        }     
        else{  
            $('#parentForm').show(0);
            $('#form').show(400);
            $("#form [id='yourFullName']").focus();
        }
    }

    function pressEnterOrEsc(e){
        if(e.keyCode === 13){
            createHuman();
        }
        if(e.keyCode === 27){
            hideForm();
        }
    }
    function createHuman(){
        if(($('#yourFullName').val()) != ''){
            collectionOfHuman.create(
                {
                    name : $('#yourFullName').val(),
                    age : $('#yourAge').val(),
                    workPlace : $('#yourWorkPlace').val(),
                    addres : $('#yourAddres').val(),
                    tel : $('#yourPhone').val(),
                    skype : $('#yourSkype').val(),
                    email : $('#yourEmail').val()
                },
                function(newHuman){
                    $('#parentForm').hide();
                    $('#form').hide();
                    $('#db').append(template(tRowOfTable, (JSON.parse(newHuman))));
                    clearForm();
                },
                error
            ); 
        }
        else {
            alert("You must enter at least the person's name to create a new data");
        }      
    }

    function hideForm(e){ 
        $('#parentForm').hide();
        $('#form').hide();
        clearForm();
    }

    function clearForm(){
        $('input').val('');
    }

    function createTable(array){
        var table = $('<table></table>').attr({
            'id' : 'db'
        });
        table.append(template(tFirstRow));
        for (var i = 0; i<array.length; i++){
            var row = template(tRowOfTable, array[i]);
                table.append(row);
        }
        $('#dbOfHuman').append(table);
    }

    $(function(){
        collectionOfHuman = new MyCollection('http://localhost:3000/human');
        createActionButtons();
        // collectionOfHuman.create(
        //     {
        //         _id : 1,
        //         name : 'Rostyslav Paslavskyy',
        //         age : 23,
        //         workPlace : 'SoftServe',
        //         addres : 'lviv str. Antonovycha, № 60/4',
        //         tel : 992363934,
        //         skype : 's-a-c-h-o-k1',
        //         email : 'pas.ros.bor@gmail.com'
        //     },
        //     function(){},
        //     error
        // );  
         
        collectionOfHuman.load(
            function (data){
                createTable(data);
            }
        );
        
    });
})(jQuery); 