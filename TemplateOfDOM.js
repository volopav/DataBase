var tActionButtons = '<button id="addUser"  class="btn btn-primary">Add new User</button>'+
                         '<button id="editUser" class="btn btn-primary">Edit User</button>'+
                         '<button id="delUser" class="btn btn-primary">Delete User</button>',

        tColumOfTable = 
                            '<td id = "_id"><div>{{_id}}</div></td>'+
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

        tForm  =  '<div id="parentForm"></div>'+
                        '<div id="form">'+
                            //'<form>'+
                                '<div id = "row1">' +
                                    '<div class = "nameOfRow">Your full name : </div>' +
                                    '<input id = "yourFullName" class="form-control" type="text"  required = "true"></input>' + 
                                '</div>'+

                                '<div id = "row2">' +
                                    '<div  class = "nameOfRow">Your age : </div>' +
                                    '<input id = "yourAge" class="form-control" type="number"></input>' + 
                                '</div>'+

                                '<div id = "row3">' +
                                    '<div  class = "nameOfRow">Your work place : </div>' +
                                    '<input id = "yourWorkPlace" class="form-control" type="text"></input>' + 
                                '</div>'+

                                '<div id = "row4">' +
                                    '<div  class = "nameOfRow">Your addres : </div>' +
                                    '<input id = "yourAddres" class="form-control" type="text"></input>' + 
                                '</div>'+

                                '<div id = "row5">' +
                                    '<div  class = "nameOfRow">Your phone : </div>' +
                                    '<input id = "yourPhone" class="form-control" type="number"></input>' + 
                                '</div>'+

                                '<div id = "row6">' +
                                    '<div  class = "nameOfRow">Your skype : </div>' +
                                    '<input id = "yourSkype" class="form-control" type="text"></input>' + 
                                '</div>'+

                                '<div id = "row7">' +
                                    '<div  class = "nameOfRow">Your email : </div>' +
                                    '<input id = "yourEmail" class="form-control" type="email" name="email"></input>' + 
                                '</div>'+

                                '<button id="buttonEnter" class="btn btn-primary">{{enter}}</button>'+
                                '<button id="buttonEsc" class="btn btn-primary">{{esc}}</button>'+
                           // '</form>'+
                        '</div>',

        tAlertForm = '<div id="parentAlertForm"></div>'+
                        '<div id="alertForm">'+
                            '<div> {{text}} </div>'+
                            '<button id="buttonOk" class="btn btn-primary">Ok</button>'+
                        '</div>';


