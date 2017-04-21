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
		console.log('ownradio ' + 'db ' + tracks[i]);
        next.name = next.path + ' - ' + Date.now();  
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
        });
    }

}