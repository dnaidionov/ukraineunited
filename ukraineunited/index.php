<?php
session_start();
include('parse.php');
$lang = getLang();
include('i18n/'.$lang.'.php');
?>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Home</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href='http://fonts.googleapis.com/css?family=Open+Sans:100,300,600,700,800,600italic,400&subset=latin,cyrillic-ext' rel='stylesheet' type='text/css'>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/search.css" rel="stylesheet">
    <link href="css/carousel.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">
    <link href="css/article.css" rel="stylesheet">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/styles.css">


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
	<?php
	getScript();
	setLangJS();
	?>
	<script type="text/javascript" src="js/utils.js"></script>
	<script type="text/javascript" src="js/carousel.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
    <script type="text/javascript" src="js/router.js"></script>
</head>
<body class="not-scaled">
    <div id="header">
        <div class="header-item">
            <div class="dropdown">
                <p id="dropdownMenu1" data-toggle="dropdown">
                    <?php
						if($lang == 'en') echo ENG;
						if($lang == 'ru') echo RUS;
						if($lang == 'ua') echo UKR;
					?>
                    <span class="caret"></span>
                </p>
                <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="?l=en"><?php echo ENG?></a></li>
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="?l=ru"><?php echo RUS?></a></li>
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="?l=ua"><?php echo UKR?></a></li>
                </ul>
            </div>
        </div>
        <div class="header-item pull-right scale-control">
            <p class="in-block"><?php echo SCALE?></p>
            <i class="fa fa-bars in-block" style="font-size: 14px; padding: 0 5px 0 5px;"></i>
        </div>

        <div class="logo"></div>

        <div class="header-item pull-right about">
            <p><?php echo ABOUT?></p>
            <i class="iconFont-newspaper"></i>
        </div>

        <button class="close"></button>

    </div>

    <div class="carousel-wrapper"></div>
    <div class="footer"></div>

</body>
<script>
$(document).ready(function() {
	$('.scale-control')[0].click();
});
</script>
</html>
