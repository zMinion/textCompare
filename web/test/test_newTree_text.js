/**
 * 测试text_compare方法
 * 2015-7-29
 * by wuzhicong
 */
// var oldhtml  = "<div>";
//     oldhtml += "<h>1</h>";
//     oldhtml += "2";
//     oldhtml += "<p>3</p>";
//     oldhtml += "</div>";
//     oldhtml += "<div>";
//     oldhtml += "<h>1</h>"
//     oldhtml += "<p>1</p>"
//     oldhtml += "</div>";
// var newhtml  = "<div>";
// 	newhtml += "2";
// 	newhtml += "<p>4</p>";
// 	newhtml += "</div>";
// 	newhtml += "<div>";
// 	newhtml += "<p>4</p>";
// 	newhtml += "<p>1</p>";
// 	newhtml += "<h>3</h>";
// 	newhtml += "</div>";
// 	newhtml += "<p></p>";
var test_flag = false;

var gl_debug = false;


var UE = globalVar.UE;

//单层树文本改变
var oldhtml = "<p>1</p>";
var newhtml = "<p>2</p>";
var testName = "单层树文本改变";
// var expect = '<p><span class="add">2</span><span class="sub">1</span></p>';
var expect = '<p class="add">2</p><p class="sub">1</p>';
test(oldhtml, newhtml, expect, testName);


//深层树文本改变
var oldhtml = "<div><div><div>1</div></div></div>";
var newhtml = "<div><div><div>2</div></div></div>";
var testName = "深层树文本改变";
// var expect = '<div><div><div><span class="add">2</span><span class="sub">1</span></div></div></div>';
var expect = '<div class="add"><div><div>2</div></div></div><div class="sub"><div><div>1</div></div></div>';
test(oldhtml, newhtml, expect, testName);

//层数不同深层树文本改变,新节点原节点对应旧节点非原节点
var oldhtml = "<div><div><div>1</div></div></div>";
var newhtml = "<div><div>2</div></div>";
var testName = "层数不同深层树文本改变,新节点原节点对应旧节点非原节点";
// var expect = '<div><div><span class="add">2</span><div class="sub">1</div></div></div>';
var expect = '<div class="add"><div>2</div></div><div class="sub"><div><div>1</div></div></div>';
test(oldhtml, newhtml, expect, testName);

//层数不同深层树文本改变,新节点非原节点对应旧节点原节点
var oldhtml = "<div><div>1</div></div>";
var newhtml = "<div><div><div>2</div></div></div>";
var testName = "层数不同深层树文本改变,新节点非原节点对应旧节点原节点";
// var expect = '<div><div><div class="add">2</div><span class="sub">1</span></div></div>';
var expect = '<div class="add"><div><div>2</div></div></div><div class="sub"><div>1</div></div>';
test(oldhtml, newhtml, expect, testName);

//同一层数文本节点混合
var oldhtml = "1<div>1</div>";
var newhtml = "<h>2</h>";
var testName = "深层树文本改变";
var expect = '<h class="add">2</h><span class="sub">1</span><div class="sub">1</div>';
test(oldhtml, newhtml, expect, testName);

//同一层数文本节点混合
var oldhtml = "<div>1</div>";
var newhtml = "1<h>2</h>";
var testName = "深层树文本改变";
var expect = '<span class="add">1</span><h class="add">2</h><div class="sub">1</div>';
test(oldhtml, newhtml, expect, testName);

var oldhtml = "<div><div>1</div></div>";
var newhtml = "<div>1<h>2</h></div>";
var testName = "深层树文本改变,原节点对应非原节点";
var expect = '<div><span class="add">1</span><h class="add">2</h><div class="sub">1</div></div>';
test(oldhtml, newhtml, expect, testName);

var oldhtml = "<p>1</p>";
var newhtml = "1<p>1</p>2";
var testName = "原节点对应非原节点,同一层有多个原节点混合";
var expect = '<span class="add">1</span><p><span class="RTCompare">1</span></p><span class="add">2</span>';
test(oldhtml, newhtml, expect, testName);


var oldhtml = "1<p>1</p>2";
var newhtml = "<p>1</p>";
var testName = "原节点对应非原节点,同一层有多个原节点混合";
var expect = '<span class="sub">1</span><p><span class="RTCompare">1</span></p><span class="sub">2</span>';
test(oldhtml, newhtml, expect, testName);


//final
var oldhtml  = "<div>";
    oldhtml += "<h>1</h>";
    oldhtml += "<h>2</h>";
    oldhtml += "</div>";
var newhtml  = "<div>";
	newhtml += "<p>4</p>";
	newhtml += "2";
	newhtml += "</div>";
var expect = '<div><p class="add">4</p><span class="add">2</span><h class="sub">1</h><h class="sub">2</h></div>';
var testName  = "final";
test(oldhtml, newhtml, expect, testName);


//文本节点和非文本节点比较比较
var oldhtml  = "<div>";
    oldhtml += "<h>1</h>";
    oldhtml += "<h>2</h>";
    oldhtml += "</div>";
var newhtml  = "<div>";
	newhtml += "<p>4</p>";
	newhtml += "2";
	newhtml += "</div>";
var expect = '<div><p class="add">4</p><span class="add">2</span><h class="sub">1</h><h class="sub">2</h></div>';
var testName  = "文本节点和非文本节点比较比较";
test(oldhtml, newhtml, expect, testName);

//文本节点和非文本节点比较比较
var oldhtml  = "<div>";
    oldhtml += "<h>1</h>";
    oldhtml += "<h>2</h>";
    oldhtml += "</div>";
var newhtml  = "<div>";
	newhtml += "2";
	newhtml += "<p>4</p>";
	newhtml += "</div>";
var expect = '<div><span class="add">2</span><p class="add">4</p><h class="sub">1</h><h class="sub">2</h></div>';
var testName  = "文本节点和文本节点比较比较";
test(oldhtml, newhtml, expect, testName);

//文本节点和文本节点比较比较(相同)
var oldhtml  = "<div>";
    oldhtml += "<h>1</h>";
    oldhtml += "2";
    oldhtml += "</div>";
var newhtml  = "<div>";
	newhtml += "<p>4</p>";
	newhtml += "2";
	newhtml += "</div>";
var expect = '<div><p class="add">4</p><h class="sub">1</h><span class="RTCompare">2</span></div>';
var testName  = "文本节点和非文本节点比较比较（相同）";
test(oldhtml, newhtml, expect, testName);

//文本节点和飞文本节点比较比较（不同）
var oldhtml  = "<div>";
    oldhtml += "<h>1</h>";
    oldhtml += "2";
    oldhtml += "</div>";
var newhtml  = "<div>";
	newhtml += "<p>4</p>";
	newhtml += "3";
	newhtml += "</div>";
// var expect = '<div><p class="add">4</p><span class="add">3</span><span class="sub">2</span><h class="sub">1</h></div>';
var expect = '<div class="add"><p>4</p>3</div><div class="sub"><h>1</h>2</div>';
var testName  = "文本节点和非文本节点比较比较（不同）";
test(oldhtml, newhtml, expect, testName);

var oldhtml = "<h>1</h>";
    oldhtml += "2";
    oldhtml += "<p>3</p>";
    
var newhtml = "2";
	newhtml += "<p>4</p>";
// var expect = '<h class="sub">1</h><span class="RTCompare">2</span><p><span class="add">4</span><span class="sub">3</span></p>';
var expect = '<h class="sub">1</h><span class="RTCompare">2</span><p class="add">4</p><p class="sub">3</p>';
var testName = "不对应"
test(oldhtml, newhtml, expect, testName);



var oldhtml  = "<div>";
    oldhtml += "<h>1</h>";
    oldhtml += "2";
    oldhtml += "<p>3</p>";
    oldhtml += "</div>";
    oldhtml += "<div>";
    oldhtml += "<h>1</h>"
    oldhtml += "<p>1</p>"
    oldhtml += "</div>";
var newhtml  = "<div>";
	newhtml += "2";
	newhtml += "<p>4</p>";
	newhtml += "</div>";
	newhtml += "<div>";
	newhtml += "<p>4</p>";
	newhtml += "<p>1</p>";
	newhtml += "<h>3</h>";
	newhtml += "</div>";
	newhtml += "<p>1</p>";
// var expect = '<div><h class="sub">1</h><span class="RTCompare">2</span><p><span class="add">4</span><span class="sub">3</span></p></div><div><h class="sub">1</h><p><span class="add">4</span><span class="sub">1</span></p><p class="add">1</p><h class="add">3</h></div><p class="add">1</p>';
var expect = '<div><h class="sub">1</h><span class="RTCompare">2</span><p class="add">4</p><p class="sub">3</p></div><div><p class="add">4</p><h><span class="RTCompare">1</span></h><h class="add">3</h><p class="sub">1</p></div><p class="add">1</p>'
var testName = "最终测试！！！"
test(oldhtml, newhtml, expect, testName);

var oldhtml  = "<div>";
    oldhtml += "1";
    oldhtml += "<p>1</p>";
    oldhtml += "<div>";
    oldhtml += "<p>2</p>";
    oldhtml += "<h>3</h>";
    oldhtml += "2";
    oldhtml += "</div>";
    oldhtml += "</div>";
var newhtml  = "<div>";
	newhtml += "<p>1</p>";
	newhtml += "<div>";
	newhtml += "<p>2</p>";
	newhtml += "<p>3</p>";
	newhtml += "2";
	newhtml += "<div>1</div>";
	newhtml += "</div>";
	newhtml += "2";
	newhtml += "</div>";
var expect = '<div>';
	expect += '<span class="sub">1</span>';
	expect += '<p><span class="RTCompare">1</span></p>';
	expect += '<div>';
	expect += '<p><span class="RTCompare">2</span></p>';
	expect += '<p class="add">3</p>';
	expect += '<h class="sub">3</h>';
	expect += '<span class="RTCompare">2</span>';
	expect += '<div class="add">1</div>';
	expect += '</div>';
	expect += '<span class="add">2</span>';
	expect += '</div>';
var expect = '<div><span class="sub">1</span><p><span class="RTCompare">1</span></p><div><p><span class="RTCompare">2</span></p><h><span class="RTCompare">3</span></h><span class="RTCompare">2</span><div class="add">1</div></div><span class="add">2</span></div>';
var testName = "最终测试！！！22"
test(oldhtml, newhtml, expect, testName);


var oldhtml = "<h>1</h><h>2</h><p>3</p>";
var newhtml = "<p>3</p>";
var expect = '<h class="sub">1</h><h class="sub">2</h><p><span class="RTCompare">3</span></p>';
var testName = "中间删除多个"
test(oldhtml, newhtml, expect, testName);

var oldhtml = "<p><br/></p>";
var newhtml = "<p><br/></p>";
// var expect = '<p><br/></p>';
var expect = '<p><br/></p>'
var testName = "带有自闭标签"
test(oldhtml, newhtml, expect, testName);


// var oldhtml = "<div><div><div>1</div></div></div>";
// var newhtml = "<div><div>2</div></div>";

var oldhtml = "<p><p>123</p>1</p>";
var newhtml = "<p>1</p>";
var expect = '<p><p class="sub">123</p><span class="RTCompare">1</span></p>';
var testName = "带有自闭标签"
test(oldhtml, newhtml, expect, testName);

// var oldhtml = "<div>123</div><div>123</div><div>456</div>";
// var newhtml = "<div>123</div><div>456</div>";
// var testName = "带有自2"
// var expect = '<div><span class="RTCompare">123</span></div><div class="sub"><span class="RTCompare">123</span></div><div class="RTCompare">456</div>'
// test(oldhtml, newhtml, expect, testName);



var oldhtml = "<p>1</p><p>2</p>";
var newhtml = "<p>1</p><p>3</p><p>2</p>";
var testName = "相似节点"
var expect = '<p><span class="RTCompare">1</span></p><p class="add">3</p><p><span class="RTCompare">2</span></p>'
test(oldhtml, newhtml, expect, testName);



var oldhtml = "<p>456</p><p>123</p><p>aaa</p>";
var newhtml = "<p>456</p><p>aaa</p>";
var testName = "文本比较";
var expect = '<p><span class="RTCompare">456</span></p><p class="sub">123</p><p><span class="RTCompare">aaa</span></p>';
test(oldhtml, newhtml, expect, testName);

var oldhtml = "2<span>1</span>1";
var newhtml = "2<span>1</span>1";
var testName = "文本比较";
var expect = '<span class="RTCompare">2</span><span><span class="RTCompare">1</span></span><span class="RTCompare">1</span>';
test(oldhtml, newhtml, expect, testName);


var oldhtml = "<p>2</p><p>3</p><p>1</p>";
var newhtml = "<p>1</p><p>2</p><p>3</p>"; 

var testName = "123=>231";
var expect = '<p class="sub">1</p><p><span class="RTCompare">2</span></p><p><span class="RTCompare">3</span></p><p class="add">1</p>';
test(oldhtml, newhtml, expect, testName);


var oldhtml = "<p>1</p><p>2</p><p>3</p>"; 
var newhtml = "<p>2</p><p>3</p><p>1</p>"; 

var testName = "231=>123";
var expect = '<p class="add">1</p><p><span class="RTCompare">2</span></p><p><span class="RTCompare">3</span></p><p class="sub">1</p>';
test(oldhtml, newhtml, expect, testName, true);



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
