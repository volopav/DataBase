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

    function createFormAlert(string){
        $('#wrraper').append(template(tAlertForm, {text : string}));
        $('#buttonOk').on('click', hideAlertForm);
    }

    function hideAlertForm(){
        $('#parentAlertForm').remove();
        $('#alertForm').remove();
    }

    function createActionButtons(){
        var actionButtons = template(tActionButtons);
        $('#actionButtons').append(actionButtons);
        $('#addUser').on('click', createAddForm);
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

    function createAddForm(){
        if($('#addForm').length){
            $('#addForm').show(600);
            $('#addForm').find('[id="yourFullName"]').focus().select();       
        }
        else{
            var container = $('<div>').attr({
            'id' : 'addForm'
            });
            var form = template(tForm, {enter : 'Add', esc : 'Cancel'});
            container.append(form);
            $('#wrraper').append(container);
            $('#addForm').find('[id="buttonEnter"]').on('click', createUser);
            $('#addForm').find('[id="buttonEsc"]').on('click', hideAddForm);
            $('#addForm').find('[id="yourFullName"]').focus().select();
            $('#addForm').hide();
            $('#addForm').show(600);
        }
    }

    function createUpdateForm(){
        if($('#updateForm').length){
            $('#updateForm').show(600);
            $('#updateForm').find('[id="yourFullName"]').focus().select();       
        }
        else{
            var container = $('<div>').attr({
            'id' : 'updateForm'
            });
            var form = template(tForm, {enter : 'Update', esc : 'Cancel'});
            container.append(form);
            $('#wrraper').append(container);
            $('#updateForm').find('[id="buttonEnter"]').on('click', updateUser);
            $('#updateForm').find('[id="buttonEsc"]').on('click', hideUpdateForm);
            $('#updateForm').find('[id="yourFullName"]').focus().select();
            $('#updateForm').hide();
            $('#updateForm').show(600);
        }
        setDataToForm();
    }

    function createUser(){
        collectionOfUser.create(
            {
                name : $('#addForm').find('[id="yourFullName"]').val(),
                age : $('#addForm').find('[id="yourAge"]').val(),
                workPlace : $('#addForm').find('[id="yourWorkPlace"]').val(),
                addres : $('#addForm').find('[id="yourAddres"]').val(),
                tel : $('#addForm').find('[id="yourPhone"]').val(),
                skype : $('#addForm').find('[id="yourSkype"]').val(),
                email : $('#addForm').find('[id="yourEmail"]').val()
            },
            function(newUser){
                $('#addForm').hide();
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
        if(userId){
            var user = collectionOfUser.getElementById(userId);
            collectionOfUser.update(
                {
                    _id : user._id,
                    name : $('#updateForm').find('[id="yourFullName"]').val(),
                    age : $('#updateForm').find('[id="yourAge"]').val(),
                    workPlace : $('#updateForm').find('[id="yourWorkPlace"]').val(),
                    addres : $('#updateForm').find('[id="yourAddres"]').val(),
                    tel : $('#updateForm').find('[id="yourPhone"]').val(),
                    skype : $('#updateForm').find('[id="yourSkype"]').val(),
                    email : $('#updateForm').find('[id="yourEmail"]').val()
                },
                function(newUser){
                    $('#updateForm').hide();
                    $('tr[data-id='+userId +']').html('').html(template(tColumOfTable, JSON.parse(newUser)))
                    $('tr[data-id='+userId +']').on('click', select);
                    clearForm();
                },
                error
            );  
        }
        else{
            var text = 'Please select a user from the list.';
            createFormAlert(text);
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

    function setDataToForm(){
        var user = collectionOfUser.getElementById(userId);
        name : $('#updateForm').find('[id="yourFullName"]').val(user.name);
        age : $('#updateForm').find('[id="yourAge"]').val(user.age);
        workPlace : $('#updateForm').find('[id="yourWorkPlace"]').val(user.workPlace);
        addres : $('#updateForm').find('[id="yourAddres"]').val(user.addres);
        tel : $('#updateForm').find('[id="yourPhone"]').val(user.tel);
        skype : $('#updateForm').find('[id="yourSkype"]').val(user.skype);
        email : $('#updateForm').find('[id="yourEmail"]').val(user.email);
    }

    function hideAddForm(){ 
        $('#addForm').hide();
        clearForm();
    }

    function hideUpdateForm(){ 
        $('#updateForm').hide();
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