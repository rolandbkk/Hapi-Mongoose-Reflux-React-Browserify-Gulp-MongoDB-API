exports.index = {
    auth: {
        mode: 'try',
        strategy: 'session'
    },
    handler: function (request, reply) {

        if (request.auth.isAuthenticated) {
            // The user is already logged in, redirect it to the hideout
           var data =
        ' <html><head><meta charSet="utf-8"></meta><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta><title>Todo App</title>'+
       '  <link href="css/bootstrap.min.css" rel="stylesheet"></link>'+
      '  <link href="css/full-width-pics.css" rel="stylesheet"></link>'+
     ' </head>'+
     ' <body >'+
     ' <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">' +
       ' <div class="container">' +
           ' <!-- Brand and toggle get grouped for better mobile display -->' +
          '  <div class="navbar-header">' +
             '   <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">' +
               '     <span class="sr-only">Toggle navigation</span>' +
                '    <span class="icon-bar"></span>' +
                '    <span class="icon-bar"></span>' +
                '    <span class="icon-bar"></span>' +
              '  </button>' +
              '  <a class="navbar-brand" href="#"><img class="light" src="https://taskworld.com/wp-content/uploads/2015/05/twlogo.png" alt="Logo" style="height: 100%;float: left;"> <span style="float: left; margin-left: 40px;margin-top: 2px;">Testwork Roland Wagner<span></span></span></a>' +
         '   </div>' +
         '   <!-- Collect the nav links, forms, and other content for toggling -->' +
           ' <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
            '    <ul class="nav navbar-nav pull-right">' +
             '       <li>' +
             '           <a href="/">Home</a>' +
                 '   </li>' +
       
                 '   <li>' +
                  '      <a href="/todo">To Do List</a>' +
               '     </li>' +
                     '   <li>' +
                 '       <a href="/logout">Logout</a>' +
                '    </li>' +
             '   </ul>' +
           ' </div>' +
          '  <!-- /.navbar-collapse -->' +
     '   </div>' +
    '    <!-- /.container -->' +
 '   </nav>' +
  '  <!-- Full Width Image Header with Logo -->' +
 '   <!-- Image backgrounds are set within the full-width-pics.css file. -->' +
 '   <header class="image-bg-fluid-height">' +
 '   </header>'+
       '   <!-- Content Section -->' +
   ' <section>' +
     '   <div class="container">' +
          '  <div class="row">' +
              '  <div class="col-lg-12">' +
              ' <h1> Home </h1>' +
      '   <p> Welcome ' + request.auth.credentials.email + '</p>'+
   ' <footer id="info">' +
  
  '  </footer>' +  
          '      </div>' +
         '   </div>' +
      '  </div>' +
  '  </section>' +
  '  <aside class="image-bg-fixed-height"></aside>' +
 '   <footer>' +
   '     <div class="container">' +
    '        <div class="row">' +
               '  <div class="col-lg-12">' +
          '        <p>Node + Hapi + Mongoose + Reflux + React + Browserify + Gulp + MongoDB API</p>' +
            '    </div>' +
           ' </div>' +     
       ' </div>' +
   ' </footer>' +

    '  </body>'+
   '   </html>' ;

        return reply(data);
        }

        var data =
        ' <html><head><meta charSet="utf-8"></meta><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta><title>Todo App</title>'+
       '  <link href="css/bootstrap.min.css" rel="stylesheet"></link>'+
      '  <link href="css/full-width-pics.css" rel="stylesheet"></link>'+
     ' </head>'+
     ' <body >'+
     ' <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">' +
       ' <div class="container">' +
           ' <!-- Brand and toggle get grouped for better mobile display -->' +
          '  <div class="navbar-header">' +
             '   <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">' +
               '     <span class="sr-only">Toggle navigation</span>' +
                '    <span class="icon-bar"></span>' +
                '    <span class="icon-bar"></span>' +
                '    <span class="icon-bar"></span>' +
              '  </button>' +
              '  <a class="navbar-brand" href="#"><img class="light" src="https://taskworld.com/wp-content/uploads/2015/05/twlogo.png" alt="Logo" style="height: 100%;float: left;"> <span style="float: left; margin-left: 40px;margin-top: 2px;">Testwork Roland Wagner<span></span></span></a>' +
         '   </div>' +
         '   <!-- Collect the nav links, forms, and other content for toggling -->' +
           ' <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
            '    <ul class="nav navbar-nav pull-right">' +
             '       <li>' +
             '           <a href="/">Home</a>' +
                 '   </li>' +
       
                 '   <li>' +
                  '      <a href="/register">Register</a>' +
               '     </li>' +
                     '   <li>' +
                 '       <a href="/login">Login</a>' +
                '    </li>' +
             '   </ul>' +
           ' </div>' +
          '  <!-- /.navbar-collapse -->' +
     '   </div>' +
    '    <!-- /.container -->' +
 '   </nav>' +
  '  <!-- Full Width Image Header with Logo -->' +
 '   <!-- Image backgrounds are set within the full-width-pics.css file. -->' +
 '   <header class="image-bg-fluid-height">' +
 '   </header>'+
       '   <!-- Content Section -->' +
   ' <section>' +
     '   <div class="container">' +
          '  <div class="row">' +
              '  <div class="col-lg-12">' +
              ' <h1> Welcome </h1>' +
       '<p>  <a class="link link--ilin" href="login"><span>Log</span><span>In</span></a> <a class="link link--ilin" href="register"><span>Sign</span><span>Up</span></a> </p>'+
   ' <footer id="info">' +
  
  '  </footer>' +  
          '      </div>' +
         '   </div>' +
      '  </div>' +
  '  </section>' +
  '  <aside class="image-bg-fixed-height"></aside>' +
 '   <footer>' +
   '     <div class="container">' +
    '        <div class="row">' +
               '  <div class="col-lg-12">' +
          '        <p>Node + Hapi + Mongoose + Reflux + React + Browserify + Gulp + MongoDB API</p>' +
            '    </div>' +
           ' </div>' +     
       ' </div>' +
   ' </footer>' +

    '  </body>'+
   '   </html>' ;

        return reply(data);
    }
};

/**
 * Handles a call to /login and shows a login form
 */
exports.login = {
    auth: {
        mode: 'try',
        strategy: 'session'
    },
    handler: function (request, reply) {

        if (request.auth.isAuthenticated) {
            // The user is already logged in, redirect it to the hideout
            return reply.redirect('/todo');
        }

        var form =
         ' <html><head><meta charSet="utf-8"></meta><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta><title>Todo App</title>'+
   '  <link href="css/bootstrap.min.css" rel="stylesheet"></link>'+
      '  <link href="css/full-width-pics.css" rel="stylesheet"></link>'+
     ' </head>'+
     ' <body >'+
     ' <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">' +
       ' <div class="container">' +
           ' <!-- Brand and toggle get grouped for better mobile display -->' +
          '  <div class="navbar-header">' +
             '   <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">' +
               '     <span class="sr-only">Toggle navigation</span>' +
                '    <span class="icon-bar"></span>' +
                '    <span class="icon-bar"></span>' +
                '    <span class="icon-bar"></span>' +
              '  </button>' +
              '  <a class="navbar-brand" href="#"><img class="light" src="https://taskworld.com/wp-content/uploads/2015/05/twlogo.png" alt="Logo" style="height: 100%;float: left;"> <span style="float: left; margin-left: 40px;margin-top: 2px;">Testwork Roland Wagner<span></span></span></a>' +
         '   </div>' +
         '   <!-- Collect the nav links, forms, and other content for toggling -->' +
           ' <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
            '    <ul class="nav navbar-nav pull-right">' +
             '       <li>' +
             '           <a href="/">Home</a>' +
                 '   </li>' +
           
                 '   <li>' +
                  '      <a href="/register">Register</a>' +
               '     </li>' +
               '   <li>' +
                 '       <a href="/login">Login</a>' +
                '    </li>' +
             '   </ul>' +
           ' </div>' +
          '  <!-- /.navbar-collapse -->' +
     '   </div>' +
    '    <!-- /.container -->' +
 '   </nav>' +
  '  <!-- Full Width Image Header with Logo -->' +
 '   <!-- Image backgrounds are set within the full-width-pics.css file. -->' +
 '   <header class="image-bg-fluid-height">' +
 '   </header>'+
       '   <!-- Content Section -->' +
   ' <section>' +
     '   <div class="container">' +
          '  <div class="row">' +
              '  <div class="col-lg-12">' +
        '<h1> Login </h1>' +
        '<form method="post" action="login">' +
        '   <p><input type="text"     name="email"    value="" placeholder="E-mail"></p>' +
        '   <p><input type="password" name="password" value="" placeholder="Password"></p>' +
        '   <p><input type="submit"   value="Login"></p>' +
        '</form>'+
          '      </div>' +
         '   </div>' +
      '  </div>' +
  '  </section>' +
  '  <aside class="image-bg-fixed-height"></aside>' +
 '   <footer>' +
   '     <div class="container">' +
    '        <div class="row">' +
               '  <div class="col-lg-12">' +
             '        <p>Node + Hapi + Mongoose + Reflux + React + Browserify + Gulp + MongoDB API</p>' +
            '    </div>' +
           ' </div>' +     
       ' </div>' +
   ' </footer>' +

    '  </body>'+
   '   </html>' ;

        return reply(form);
    }
};

/**
 * Handles a call to /register and shows a registration form
 */
exports.register = {
    auth: {
        mode: 'try',
        strategy: 'session'
    },
    handler: function (request, reply) {
        
        if (request.auth.isAuthenticated) {
            // The user is already logged in, redirect it to the hideout
            return reply.redirect('/todo');
        }

        var form =
             ' <html><head><meta charSet="utf-8"></meta><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta><title>Todo App</title>'+
   '  <link href="css/bootstrap.min.css" rel="stylesheet"></link>'+
      '  <link href="css/full-width-pics.css" rel="stylesheet"></link>'+

     ' </head>'+
     ' <body >'+
     ' <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">' +
       ' <div class="container">' +
           ' <!-- Brand and toggle get grouped for better mobile display -->' +
          '  <div class="navbar-header">' +
             '   <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">' +
               '     <span class="sr-only">Toggle navigation</span>' +
                '    <span class="icon-bar"></span>' +
                '    <span class="icon-bar"></span>' +
                '    <span class="icon-bar"></span>' +
              '  </button>' +
              '  <a class="navbar-brand" href="#"><img class="light" src="https://taskworld.com/wp-content/uploads/2015/05/twlogo.png" alt="Logo" style="height: 100%;float: left;"> <span style="float: left; margin-left: 40px;margin-top: 2px;">Testwork Roland Wagner<span></span></span></a>' +
         '   </div>' +
         '   <!-- Collect the nav links, forms, and other content for toggling -->' +
           ' <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
            '    <ul class="nav navbar-nav pull-right">' +
             '       <li>' +
             '           <a href="/">Home</a>' +
                 '   </li>' +
          
                 '   <li>' +
                  '      <a href="/register">Register</a>' +
               '     </li>' +
           
                  '   <li>' +
                 '       <a href="/login">Login</a>' +
                '    </li>' +
             '   </ul>' +
           ' </div>' +
          '  <!-- /.navbar-collapse -->' +
     '   </div>' +
    '    <!-- /.container -->' +
 '   </nav>' +
  '  <!-- Full Width Image Header with Logo -->' +
 '   <!-- Image backgrounds are set within the full-width-pics.css file. -->' +
 '   <header class="image-bg-fluid-height">' +
 '   </header>'+
       '   <!-- Content Section -->' +
   ' <section>' +
     '   <div class="container">' +
          '  <div class="row">' +
              '  <div class="col-lg-12">' +
        '<h1> Register </h1>' +
        '<form method="post" action="register">' +
        '   <p><input type="text"     name="email"    value="" placeholder="E-mail"></p>' +
        '   <p><input type="password" name="password" value="" placeholder="Password"></p>' +
        '   <p><input type="submit"   value="Register"></p>' +
        '</form>'+
          '      </div>' +
         '   </div>' +
      '  </div>' +
  '  </section>' +
  '  <aside class="image-bg-fixed-height"></aside>' +
 '   <footer>' +
   '     <div class="container">' +
    '        <div class="row">' +
               '  <div class="col-lg-12">' +
          '        <p>Node + Hapi + Mongoose + Reflux + React + Browserify + Gulp + MongoDB API</p>' +
            '    </div>' +
           ' </div>' +     
       ' </div>' +
   ' </footer>' +

    '  </body>'+
   '   </html>' ;

     

        return reply(form);
    }
};

/**
 * Handles a call to /batmanshideout and shows super secret stuff
 */
exports.secret = {
    auth: 'session',
    handler: function (request, reply) {
        var data =
            ' <html><head><meta charSet="utf-8"></meta><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta><title>Todo App</title>'+
       '  <link href="css/bootstrap.min.css" rel="stylesheet"></link>'+
      '  <link href="css/full-width-pics.css" rel="stylesheet"></link>'+
       '  <link href="css/min/main.css" rel="stylesheet"></link>'+
     ' </head>'+
     ' <body >'+
     ' <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">' +
       ' <div class="container">' +
           ' <!-- Brand and toggle get grouped for better mobile display -->' +
          '  <div class="navbar-header">' +
             '   <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">' +
               '     <span class="sr-only">Toggle navigation</span>' +
                '    <span class="icon-bar"></span>' +
                '    <span class="icon-bar"></span>' +
                '    <span class="icon-bar"></span>' +
              '  </button>' +
              '  <a class="navbar-brand" href="#"><img class="light" src="https://taskworld.com/wp-content/uploads/2015/05/twlogo.png" alt="Logo" style="height: 100%;float: left;"> <span style="float: left; margin-left: 40px;margin-top: 2px;">Testwork Roland Wagner<span></span></span></a>' +
         '   </div>' +
         '   <!-- Collect the nav links, forms, and other content for toggling -->' +
           ' <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">' +
            '    <ul class="nav navbar-nav pull-right">' +
             '       <li>' +
             '           <a href="/">Home</a>' +
                 '   </li>' +
                     '   <li>' +
                  '      <a href="/todo">To Do List</a>' +
               '     </li>' +
         
                 '   <li>' +
                 '       <a href="/logout">Logout</a>' +
                '    </li>' +
             '   </ul>' +
           ' </div>' +
          '  <!-- /.navbar-collapse -->' +
     '   </div>' +
    '    <!-- /.container -->' +
 '   </nav>' +
  '  <!-- Full Width Image Header with Logo -->' +
 '   <!-- Image backgrounds are set within the full-width-pics.css file. -->' +
 '   <header class="image-bg-fluid-height">' +
 '   </header>'+
       '   <!-- Content Section -->' +
   ' <section>' +
     '   <div class="container">' +
          '  <div class="row">' +
              '  <div class="col-lg-12"> ' +
        ' <section id="todoapp"> '+
      '    </section>'+
         ' <footer id="info">' +
         '<p>Double-click to edit a todo</p>' +
   '  </footer>' +
          '      </div>' +
         '   </div>' +
      '  </div>' +
  '  </section>' +
  '  <aside class="image-bg-fixed-height"></aside>' +
 '   <footer>' +
   '     <div class="container">' +
    '        <div class="row">' +
               '  <div class="col-lg-12">' +
            '        <p>Node + Hapi + Mongoose + Reflux + React + Browserify + Gulp + MongoDB API</p>' +
            '    </div>' +
           ' </div>' +     
       ' </div>' +
   ' </footer>' +

    '  </body>'+
      '   <script src="js/libs.js"></script>'+
  '   <script src="js/main.js"></script>'+
   '   </html>' ;
       

        return reply(data);
    }
};