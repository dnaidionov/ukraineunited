<?php
session_start();
include('parse.php');
$lang = getLang();
include('i18n/'.$lang.'.php');

$contentData = getContentData();
$id = (int)$_GET['id'];

foreach ($contentData['interview'] as $index => $record){
	if ($record['id'] == $id) {
		$interview = $record;
		$prev = ($index > 0) ? $contentData['interview'][ $index-1 ]['id'] : false;
		$next = ($index < count($contentData['interview'])-1)? $contentData['interview'][ $index+1 ]['id'] : false;
		continue;
	}
}
$share_url = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?id='.$id.'&l='.$lang;


if ($lang =='en') {
	$months = array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
} if ($lang =='ru') {
	$months = array('Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь');
} if ($lang =='ua') {
	$months = array('Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень');
}

$date = (($lang =='en') ? date("Y", strtotime($interview['eventDate'])).' ' : ' ') . $months[date("n", strtotime($interview['eventDate']))-1] . (($lang !='en') ? ' '. date("Y", strtotime($interview['eventDate'])).' ' : ' ');
?>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title><?php echo $interview['author']['name']; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:100, 300,600,700,800,600italic,400&subset=latin,cyrillic-ext' rel='stylesheet' type='text/css'>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">
    <link href="css/article.css" rel="stylesheet">
    <link href="css/search.css" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">

    <link rel="stylesheet" href="css/font-awesome.min.css">
    <script src="js/jquery.js"></script>
    <script src="js/bootstrap.min.js"></script>

    <script type="text/javascript" src="js/utils.js"></script>
    <script src="js/article.js"></script>
    <script src="js/router.js"></script>
</head>
<body>
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
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="article.php?l=en&id=<?php echo $id?>"><?php echo ENG?></a></li>
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="article.php?l=ru&id=<?php echo $id?>"><?php echo RUS?></a></li>
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="article.php?l=ua&id=<?php echo $id?>"><?php echo UKR?></a></li>
                </ul>
            </div>
        </div>

        <div class="header-item pull-right closeN">
            <div class="close"></div>
        </div>

        <div class="header-item pull-right about">
            <p><?php echo ABOUT?></p>
            <i class="iconFont-newspaper"></i>
        </div>

        <div class="logo"></div>
    </div>

    <div class="main">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 col-photo transition" id="photos">
				<?php 
					$i = 0;
					$j=0;
					foreach ($interview['photos'] as $photo){
						$i=$j;
						$j+=30;
						echo '<div class="col-md-6 col-photo img transition active" style="background-image: url(\'img/'. $photo .'\')" data-from="'.$i.'" data-to="'.$j.'"></div>';
						$i+=20;
					}
				?>
                </div>
                <div class="col-md-6 text-block col-text">
                    <div class="closeButA"></div>
                    <div class="name-block">
                        <!--<i class="fa fa-arrow-left" style="position: absolute; left:0"></i>
                        <i class="fa fa-arrow-right" style="position: absolute; right:0"></i>-->
						<?php 
						if ($prev !== false) {
							echo "<a href='./article.php?id=".$prev."'><div class = 'but-left'></div></a>";
						}
						if ($next !== false) {
							echo "<a href='./article.php?id=".$next."'><div class = 'but-right'></div></a>";
						}
						?>
                        <div class="b-name">
                            <div class="name"><?php echo $interview['author']['name']?></div>
                            <div class="descr"><?php echo CITY.$interview['author']['city'].', '.$interview['author']['profession']?></div>
                        </div>
                    </div>

                    <div class="text">
                        <div class="month" id="mon2"><p><?php echo $date ?></p></div>
                        <!-- interview text -->
						<?php echo $interview['text']?>

					<div class="bottom-social">
                    	<a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $share_url ?>" class="iconFont-facebook"></a>
                    	<a href="https://twitter.com/home?status=<?php echo $share_url ?>" class="iconFont-twitter"></a>
                    	<a href="https://plus.google.com/share?url=<?php echo $share_url ?>" class="iconFont-googleplus2"></a>
                    	<a href="http://vkontakte.ru/share.php?url=<?php echo $share_url ?>" class="iconFont-vk"></a>
                    	<a href="http://reddit.com/submit?url=<?php echo $share_url ?>" class="iconFont-reddit"></a>
                    </div><!--/bottom-social-->

                    <div class="line"></div>

                    <div class="name-block">

                        <div class="m-name">
                            <table>
                            <tr>
                                <td>
                                    <?php 
										if ($prev !== false) {
											echo "<a href='./article.php?id=".$prev."'><div class = 'but-left'></div></a>";
										}
									?>
                                    <div class="iBtn left"><div class = "but-m-left"></div> </div>
                                </td>

                                <td width="100%" class="t-name">
                                    <div class="name"><?php echo $interview['author']['name']?></div>
									<div class="descr"><?php echo CITY.$interview['author']['city'].', '.$interview['author']['profession']?></div>
                                </td>

                                <td>
                                    <?php 
									if ($next !== false) {
										echo "<a href='./article.php?id=".$next."'><div class = 'but-right'></div></a>";
									}
									?>
                                    <div class="iBtn right"><div class = "but-m-right"></div> </div>
                                </td>
                            </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>