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

    function createActionButtons(){
        var actionButtons = template(tActionButtons);
        $('#actionButtons').append(actionButtons);
        $('#addUser').on('click', function(){
            addForm.show(300);
        });
        $('#editUser').on('click', function(){
            if(userId){
                updateForm.setValueForm(
                    collectionOfUser.getElementById(userId)
                );
                updateForm.show(300);
            }
            else{
                warningForm.show(300);
            }
        });
        $('#delUser').on('click', function(){
            if(userId){
                updateForm.setValueForm(
                    collectionOfUser.getElementById(userId)
                );
                confirmForm.show(300);
            }
            else{
                warningForm.show(300);
            }
        });
    }

    function createNewRow(obj){
        var row = $('<tr></tr>').attr({
            'data-id' : obj._id
        })
        var colums = template(tColumOfTable, obj);
        row.append(colums);
        row.on('click', select);
        return row;
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
    }


    function createUser(e){
        var val = addForm.form.find('#myForm').valid();
        if(val){
            var user = addForm.getValueForm();
            e.preventDefault();
            collectionOfUser.create(
                user,
                function(newUser){
                   var row = createNewRow(JSON.parse(newUser));
                    $('#db').append(row);
                    addForm.hide();
                },
                error
            );   
         }
    }

    function updateUser(e){
        var user = updateForm.getValueForm();
        user["_id"] = userId;
        var val = updateForm.form.find('#myForm').valid();
        if(val){
            e.preventDefault();
            collectionOfUser.update(
                user,
                function(newUser){
                    $('tr[data-id='+userId +']').html('').html(template(tColumOfTable, JSON.parse(newUser)))
                    $('tr[data-id='+userId +']').on('click', select);
                    updateForm.hide();
                },
                error
            );  
        }
    }

    function deleteUser(){
        var user = collectionOfUser.getElementById(userId);
        collectionOfUser.remove(
            user,
            function(){
                $('tr[data-id='+userId +']').remove();
            },
            error
        )
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


    function createAddForm(){
        addForm.appendForm(
            $('#wrraper'),
            [
                {
                    id : 'add',
                    class : 'btn btn-primary',
                    name : 'Add',
                    action : createUser
                },
                {
                    id : 'cancel',
                    class : 'btn btn-primary',
                    name : 'Cancel',
                    action : function(e){e.preventDefault();addForm.hide();}
                }
            ],
            '#myForm'
        );
        validation();
    }

    function createUpdateForm(){
        updateForm.appendForm(
            $('#wrraper'),
            [
                {
                    id : 'update',
                    class : 'btn btn-primary',
                    name : 'Update',
                    action : updateUser
                },
                {
                    id : 'esc',
                    class : 'btn btn-primary',
                    name : 'Cancel',
                    action : function(e){e.preventDefault();updateForm.hide();}
                }
            ],
            '#myForm'
        );
        validation();
    }

    function createConfirmForm(){
        confirmForm.appendForm(
            $('#wrraper'),
            [
                {
                    id : 'yes',
                    class : 'btn btn-primary',
                    name : 'Yes',
                    action : deleteUser
                },
                {
                    id : 'no',
                    class : 'btn btn-primary',
                    name : 'No',
                    action : function(e){e.preventDefault();confirmForm.hide();}
                }
            ],
            'div'
        );
    }

    function createWarningForm(){
        warningForm.appendForm(
            $('#wrraper'),
            [
                {
                    id : 'ok',
                    class : 'btn btn-primary',
                    name : 'Ok',
                    action : function(e){e.preventDefault();warningForm.hide();}
                }
            ],
            'div'
        );
    }

    function createAllForm(){
        createAddForm();
        createUpdateForm();
        createConfirmForm();
        createWarningForm();  
    }

    $(function(){
        collectionOfUser = new MyCollection('http://localhost:3000/user');

        var addForm = new MyForm( tNewForm ),
            updateForm = new MyForm( tNewForm ),
            confirmForm = new MyForm( tConfirmForm ),
            warningForm = new MyForm( tAlertForm );


        createActionButtons(); 
        collectionOfUser.load(
            function (data){
                createTable(data);
            }
        );       
    });
})(jQuery); 