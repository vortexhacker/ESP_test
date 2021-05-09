$(document).ready(function() {
$('#selectgender').change(function(event){ 
	$('#inputgender').val($(this).val());
	event.stopPropagation();
	});
	
$('#selectaccounttype').change(function(event){
	var choice = $(this).val();
	$('#inputaccounttype').val($(this).val());
	if(choice == "Savings"){
		$('#bloc_balance').removeClass("hidden");
	}
	else{
		$('#bloc_balance').addClass("hidden");
		$('#balance').val(0);
	}
	});

});







