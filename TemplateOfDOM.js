var tActionButtons = '<button id="addHuman" class="actionButton">Add new human</button>'+
                         '<button id="editHuman" class="actionButton">Edit human</button>'+
                         '<button id="delHuman" class="actionButton">Delete human</button>',

        tRowOfTable = ' <tr data-id = "{{_id}}">'+
                            '<td id = "_id"><div>{{_id}}</div></td>'+
                            '<td id = "name"><div>{{name}}</div></td>'+
                            '<td id = "age"><div>{{age}}</div></td>'+
                            '<td id = "workPlace"><div>{{workPlace}}</div></td>'+
                            '<td id = "addres"><div>{{addres}}</div></td>'+
                            '<td id = "tel"><div>{{tel}}</div></td>'+
                            '<td id = "skype"><div>{{skype}}</div></td>'+
                            '<td id = "email"><div>{{email}}</div></td>'+
                        '</tr>',

        tFirstRow = ' <tr class = "firstRow">'+
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
                        '<div id="form" style="display: block;">'+
                            '<div id = "row1">' +
                                '<div class = "nameOfRow">Your full name : </div>' +
                                '<input id = "yourFullName" class="input" type="text"></input>' + 
                            '</div>'+

                            '<div id = "row2">' +
                                '<div  class = "nameOfRow">Your age : </div>' +
                                '<input id = "yourAge" class="input" type="text"></input>' + 
                            '</div>'+

                            '<div id = "row3">' +
                                '<div  class = "nameOfRow">Your work place : </div>' +
                                '<input id = "yourWorkPlace" class="input" type="text"></input>' + 
                            '</div>'+

                            '<div id = "row4">' +
                                '<div  class = "nameOfRow">Your addres : </div>' +
                                '<input id = "yourAddres" class="input" type="text"></input>' + 
                            '</div>'+

                            '<div id = "row5">' +
                                '<div  class = "nameOfRow">Your phone : </div>' +
                                '<input id = "yourPhone" class="input" type="text"></input>' + 
                            '</div>'+

                            '<div id = "row6">' +
                                '<div  class = "nameOfRow">Your skype : </div>' +
                                '<input id = "yourSkype" class="input" type="text"></input>' + 
                            '</div>'+

                            '<div id = "row7">' +
                                '<div  class = "nameOfRow">Your email : </div>' +
                                '<input id = "yourEmail" class="input" type="text"></input>' + 
                            '</div>'+

                            '<button id="buttonEnter" class="button">Add</button>'+
                            '<button id="buttonEsc" class="button">Cancel</button>'+
                        '</div>';


