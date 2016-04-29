$(function() {
	$("#btn_submit").click(function() {
		var newhtml = $("#editor").val();
		var oldhtml = $("#old_text").val();
		var UE = globalVar.UE;
		var root_o = UE.htmlparser(oldhtml);
		var root_n = UE.htmlparser(newhtml);

		var root = compare(root_n, root_o);
		var result = root.toHtml();

		$("#editor").val(newhtml);
		$("#old_text").val(oldhtml);
		$("#result_code").val(result);
		$("#show").html(result);
	})
	var html = "";

	$("#editor").val(html);
	$("#old_text").val(html);


	var newhtml = $("#editor").val();
	var oldhtml = $("#old_text").val();

	var UE = globalVar.UE;
	var root_o = UE.htmlparser(oldhtml);
	var root_n = UE.htmlparser(newhtml);

	var root = compare(root_n, root_o);
	var result = root.toHtml();

	$("#editor").val(html);
	$("#old_text").val(html);
	$("#result_code").val(result);
	$("#show").html(result);
})