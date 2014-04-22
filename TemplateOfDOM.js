var tActionButtons = '<button id="addUser"  class="btn btn-primary">Add new User</button>'+
                         '<button id="editUser" class="btn btn-primary">Edit User</button>'+
                         '<button id="delUser" class="btn btn-primary">Delete User</button>',

        tColumOfTable = '<td id = "_id"><div>{{_id}}</div></td>'+
                            '<td id = "name"><div>{{name}}</div></td>'+
                            '<td id = "age"><div>{{age}}</div></td>'+
                            '<td id = "workPlace"><div>{{workPlace}}</div></td>'+
                            '<td id = "addres"><div>{{addres}}</div></td>'+
                            '<td id = "tel"><div>{{tel}}</div></td>'+
                            '<td id = "skype"><div>{{skype}}</div></td>'+
                            '<td id = "email"><div>{{email}}</div></td>',

        tFirstRow = ' <tr>'+
                            '<td><div>Id</div></td>'+
                            '<td><div>Full Name</div></td>'+
                            '<td><div>Age</div></td>'+
                            '<td><div>Work Place</div></td>'+
                            '<td><div>Addres</div></td>'+
                            '<td><div>Phone</div></td>'+
                            '<td><div>Skype</div></td>'+
                            '<td><div>E-mail</div></td>'+
                        '</tr>',

        tForm  ='<div id = "parentForm"></div>'+
                        '<div id = "form">'+
                            '<form>'+
                                '<label class = "nameOfRow">Your full name : </label>' +
                                '<input class = "form-control"  type="text" name = "name"  required = "true"></input>' + 

                                '<label class = "nameOfRow">Your age : </label>' +
                                '<input class = "form-control" type="number" name = "age"></input>' + 

                                '<label class = "nameOfRow">Your work place : </label>' +
                                '<input class = "form-control" type="text" name = "workPlace"></input>' + 

                                '<label class = "nameOfRow">Your addres : </label>' +
                                '<input class = "form-control" type="text" name = "addres"></input>' + 

                                '<label class = "nameOfRow">Your phone : </label>' +
                                '<input class = "form-control" type="number" name = "tel" required = "true"></input>' + 

                                '<label class = "nameOfRow">Your skype : </label>' +
                                '<input class = "form-control" type="text" name = "skype"></input>' + 

                                '<label class = "nameOfRow">Your email : </label>' +
                                '<input class = "form-control" type="email" name = "email"  required = "true"></input>' + 

                                '<button id = "buttonEnter" class="btn btn-primary"></button>'+
                                '<button id = "buttonEsc" class="btn btn-primary">Cancel</button>'+
                            '</form>'+
                        '</div>',

        tAlertForm ='<div id="parentAlertForm"></div>'+
                        '<div id="alertForm">'+
                            '<div> {{text}} </div>'+
                            '<button id="buttonOk" class="btn btn-primary">Ok</button>'+
                        '</div>';


