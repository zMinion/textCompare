
var test_flag = true;

var gl_debug = false;


var UE = globalVar.UE;

var oldhtml = "123"; 
var newhtml = "124"; 
var testName = "1-文本节点与文本节点比较";
var expect = '<span class="RTCompare">12</span><span class="sub">3</span><span class="add">4</span>';
test(oldhtml, newhtml, expect, testName);

var oldhtml = "a12b3c"; 
var newhtml = "13"; 
var testName = "2-文本节点与文本节点比较（二）有节点没有比较完";
var expect = '<span class="sub">a</span><span class="RTCompare">1</span><span class="sub">2b</span><span class="RTCompare">3</span><span class="sub">c</span>'
test(oldhtml, newhtml, expect, testName);


var oldhtml = "<p>123</p>"; 
var newhtml = "<p>124</p>"; 
var testName = "3-非自闭标签与非自闭标签比较";
var expect = '<p><span class="RTCompare">12</span><span class="sub">3</span><span class="add">4</span></p>';
test(oldhtml, newhtml, expect, testName);

var oldhtml = "123"; 
var newhtml = "<p>124</p>"; 
var testName = "4-文本节点与非自闭标签比较";
var expect = '<p><span class="RTCompare">12</span><span class="sub">3</span><span class="add">4</span></p>';
test(oldhtml, newhtml, expect, testName);



var oldhtml = "<p>1</p><p>2</p>"; 
var newhtml = "<p>1</p>"; 
var testName = "5-非自闭标签与非自闭标签比较（二）有标签没有比较完-右删除";
var expect = '<p><span class="RTCompare">1</span></p><p class="sub">2</p>'
test(oldhtml, newhtml, expect, testName);

var oldhtml = "<p>1</p>"; 
var newhtml = "<p>1</p><p>2</p>"; 
var testName = "6-非自闭标签与非自闭标签比较（三）有标签没有比较完-右新增";
var expect = '<p><span class="RTCompare">1</span></p><p class="add">2</p>'
test(oldhtml, newhtml, expect, testName);

var oldhtml = "<p>2</p><p>1</p>"; 
var newhtml = "<p>1</p>"; 
var testName = "7-非自闭标签与非自闭标签比较（四）有标签没有比较完-左删除";
var expect = '<p class="sub">2</p><p><span class="RTCompare">1</span></p>'
test(oldhtml, newhtml, expect, testName);

var oldhtml = "<p>1</p>"; 
var newhtml = "<p>2</p><p>1</p>"; 
var testName = "8-非自闭标签与非自闭标签比较（五）有标签没有比较完-左增加";
var expect = '<p class="add">2</p><p><span class="RTCompare">1</span></p>'
test(oldhtml, newhtml, expect, testName);

var oldhtml = "<p>1</p><p>2</p>"; 
var newhtml = "<p>1</p><p>2</p>"; 
var testName = "9-非自闭标签与非自闭标签比较（六）同一层多个标签进行对比";
var expect = '<p><span class="RTCompare">1</span></p><p><span class="RTCompare">2</span></p>'
test(oldhtml, newhtml, expect, testName);

var oldhtml = "<br/>"; 
var newhtml = "<br/>"; 
var testName = "10-自闭标签与自闭标签进行比较";
var expect = '<br/>'
test(oldhtml, newhtml, expect, testName);


var oldhtml = "<br/>"; 
var newhtml = "1"; 
var testName = "11-自闭标签与文本标签比较";
var expect = '<p class="sub"><br/></p><span class="add">1</span>'
test(oldhtml, newhtml, expect, testName);

var oldhtml = "2"; 
var newhtml = "1"; 
var testName = "12-两个完全不同的文本";
var expect = '<span class="sub">2</span><span class="add">1</span>'
test(oldhtml, newhtml, expect, testName);

var oldhtml = "<p>2</p>"; 
var newhtml = "<h>1</h>"; 
var testName = "13-两个完全不同的标签";
var expect = '<p class="sub">2</p><h class="add">1</h>';
test(oldhtml, newhtml, expect, testName);

var oldhtml = "1"; 
var newhtml = "<br/>"; 
var testName = "14-自闭标签与文本标签比较(二)－自闭标签是新增节点";
var expect = '<span class="sub">1</span><p class="add"><br/></p>'
test(oldhtml, newhtml, expect, testName);

var oldhtml = "<br/>"; 
var newhtml = "<input/>"; 
var testName = "15-自闭标签与自闭标签进行比较-不同的自闭标签";
var expect = '<p class="sub"><br/></p><p class="add"><input/></p>'
test(oldhtml, newhtml, expect, testName);

var oldhtml = "<p><br/></p>"; 
var newhtml = "<p><br/></p>"; 
var testName = "16-自闭标签与自闭标签进行比较-被包裹的自闭标签";
var expect = '<p><br/></p>'
test(oldhtml, newhtml, expect, testName);

var oldhtml = "1"; 
var newhtml = "<p>2</p>"; 
var testName = "17-文本标签与非自闭标签－不合并";
var expect = '<span class="sub">1</span><p class="add">2</p>';
test(oldhtml, newhtml, expect, testName);

function test(oldhtml, newhtml, expect, testName, debug) {
	if (!test_flag) {
		return;
	}
	
	var root_o = UE.htmlparser(oldhtml);
	var root_n = UE.htmlparser(newhtml);
	oldhtml = root_o.toHtml();
	newhtml = root_n.toHtml();

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
