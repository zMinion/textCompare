var similarity = {};;
(function() {
	/**
	 * 返回节点的相似度
	 * @ parma 节点
	 * @ parma 节点
	 * @ return {number} 相似度 
	 **/
	similarity.exec = function similarity(node_n, node_o) {
		//还有自闭标签需要处理
		var html_n = getText(node_n, []);
		var html_o = getText(node_o, []);
		if (html_n) {
			html_n = html_n.join('');
		} else {
			html_n = "";
		}
		if (html_o) {
			html_o = html_o.join('');
		} else {
			html_o = "";
		}
		if (!html_n && !html_o) {
			if (node_n.tagName == node_o.tagName) {
				return 1;
			} else {
				return 0;
			}
			// 没有文本的时候，比较标签名字
		}
		
		if (html_n == html_o) {
			return 1;
		}
		return similarity_tag(html_n, html_o);
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

	function similarity_tag(html_n, html_o) {
		var sim = similarity_text(html_n, html_o);
		return sim
	}

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

	function _getLCSLength(str1, str2) {
		var lastArr = [];
		var x = str1;
		var y = str2;
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
})();