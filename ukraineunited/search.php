 <?php
 session_start();
include('parse.php');
$lang = getLang();
include('i18n/'.$lang.'.php');
 ?>
 <div class="popup">
        <div class="content">
            <table>
                <tr>
                    <td style="vertical-align: bottom">
                        <span class="glyphicon glyphicon-search fa-flip-horizontal" style="dislay:inline-block;"></span>
                    </td>

                    <td width="100%" >
                        <input type="text" id="searchInput" placeholder="<?php echo SEARCH?>"/>
                    </td>

                    <td>
                        <div class="closePopupBut"></div>
                    </td>
                </tr>
            </table>





            <div id="searchResult">
                <div class="team-members">
                    <div class="col-xs-6 col-centered col-max">
                        <div class="team-img in-block l-col" style="background-image: url('img/3.jpg');"></div>
                        <div class="r-col">
                            <div class="team-name ">
                                Александр ле
                            </div>
                            <div class="team-descr ">
                                г. Киев, философ
                            </div>
                            <div class="month"><p>январь 2014</p></div>
                        </div>
                    </div>
                    <div class="col-xs-6 col-centered col-max">
                        <div class="team-img in-block l-col" style="background-image: url('img/1.jpg');"></div>
                        <div class="r-col">
                            <div class="team-name ">
                                Valerie Noiman
                            </div>
                            <div class="team-descr ">
                                Ukrainian journalist
                            </div>
                            <div class="month" ><p>январь 2014</p></div>
                        </div>
                    </div>
                    <div class="col-xs-6 col-centered col-max">
                        <div class="team-img in-block l-col" style="background-image: url('img/2.jpg');"></div>
                        <div class="r-col">
                            <div class="team-name ">
                                <p>Алексей Мирашлаучус</p>
                            </div>
                            <div class="team-descr ">
                                <p>г. Астана, телеведущий</p>
                            </div>
                            <div class="month"><p>январь 2014</p></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>