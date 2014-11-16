requirejs.config({
    paths: {
        main: 'main',
        jquery: 'lib/jquery-2.1.1.min',
        //hammer: 'lib/hammer.min',
        Q: 'lib/q'
    }
});

requirejs(['main']);