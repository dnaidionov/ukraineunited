<?php
function getContentData(){
	$lang = getLang();
	$json_path = './json/';
	$interview_path = $json_path.$lang.'/interviews/';
	$news_path = $json_path.$lang.'/news/';

	$contentData = array();

	if ($handle = opendir($interview_path)) {

		$contentData['interview'] = array();
		$i = 0;
		while (false !== ($entry = readdir($handle))) {
			if (strpos($entry, '.json') !== false) {
				$json = file_get_contents($interview_path.$entry);
				$obj = json_decode($json);

				$contentData['interview'][] = array(
					"id" => $i++,
					"eventDate" => $obj->eventDate,
					"author" => array(
						"name" => $obj->author->name,
						"city" => $obj->author->city,
						"profession" => $obj->author->profession,
						"photo" => $obj->author->photo
					),
					"photos" => $obj->photos,
					"text" => $obj->text
				);

			}
		}
		closedir($handle);
	}
	usort($contentData['interview'], "sortByEventDate");


	if ($handle = opendir($news_path))
	{
		$contentData['news'] = array();

		while (false !== ($entry = readdir($handle))) {
			if (strpos($entry, '.json') !== false) {
				$json = file_get_contents($news_path.$entry);
				$obj = json_decode($json);

				$contentData['news'][] = array(
					"text" => $obj->text,
					"eventDate" => $obj->eventDate,
					"city" => $obj->city,
					"author" => $obj->author,
				);
			}
		}
		closedir($handle);
	}
	usort($contentData['news'], "sortByEventDate");
	return $contentData;
}

function getLang(){
	if (!empty($_GET['l'])){
		$_SESSION['l'] = $_GET['l'];
	}
	$lang = (!empty($_SESSION['l']) ? $_SESSION['l'] : 'ua');
	return $lang;
}

function getScript(){
	$contentData = getContentData();

	echo '<script>
			contentData = '.json_encode($contentData).';

		  </script>';
}

function setLangJS(){
	$lang = getLang();

	echo '<script>
			lang  = "'.$lang.'";
		  </script>';
}

function sortByEventDate($a, $b)
{
	if (strtotime($a['eventDate']) == strtotime($b['eventDate'])) {
        return 0;
    }
    return (strtotime($a['eventDate']) < strtotime($b['eventDate'])) ? -1 : 1;
}
