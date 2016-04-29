var test_flag = false;

var gl_debug = true;


var UE = globalVar.UE;

//单层树文本改变
var oldhtml = "<p>1</p>";
var newhtml = "<p>12</p>";
var testName = "文本改变,句尾新增";
var expect = '<p><span class="RTCompare">1</span><span class="add">2</span></p>';
test(oldhtml, newhtml, expect, testName);


//单层树文本改变
var oldhtml = "<p>12</p>";
var newhtml = "<p>2</p>";
var testName = "文本改变,句头删除";
var expect = '<p><span class="sub">1</span><span class="RTCompare">2</span></p>';
test(oldhtml, newhtml, expect, testName);

var oldhtml = "<p>123</p>";
var newhtml = "<p>13</p>";
var testName = "中间删除";
var expect = '<p><span class="RTCompare">1</span><span class="sub">2</span><span class="RTCompare">3</span></p>';
test(oldhtml, newhtml, expect, testName);


var oldhtml = "<p>123</p>";
var newhtml = "<p>124</p>";
var testName = "连续的相同句子只有一个span包裹";
var expect = '<p><span class="RTCompare">12</span><span class="add">4</span><span class="sub">3</span></p>';
test(oldhtml, newhtml, expect, testName);

var oldhtml = "4236";
var newhtml = "5723";
var testName = "连续的相同句子只有一个span包裹22";
var expect = '<span class="add">57</span><span class="sub">4</span><span class="RTCompare">23</span><span class="sub">6</span>';
test(oldhtml, newhtml, expect, testName);

var oldhtml = "4236";
var newhtml = "5723";
var testName = "连续的新增句子只有一个span包裹";
var expect = '<span class="add">57</span><span class="sub">4</span><span class="RTCompare">23</span><span class="sub">6</span>';
test(oldhtml, newhtml, expect, testName);

var oldhtml = "236";
var newhtml = "6";
var testName = "连续的删除句子只有一个span包裹";
var expect = '<span class="sub">23</span><span class="RTCompare">6</span>';
test(oldhtml, newhtml, expect, testName);

var oldhtml = "236";
var newhtml = "646";
var testName = "连续的删除句子只有一个span包裹2";
var expect = '<span class="sub">23</span><span class="RTCompare">6</span><span class="add">46</span>';
test(oldhtml, newhtml, expect, testName);

var oldhtml = "2369";
var newhtml = "5646";
var testName = "连续的删除句子只有一个span包裹3";
var expect = '<span class="add">5</span><span class="sub">23</span><span class="RTCompare">6</span><span class="add">46</span><span class="sub">9</span>';
test(oldhtml, newhtml, expect, testName);

var oldhtml = "<p>1新助量的代</p>";
var newhtml = "<p>新出来的助量的代</p>";
var testName = "连续的删除句子只有一个span包裹3";
var expect = '<span class="add">5</span><span class="sub">23</span><span class="RTCompare">6</span><span class="add">46</span><span class="sub">9</span>';
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
