$(document).ready(function(){
	$("#FetchFromServer").click(function(){
		$("#loader").show();
		var inputClientId = $("#inputClientId").val();
		var inputPassPhrase = $("#inputPassPhrase").val();
		var inputNumberofRecords = $("#inputNumberofRecords").val();
		var t = $("#inputAdditionalParameters").val().split(",");
		var json = JSON.stringify(t);
		var data = '{"clientid":"'+inputClientId+'","passphrase":"'+inputPassPhrase+'", "inputNumberofRecords":"'+inputNumberofRecords+
				   '", "inputAdditionalParameters":'+json+'}';
		request = $.ajax({
			url: 'fetchapicall.php',
			type: 'post',	
			data: {data:data}
			});
		
		request.done(function (response, textStatus, jqXHR){
			// Log a message to the console
			console.log(response);
			var res = $.parseJSON(response);
			var str = '';
			var text = '';
			$.each(res, function() {
				$.each(this, function(k, v) {
					str = str + v;
				});	
				text = text+str+ "\n";; //new line
				str = '';
			});
			$("#editor").val('');	
			$("#editor").val( $("#editor").val() + text );		
		});
		
		// Callback handler that will be called on failure
		request.fail(function (jqXHR, textStatus, errorThrown){
			// Log the error to the console
			console.error(
				"The following error occurred: "+
				textStatus, errorThrown
			);
		});
		
		request.always(function () {
			$("#loader").hide();
		});	
	});
	
	$("#SendToServer").click(function(){
		$("#loader").show();
		var inputClientId = $("#inputClientId2").val();
		var inputPassPhrase = $("#inputPassPhrase2").val();
		var t = $("#editor").val().split("\n");
		var json = JSON.stringify(t);
		var data = '{"clientid":"'+inputClientId+'","passphrase":"'+inputPassPhrase+'","text":'+json+'}';
		request = $.ajax({
			url: 'modifyapicall.php',
			type: 'post',	
			data: {data:data}
			});
		
		request.done(function (response, textStatus, jqXHR){
			// Log a message to the console	
			console.log(response);
			var res = $.parseJSON(response);	
			var str = '';
			var text = '';
			$.each(res, function() {
				$.each(this, function(k, v) {
					str = str + v;
				});	
				text = text+str+ "\n";//'&#013;&#010;'; //new line
				str = '';
			});
			console.log(text);
			$("#editor").val('');	
			$("#editor").val( $("#editor").val() + text );				
		});
		
		// Callback handler that will be called on failure
		request.fail(function (jqXHR, textStatus, errorThrown){
			// Log the error to the console
			console.error(
				"The following error occurred: "+
				textStatus, errorThrown
			);
		});		
		request.always(function () {
			$("#loader").hide();
		});	
		
	});
});