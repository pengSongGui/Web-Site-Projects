<?php
$z[0]=Array("channeltitle","",254,304);
$z[0][4]['order']="backward";
$z[0][4]['character']="_";
$z[1]=Array("global","",305,330);
$z[1][4]['name']="cfg_webname";
$z[2]=Array("field","",374,405);
$z[2][4]['name']="description";
$z[3]=Array("field","",442,470);
$z[3][4]['name']="keywords";
$z[4]=Array("include","",638,672);
$z[4][4]['filename']="head.htm";
$z[5]=Array("include","",736,770);
$z[5][4]['filename']="left.htm";
$z[6]=Array("field","",858,886);
$z[6][4]['name']="position";
$z[7]=Array("type","[field:typename/]",933,981);
$z[7][4]['typeid']="";
$z[8]=Array("arclist","\r\n                        <li>\r\n                            <a href=\"[field:arcurl/]\" class=\"news_list_img\"><img src=\"[field:litpic/]\" /></a>\r\n                            <div class=\"news_list_right\">\r\n                                <p class=\"news_list_tit\"><a href=\"[field:arcurl/]\">[field:title/]</a></p>\r\n                                <p class=\"news_list_profile\">[field:description function='cn_substrR(html2text(@me),400)'/]...</p>\r\n                                <a class=\"news_more\" href=\"[field:arcurl/]\"></a>\r\n                            </div>\r\n                            <div class=\"clear\"></div>\r\n                        </li>\r\n                        ",1148,1927);
$z[8][4]['orderby']="weight";
$z[8][4]['pagesize']="2";
$z[8][4]['titlelen']="60";
$z[8][4]['flag']="a";
$z[8][4]['imgwidth']="112";
$z[8][4]['imgheight']="76";
$z[9]=Array("list","\r\n                        <tr>\r\n                            <td width=\"460\"><a href=\"[field:arcurl/]\">[field:title/]</a></td>\r\n                            <td align=\"center\" width=\"150\">[field:pubdate function=\"MyDate('Y-m-d',@me)\"/]</td>\r\n                            <td align=\"center\">[field:click/]</td>\r\n                            \r\n                        </tr>\r\n                        ",2222,2682);
$z[9][4]['orderby']="weight";
$z[9][4]['pagesize']="10";
$z[9][4]['titlelen']="120";
$z[10]=Array("pagelist","",2822,2901);
$z[10][4]['listitem']="index,end,pre,next,pageno";
$z[10][4]['listsize']="5";
$z[10][4]['sitelang']="cn";
$z[11]=Array("include","",3044,3080);
$z[11][4]['filename']="footer.htm";

?>