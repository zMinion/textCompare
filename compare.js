var add_class_style_name = init.add_class_style_name;
var del_class_style_name = init.del_class_style_name;
var text_span_style_name = init.text_span_style_name;


var add_text_class_style_name = init.add_text_class_style_name;
var del_text_class_style_name = init.del_text_class_style_name;
var text_span_style_name = init.text_span_style_name;

function compare(root_n, root_o) {
	var uNode = UE.uNode;
	var newTree = new uNode({
		type: 'root',
		children: []
	});
	var sameNodeArr = node_getLCSLength(root_n, root_o, newTree);
	lcs_nodeCompare(sameNodeArr, newTree);

	//解析节点
	parseTree(newTree);
	return newTree;
}

function parseTree(newTree) {
	switch (newTree.type) {
		case 'root':
			for (var i = 0; i < newTree.children.length; i++) {
				parseTree(newTree.children[i]);
			}
			break;
		case 'same':
			isSame(newTree);
			break;
		case 'add':
			isAdd(newTree);
			break;
		case 'del':
			isDel(newTree);
			break
		case 'text':
			break;
	}
}

function isAdd(sameNodeArr) {

	if (dtd.$empty[sameNodeArr.node.tagName]) {
		var uNode = UE.uNode;
		var node = new uNode({
			type:'element',
			tagName:sameNodeArr.node.tagName,
			parentNode:sameNodeArr
		});
		sameNodeArr.type = "element";
		sameNodeArr.tagName = "p";
		sameNodeArr.attrs = {
			class : add_class_style_name
		}
		sameNodeArr.children = [];
		sameNodeArr.children.push(node);
		return
	}

	if (sameNodeArr.node.type == "text") {
		sameNodeArr.type = "text";
		sameNodeArr.data = '<span class="' + add_text_class_style_name + '">' + sameNodeArr.node.data + '</span>';
		return
	}
	sameNodeArr.type = "element"
	if (sameNodeArr.node.attrs['class']) {
		sameNodeArr.attrs = {}
		sameNodeArr.attrs['class'] = sameNodeArr.node.attrs['class'] + " " + add_class_style_name
	} else {
		sameNodeArr.attrs = {}
		sameNodeArr.attrs['class'] = add_class_style_name;
	}
	sameNodeArr.tagName = sameNodeArr.node.tagName;
	sameNodeArr.children = sameNodeArr.node.children;
}

function isDel(sameNodeArr) {
	
	if (dtd.$empty[sameNodeArr.node.tagName]) {
		var uNode = UE.uNode;
		var node = new uNode({
			type:'element',
			tagName:sameNodeArr.node.tagName,
			parentNode:sameNodeArr
		});
		sameNodeArr.type = "element";
		sameNodeArr.tagName = "p";
		sameNodeArr.attrs = {
			class : del_class_style_name
		}
		sameNodeArr.children = [];
		sameNodeArr.children.push(node);
		return
	}

	if (sameNodeArr.node.type == "text") {
		sameNodeArr.type = "text";
		sameNodeArr.data = '<span class="' + del_text_class_style_name + '">' + sameNodeArr.node.data + '</span>';
		return
	}
	sameNodeArr.type = "element"
	if (sameNodeArr.node.attrs['class']) {
		sameNodeArr.attrs = {}
		sameNodeArr.attrs['class'] = sameNodeArr.node.attrs['class'] + " " + del_class_style_name
	} else {
		sameNodeArr.attrs = {}
		sameNodeArr.attrs['class'] = del_text_class_style_name;
	}
	sameNodeArr.tagName = sameNodeArr.node.tagName;
	sameNodeArr.children = sameNodeArr.node.children;
}

/**
 * 可能相似的节点有：
 * - 文本节点和文本节点
 * - 文本节点和非自闭标签
 * - 非自闭标签和非自闭标签
 * - 自闭标签和自闭标签
 */
function isSame(sameNodeArr) {
	//文本节点和文本节点
	if (sameNodeArr.node_n.type == "text" && sameNodeArr.node_o.type == "text") {
		var data = parseText(sameNodeArr.children.data);
		sameNodeArr.data = data;
		sameNodeArr.type = "text";
		sameNodeArr.children = null;
	}
	//文本节点和非自闭标签节点
	if (sameNodeArr.node_n.type == "text" && sameNodeArr.node_o.children || sameNodeArr.node_n.children && sameNodeArr.node_o.type == "text") {
		var tagName = "";
		var text_n = "";
		var text_o = "";
		if (sameNodeArr.node_n.type == "text") {
			tagName = sameNodeArr.node_o.tagName;
			text_n = sameNodeArr.node_n.data;
			text_o = getText(sameNodeArr.node_o, []).join('');
		} else {
			tagName = sameNodeArr.node_n.tagName;
			text_n = getText(sameNodeArr.node_n, []).join('');
			text_o = sameNodeArr.node_o.data;
		}
		sameNodeArr.type = "element";
		sameNodeArr.tagName = tagName;
		var lastArr = []
		compareText(text_n, text_o, lastArr, sameNodeArr);
		var data = parseText(lastArr);
		var uNode = UE.uNode;
		var node = new uNode({
			type: 'text',
			parentNode: sameNodeArr,
			data: data
		});
		sameNodeArr.children = [];
		sameNodeArr.children.push(node);
	}
	if (dtd.$empty[sameNodeArr.node_n.tagName] && dtd.$empty[sameNodeArr.node_o.tagName]) {
		sameNodeArr.tagName = sameNodeArr.node_n.tagName;
		sameNodeArr.type = "element";
	}
	//非自闭标签与非自闭标签
	if (sameNodeArr.node_n.children && sameNodeArr.node_o.children) {
		sameNodeArr.type = "element";
		sameNodeArr.tagName = sameNodeArr.node_o.tagName;
		for (var i = 0; i < sameNodeArr.children.length; i++) {
			parseTree(sameNodeArr.children[i])
		}
	}
}

function getText(node, arr) {
	if (node.type == "text") {
		arr.push(node.data);
		return arr;
	}
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


function lcs_nodeCompare(sameNodeArr, newTree) {
	//递归执行
	for (var i = 0; i < sameNodeArr.length; i++) {
		var _sameNodeArr = node_getLCSLength(sameNodeArr[i].node_n, sameNodeArr[i].node_o, sameNodeArr[i])
		if (_sameNodeArr.length != 0) {
			lcs_nodeCompare(_sameNodeArr, sameNodeArr[i]);
		}
	}
}

function node_getLCSLength(node_n, node_o, newTree) {
	var isText = false;
	var lastArr = [];
	var sameNodeArr = [];
	if (node_n.type == "text" && node_o.type == "text") {
		compareText(node_n.data, node_o.data, lastArr, newTree);
		return [];
	}
	//lastArr 需要通过返回值来获取，如果返回[]则不继续进行遍历
	lastArr = compareNode(node_n, node_o, lastArr, newTree);
	for (var i = 0; i < lastArr.length; i++) {
		if (lastArr[i].type == "same") {
			sameNodeArr.push(lastArr[i]);
		}
	}
	return sameNodeArr;
}

function parseText(lastArr) {
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
				delArr.length = 0;
			}
			sameArr.push(lastArr[i].data);
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
	return lastStr
}

/**
 *  非文本节点进行对比
 *  - 文本节点与自闭标签对比
 *  - 自闭标签与自闭标签对比
 *  - 自闭标签与非自闭标签对比
 *  - 文本节点与非自闭标签对比
 *  - 非自闭标签与非自闭标签对比
 */
function compareNode(node_n, node_o, lastArr, newTree) {
	var lastLen = [];
	//文本节点与自闭标签对比
	// if (node_n.type == "text" && dtd.$empty[node_o.tagName] || dtd.$empty[node_n.tagName] && node_o.type == "text") {
	// 	//不合并
	// }
	//文本节点与非自闭标签对比
	if (node_n.type == "text" && node_o.children || node_o.type == "text" && node_n.children) {
		//可能合并
		if (judgeTag(node_n, node_o)) {
			lastArr.push({
				type: 'same',
				node_n: node_n,
				node_o: node_o,
				children: null,
				parentNode: newTree
			});
			newTree.children = lastArr;
		} else {

		}
		return [];
	}
	//自闭标签与自闭标签对比
	if (dtd.$empty[node_n.tagName] && dtd.$empty[node_o.tagName]) {
		//不合并
		return [];
	}
	//自闭标签与非自闭标签对比(含有children则为非自闭标签)
	if (node_n.children && dtd.$empty[node_o.tagName] || dtd.$empty[node_n.tagName] && node_o.children) {
		//可能合并
	}

	//非自闭标签与非自闭标签对比，文本节点与文本节点对比
	var x = node_n.children;
	var y = node_o.children;
	var c = [];
	var xLen = x.length;
	var yLen = y.length;
	for (var i = 0; i < x.length + 1; i++) {
		c[i] = new Array();
		for (var j = 0; j < y.length + 1; j++) {
			c[i][j] = 0;
		}
	}
	for (var i = 1; i < x.length + 1; ++i) {
		for (var j = 1; j < y.length + 1; ++j) {
			if (judgeTag(x[i - 1], y[j - 1])) {
				c[i][j] = c[i - 1][j - 1] + 1;
			} else if (c[i - 1][j] >= c[i][j - 1]) {
				c[i][j] = c[i - 1][j];
			} else {
				c[i][j] = c[i][j - 1];
			}
		}
	}
	printLCS(c, x, y, x.length, y.length, lastArr, lastLen, newTree);
	if (lastLen.length != 0) {
		if (lastLen[0]['i']) {
			var len = lastLen[0]['i'];
			var iArr = []
			for (var m = 0; m < len; m++) {
				iArr.push({
					type:'add',
					parentNode:newTree,
					node:x[m]
				})
			}
			lastArr = iArr.concat(lastArr);
		} else {
			var len = lastLen[0]['j'];
			var jArr = [];
			for (var n = 0; n < len; n ++) {
				jArr.push({
					type:'del',
					parentNode:newTree,
					node:y[n]
				})
			}
			lastArr = jArr.concat(lastArr);
		}
	}
	newTree.children = lastArr;
	// console.log(newTree)
	return lastArr;
	//在这里进行新增/删除的节点解析
}

function printLCS(c, x, y, i, j, lastArr, lastLen, newTree) {
	if (i == 0 && j != 0) {
		lastLen.push({
			j: j
		})
		return;
	}
	if (i != 0 && j == 0) {
		lastLen.push({
			i: i
		});
		return;
	}
	if (i == 0 && j == 0) {
		return;
	}
	if (judgeTag(x[i - 1], y[j - 1])) {
		printLCS(c, x, y, i - 1, j - 1, lastArr, lastLen, newTree);
		lastArr.push({
			type: 'same',
			node_n: x[i - 1],
			node_o: y[j - 1],
			children: [],
			parentNode: newTree
		})
	} else if (c[i - 1][j] >= c[i][j - 1]) {
		//add
		printLCS(c, x, y, i - 1, j, lastArr, lastLen, newTree);
		lastArr.push({
			type: 'add',
			node: x[i - 1],
			parentNode: newTree
		})
	} else {
		//del
		printLCS(c, x, y, i, j - 1, lastArr, lastLen, newTree);
		lastArr.push({
			type: 'del',
			node: y[j - 1],
			parentNode: newTree
		})
	}
}

/**
 * 文本节点与文本节点对比
 */
function compareText(text_n, text_o, lastArr, newTree) {
	var lastLen = [];
	var c = [];
	var x = text_n;
	var y = text_o;
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
	text_printLCS(c, x, y, x.length, y.length, lastArr, lastLen);
	if (lastLen.length != 0) {
		if (lastLen[0]['i']) {
			var len = lastLen[0]['i'];
			lastArr = [{
				type: 'add',
				data: x.slice(0, len)
			}].concat(lastArr);
		} else {
			var len = lastLen[0]['j'];
			lastArr = [{
				type: 'del',
				data: y.slice(0, len)
			}].concat(lastArr);
		}
	}
	var node = {
		type: 'text',
		data: lastArr,
		parentNode: newTree
	}
	newTree.children = node;
}


function text_printLCS(c, x, y, i, j, lastArr, lastLen) {
	if (i == 0 && j != 0) {
		lastLen.push({
			j: j
		})
		return;
	}
	if (i != 0 && j == 0) {
		lastLen.push({
			i: i
		});
		return;
	}
	if (i == 0 && j == 0) {

		return;
	}
	if (x[i - 1] == y[j - 1]) {
		text_printLCS(c, x, y, i - 1, j - 1, lastArr, lastLen);
		lastArr.push({
			type: 'same',
			data: x[i - 1]
		});
	} else if (c[i - 1][j] >= c[i][j - 1]) {
		text_printLCS(c, x, y, i - 1, j, lastArr, lastLen);
		lastArr.push({
			type: 'add',
			data: x[i - 1]
		})
	} else {
		text_printLCS(c, x, y, i, j - 1, lastArr, lastLen);
		lastArr.push({
			type: 'del',
			data: y[j - 1]
		})
	}
}


function judgeTag(node_n, node_o) {
	var flag = false;
	var grade = 0;
	if (node_n.tagName == node_o.tagName) {
		grade = 0.2;
	}
	var sim = similarity.exec(node_n, node_o);
	grade = grade + sim;
	if (grade >= 0.6) {
		return true;
	} else {
		return false;
	}
}