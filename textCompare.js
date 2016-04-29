// var add_text_class_style_name = init.add_text_class_style_name;
// var del_text_class_style_name = init.del_text_class_style_name;
// var text_span_style_name = init.text_span_style_name;

// var oldText = "4236";
// var newText = "5723";

// // console.log(textCompare(newText, oldText));

// function textCompare(text_n, text_o) {
// 	if (text_n == text_o) {
// 		return text_n;
// 	}
// 	var newText = [];
// 	// var text_arr_n = text_n.split("_115_");
// 	// var text_arr_o = text_o.split("_115_");
// 	var text_arr_n = text_n.split("");
// 	var text_arr_o = text_o.split("");
// 	// var text_arr_n = ['你好', '我', '是', '分词', '后', '的', '结果'];
// 	// var text_arr_o = ['你好', '我', '不是', '分词', '后', '的', '结果'];

// 	var i = 0;
// 	var j = 0;

// 	var equ_text = []; //连续的相同字符只需要用一个span来缠绕
// 	var add_text = []; //连续的新增字符只需要用一个span来缠绕
// 	var del_text = []; //连续的被删字符只需要用一个span来缠绕

// 	while (i < text_arr_n.length) {
// 		var currentText = text_arr_n[i];
// 		while (j < text_arr_o.length) {
// 			if (text_arr_n[i] == text_arr_o[j]) {
// 				concatTextArr(add_text, add_text_class_style_name, newText);
// 				if (i < j) {
// 					//被删字符
// 					for (var k = 0; k < j; k++) {
// 						// text_arr_o[k] = textAddSpan(text_arr_o[k], del_text_class_style_name);
// 						// newText.push(text_arr_o[k]);
// 						// concatTextArr(del_text, del_text_class_style_name, newText);
// 						del_text.push(text_arr_o[k]);
// 					}
// 					equ_text.push(text_arr_o[j]);
// 				} else {
// 					concatTextArr(del_text, del_text_class_style_name, newText);
// 					concatTextArr(del_text, del_text_class_style_name, newText);
// 					//不变字符
// 					equ_text.push(text_arr_o[i]);
// 				}
// 				arr_del_by_num(text_arr_o, j);
// 				arr_del_by_num(text_arr_n, i);
// 				for (var k = 0; k < j; k++) {
// 					arr_del_by_num(text_arr_o, 0);
// 				}
// 				i--;
// 				break;
// 			} else {
// 				concatTextArr(del_text, del_text_class_style_name, newText);
// 				concatTextArr(equ_text, text_span_style_name, newText);
// 				//是新增字符
// 				if (j == text_arr_o.length - 1) {

// 					//是新增节点
// 					// currentText = textAddSpan(currentText, add_text_class_style_name);
// 					// newText.push(currentText);

// 					add_text.push(currentText);

// 					arr_del_by_num(text_arr_n, i);
// 					i--;
// 				}
// 				j++;
// 			}
// 		}
// 		j = 0;
// 		i++;
// 	}

// 	if (text_arr_n.length == 0 && text_arr_o.length != 0) {
// 		concatTextArr(del_text, del_text_class_style_name, newText);
// 		concatTextArr(add_text, add_text_class_style_name, newText);
// 		concatTextArr(equ_text, text_span_style_name, newText);
// 		newText = newText.join('');
// 		newText = newText + '<span class="' + del_text_class_style_name + '">' + text_arr_o.join('') + '</span>';
// 		return newText;
// 	}
// 	if (text_arr_n.length != 0 && text_arr_o.length == 0) {
// 		concatTextArr(del_text, del_text_class_style_name, newText);
// 		concatTextArr(add_text, add_text_class_style_name, newText);
// 		concatTextArr(equ_text, text_span_style_name, newText);
// 		newText = newText.join('');
// 		newText = newText + '<span class="' + add_text_class_style_name + '">' + text_arr_n.join('') + '</span>';
// 		return newText;
// 	}

// 	//当相同字符就在句末	
// 	concatTextArr(del_text, del_text_class_style_name, newText);
// 	concatTextArr(add_text, add_text_class_style_name, newText);
// 	concatTextArr(equ_text, text_span_style_name, newText);
// 	newText = newText.join('');
// 	return newText;
// }


// function concatTextArr(arr, class_name, newText) {
// 	if (arr.length != 0) {
// 		_arr = '<span class="' + class_name + '">' + arr.join('') + '</span>';
// 		newText.push(_arr);
// 		arr.length = 0;
// 	}
// }

// //将字符用span缠绕
// function textAddSpan(text, class_name) {
// 	if (class_name) {
// 		return '<span class="' + class_name + '">' + text + '</span>';
// 	} else {
// 		return '<span>' + text + '</span>';
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

// /**
//  * 返回字符串数组的相似度
//  * @ parma 新字符串数组
//  * @ parma 旧字符串数组
//  * @ return {number} 相似度 
//  **/
// function similarity_text(text_arr_n, text_arr_o) {
// 	var aver_len = parseInt((text_arr_n.length + text_arr_o.length) / 2);
// 	var equal_str = 0;
// 	for (var i = 0; i < text_arr_n.length; i++) {
// 		for (var j = 0; j < text_arr_o.length; j++) {
// 			if (text_arr_n[i] == text_arr_o[j]) {
// 				equal_str++;
// 			}
// 		}
// 	}
// 	var similarity = equal_str / aver_len;
// 	similarity = similarity.toString().slice(0, 4);
// 	similarity = parseFloat(similarity);
// 	return similarity;
// }


// function similarity_tag(html_n, html_o) {
// 	var sim = similarity_text(html_n, html_o);
// 	return sim;
// }



// var html_n = "<p>1_115_2_115_3</p><p>1_115_2_115_3</p>";
// var html_o = "<p>1_115_2_115_3</p>";
// var node_n = UE.htmlparser(html_n);
// var node_o = UE.htmlparser(html_o);

// // similarity(node_n, node_o);


// function similarity(node_n, node_o) {
// 	if (node_n.type == "text" || node_o.type == "text" || dtd.$empty[node_n.tagName] || dtd.$empty[node_o.tagName]) {
// 		return 0;
// 	}
// 	var html_n = getText(node_n, []).join('');
// 	var html_o = getText(node_o, []).join('');
// 	return similarity_tag(html_n, html_o);
// }


// function getText(node, arr) {
// 	if (node.children) {
// 		for (var i = 0; i < node.children.length; i++) {
// 			if (node.children[i].type == "text") {
// 				arr.push(node.children[i].data);
// 			} else {
// 				getText(node.children[i], arr);
// 			}
// 		}
// 		return arr;
// 	}
// }



