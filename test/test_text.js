/**
 * 测试text_compare方法
 * 2015-7-28
 * by wuzhicong
 */

var test_flag = false;

var gl_debug = false;

var UE = globalVar.UE;

//原样（有值）
var oldhtml = "1";
var newhtml = "1";
var testName = "原样（有值）";
var expect = "1"
test(oldhtml, newhtml, expect, testName);

//原样（无值）
var oldhtml = "";
var newhtml = "";
var testName = "原样（无值）";
var expect = "";
test(oldhtml, newhtml, expect, testName);

//编辑
var oldhtml = "12";
var newhtml = "34";
var testName = "编辑";
var expect = '<span class="add">34</span><span class="sub">12</span>'
test(oldhtml, newhtml, expect, testName);

//增加
var oldhtml = "";
var newhtml = "123";
var testName = "增加";
var expect = '<span class="add">123</span>'
test(oldhtml, newhtml, expect, testName);

//删除
var oldhtml = "123";
var newhtml = "";
var testName = "删除";
var expect = '<span class="sub">123</span>'
test(oldhtml, newhtml, expect, testName);



function test(oldhtml, newhtml, expect, testName, debug) {
	if (!test_flag) {
		return;
	}
	var root_o = UE.htmlparser(oldhtml);
	var root_n = UE.htmlparser(newhtml);

	if (!testName) {
		testName = "未命名测试";
	}
	if (debug) {
		console.log(root_o);
		console.log(root_n);
		_test(root_n, root_o, expect);
		return;
	}
	if (gl_debug == true) {
		return
	}
	return _test(root_n, root_o, expect);
}

function _test(root_n, root_o, expect) {
	var newTree = root_o;
	var node = text_compare(root_n, root_o, newTree);
	var test = newTree.toHtml();
	if (test != expect) {
		console.log(test);
		console.log(expect);
		throw new Error("测试失败");
		return
	}
	console.log(testName + " : " + "测试成功√ ");
	return true;

}