(function($, undefined){
    var collectionOfUser,
        userId;
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
        $('#addUser').on('click', createFormAdd);
        $('#editUser').on('click', createUpdateForm);
        $('#delUser').on('click', deleteUser);
    }


    function createTable(array){
        var table = $('<table></table>').attr({
            'id' : 'db',
            'class' : 'table'
        });
        table.append(template(tFirstRow));
        for (var i = 0; i<array.length; i++){
            var row = template(tRowOfTable, array[i]);
            row.on('click', select);
                table.append(row);
        }
        $('#dbOfUser').append(table);
    }




    function createFormAlert(string){
        $('#wrraper').append(template(tAlertForm, {text : string}));
        $('#buttonOk').on('click', hideAlertForm);
    }

    function hideAlertForm(){
        $('#parentAlertForm').remove();
        $('#alertForm').remove();
    }


    function createFormAdd(){
        if(!($('#form').length)){
            var form = template(tFormAdd);
            $('#wrraper').append(form);
            $('#buttonEnter').on('click', createUser);
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

    function createUser(){
        if(($('#yourFullName').val()) != ''){
            collectionOfUser.create(
                {
                    name : $('#yourFullName').val(),
                    age : $('#yourAge').val(),
                    workPlace : $('#yourWorkPlace').val(),
                    addres : $('#yourAddres').val(),
                    tel : $('#yourPhone').val(),
                    skype : $('#yourSkype').val(),
                    email : $('#yourEmail').val()
                },
                function(newUser){
                    $('#parentForm').hide();
                    $('#form').hide();
                    var user = template(tRowOfTable, JSON.parse(newUser));
                    user.on('click', select);
                    $('#db').append(user);
                    clearForm();
                },
                error
            ); 
        }     
    }

    function pressEnterOrEsc(e){
        if(e.keyCode === 13){
            createUser();
        }
        if(e.keyCode === 27){
            hideForm();
        }
    }

    function deleteUser(){
        if(userId){
            var user = collectionOfUser.getElementById(userId);
            collectionOfUser.remove(
                user,
                function(){
                    $('tr[data-id='+userId +']').remove();
                },
                error
            )
        }
        else{
            var text = 'Please select a user from the list.';
            createFormAlert(text);
        }
    }

    function createUpdateForm(){
        if($('#form').length){
            $('#parentForm').remove();
            $('#form').remove();
        }
        else{
            var user = collectionOfUser.getElementById(userId);
            var form = template(tFormUpdate, user);
            $('#wrraper').append(form);
            $('#buttonEdit').on('click', updateUser);
            $('#buttonEsc').on('click', hideForm);
            $("#form [id='yourFullName']").focus().select();
            form.hide();
            form.show(400);   
        }
    }

    function updateUser(){
        if(($('#yourFullName').val()) != ''){
            var user = {
                _id : userId,
                name : $('#yourFullName').val(),
                age : $('#yourAge').val(),
                workPlace : $('#yourWorkPlace').val(),
                addres : $('#yourAddres').val(),
                tel : $('#yourPhone').val(),
                skype : $('#yourSkype').val(),
                email : $('#yourEmail').val()
            } 
            collectionOfUser.update(
                user,
                function(newUser){
                    $('#parentForm').hide();
                    $('#form').hide();
                    var user = template(tRowForUpdate, (JSON.parse(newUser)));
                    user.on('click', select);
                    $('tr[data-id='+ userId +']').html('').append(user);
                    clearForm();
                },
                error
            ); 
        }     
    }

    function hideForm(){ 
        $('#parentForm').hide();
        $('#form').hide();
        clearForm();
    }

    function clearForm(){
        $('input').val('');
    }

    
    function select(e){
        if(userId){
            $('tr[data-id='+ userId +']').css('background', 'none');
        }
        $('tr[data-id='+ e.currentTarget.getAttribute('data-id') +']').css('background', '#999');
        userId = e.currentTarget.getAttribute('data-id');
    }

    $(function(){
        collectionOfUser = new MyCollection('http://localhost:3000/user');
        createActionButtons();         
        collectionOfUser.load(
            function (data){
                createTable(data);
            }
        );
        
    });
})(jQuery); 