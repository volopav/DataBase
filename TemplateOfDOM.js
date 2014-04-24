/**
* templaet for create buttons
*/
var tActionButtons = '<button id="addUser"  class="btn btn-primary">Add new User</button>'+
                         '<button id="editUser" class="btn btn-primary">Edit User</button>'+
                         '<button id="delUser" class="btn btn-primary">Delete User</button>',

/**
* templaet for create colums with date in row of table
*/
        tColumOfTable = '<td id = "name"><div>{{name}}</div></td>'+
                            '<td id = "age"><div>{{age}}</div></td>'+
                            '<td id = "workPlace"><div>{{workPlace}}</div></td>'+
                            '<td id = "addres"><div>{{addres}}</div></td>'+
                            '<td id = "tel"><div>{{tel}}</div></td>'+
                            '<td id = "skype"><div>{{skype}}</div></td>'+
                            '<td id = "email"><div>{{email}}</div></td>',

/**
* templaet for create names of colums
*/
        tFirstRow = ' <tr>'+
                            '<td><div>Full Name</div></td>'+
                            '<td><div>Age</div></td>'+
                            '<td><div>Work Place</div></td>'+
                            '<td><div>Addres</div></td>'+
                            '<td><div>Phone</div></td>'+
                            '<td><div>Skype</div></td>'+
                            '<td><div>E-mail</div></td>'+
                        '</tr>',

/**
* templaet for create warning form
*/
        tAlertForm ='<div id="parentAlertForm" class = "parentForm"></div>'+
                        '<div id="alertForm" class = "form">'+
                            '<div>Please select a user from the list<br></div>'+
                        '</div>',

/**
* templaet for create confirm form
*/
        tConfirmForm = '<div id="confirmParentForm" class = "parentForm"></div>'+
                        '<div id="confirmForm" class = "form">'+
                            '<div> You really want to remove this user from the list?<br></div>'+
                        '</div>',

/**
* templaet for create add and update form
*/
         tNewForm  = '<div id = "parentForm" class = "parentForm"></div>'+
                        '<div id = "form" class = "form">'+
                            '<form id = "myForm">'+
                                '<label class = "nameOfRow">Your full name  </label>' +
                                '<input class = "form-control"  type="text" name = "name" required = "true"></input>' + 

                                '<label class = "nameOfRow">Your age : </label>' +
                                '<input class = "form-control" type="number" name = "age"></input>' + 

                                '<label class = "nameOfRow">Your work place : </label>' +
                                '<input class = "form-control" type="text" name = "workPlace"></input>' + 

                                '<label class = "nameOfRow">Your addres : </label>' +
                                '<input class = "form-control" type="text" name = "addres"></input>' + 

                                '<label class = "nameOfRow">Your phone : </label>' +
                                '<input class = "form-control" type="number" name = "tel"></input>' + 

                                '<label class = "nameOfRow">Your skype : </label>' +
                                '<input class = "form-control" type="text" name = "skype"></input>' + 

                                '<label class = "nameOfRow">Your email : </label>' +
                                '<input class = "form-control" type="email" name = "email"></input>' + 

                            '</form>'+
                        '</div>';
