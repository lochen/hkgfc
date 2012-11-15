/**
 * Storage
 */
var HKGStorage = function(settings){
	this.settings = {
		'type': 'local', //local,db
		'name': 'defaultDB', //db name
		'size': 1, //size for db
		'version': '1.0', //db version
		'table': null //array object, [{name:'table',field:[{name:'id',type:'INTEGER PRIMARY KEY AUTOINCREMENT'},{name:'name',type:'TEXT'}]},{}]
	}
	$.extend(this.settings, settings);
	this.init(this.settings);
}
HKGStorage.prototype={
	init: function(settings){
		if(settings.type=='db'){
			console.log("HKGStorage.init()",'db',settings);
			settings.size=(settings.size *1024*1024)
			this.db=this.open(settings.name,settings.version,settings.desc,settings.size);
			
			if(settings.table!=null && settings.table.length!=0){
				for(var t in settings.table){
					var field=[];
					var fields=settings.table[t].field;
					for(var i = 0;i<fields.length; i++){
						field.push(fields[i].name+' '+fields[i].type);
					}
					var sql="CREATE TABLE IF NOT EXISTS "+settings.table[t].name+" ("+field.join(',')+")";
					console.log("Create table",sql);
					this.query(sql,function(tx,result){
					});
				}
			}
		}
		else{
			console.log("HKGStorage.init()",'local',settings);			
		}
	},
	open: function(name,version,desc,size){
		return openDatabase(name,version,desc,size);
	},
	create: function(sql,callback){
		//if(typeof(callback)=="undefined")var callback=[];
		/*this.db.transaction(function(tx) {
			tx.executeSql(sql, [], callback);
		});*/
	},
	drop: function(table,callback){
		this.query("DROP TABLE "+table,callback);
		console.log('Drop table: '+table);
	},
	query: function(sql,callback){
		this.db.transaction(function(tx) {
			tx.executeSql(sql, [], callback, function(tx,error){
				console.log('HKGStorage.query() error',error);
			});
		});
	},
	set: function(key,value,options){
		if(this.settings.type=='db'){			
			var sql="INSERT OR IGNORE INTO "+options.table;
			var fields=key.join(',');
			var values=[];
			for(var v in value){
				values.push("'"+value[v]+"'");
			}
			values.join(',');
			sql+="("+fields+") VALUES ("+values+")";
			console.log('SQL',sql);
			this.query(sql,options.callback);
			return true;
		}
		else{
			localStorage.setItem(key,value);
			return true;
		}
	},
	get: function(key,options){
		if(this.settings.type=='db'){
			var field=(options.field)?options.field:'*';
			var sql="SELECT "+field+" FROM "+options.table+" WHERE "+options.key+"='"+value+"'";
			this.query(sql,options.callback);
			return true;
		}
		else{
			return localStorage.getItem(key);
		}
	},
	remove: function(key,options){
		if(this.settings.type=='db'){
			var sql="DELETE FROM "+options.table+" WHERE "+options.key+"='"+key+"'";
			this.query(sql,options.callback);
			return true;
		}
		else{
			localStorage.removeItem(key);
			return true;
		}
	},
	clear: function(options){
		if(this.settings.type=='db'){
			var sql="DELETE FROM "+options.table;
			this.query(sql,options.callback);
			return true;
		}
		else{
			localStorage.clear();
			return true;
		}
	}
}