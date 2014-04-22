(function($, undefined){
    var collectionOfUser,
        userId,
        form;
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
        $('#addUser').on('click', showAddForm);
        $('#editUser').on('click', showUpdateForm);
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

    function showAddForm(){
        form.show(300,
            function(){
                $('#buttonEnter').unbind().on('click', createUser);
                $('#buttonEnter').text('Add');
            }
        )
    }

    function showUpdateForm(){
        if(userId){
            var user = collectionOfUser.getElementById(userId);
            setValueToForm(user);
            form.show(300,
                function(){
                    $('#buttonEnter').unbind().on('click', updateUser);
                    $('#buttonEnter').text('').text('Update');
                }
            )
        }
        else{
            var text = 'Please select a user from the list.';
            createFormAlert(text);
        }
    }
    function getDateFromForm(){
        var user = {};
        $('input').each(
            function(item){
                user[$(this).attr('name')] = $(this).val();
            }
        )
        return user;
    }

    function setValueToForm(obj){
        for (key in obj){
            $('input[name = "' + key + '"]').val(obj[key]);
        }
    }

    function createUser(){
        var user = getDateFromForm();
        collectionOfUser.create(
            user,
            function(newUser){
                showNewRow(JSON.parse(newUser));
            },
            error
        );   
    }

    function updateUser(){
        var user = getDateFromForm();
        user["_id"] = userId;
            collectionOfUser.update(
                user,
                function(newUser){
                    $('tr[data-id='+userId +']').html('').html(template(tColumOfTable, JSON.parse(newUser)))
                    $('tr[data-id='+userId +']').on('click', select);
                    hideForm();
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

    function showNewRow(obj){
        var row = $('<tr></tr>').attr({
            'data-id' : obj._id
        })
        var colums = template(tColumOfTable, obj);
        row.append(colums);
        row.on('click', select);
        $('#db').append(row);
        hideForm();
        clearForm();
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
                form = template(tForm);
                $('#wrraper').append(form);
                $('#buttonEsc').on('click', hideForm);
                form.hide();
                createTable(data);
            }
        );
        
    });
})(jQuery); 