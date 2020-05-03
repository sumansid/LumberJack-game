var ref = firebase.database().ref('scores');

ref.on("value", function(snapshot) {
	obj = snapshot.val();
	if (obj != null) {
		var result = Object.keys(obj).map(function(key) {
	  		return [Number(key), obj[key]];
		});
		data = [];
		for (i = 0; i < result.length; i++) {
			tmp = [result[i][1]['name'], result[i][1]['score'] ];
			data.push(tmp);
		}
	} else {
		data = [];
	}

	$(document).ready(function(){
		$(".loading").fadeOut();
		$('table').DataTable({
			data: data,
			paging: true,
			searching: true,
			stateSave: true,
    	});
	});
}, function (error) {
	console.log("Error: " + error.code);
});
