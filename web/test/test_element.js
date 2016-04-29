/**
 * 测试node_compare方法
 * 2015-7-28
 * by wuzhicong
 */
var test_flag = false;

var gl_debug = false;

var UE = globalVar.UE;

// //一致
var oldhtml = "<p>1</p><h>2</h><div>3</div>";
var newhtml = "<p>1</p><h>2</h><div>3</div>";

var expect = {
	tagName: ["p", "h", "div"],
	status: [0, 0, 0]
}
var testName = "一致（有值）";
test(oldhtml, newhtml, expect, testName);

// //一致
var oldhtml = "<div></div>";
var newhtml = "<div></div>";

var expect = {
	tagName: ["div"],
	status: [0]
}
var testName = "一致（无值）";
test(oldhtml, newhtml, expect, testName);

//减少
var oldhtml = "<p>1</p><h>2</h><div>3</div>";
var newhtml = "<p>1</p><div>3</div>"
var expect = {
	tagName: ["p", "h", "div"],
	status: [0, 2, 0]
}
var testName = "减少";
test(oldhtml, newhtml, expect, testName);

// 增加
var oldhtml = "<p>1</p><h>2</h><div>3</div>";
var newhtml = "<p>1</p><ul>4</ul><h>2</h><div>3</div>"
var expect = {
	tagName: ["p", "ul", "h", "div"],
	status: [0, 1, 0, 0]
}
var testName = "增加";
test(oldhtml, newhtml, expect, testName);

//增删
var oldhtml = "<p>1</p><h>2</h><div>3</div>";
var newhtml = "<p>1</p><form>2</form><a>3</a><ul></ul>";
var expect = {
	tagName: ["p", "form", "a", "ul", "h", "div"],
	status: [0, 1, 1, 1, 2, 2]
}
var testName = "增删";
test(oldhtml, newhtml, expect, testName);


//全改
var oldhtml = "<p>1</p><h>2</h><div>3</div>";
var newhtml = "<form>1</form><ul>3</ul>";
var expect = {
	tagName: ["form", "ul", "p", "h", "div"],
	status: [1, 1, 2, 2, 2]
}
var testName = "全改";
test(oldhtml, newhtml, expect, testName);


//全删
var oldhtml = "<p>1</p><h>2</h><div>3</div>";
var newhtml = "";
var expect = {
	tagName: ["p", "h", "div"],
	status: [2, 2, 2]
}
var testName = "全删";
test(oldhtml, newhtml, expect, testName);

//全增
var oldhtml = "";
var newhtml = "<p>1</p><h>2</h><div>3</div>";
var expect = {
	tagName: ["p", "h", "div"],
	status: [1, 1, 1]
}
var testName = "全增";
test(oldhtml, newhtml, expect, testName);


var oldhtml = "<p>1</p>";
oldhtml += "<ul>2</ul>";
oldhtml += "<ol>3</ol>";
oldhtml += "<div>4</div>";
oldhtml += "<form>4</form>";
oldhtml += "<h>5</h>";
oldhtml += "<h>6</h>";
oldhtml += "<textarea>7</textarea>";
var newhtml = "<ul>1</ul>";
newhtml += "<ol>2</ol>";
newhtml += "<form>3</form>";
newhtml += "<h>4</h>";
newhtml += "<table>5</table>";
newhtml += "<textarea>6</textarea>";
var expect = {
	tagName: ["p", "ul", "ol", "div", "form", "h", "table", "h", "textarea"],
	status: [2, 0, 0, 2, 0, 0, 1, 2, 0]
}
var testName = "final test";
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
		console.log(oldhtml);
		console.log(newhtml);
		_test(root_n, root_o, expect);
		return;
	}
	if (gl_debug == true) {
		return
	}
	return _test(root_n, root_o, expect);
}

function _test(root_n, root_o, expect) {
	root = node_compare(root_n, root_o);
	var tagName_arr = [];
	var status_arr = [];
	for (var i in root) {
		tagName_arr.push(root[i].tagName);
		status_arr.push(root[i].status);
	}
	if (tagName_arr.length != expect.tagName.length) {
		console.log(tagName_arr.length);
		throw new Error("测试失败，标签名数组长度不等" + "\ntagName_arr : " + tagName_arr.length + "\nexpect.tagName : " + expect.tagName.length);
		return false;
	}
	if (status_arr.length != expect.status.length) {
		throw new Error("测试失败，状态名数组长度不等");
		return false;
	}
	for (var i in tagName_arr) {
		if (tagName_arr[i] != expect.tagName[i]) {
			throw new Error("测试失败，标签名数组值不等" + "\ntagName_arr[" + i + "] : " + tagName_arr[i] + "\nexpect.tagName[" + i + "] : " + expect.tagName[i]);
			return false;
		}
		if (status_arr[i] != expect.status[i]) {
			throw new Error("测试失败，状态名数组值不等" + "\nstatus_arr[" + i + "] : " + status_arr[i] + "\nexpect.status[" + i + "] : " + expect.status[i]);
			return false;
		}
	}
	console.log(testName + " : " + "测试成功√ ");
	return true;
}