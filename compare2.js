// var add_class_style_name = init.add_class_style_name;
// var del_class_style_name = init.del_class_style_name;
// var text_span_style_name = init.text_span_style_name;


// function compare(root_n, root_o) {
// 	var newTree = root_n;
// 	var root_wrap = node_compare(root_n, root_o, newTree);
// 	traversal(root_wrap);
// 	return newTree;
// 	// 解析完毕
// }

// //树的遍历
// function traversal(root_wrap) {
// 	for (var i = 0; i < root_wrap.arr_same_n.length; i++) {
// 		var node = root_wrap.arr_same_o[i];
// 		//这个命名要避免和开头的for里面的参数相同
// 		var _root_wrap = node_compare(root_wrap.arr_same_n[i], root_wrap.arr_same_o[i], node);
// 		if (!isEmptyObj(_root_wrap)) {
// 			traversal(_root_wrap);
// 		}
// 	}
// }

// function judgeTag(node_n, node_o) {
// 	var flag = false;
// 	var grade = 0;
// 	if (node_n.tagName == node_o.tagName) {
// 		grade = 0.2;
// 	}
// 	var sim = similarity(node_n, node_o);
// 	grade = grade + sim;
// 	if (grade >= 0.5) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }

// /**
//  * 输入父节点比较其子节点的异同
//  * @ parma {node} node_n
//  * @ parma {node} node_o
//  * @ parma {node} newTree
//  * return {array} new_child_arr
//  */
// function node_compare(node_n, node_o, newTree) {
// 	//如果两个节点都是文本节点
// 	if (node_n.type == "text" && node_o.type == "text") {
// 		if (node_n.data == node_o.data) {
// 			var uNode = UE.uNode;
// 			var node_text = new uNode({
// 				type: 'text',
// 				data: node_n.data,
// 				parentNode: node_n
// 			});
// 			newTree.type = "element";
// 			newTree.tagName = "span";
// 			add_attrs_class(newTree, text_span_style_name);
// 			newTree.children = [node_text];
// 			newTree.children = [node_n];
// 			return {};
// 		} else {

// 		}
// 	}
// 	var child_arr_n = node_n.children;
// 	var child_arr_o = node_o.children;

// 	if (!child_arr_n || !child_arr_o) {
// 		return {};
// 	}
// 	var new_child_arr = [];

// 	var i = 0;
// 	var j = 0;

// 	var arr_same_n = [];
// 	var arr_same_o = []


// 	while (i < child_arr_n.length) {
// 		var currentTag = child_arr_n[i];
// 		while (j < child_arr_o.length) {
// 			compare_node = judgeTag(child_arr_n[i], child_arr_o[j]);
// 			if (child_arr_n[i].type == "text" && child_arr_o[j].type == "text") {
// 				var str = lcs_textCompare(child_arr_n[i].data, child_arr_o[j].data);
// 				child_arr_o[j].data = str;
// 				compare_node = true;
// 				// new_child_arr.push(child_arr_o[j]);
// 				// break;
// 			}
// 			if (dtd.$empty[child_arr_n[i].tagName] && dtd.$empty[child_arr_o[j].tagName]) {
// 				compare_node = true;
// 			}
// 			//如果两个都是文本节点，则tagName为undefined，也能匹配成功，所以要对其进行检测
// 			if (compare_node) {
// 				if (i < j) {
// 					//旧节点被删除
// 					for (var k = 0; k < j; k++) {
// 						var isDel = true;
// 						for (var m = i + 1; m < child_arr_n.length; m++) {
// 							if (judgeTag(child_arr_n[m], child_arr_o[k])) {
// 								isDel = false;
// 								//j不用被删除
// 								child_arr_o[j].notDel = true;
// 							}
// 						}
// 						if (isDel) {
// 							child_arr_o[k].status = 2;
// 							if (child_arr_o[k].type == 'text') {
// 								// 	//important
// 								addTextNode_byLocation(child_arr_o[k], k);
// 							}
// 							child_arr_o[k].isDel = true;

// 							add_attrs_class(child_arr_o[k], del_class_style_name);
// 							new_child_arr.push(child_arr_o[k]);
// 						}
// 					}
// 					if (!child_arr_o[j].notDel) {
// 						child_arr_o[j].status = 0;
// 						//将匹配成功的分别保存起来
// 						arr_same_n.push(child_arr_n[i]);
// 						arr_same_o.push(child_arr_o[j]);

// 						new_child_arr.push(child_arr_o[j]);
// 					} else {
// 						child_arr_n[i].status = 1;						
// 						add_attrs_class(child_arr_n[i], add_class_style_name);
// 						// arr_same_n.push(child_arr_n[i]);
// 						new_child_arr.push(child_arr_n[i]);
// 					}
// 				} else {
// 					child_arr_o[i].status = 0;

// 					//将匹配成功的分别保存起来
// 					arr_same_n.push(child_arr_n[i]);
// 					arr_same_o.push(child_arr_o[j]);

// 					new_child_arr.push(child_arr_o[i]);
// 				}
// 				arr_del_by_num(child_arr_n, i);
// 				if (!child_arr_o[j].notDel) {
// 					arr_del_by_num(child_arr_o, j);
// 				}
// 				var k = 0;
// 				while (k < j) {
// 					if (child_arr_o[k] && child_arr_o[k].isDel) {
// 						arr_del_by_num(child_arr_o, k);
// 					} else {
// 						k++;
// 					}
// 				}
// 				// for (var k = 0; k < j; k++) {
// 				// 	arr_del_by_num(child_arr_o, 0);
// 				// 	// console.log(child_arr_o[0]);
// 				// }
// 				i--;
// 				break;
// 			} else {
// 				if (j == child_arr_o.length - 1) {
// 					//是新增节点
// 					currentTag.status = 1;
// 					if (currentTag.type == "text") {
// 						// if (init.isPrecision && child_arr_o[j].type == "text") {
// 						// 	currentTag.data = textCompare(currentTag.data, child_arr_o[j].data);	
// 						// 	arr_del_by_num(child_arr_o, j);
// 						// } else {
// 						currentTag = addTextNode_byLocation(currentTag, i);
// 						// }
// 					}
// 					add_attrs_class(currentTag, add_class_style_name);
// 					new_child_arr.push(currentTag);
// 					arr_del_by_num(child_arr_n, i);
// 					i--;
// 				}
// 				j++;
// 			}
// 		}
// 		j = 0;
// 		i++;
// 	}

// 	if (child_arr_n.length == 0 && child_arr_o.length != 0) {
// 		for (var i in child_arr_o) {
// 			child_arr_o[i].status = 2;
// 			if (child_arr_o[i].type == 'text') {
// 				//important
// 				addTextNode_byLocation(child_arr_o[i], i);
// 			}
// 			add_attrs_class(child_arr_o[i], del_class_style_name);
// 			new_child_arr.push(child_arr_o[i]);
// 		}
// 		child_arr_o = [];
// 	}
// 	if (child_arr_n.length != 0 && child_arr_o.length == 0) {
// 		for (var i in child_arr_n) {
// 			//important
// 			if (child_arr_n[i].type == 'text') {
// 				addTextNode_byLocation(child_arr_n[i], i);
// 			}
// 			child_arr_n[i].status = 1;
// 			add_attrs_class(child_arr_n[i], add_class_style_name);
// 			new_child_arr.push(child_arr_n[i]);
// 		}
// 		child_arr_n = [];
// 	}

// 	newTree.children = new_child_arr;

// 	var root_wrap = {
// 		arr_same_n: arr_same_n,
// 		arr_same_o: arr_same_o
// 	}

// 	return root_wrap;
// }


// /**
//  * 判断对象是否为空
//  */
// function isEmptyObj(Obj) {
// 	var flag = false;
// 	for (var i in Obj) {
// 		flag = true;
// 		break;
// 	}
// 	if (flag) {
// 		return false;
// 	} else {
// 		return true;
// 	}
// }

// function addTextNode_byLocation(textNode, location, status) {
// 	var text = textNode.data;
// 	var parentNode = textNode.parentNode;
// 	var uNode = UE.uNode;
// 	var node_text = new uNode({
// 		type: 'text',
// 		data: text
// 	});
// 	var class_name = "";

// 	if (status == 1) { //新增
// 		class_name = add_class_style_name;
// 	} else if (status == 2) { //删除
// 		class_name = del_class_style_name;
// 	}
// 	var node_span = new uNode({
// 		type: 'element',
// 		attrs: {
// 			class: class_name
// 		},
// 		children: [node_text],
// 		tagName: "span",
// 		parentNode: parentNode
// 	});
// 	node_text.parentNode = node_span;
// 	parentNode.children[location] = node_span;
// 	return node_span;
// }


// //给节点添加类
// function add_attrs_class(node, class_name) {
// 	if (node.attrs['class']) {
// 		node.attrs['class'] = node.attrs['class'] + " " + class_name
// 	} else {
// 		node.attrs['class'] = class_name;
// 	}
// }

// function arr_del_by_num(arr, num) {
// 	if (num > arr.length - 1) {
// 		throw new Error("数组下标大于数组长度");
// 	};
// 	for (var i = num; i < arr.length; i++) {
// 		arr[i] = arr[i + 1];
// 	};
// 	arr.length = arr.length - 1;
// 	return arr;
// }