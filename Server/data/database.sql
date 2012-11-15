CREATE TABLE IF NOT EXISTS `account` (
  `aid` int(11) NOT NULL AUTO_INCREMENT,
  `extid` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `verify` int(10) DEFAULT NULL,
  `dateline` int(11) NOT NULL,
  `ip` varchar(18) NOT NULL,
  PRIMARY KEY (`aid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `topic` (
  `tid` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `author` varchar(45) NOT NULL,
  `content` text NOT NULL,
  `dateline` int(11) NOT NULL,
  `replies` int(11) DEFAULT '0',
  `score` varchar(10) DEFAULT '0',
  `pages` int(11) DEFAULT '0',
  `tags` varchar(45) DEFAULT '',
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `logging` (
  `lid` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `content` text NOT NULL,
  `dateline` int(11) NOT NULL,
  `ip` varchar(18) DEFAULT NULL,
  PRIMARY KEY (`lid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;