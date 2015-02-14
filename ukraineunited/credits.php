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
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Credits</title>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,700,800,400&subset=latin,cyrillic-ext' rel='stylesheet' type='text/css'>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/theme.css" rel="stylesheet">
    <link href="css/search.css" rel="stylesheet">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <script type="text/javascript" src="js/utils.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
	<?php setLangJS();?>
    <script type="text/javascript" src="js/utils.js"></script>
    <script type="text/javascript" src="js/carousel.js"></script>
    <script type="text/javascript" src="js/router.js"></script>


</head>
<body style="font-family: 'Helvetica', sans-serif;">

    <div class="header">
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

        <div class="header-item pull-right closeN">
            <div class="closeP"></div>
        </div>
        <div class="header-item pull-right about">
            <p><?php echo ABOUT?></p>
        </div>
    </div>

    <div class="row1">
        <div class="row-content">
            <div class="logo"></div>
            <div class="text-block">
				<?php echo ABOUT_TEXT_BLOCK?>
            </div>
        </div>
    </div>

    <!--<div class="row2">
        <div class="row-content">
            <div class="text-block">
                <div class="text h">
                    <?php //echo ABOUT_OUR_TEAM?> 
                </div>
            </div>
            <div class="team-members  text-block">
                    <div class="col-xs-6 col-centered col-max" style="margin: 18px 18px 0 0;">
                        <div class="team-img in-block l-col" style="background-image: url('img/team1.jpg');"></div>
                        <div class="r-col">
							<?php //echo ABOUT_TEAM1?> 
                        </div>
                    </div>
					<br>
                    <div class="col-xs-6 col-centered col-max" style="margin: 18px 18px 0 0;">
                        <div class="team-img in-block l-col" style="background-image: url('img/team2.jpg');"></div>
                        <div class="r-col">
                            <?php //echo ABOUT_TEAM2?> 
                        </div>
                    </div>
                    
            </div>
        </div>
    </div>-->

    <div class="footer">
        <div class="footer-content">
            <div class="text-block">
                <div class="text h" style="letter-spacing: 4px;">
                    <?php echo ABOUT_POSSIBLE?>
                </div>

                <div class="org-item">
					<div class="org-descr"><?php echo ABOUT_POSSIBLE_NAMES?></div>
                </div>
               
                <div class="designed-item">
                    <div class="org-logo">
                        <img src="img/cr-logo2.png"/>
                    </div>
                    <div class="designed-text">
                        Designed by  FRONTMEN</div>
                   </div>
            </div>
        </div>
        <div></div>
    </div>
</body>
</html>