<?phpinclude("common.php");/*$p=PATH."data/";$l=PATH."data/log/";chmod(PATH."data/", 0777); chmod($l, 0777); echo is_writable($l);$perms = fileperms($l);print_pre($perms);echo "<BR>";echo $file=$l.date("Ymd").".log";echo "<BR>";echo $c=time()."\n";$fp=fopen($file,"a");fwrite($fp,$c);fclose($fp);*/$c="LOGGER ".time();$logger->write($c);?>