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
        $('#addUser').on('click', createAddForm);
        $('#editUser').on('click', createUpdateForm);
        $('#delUser').on('click', deleteUser);
    }

    function createAddForm(){
        createForm('Add', 'Cancel', createUser, hideForm);
    }

    function createUpdateForm(){
        createForm('Update', 'Cancel', updateUser, hideForm);
        setDataToForm();
    }
    function setDataToForm(){
        var user = collectionOfUser.getElementById(userId);
        name : $('#yourFullName').val(user.name);
        age : $('#yourAge').val(user.age);
        workPlace : $('#yourWorkPlace').val(user.workPlace);
        addres : $('#yourAddres').val(user.addres);
        tel : $('#yourPhone').val(user.tel);
        skype : $('#yourSkype').val(user.skype);
        email : $('#yourEmail').val(user.email);
    }
    function createTable(array){
        var table = $('<table></table>').attr({
            'id' : 'db',
            'class' : 'table'
        });
        table.append(template(tFirstRow));
        for (var i = 0; i<array.length; i++){
            var row = $('<tr></tr>').attr({
                'data-id' : array[i]._id
            });
            var colums = template(tColumOfTable, array[i]);
            row.append(colums)
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


    function createForm(firstButtonName, secondButtonName, firstButtonFunction, secondButtonFunction){
        if($('#form').length){
            $('#buttonEnter').text(firstButtonName);
            $('#buttonEsc').text(secondButtonName);
            
            $('#parentForm').show(0);
            $('#form').show(400);
            $("#form [id='yourFullName']").focus().select();
        }     
        else{  
            var form = template(tForm, {enter : firstButtonName, esc : secondButtonName});
            $('#wrraper').append(form);
            $('#buttonEnter').on('click', firstButtonFunction);
            $('#buttonEsc').on('click', secondButtonFunction);
            $("#form [id='yourFullName']").focus().select();
            form.hide();
            form.show(400);
        }
    }

    function createUser(){
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
                var row = $('<tr></tr>').attr({
                    'data-id' : JSON.parse(newUser)._id
                })
                var user = template(tColumOfTable, JSON.parse(newUser));
                row.append(user);
                row.on('click', select);
                $('#db').append(row);
                clearForm();
            },
            error
        );   
    }

    function updateUser(){
            var user = collectionOfUser.getElementById(userId);
        collectionOfUser.update(
            {
                _id : user._id,
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
               // console.log(userId);

                $('tr[data-id='+userId +']').html('').html(template(tColumOfTable, JSON.parse(newUser)))
                $('tr[data-id='+userId +']').on('click', select);
                $('#db').append($('tr[data-id='+userId +']'));
                clearForm();
            },
            error
        );   
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