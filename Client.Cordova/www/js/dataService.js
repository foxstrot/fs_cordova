var provider;
var dbName ="ownradioDB";


function setProvider(){
    if('undefined' !== typeof dataProvider)
    {
        provider = dataProvider;
        provider.initialize({db: dbName});
    }
}

function uploadTrack(tracks, callback)
{
    if(tracks.length > 0)
    {
        var i = Math.floor(Math.random() * (tracks.length));
        var next = tracks[i];
		console.log('ownradio ' + 'db ' + tracks[i].name);
		//TODO 
		//update lastdatetime
		provider.update(provider.tables.tracks, next);
        callback(next);       
    }
}

var dataService ={
    initialize: function(){
        setProvider();
    },
    getTrack: function(callback){
		console.log('ownradio ' + 'dS, getTrack')
        var tracks = provider.select(provider.tables.tracks, function(rows){
            uploadTrack(rows, callback);
        })
	}	,
	setTrack: function(trackInfo, callback){
		console.log('ownradio ' + 'dS, setTrack');
		console.log('ownradio ' + trackInfo);
		provider.insert(provider.tables.tracks, trackInfo, function(rows){
            // uploadTrack(rows, callback);
        })
	},
	deleteTrack: function(trackInfo, callback){
		console.log('ownradio ' + 'delete track');
		provider.delete(provider.tables.tracks, trackInfo, function(){
            //TODO delete file
        })
	}

}