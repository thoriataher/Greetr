//gets a new object(the architcure allow us to not have to use the 'new' keyword here)
var g = G$('John', "Doe");
//use chainable methods
g.greet().setLang('es').greet(true).log();

//use our object on the click of the login button
$('#login').click(function(){
    //create a new 'Greetr' object
    var loginGrtr = G$('John', 'Doe');
    //hide the login on the screen
    $('#logindiv').hide();

    //HTML greeting, passing the '#greeting' as the selector, and the chosen language and log the welcome
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
})