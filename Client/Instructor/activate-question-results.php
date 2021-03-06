<?php 
    require_once(realpath(dirname(__FILE__)) . "/../General/Session.php");
    require_once(realpath(dirname(__FILE__)) . "/../../API/Config.php");
    require_once(realpath(dirname(__FILE__)) . "/../../API/Controllers/AnswerController.php");
    require_once(realpath(dirname(__FILE__)) . "/../../API/Controllers/QuestionController.php");
    require_once(realpath(dirname(__FILE__)) . "/../../API/Database/Database.php");
    $session = new Session();

    $db = new Database();
    $questionController = new QuestionController($db);
    $answerController = new AnswerController($db);
    $question = $questionController->GetActiveQuestions()[0];
    $getStudentResponses = $answerController->GetAllAnswersFromQuestion($question->id);
    $getStudentResponses = json_encode($getStudentResponses);
    $question = json_encode($question);
    $questionController->DeactivateAllQuestions();

?>
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="description" content="Shows results from student answers">
        <meta name="keywords" content="activate, question, results">
        <meta name="author" content="Tyler Fischer">
        <link rel="stylesheet" href="http://<?PHP echo $_SERVER['SERVER_NAME']. WEB_ROOT . "/Client/Styles/default-theme.css"; ?>">
        <title>Web Clicker</title>
        <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
    </head>
    <body>
        <?php require_once("../General/instructor-nav.php") ?>
    <div id="studentstats">
        <div>
            <?php echo"$getStudentResponses"?>
        </div>
        <div>
            <?php echo"$question"?>            
        </div>
    </div>
        <div id="answer-chart-container">
            <div id="answer-chart-yaxis"></div>
            <div>
                <canvas id="answer-chart"></canvas>
                <div id="answer-chart-xaxis"></div>
            </div>
        </div>  
        <?php require_once('../General/footer.php')?>
    </body>
    <script src="./chart.js"></script>
</html>