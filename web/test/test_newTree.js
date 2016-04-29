/**
 * 测试text_compare方法
 * 2015-7-29
 * by wuzhicong
 */

var startTime = new Date().getTime();
var test_flag = false;

var gl_debug = false;

var UE = globalVar.UE;

//深层树编辑
var oldhtml = "<div><div><div>1</div></div></div>";
var newhtml = "<div><div><p>1</p></div></div>"
var testName = "深层树";
var expect = '<div><div><p class="add">1</p><div class="sub">1</div></div></div>';
test(oldhtml, newhtml, expect, testName);

//层级不同
// var oldhtml = "<div><div><div>1</div></div></div>";
// var newhtml = "<div><div>1</div></div>"
// var testName = "深层树（层级不同）";
// var expect = '<div><div class="add">1<div class="sub">1<div></div></div>';
// test(oldhtml, newhtml, expect, testName);

//不变（无值）
var oldhtml = "";
var newhtml = "";
var testName = "不变（无值）";
var expect = "";
test(oldhtml, newhtml, expect);

//不变（有值）
var oldhtml = "<div><p>1</p><h>2</h></div>";
var newhtml = "<div><p>1</p><h>2</h></div>";
var testName = "不变（有值）";
var expect = '<div><p><span class="RTCompare">1</span></p><h><span class="RTCompare">2</span></h></div>';
test(oldhtml, newhtml, expect);

//删除一个节点
var oldhtml = "<div><p>1</p><h>2</h></div>";
var newhtml = "<div><p>1</p></div>";
var testName = "删除一个节点";
var expect = '<div><p><span class="RTCompare">1</span></p><h class="sub">2</h></div>';
test(oldhtml, newhtml, expect);

//新增一个节点
var oldhtml = "<div><h>2</h></div>";
var newhtml = "<div><h>2</h><h1>3</h1></div>";
var testName = "新增一个节点";
var expect = '<div><h><span class="RTCompare">2</span></h><h1 class="add">3</h1></div>'
test(oldhtml, newhtml, expect);

//增删
var oldhtml = "<p>1</p><h>2</h>";
var newhtml = "<p>1</p><form>2</form>";
var testName = "增删";
var expect = '<p><span class="RTCompare">1</span></p><form class="add">2</form><h class="sub">2</h>';
test(oldhtml, newhtml, expect, testName);


//全改
var oldhtml = "<p>1</p><div>3</div>";
var newhtml = "<form>1</form><h>3</h>";
var expect = '<form class="add">1</form><h class="add">3</h><p class="sub">1</p><div class="sub">3</div>'
var testName = "全改";
test(oldhtml, newhtml, expect, testName);


//全删
var oldhtml = "<p>1</p><h>2</h><div>3</div>";
var newhtml = "";
var expect = '<p class="sub">1</p><h class="sub">2</h><div class="sub">3</div>'
var testName = "全删";
test(oldhtml, newhtml, expect, testName);

//全增
var oldhtml = "";
var newhtml = "<p>1</p><h>2</h><div>3</div>";
var expect = '<p class="add">1</p><h class="add">2</h><div class="add">3</div>'
var testName = "全增";
test(oldhtml, newhtml, expect, testName);

//final
// var oldhtml = "<p>1</p>";
// oldhtml += "<div>2</div>";
// oldhtml += "<form>3</form>";
// oldhtml += "<h>4</h>";
// oldhtml += "<h>5</h>";
// oldhtml += "<textarea>6</textarea>";
// var newhtml = "<div>1</div>";
// newhtml += "<form>2</form>";
// newhtml += "<h>3</h>";
// newhtml += "<table>4</table>";
// newhtml += "<textarea>5</textarea>";
// var expect = '<p class="sub">1</p>';
//     expect += '<div>2</div>';
//     expect += '<form>3</form>';
//     expect += '<h>4</h>';
//     expect += '<table class="add">4</table>';
//     expect += '<h class="sub">5</h>';
//     expect += '<textarea>6</textarea>';
// var testName = "final test";
// test(oldhtml, newhtml, expect, testName);

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
		_test(root_n, root_o, expect);
		return;
	}
	if (gl_debug == true) {
		return
	}
	return _test(root_n, root_o, expect);
}

function _test(root_n, root_o, expect) {
	var root = compare(root_n, root_o);
	if (root.toHtml() != expect) {
		console.log(root.toHtml());
		console.log(expect);
		throw new Error(testName + "测试失败");
		return;
	}
	console.log(testName + " : " + "测试成功√ ");
}

