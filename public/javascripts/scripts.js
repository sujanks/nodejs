!function ($) {
	$(function () {
  		$("#addRow").click(function(){
  			var i = $('#rowcount').val();
  			var newRow = '<tr><td><input type="text" name="groupvalues['+i+'][key]"></td><td><input type="text" name="groupvalues['+i+'][value]"></td></tr>';
			$("#entryTable").append(newRow);
			i = parseInt(i)+1;
			$('input#rowcount').val(i);
		});
		
		$("#addSettings").click(function(){
			var newRow = '<li class="settingli"><input type="text" name="groupName"></li>';
			$('#settingUl').append(newRow);
			$('#saveButton').show();
		});
  	})
}(window.jQuery);
