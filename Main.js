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
        $('#buttonOk').on('click', removeAlertForm);
    }

    function removeAlertForm(){
        $('#parentAlertForm').remove();
        $('#alertForm').remove();
    }

    function createActionButtons(){
        var actionButtons = template(tActionButtons);
        $('#actionButtons').append(actionButtons);
        $('#addUser').on('click', showAddForm);
        $('#editUser').on('click', showUpdateForm);
        $('#delUser').on('click', showDeleteForm);
    }

    function createTable(array){
        var table = $('<table></table>').attr({
            'id' : 'db',
            'class' : 'table'
        });
        table.append(template(tFirstRow));

        for (var i = 0; i<array.length; i++){
            var row = createNewRow(array[i]);
            table.append(row);
        }
        $('#dbOfUser').append(table);
        $('body').on('keydown', removeUser);
    }

    function showAddForm(){
        form.show(300,
            function(){
                $('input[name = "name"]').focus().select();
                $('#buttonEnter').unbind().on('click', createUser);
                $('#buttonEnter').text('Add');
                validation();
            }
        )
    }

    function showUpdateForm(){
        if(userId){
            var user = collectionOfUser.getElementById(userId);
            setValueToForm(user);
            form.show(300,
                function(){
                    $('input[name = "name"]').focus().select();
                    $('#buttonEnter').unbind().on('click', updateUser);
                    $('#buttonEnter').text('').text('Update');
                    validation();
                }
            )
        }
        else{
            var text = 'Please select a user from the list.';
            createFormAlert(text);
        }
    }

    function showDeleteForm(){
        var form = template(tConfirmForm);
        $('#wrraper').append(form);
        $('#buttonYes').on('click', deleteUser);
        $('#buttonNo').on('click', removeConfirmForm);
    }

    function createUser(e){
        var val = valid();
        if(val){
            var user = getDateFromForm();
            e.preventDefault();
           // console.log(e.isDefaultPrevented());
            collectionOfUser.create(
                user,
                function(newUser){
                   var row = createNewRow(JSON.parse(newUser));
                    $('#db').append(row);
                    hideForm();
                },
                error
            );   
         }
    }

    function updateUser(e){
        var user = getDateFromForm();
        user["_id"] = userId;
        var val = valid();
        if(val){
            e.preventDefault();
            collectionOfUser.update(
                user,
                function(newUser){
                    $('tr[data-id='+userId +']').html('').html(template(tColumOfTable, JSON.parse(newUser)))
                    $('tr[data-id='+userId +']').on('click', select);
                    hideForm();
                },
                error
            );  
        }
    }

    function deleteUser(){
        removeConfirmForm();

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

    function removeConfirmForm(){
        $('#confirmParentForm').remove();
        $('#confirmForm').remove();
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

    function removeUser(e){
        if(e.keyCode === 46){
            deleteUser();
        }
    }

    function hideForm(){ 
        $('#parentForm').hide();
        $('#form').hide();
        clearForm();
    }

    function cancelButton(e){
        e.preventDefault();
        hideForm();
    }
    function esc(e){
        if(e.keyCode === 27){
            hideForm();
        }
    }
    function clearForm(){
        $('input').val('');
    }

    function createNewRow(obj){
        var row = $('<tr></tr>').attr({
            'data-id' : obj._id
        })
        var colums = template(tColumOfTable, obj);
        row.append(colums);
        row.on('click', select);
        row.on('dblclick', showUpdateForm);
        return row;
    }
    function select(e){
        if(userId){
            $('tr[data-id='+ userId +']').css('background', 'none');
        }
        $('tr[data-id='+ e.currentTarget.getAttribute('data-id') +']').css('background', '#999');
        userId = e.currentTarget.getAttribute('data-id');
    }

    function validation(){
        $("#myForm").validate({
            rules : {
                name : {
                    required : true,
                    minlength : 4,  
                },
                age : {
                    number : true,
                },
                tel : {
                    required : true,
                    number : true,
                },
                email : {
                    required : true,
                    email : true,
                },
           },
           messages : {
                name : {
                    required : "This field is required",
                    minlength : "Username must be at least 4 characters",
                },
                age : {
                    number : "You can use only numbers",
                },
                tel : {
                    required : "This field is required",
                    number : "You can use only numbers",
                },
                email : {
                    required : "This field is required",
                    email : "Wrong email format",
                },
            }
        });
    }

    function valid(){
        var val = false;
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if ($('input[name = "name"]').val() != '' && $('input[name = "tel"]').val() != '' && $('input[name = "email"]').val() != ''){
            if($('input[name = "name"]').val().length >= 4){
                if($.isNumeric($('input[name = "tel"]').val())){
                    if($.isNumeric($('input[name = "age"]').val()) || $('input[name = "age"]').val() ===''){
                        if(emailReg.test( $('input[name = "email"]').val() ) ){
                            val = true;
                        }
                    }
                }
            }
        }
        return val;
    }

    function createForm(){
        form = template(tForm);
        $('#wrraper').append(form);
        $('#buttonEsc').on('click', cancelButton);
        $('#form').on('keydown', esc)
        form.hide();
    }

    $(function(){
        collectionOfUser = new MyCollection('http://localhost:3000/user');
        createActionButtons();         
        collectionOfUser.load(
            function (data){
                createForm();
                createTable(data);
            }
        );
        
    });
})(jQuery); 