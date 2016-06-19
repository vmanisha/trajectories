var fs = require('fs');


module.exports = {
	// Load the file containing trajectory.
	// File format is : 
	// prefix_length num_trajectories
	// lat_1, lon_1;lat_2,lon_2;...
	// lat_1, lon_1;lat_2,lon_2;.
	loadTrajectoriesFromFile: function(trajectory_file){
		var task_desc_dict = {};
     	var filepath = __dirname+'/data/'+trajectory_file;
     	try
     	{
				// Loads the whole file at once. you can check fs module 
				// to see if there is lazy loading. 
     	        var array = fs.readFileSync(filepath).toString().split("\n");
     	        console.log('Loading trajectories from '+filepath+' of length '+array.length);
     	        //Parse the file to create trajectories. 
				var trajectories = [];
				var i = 0;
     	        while( i < array.length)
     	        {
				   var split = array[i].split(' ');
     	           // format : prefix_length num_trajectories.
     	           var num_trajectories =  int(split[1]);

				   pref_rows = [];
				   for( var j = i+1 ; j < i+num_trajectories+1 ;j++) {
					  var lat_long_split = array[j].split(';');
					  var row_lat_long = [];
					  for(var k in lat_long_split) {
						var lat_long_k = lat_long_split[k].split(',');
						// Add lat_1, long_1 pair.
						row_lat_long.push([float(lat_long_k[0]), float(lat_long_k[1])]);
					  }
					  pref_rows.push(row_lat_long);
				   }

				   trajectories.push(pref_rows);
				   i = i+num_trajectories+1;
     	        }
     	        return trajectories;
     	}
     	catch(error)
     	{
     	        console.log('Error loading file '+filepath+ ' '+error );
     	        return false;
     	}
	}
};
