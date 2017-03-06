var db;
var dbName;

var alterDB = function(){
    if(db === undefined)
        throw new Error("Can't alter data base");

    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS TRACKS (id unique, path)');

        tx.executeSql('INSERT OR IGNORE INTO TRACKS (id, path) VALUES ("0a58E548-4C24-4831-b55e-252af5301181", "http://api.ownradio.ru/v3/tracks/0a58E548-4C24-4831-b55e-252af5301181")');
        tx.executeSql('INSERT OR IGNORE INTO TRACKS (id, path) VALUES ("feb93976-c6f2-46d3-b95e-b826789cb0c3", "http://api.ownradio.ru/v3/tracks/feb93976-c6f2-46d3-b95e-b826789cb0c3")');
        tx.executeSql('INSERT OR IGNORE INTO TRACKS (id, path) VALUES ("c44962b9-d5f6-44f7-9fe3-4136c296df91", "http://api.ownradio.ru/v3/tracks/c44962b9-d5f6-44f7-9fe3-4136c296df91")');
        tx.executeSql('INSERT OR IGNORE INTO TRACKS (id, path) VALUES ("69ecf598-24a3-450c-991f-424dbdf14fc2", "http://api.ownradio.ru/v3/tracks/69ecf598-24a3-450c-991f-424dbdf14fc2")');

    });
}

function openDB(){
  /*  if(window.sqlitePlugin !== undefined)
    {       
         db = window.sqlitePlugin.openDatabase({name: dbName, location: 'default'});        
    }
    else{*/
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

     select: function(table, callback){

   //     openDB();

         db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM '+ table, [], function (tx, results) {
                callback(results.rows);             
            }, function(error){
                console.log('SELECT error: ' + error.message);
            });

            });
     }

}
