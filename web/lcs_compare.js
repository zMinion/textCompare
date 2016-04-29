var add_text_class_style_name = init.add_text_class_style_name;
var del_text_class_style_name = init.del_text_class_style_name;
var text_span_style_name = init.text_span_style_name;


var s1 = "1aaa2345"; //new
var s2 = "23456785";
// var rs = lcs_textCompare(s1, s2);

function lcs_textCompare(s1, s2) {
	var lastArr = getLCSLength(s1, s2);
	var lastStr = "";
	var sameArr = [];
	var addArr = [];
	var delArr = [];
	for (var i = 0; i < lastArr.length; i++) {
		if (lastArr[i].type == "add") {
			if (sameArr.length != 0) {
				lastStr += '<span class="' + text_span_style_name + '">' + sameArr.join('') + '</span>'
				sameArr.length = 0;
			}
			if (delArr.length != 0) {
				lastStr += '<span class="' + del_text_class_style_name + '">' + delArr.join('') + '</span>'
				delArr.length = 0;
			}
			addArr.push(lastArr[i].data);
			// lastStr += '<span class="add">' + lastArr[i].data + '</span>'
		} else if (lastArr[i].type == "del") {
			if (sameArr.length != 0) {
				lastStr += '<span class="' + text_span_style_name + '">' + sameArr.join('') + '</span>'
				sameArr.length = 0;
			}
			if (addArr.length != 0) {
				lastStr += '<span class="' + add_text_class_style_name + '">' + addArr.join('') + '</span>'
				addArr.length = 0;
			}
			delArr.push(lastArr[i].data);
			// lastStr += '<span class="del">' + lastArr[i].data + '</span>'
		} else {

			if (addArr.length != 0) {
				lastStr += '<span class="' + add_text_class_style_name + '">' + addArr.join('') + '</span>'
				addArr.length = 0;
			}
			if (delArr.length != 0) {
				lastStr += '<span class="' + del_text_class_style_name + '">' + delArr.join('') + '</span>'
				delArr.length = 0 ;
			}
			sameArr.push(lastArr[i].data);
			// lastStr += '<span class="RTCompare">' + lastArr[i].data + '</span>'
		}
	}
	if (sameArr.length != 0) {
		lastStr += '<span class="' + text_span_style_name + '">' + sameArr.join('') + '</span>'
	}
	if (delArr.length != 0) {
		lastStr += '<span class="' + del_text_class_style_name + '">' + delArr.join('') + '</span>'
	}
	if (addArr.length != 0) {
		lastStr += '<span class="' + add_text_class_style_name + '">' + addArr.join('') + '</span>'
	}
	return lastStr;
}


/**
 * 返回字符串数组的相似度
 * @ parma 新字符串数组
 * @ parma 旧字符串数组
 * @ return {number} 相似度 
 **/
function similarity_text(html_n, html_o) {
	var aver_len = parseInt((html_n.length + html_o.length) / 2);
	var equal_str = _getLCSLength(html_n, html_o);
	if (aver_len == 0) {
		return 0;
	}
	var similarity = equal_str.length / aver_len;
	similarity = similarity.toString().slice(0, 4);
	similarity = parseFloat(similarity);
	return similarity;
}

function _printLCS(c, x, y, i, j, lastArr) {
	if (i == 0 || j == 0) {
		return;
	}
	
	if (x[i - 1] == y[j - 1]) {
		_printLCS(c, x, y, i - 1, j - 1, lastArr);
		lastArr.push(x[i - 1]);
	} else if (c[i - 1][j] >= c[i][j - 1]) {
		_printLCS(c, x, y, i - 1, j, lastArr);
		
	} else {
		_printLCS(c, x, y, i, j - 1, lastArr);
	}
}


function _getLCSLength(str1, str2) {
	var lastArr = [];
	x = str1;
	y = str2;
	var c = [];
	for (var i = 0; i < x.length + 1; i++) {
		c[i] = new Array();
		for (var j = 0; j < y.length + 1; j++) {
			c[i][j] = 0;
		}
	}
	for (var i = 1; i < x.length + 1; ++i) {
		for (var j = 1; j < y.length + 1; ++j) {
			if (x[i - 1] == y[j - 1]) {
				c[i][j] = c[i - 1][j - 1] + 1;
			} else if (c[i - 1][j] >= c[i][j - 1]) {
				c[i][j] = c[i - 1][j];
			} else {
				c[i][j] = c[i][j - 1];
			}
		}
	}
	_printLCS(c, x, y, x.length, y.length, lastArr);
	
	return lastArr;
}

function similarity_tag(html_n, html_o) {
	var sim = similarity_text(html_n, html_o);
	return sim;
}


function similarity(node_n, node_o) {
	if (node_n.type == "text" || node_o.type == "text" || dtd.$empty[node_n.tagName] || dtd.$empty[node_o.tagName]) {
		return 0;
	}
	var html_n = getText(node_n, []).join('');
	var html_o = getText(node_o, []).join('');
	if (html_n == html_o) {
		return 1;
	}
	return similarity_tag(html_n, html_o);
}


function getText(node, arr) {
	if (node.children) {
		for (var i = 0; i < node.children.length; i++) {
			if (node.children[i].type == "text") {
				arr.push(node.children[i].data);
			} else {
				getText(node.children[i], arr);
			}
		}
		return arr;
	}
}

//1215
//1
function getLCSLength(str1, str2) {
	var lastArr = [];
	var lastLen = [];
	x = str1;
	y = str2;
	var c = [];
	for (var i = 0; i < x.length + 1; i++) {
		c[i] = new Array();
		for (var j = 0; j < y.length + 1; j++) {
			c[i][j] = 0;
		}
	}
	for (var i = 1; i < x.length + 1; ++i) {
		for (var j = 1; j < y.length + 1; ++j) {
			if (x[i - 1] == y[j - 1]) {
				c[i][j] = c[i - 1][j - 1] + 1;
			} else if (c[i - 1][j] >= c[i][j - 1]) {
				c[i][j] = c[i - 1][j];
			} else {
				c[i][j] = c[i][j - 1];
			}
		}
	}
	printLCS(c, x, y, x.length, y.length, lastArr, lastLen);
	if (lastLen.length != 0) {
		if (lastLen[0]['i']) {
			var len = lastLen[0]['i'];
			lastArr = [{
				type: 'add',
				data: str1.slice(0, len)
			}].concat(lastArr);
		} else {
			var len = lastLen[0]['j'];
			lastArr = [{
				type: 'del',
				data: str2.slice(0, len)
			}].concat(lastArr);
		}
	}
	return lastArr;
}

function printLCS(c, x, y, i, j, lastArr, lastLen) {
	if (i == 0 && j == 0) {
		return;
	}
	if (i == 0 && j != 0) {
		lastLen.push({
			j: j
		})
		return
	}
	if (i != 0 && j == 0) {
		lastLen.push({
			i: i
		})
		return
	}
	if (x[i - 1] == y[j - 1]) {
		printLCS(c, x, y, i - 1, j - 1, lastArr, lastLen);
		lastArr.push({
			type: 'same',
			data: x[i - 1]
		})
	} else if (c[i - 1][j] >= c[i][j - 1]) {
		printLCS(c, x, y, i - 1, j, lastArr, lastLen);
		lastArr.push({
			type: 'add',
			data: x[i - 1]
		})
	} else {
		printLCS(c, x, y, i, j - 1, lastArr, lastLen);
		lastArr.push({
			type: 'del',
			data: y[j - 1]
		})
	}
}