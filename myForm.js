(function(){

    function MyForm(tString, obj)
    {
        this.templateForm = tString;
        this.obj = obj;
        this.form = template(this.templateForm, this.obj);

        this.addButton = function(arrayButton, placeForButton){
            var that = this;
            arrayButton.forEach(function(elem){
                var button = $('<button></button>').attr({
                    'id' : elem.id,
                    'class' : elem.class
                });
                button.text(elem.name);
                button.on('click', elem.action);
                placeForButton.append(button);
            });
        }

        this.show = function(speed){
            this.form.show(speed);
            ((this.form.find('input'))[0]).focus();
            ((this.form.find('input'))[0]).select();
        }
        this.hide = function(){
            this.form.hide();
            this.form.find('input').val('');
        }

        this.appendForm = function(inElement, arrayButton, placeForButton){
            inElement.append(this.form);
            this.hide();
            this.addButton(arrayButton, this.form.find(placeForButton));
        }

        this.getValueForm = function(){
            var user = {};
            this.form.find('input').each(
                function(item){
                    user[$(this).attr('name')] = $(this).val();
                }
            )
            return user;
        }

        this.setValueForm = function(obj){
            for (key in obj){
               this.form.find('input[name = "' + key + '"]').val(obj[key]);
            }
        }
    }

   
    var addForm = new MyForm(tNewForm);
    var updateForm = new MyForm(tNewForm);

    window.MyForm = MyForm;
    window.addForm = addForm;
    window.updateForm = updateForm;

}());



