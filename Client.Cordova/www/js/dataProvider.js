var db;
var dbName;

var alterDB = function(){
    if(db === undefined)
        throw new Error("Can't alter data base");

    db.transaction(function (tx) {
		 // tx.executeSql('CREATE TABLE IF NOT EXISTS TRACKS (id unique, name)');

        // tx.executeSql('INSERT OR IGNORE INTO TRACKS (id, name) VALUES (1, "track 1")');
        // tx.executeSql('INSERT OR IGNORE INTO TRACKS (id, name) VALUES (2, "track 2")');
        // tx.executeSql('INSERT OR IGNORE INTO TRACKS (id, name) VALUES (3, "track 3")');
        // tx.executeSql('INSERT OR IGNORE INTO TRACKS (id, name) VALUES (4, "track 4")');
        // tx.executeSql('INSERT OR IGNORE INTO TRACKS (id, name) VALUES (5, "track 5")');
        // tx.executeSql('INSERT OR IGNORE INTO TRACKS (id, name) VALUES (6, "track 6")');
		
		
		
		
        tx.executeSql('CREATE TABLE IF NOT EXISTS TRACKS (id TEXT unique, artist, name, length, path, datetimelastlisten)');
		
		 // tx.executeSql('INSERT OR IGNORE INTO TRACKS (id, artist, name, methodid, length, path) VALUES ("' + trackInfo.id + '", "' + trackInfo.artist + '", "' + trackInfo.name + '", "' + trackInfo.methodid + '", "' + trackInfo.length + '", "http://api.ownradio.ru/v3/tracks/' + trackInfo.id + '")');
		 

        // tx.executeSql('INSERT OR IGNORE INTO TRACKS (id, path) VALUES ("0a58E548-4C24-4831-b55e-252af5301181", "http://api.ownradio.ru/v3/tracks/0a58E548-4C24-4831-b55e-252af5301181")');
        // tx.executeSql('INSERT OR IGNORE INTO TRACKS (id, path) VALUES ("feb93976-c6f2-46d3-b95e-b826789cb0c3", "http://api.ownradio.ru/v3/tracks/feb93976-c6f2-46d3-b95e-b826789cb0c3")');
        // tx.executeSql('INSERT OR IGNORE INTO TRACKS (id, path) VALUES ("c44962b9-d5f6-44f7-9fe3-4136c296df91", "http://api.ownradio.ru/v3/tracks/c44962b9-d5f6-44f7-9fe3-4136c296df91")');
        // tx.executeSql('INSERT OR IGNORE INTO TRACKS (id, path) VALUES ("69ecf598-24a3-450c-991f-424dbdf14fc2", "http://api.ownradio.ru/v3/tracks/69ecf598-24a3-450c-991f-424dbdf14fc2")');

    });
}

function openDB(){
    // {       
         // db = window.sqlitePlugin.openDatabase({name: dbName, location: 'default'});        
    // }
    // else{
         db = window.openDatabase(dbName, '1.0', dbName, 2 * 1024 * 1024);             
   // }
}

var dataProvider ={
     initialize: function (config, successCallback, errorCallback) {
         if(config.db === undefined)
            throw new Error("Can't initialize data base");

        var dbName = config.db;

        openDB();
        alterDB();

     },

     tables: {
         tracks: 'TRACKS'
     },
	 
	 getDateTime: function(callback){
		db.transaction(function (tx) {
			
			console.log('DATETIMELASTLISTEN');
			
			
			
			var rs = tx.executeSql("SELECT strftime('%Y-%m-%dT%H:%M:%S', 'now', '-10 year') AS datetime");
				console.log('datetimelastlisten' + rs.getString('datetime'));
			callback(rs);
			
			// tx.executeSql("SELECT strftime('%Y-%m-%dT%H:%M:%S', 'now', '-10 year') AS datetime",[],function 	(tx, results) {
				 			 // console.log('datetimelastlisten' + results.rows[0]);
				 			 // console.log('datetimelastlisten' + results.getString('datetime'));
                // callback(results.rows);             
            // }, function(error){
                // console.log('SELECT error: ' + error.message);
            // });

		});
	 },
	 
	insert: function(table, trackInfo, datetimelastlisten, callback){
		
		 db.transaction(function (tx){
			// var datetimelastlisten = dataProvider.getDateTime();
			var datetimelastlisten = (Date.now(-1892160000)).toString();

			 tx.executeSql('INSERT OR IGNORE INTO TRACKS (id, artist, name, length, path, datetimelastlisten) VALUES ("' + trackInfo.id + '", "' + trackInfo.artist + '", "' + trackInfo.name + '", "' + trackInfo.length + '", "http://api.ownradio.ru/v3/tracks/' + trackInfo.id + '", "' + datetimelastlisten + '")');	
			 console.log('name' + trackInfo.name);
			 console.log('date' + datetimelastlisten);
		 });
	 },
	 
     select: function(table, callback){

   //     openDB();

         db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM '+ table + ' ORDER BY datetimelastlisten', [], function (tx, results) {
				// tx.executeSql('UPDATE datetimelastlisten = "' + Date.now().toString() + '" FROM ' + table + ' WHERE id = "' + results.rows.id + '"');
				// console.log('res '  + results.rows.id);
                callback(results.rows);             
            }, function(error){
                console.log('SELECT error: ' + error.message);
            });

            });
     },
	 
	 update: function(table, trackInfo, callback){
		 db.transaction(function (tx) {
			tx.executeSql('UPDATE datetimelastlisten = "' + Date.now().toString() + '" FROM ' + table + ' WHERE id = "' + trackInfo.id + '"');
				console.log('res '  + trackInfo.id);
                // callback(results.rows); 
		});				
	 }
	 // ,
	 
	 // delete: function(table, trackId, callback) {
		 // db.transaction(function (fx) {
			// tx.executeSql('DELETE FROM ' + table + 'WHERE id = "' + trackId + '"');
			// console.log('ownradio: track is deleted');
		// });
	 // }
}
