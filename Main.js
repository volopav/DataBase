(function($, undefined){
    var collectionOfUser, userId, form, addForm, updateForm, confirmForm, warningForm, loginForm,
        admin = {
            name : 'Rostyslav Paslavskyy',
            login : 'admin',
            password : 'admin',
            workPlace : 'SoftServe',
            addres : 'Lviv ',
            tel : '0992363934',
            skype : 'S-a-c-h-o-k1',
            email : 'pas.ros.bor@gmail.com',
            logged :false,
        };

    /**
    * Called in case of error during request to the server.
    * @param {String} text. String for display.
    */   
    function error(text){
        console.log('Error is :' + text);
    }

    /**
    * Create buttons : 'Add', 'Update', 'Delete' .
    * Set him function for create new user, update selected user, delete selected user
    */
    function createActionButtons(){
        var actionButtons = template(tActionButtons);
        $('#actionButtons').append(actionButtons);
        $('#addUser').on('click', function(){
            if(!addForm.form.find('button').length){
                createAddForm();
            }
            addForm.show(300);
        });
        $('#editUser').on('click', function(){
            if(!updateForm.form.find('button').length){
                createUpdateForm();
            }
            if(userId){
                updateForm.setValueForm(
                    collectionOfUser.getElementById(userId)
                );
                updateForm.show(300);
            }
            else{
                if(!warningForm.form.find('button').length){
                    createWarningForm();
                }
                warningForm.show(300);
            }
        });
        $('#delUser').on('click', function(){
            if(userId){
                updateForm.setValueForm(
                    collectionOfUser.getElementById(userId)
                );
                if(!confirmForm.form.find('button').length){
                    createConfirmForm();
                }
                confirmForm.show(300);
            }
            else{
                warningForm.show(300);
            }
        });
        $('#loggedOut').on('click', logout);
    }

    /**
    * Create new row in table whicj contains a tade of user
    * @param {Object} obj. Object which contains property of user.
    * {name, age, workPlace, addres, tel, skype, email}
    */
    function createNewRow(obj){
        var row = $('<tr></tr>').attr({
            'data-id' : obj._id
        })
        var colums = template(tColumOfTable, obj);
        row.append(colums);
        row.on('click', select);
        return row;
    }

    /**
    * Create table which display all date about user. 
    * @param {Array} array. Collection of users.
    */
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

    /**
    * Create new user and display him
    */
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

    /**
    * Update user and display him instead old.
    */
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

    /**
    * Delete selected user.
    */
    function deleteUser(){
        var user = collectionOfUser.getElementById(userId);
        collectionOfUser.remove(
            user,
            function(){
                $('tr[data-id='+userId +']').remove();
                confirmForm.hide();
            },
            error
        )
    }

    /**
    * log out the user and give him status logged= false, hide all date show login form.
    */
    function logout(){
        for (var i = 0 ; i < collectionOfUser.collection.length; i++){
                if(collectionOfUser.collection[i].logged === true){
                    collectionOfUser.collection[i].logged = false;
                    collectionOfUser.update(
                        collectionOfUser.collection[i],
                        function(){
                            $('#actionButtons').html('');
                            $('#dbOfUser').html('');
                            loginForm.show();
                        },
                        error
                    );
                }
            }
    }

    /**
    * check if someone of users is login 
    */
    function isLogged (){
        var islogged = false;
       for (var i = 0 ; i < collectionOfUser.collection.length; i++){
            if(collectionOfUser.collection[i].logged === true){
                islogged = true;
            }
       }
       return islogged;
    }

    /**
    * checking if login and password is exist and do some action
    */
    function checkPassword(e){
        var userName = loginForm.form.find('input[name="login"]').val(),
            password = loginForm.form.find('input[name="password"]').val(),
            users = collectionOfUser.getFilteredCollection({login : userName}),
            successfully = true;

        for (var i = 0; i < users.length; i++){
            if(users[i].password = password){
                e.preventDefault();
                if(users[i].login === 'admin'){
                    createActionButtons(); 
                    createTable(collectionOfUser.collection);
                }
                else{
                    var button = $('<button></buttton>').attr({
                        'id' : 'logout',
                        'class' : 'btn btn-primary'
                    });
                    button.text('Logged out');
                    button.on('click', logout);
                    $('#actionButtons').append(button);
                    createTable(users);
                }
                successfully = false;
                users[i].logged = true;
                collectionOfUser.update(
                    users[i],
                    function(){},
                    error
                );
            }
        } 

        if(successfully){
            loginForm.form.find('#form').text('incorrectly entered password or login');
        }

        loginForm.hide();
    }
    /**
    * Selected user from the list
    */
    function select(e){
        if(userId){
            $('tr[data-id='+ userId +']').css('background', 'none');
        }
        $('tr[data-id='+ e.currentTarget.getAttribute('data-id') +']').css('background', '#999');
        userId = e.currentTarget.getAttribute('data-id');
    }

    /**
    * Set validation rules and  messages
    */
    function validation(forma){
        forma.find("#myForm").validate({
            rules : {
                name : {
                    required : true,
                    minlength : 4,  
                },
                password: { 
                    required: true,
                    minlength: 5,
                }, 
                c_password: { 
                    required: true, 
                    equalTo:  forma.find("#password"), 
                    minlength: 5,
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
                password: { 
                    required: "This field is required",
                    minlength: "Minimum length of password is five characters",
                },
                c_password: { 
                    required: "This field is required",
                    equalTo: "Your passwords do not match",
                    minlength: "Minimum length of password is five characters",
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

    /**
    * Create form for add user
    */
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
                    action : function(e){
                        e.preventDefault();
                        addForm.hide();
                    }
                }
            ],
            '#myForm'
        );
        validation(addForm.form);
    }

    /**
    * Create form for update selected user
    */
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
                    action : function(e){
                        e.preventDefault();
                        updateForm.hide();
                    }
                }
            ],
            '#myForm'
        );
        validation(updateForm.form);
    }

    /**
    * create form for confirm delete user
    */
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
                    action : function(e){
                        e.preventDefault();
                        confirmForm.hide();
                    }
                }
            ],
            'div'
        );
    }

    /**
    * Create form for warning
    */
    function createWarningForm(){
        warningForm.appendForm(
            $('#wrraper'),
            [
                {
                    id : 'ok',
                    class : 'btn btn-primary',
                    name : 'Ok',
                    action : function(e){
                        e.preventDefault();
                        warningForm.hide();
                    }
                }
            ],
            'div'
        );
    }
    /**
    * Create form for login
    */
    function createLoginForm(){
        loginForm.appendForm(
            $('#wrraper'),
            [
                {
                    id : 'login',
                    class : 'btn btn-primary',
                    name : 'Login',
                    action : checkPassword
                },
                {
                    id : 'don"tLogin',
                    class : 'btn btn-primary',
                    name : 'Cancel',
                    action : function(e){
                        e.preventDefault();
                        loginForm.hide();
                    }
                }
            ],
            '#myForm'
        );
        validation(loginForm.form);
    }

    /**
    * set forms and display date from server
    */
    $(function(){
        collectionOfUser = new MyCollection('http://localhost:3000/user');
        addForm = new MyForm( tNewForm );
        updateForm = new MyForm( tNewForm );
        confirmForm = new MyForm( tConfirmForm );
        warningForm = new MyForm( tAlertForm );
        loginForm = new MyForm( tLoginForm );
        collectionOfUser.load(
            function(data){
                console.log('All data from the server successfully loaded');
                if(isLogged()){
                    createActionButtons();
                    createTable(data);
                }
                else{
                    var adminCreated = collectionOfUser.getFilteredCollection(admin);
                    if(adminCreated.length === 0){
                        collectionOfUser.create(
                            admin,
                            function(){
                                console.log('Admin user created successfully');
                                adminCreated = false;
                            },
                            error
                        ); 
                    }
                    if(!(isLogged())){
                        createLoginForm();
                        loginForm.show();  
                    } 
                }
            }
        );  
    });
})(jQuery); 