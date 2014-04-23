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

    function createUser(e){
        var val = valid();
        if(val){
            var user = getDateFromForm();
            e.preventDefault();
           // console.log(e.isDefaultPrevented());
            collectionOfUser.create(
                user,
                function(newUser){
                    showNewRow(JSON.parse(newUser));
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
                    clearForm();
                },
                error
            );  
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
        $('#buttonEsc').on('click', hideForm);
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