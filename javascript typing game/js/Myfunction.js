
//兼容IE FF获取classname Bug问题
/*
	ClassName ---->获取标签名
	obj       ---->对象名(指定的范围)，可以为空
*/
		function getClass(ClassName,obj) {
			obj = obj || document;
			newArr = [];
			if(document.getElementsByClassName){
				return obj.getElementsByClassName(ClassName);
			}else{
				var tmp = obj.getElementsByTagName("*");
				for (var i=0; i<tmp.length; i++) {
					if (tmp[i].className == ClassName) {
						newArr.push(tmp[i]);
					}
				}
				return newArr;
			}
		}

//兼容IE FF操作内容Bug问题
/*
	ClassName  ---->标签名
	texts      ---->操作的内容(可以为空)
*/

		function Content(ClassName,texts) {
			if(document.all){
				if(texts){
					return ClassName.innerText = texts;
				}else{
					return ClassName.innerText;
				}
			}else{
				if(texts){
					return ClassName.textContent = texts;
				}else{
					return ClassName.textContent;
				}
			}
		}

//兼容IE FF获取css外联样式属性Bug
/*
	obj  ---->操作对象
	att  ---->操作的属性
*/
		function getAtt(obj,att) {
			if(document.all){
				return obj.currentStyle[att];
			}else{
				return getComputedStyle(obj,null)[att];
			}
		}



//获取元素的所有节点
/*
	ob是要获取所有节点的对象
	**********返回值是以数组形式返回**********
*/
	function childs (obj) {
		childs = obj.childNodes;
		var arr = [];
		for (var i=0; i<childs.length; i++) {
			if (childs[i].nodeType == 3) {
				continue
			}else{
				arr.push(childs[i])
			}
		}
		return arr
	}


//获取对象的第一个子节点
/*
	obj是要获取第一个子节点的对象
	其原理是如果firstC.nodeType的是文本时 就寻找下一个兄弟节点  以此类推
*/
	function firstC (obj) {
		var firstC = obj.firstChild;
		while(firstC.nodeType == 3) {
			firstC = firstC.nextSibling;
		}
		return firstC;
	}

//获取对象的最后一个节点
/*
	obj是要获取最后一个子节点的对象
	其原理是如果lastC.nodeType是文本时 就寻找上一个兄弟节点  以此类推
*/
	function lastC (obj) {
		var lastC = obj.lastChild;
		while(lastC.nodeType == 3){
			lastC = lastC.previousSibling;
		}
		return lastC;
	}


//获取上一个兄弟节点兼容FF
/*
	obj是要获取上一个兄弟节点的对象
*/
	function previous(obj) {
		var previous = obj.previousSibling;
		while(previous.nodeType == 3){
			previous = previous.previousSibling;
		}
		return previous;
	}

//获取下一个兄弟节点兼容FF
/*
	obj是要获取下一个兄弟节点的对象
*/
	function nextS(obj) {
		var nexts = obj.nextSibling;
		while(nexts.nodeType == 3){
			nexts = nexts.nextSibling;
		}
		return nexts;
	}


//把创建的对象插入一个对象的后面
	function insertAfte(out,obj,insert) {
		var nextt = insert.nextSibling;
		out.insertBefore(obj,nextt);
	}





//***********************************************************************************************************






