
	console.log('init -> HKGStorage');
	//storage
	var hkgs = new HKGStorage({
		type: 'db',
		size: 10,
		table: [
			{	
				name:'topic',
				field:[
					{name:'tid',type:'INTEGER PRIMARY KEY AUTOINCREMENT'},
					{name:'title',type:'TEXT'},
					{name:'content',type:'TEXT'},
					{name:'dateline',type:'INT'},
					{name:'author',type:'TEXT'},
					{name:'replies',type:'INT'},
					{name:'score',type:'TEXT'},
					{name:'read_time',type:'TEXT'},
					{name:'last_time',type:'TEXT'}
				]
			},
			{
				name:'reply',
				field:[
					{name:'rid',type:'INTEGER PRIMARY KEY AUTOINCREMENT'},
					{name:'content',type:'TEXT'},
					{name:'dateline',type:'INT'},
					{name:'username',type:'TEXT'},
					{name:'replies',type:'INT'}
				]
			},
			{
				name:'bookmark',
				field:[
					{name:'bid',type:'INTEGER PRIMARY KEY AUTOINCREMENT'},
					{name:'title',type:'TEXT'},
					{name:'dateline',type:'INT'},
					{name:'author',type:'TEXT'},
					{name:'replies',type:'INT'},
					{name:'score',type:'TEXT'},
					{name:'bookmark_time',type:'TEXT'},
					{name:'last_time',type:'TEXT'}
				]
			}			
		]		
	});