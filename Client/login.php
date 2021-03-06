<?php
require_once(realpath(dirname(__FILE__)). "/General/Session.php");
require_once(realpath(dirname(__FILE__)). "/../API/Config.php");
$session = new Session();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $session->LogIn($_POST['username'], $_POST['password']);
}
?>
<!DOCTYPE html>
<html>

<head>
    <meta name="description" content="Allows students to login into web clicker application">
    <meta name="keywords" content="Login">
    <meta name="author" content="Tyler Fischer">
    <meta charset="UTF-8">
    <title>Web Clicker</title>
    <link rel="stylesheet" href="http://<?PHP echo $_SERVER['SERVER_NAME']. WEB_ROOT . "/Client/Styles/default-theme.css"; ?>">
</head>

<body>

    <?php
        if(isset($_SESSION['message'])) {
    ?>
        <div class="errors">
    <?PHP
            echo $_SESSION['message'];
    ?>
        </div>
    <?PHP
        }
    ?>
    <h1 class="loginheader2">Login</h1>
    <form class="container" action="login.php" method="post">
        <div>
            <label class="inputkey">User Name:</label>
            <input type="text" name="username" required />
        </div>
        <div>
            <label class="inputkey"> Password:</label>
            <input id="passwordinput" type="password" name="password" />
        </div>
        <input type="submit" name="Submit" />
        <input type="reset"  value="Clear" />        
        <?php if (!empty($_SESSION['errors'])) { ?>
            <div class="errors">
                <?php echo $_SESSION['errors'];
                      unset($_SESSION['errors']); ?>
            </div>
        <?php } ?>        
    </form>
    <?php 
        require_once(realpath(dirname(__FILE__)) . "/General/footer.php");
     ?>
</body>
</html>