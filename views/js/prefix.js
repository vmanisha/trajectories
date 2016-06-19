
// Executes when page loads. 
$(function(){

	// Executes when button is clicked.
	$('#load_trajectory_button').on("click", function(a_event) {
		// Call the Retrieve trajectory button. 
		// Ideally this should be called on some user action.
		RetrieveAndDisplayTrajectory();
	});
});

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

var mymap = L.map('mapid').setView([39.952,116.39], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaGV4aTg4IiwiYSI6ImNpa2U0NDhsaTAwMmx1cm0ydzloczB1NnAifQ.WznG3dL5z0JNQSs9QB1w4w', {
                        maxZoom: 18,
                        id: 'mapbox.streets'
                }).addTo(mymap); 

mymap.on('click', onMapClick);


var trajectories = {};
function RetrieveAndDisplayTrajectory() {

  // Variable to store data for server. 
  var send_data = JSON.stringify({'filename':'trajectory.txt'});

  // Make a call via ajax to fetch data from server
  $.ajax({ url : "getTrajectory", 
		contentType: "application/json",
		type : "post", 
		data : send_data,
		success : function (output) {
			trajectories = output;
		},
		error: function(response){
			$('#trajectory_error').html('Some error here!');
		}

  });
  // Show trajectory
  // 2 3
  // 39.98116735326873,116.3020303391374;39.981165676888054,116.3009997375533; 
  // 39.98116735326873,116.3020303391374;39.981165676888054,116.3009997375533; 
  // 39.98116735326873,116.3020303391374;39.981165676888054,116.3009997375533;
  // 3 1
  // 39.92435,116.395;39.93949,116.44152;39.93949,116.44152;
  //
  // trajectories [ //first prefix [ //first row[ [lat_1,long_1],[lat_2,long_2] ] 
  //								 //secon row[ [lat_1,long_1],[lat_2,long_2] ] 
  //								 //third row[ [lat_1,long_1],[lat_2,long_2] ] ]  
  //			   //second prefix [ //first row [ [lat_1,long_1],[lat_2,long_2],[lat_3,long_3] ] ] 
  //			  ]
  L.polyline([trajectory[0][0],trajectory[0][1]],{color:'red', opacity: 0.5, weight:2}).addTo(mymap);

}
