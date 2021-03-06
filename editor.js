/*******************************************************************************
* ZhuEditor 简答的文本编辑工具、件支持简单的图文排版；
* 去除多余样式的干扰，只保留最简单的标签，更有利于阅读。
* 难到怀疑人生*
*******************************************************************************/

function ZhuEditor(EleId,fn){
	this.Ele = document.querySelector(EleId);
	this.uploadFn = fn;
	this.init(this.Ele);
	return this;
}

ZhuEditor.prototype.init = function(){
	this.Ele.innerHTML = '<div class="editor-bar"><button type="button" class="bold"><i class="simditor-icon simditor-icon-bold"></i></button><button type="button" class="italic"><i class="simditor-icon simditor-icon-italic"></i></button><button type="button" class="underline"><i class="simditor-icon simditor-icon-underline"></i></button><button type="button" class="link"><i class="simditor-icon simditor-icon-link"></i></button><button type="button" class="unlink"><i class="simditor-icon simditor-icon-unlink"></i></button><span class="in"><button type="button"><i class="simditor-icon simditor-icon-picture-o"></i></button><input class="input" type="file" accept="image/jpg"/></span></div><div class="editor-body" contenteditable><p><br></p></div>';
	this.Ele.setAttribute("class","editor");
	var editorBody = this.Ele.querySelector(".editor-body");
	var bold = this.Ele.querySelector(".bold");
	var italic = this.Ele.querySelector(".italic");
	var underline = this.Ele.querySelector(".underline");
	var img = this.Ele.querySelector(".img");
	var link = this.Ele.querySelector(".link");
	var input = this.Ele.querySelector(".input");
	var unlink = this.Ele.querySelector(".unlink");
	var _this = this;

	editorBody.addEventListener("keydown",function(e){

		var rang = document.getSelection().getRangeAt(0);
		if(e.code  == "ArrowUp"||e.code  == "ArrowDown"||e.code  == "ArrowLeft"||e.code  == "ArrowRight"||e.code  == "Enter"){

		}else if(e.code == "Backspace"){
	  		if(e.target.children.length==1 && e.target.children[0].innerHTML =="<br>"){
	  			e.preventDefault();
	  		}
	  		//处理图片删除
	  		if(rang.commonAncestorContainer.nodeName == "#text"
	  			&&rang.endOffset == 0
				&&rang.commonAncestorContainer.parentNode.previousSibling
				&&rang.commonAncestorContainer.parentNode.previousSibling.children
	  			&&rang.commonAncestorContainer.parentNode.previousSibling.children.length
	  			&&rang.commonAncestorContainer.parentNode.previousSibling.children[0].nodeName=="IMG"){
	  			rang.commonAncestorContainer.parentNode.previousSibling.remove();
	  			e.preventDefault();
	  		}
	  	}else{
	  		//处理前后添加文字
	  		if(rang.commonAncestorContainer.nodeName == "P"
	  			&&rang.commonAncestorContainer.children.length==1
	  			&&rang.commonAncestorContainer.children[0].nodeName =="IMG"){
				document.execCommand("insertHtml", false, "<p><br></p>");
			}
	  	}
	  },false);

	//粘贴监听
	editorBody.addEventListener("paste",function(e){
		    e.preventDefault();
		var clipboardData = e.clipboardData || window.clipboardData;
		var text = clipboardData.getData('text/plain');
		    document.execCommand("insertText",false,text);

		var html =  clipboardData.getData('text/html');
		var div = document.createElement("div");
		    div.innerHTML = html;
		var imgs =  div.querySelectorAll("img");
		for(var i = 0; i < imgs.length;i++){
			if(imgs[i].src) {
			  document.execCommand("insertHtml", false, "<p><img src="+imgs[i].src+"></p>");
			}
		}
	},false);

	//阻止拖拽事件
	editorBody.addEventListener("drop",function(e){
	  	e.preventDefault();
	},false);

	//字体加粗
	bold.addEventListener("click",function(e){
		document.execCommand('bold', false, null);
	},false);

	//字体加粗
	italic.addEventListener("click",function(e){
		document.execCommand('italic', false, null);
	},false);

	//加下划线
	underline.addEventListener("click",function(e){
		document.execCommand('underline', false, null);
	},false);

	//添加链接
	link.addEventListener("click",function(e){
		var href = prompt("请输入链接","http://");
		if(href){
			document.execCommand('createlink', false,href);
		}
	},false);

	//去除链接
	unlink.addEventListener("click",function(e){
		document.execCommand('unlink', false, null);
	},false);

	//插入图片
	input.addEventListener("change",function(e){
		_this.uploadFn(e,function(url){
			document.execCommand("insertHtml", false, "<p><img src="+url+"></p>");
		});
	});
}

//获取输入的富文本
ZhuEditor.prototype.getValue = function(){
	return 	this.Ele.querySelector(".editor-body").innerHTML;
}

//设置富文本
ZhuEditor.prototype.setValue = function(val){
 	this.Ele.querySelector(".editor-body").innerHTML = val;
}