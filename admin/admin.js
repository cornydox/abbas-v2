$(function(){
	loadData();

	$('#export').click(function(){
		document.location.href = '../src/main.php?action=exportAdminData';
	});
});

function loadData(){
	$.ajax({
		url: '../src/main.php',
		data: {action: 'getAdminData'},
		type: "POST"
	}).done(function ( data ) {
		data = $.parseJSON(data); // Data for Leaderboard
		var html = "";
		for(var i in data){ // Loop through each row, add to list
			html += '<tr>';
			html += '<td>'+data[i].id+'</td>';
			html += '<td>'+data[i].name+'</td>';
			html += '<td>'+data[i].contact+'</td>';
			html += '<td>'+data[i].email+'</td>';
			html += '<td>'+data[i].score+'</td>';
			html += '<td>'+data[i].created_at+'</td>';
		}
		$("#result-content").html(html);

		$("#result").dataTable({"iDisplayLength": 25});

	}).fail(function (jqXHR, textStatus, errorThrown){
		console.dir(jqXHR + "," + "textStatus" , + "errorThrown");
	});
}