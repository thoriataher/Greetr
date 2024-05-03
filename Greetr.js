;(function (global, $) {
    //'new' an object
    var Greetr = function (firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }
    //hidden within scope of the IIFE and never directly accessible
    var supportedLanguages = ['en', 'es'];
    //Informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };
    // formal greetings
    var formalGreetings = {
        en: 'Greetings,',
        es: 'Saludos,'
    };
    //logger messages
    var logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion'
    };
    //prototype holds methos (to save memory space)
    Greetr.prototype = {

        //'this' refer to calling object at execution time
        fullName: function () {
            return this.firstName + ' ' + this.lastName;
        },
        validate: function () {
            //check that is the entered language is valid
            //references the externally inaccessible 'supportedLanguage' within the closure
            if (supportedLanguages.indexOf(this.language) === -1) {
                throw "Invalid Language";
            }
        },
        greeting: function () {
            //retrieve message from object by referring to properties using[] sytax
            return greetings[this.language] + ' ' + this.firstName + "!";
        },
        formalGreeting: function () {
            return formalGreetings[this.language] + ' ' + this.fullName();
        },
        //chaniable methods return their own containing object
        greet: function (formal) {
            var msg;
            //if it undefined or null it will be coerced to 'false
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }
            // 'this' refers to the calling object at the execution time
            return this;
        },
        log: function () {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            //make chainable
            return this;
        },
        setLang: function (lang) {
            //set the language
            this.language = lang;
            //validate
            this.validate();
            //make chainable
            return this;
        },
        //use jQuery to display message by selector
        HTMLGreeting: function (selector, formal) {
            //check if jQuery exist
            if (!$) {
                throw "jQuery not loaded";
            }
            //check if the selector is not exist
            if (!selector) {
                throw "Missing jQuery selector";
            }
            //determine the messages
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            } else {
                this.greeting();
            }
            $(selector).html(msg);

            return this;
        }
    };

    //the actual object is created here, allowing us to 'new' object without calling 'new'
    Greetr.init = function (firstName, lastName, language) {
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
    }
    //Expose my library
    //trick borrowed from jQuery so we don't have to use the 'new' keyword everytime
    Greetr.init.prototype = Greetr.prototype;
    //atach our Greetr to the global object, and provide a shorthand '$G' easy to use
    global.Greetr = global.G$ = Greetr;
}(window, jQuery));