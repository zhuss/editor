
function ZhuEditor(EleId){
	this.Ele = document.querySelector(EleId);
	this.init(this.Ele);
	return this;
}

ZhuEditor.prototype.init = function(){
	this.Ele.innerHTML = 
	`<div class="editor-bar">
		<button class="bold">粗体</button>
		<button class="italic">斜体</button>
		<button class="underline">下划线</button>
		<button class="img">插入图片</button>
		</div>
	<div class="editor-body" contenteditable>
		<p><br></p>
	</div>`;
	this.Ele.setAttribute("class","editor");
	var editorBody = this.Ele.querySelector(".editor-body");
	var bold = this.Ele.querySelector(".bold");
	var italic = this.Ele.querySelector(".italic");
	var underline = this.Ele.querySelector(".underline");
	var img = this.Ele.querySelector(".img");

	editorBody.addEventListener("keydown",function(e){
		var rang = document.getSelection().getRangeAt(0);
		if(e.code  == "ArrowUp"||e.code  == "ArrowDown"||e.code  == "ArrowLeft"||e.code  == "ArrowRight"||e.code  == "Enter"){

		}else if(e.code == "Backspace"){
	  		if(e.target.children.length==1 && e.target.children[0].innerHTML =="<br>"){
	  			e.returnValue=false;
	  		}
	  		//处理图片删除
	  		if(rang.commonAncestorContainer.nodeName == "#text"
	  			&&rang.endOffset == 0
	  			&&rang.commonAncestorContainer.parentNode.previousSibling
	  			&&rang.commonAncestorContainer.parentNode.previousSibling.children.length
	  			&&rang.commonAncestorContainer.parentNode.previousSibling.children[0].nodeName=="IMG"){
	  			rang.commonAncestorContainer.parentNode.previousSibling.remove();
	  			e.returnValue=false;
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
	  	var text = "";
	  	text = e.clipboardData.getData('text/plain');
	  	document.execCommand("insertText",false,text);
	  	e.preventDefault();
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

	//插入图片
	img.addEventListener("click",function(e){
		let imgUrl = "http://video.yingtu.co/8/image/288559ae-3365-4130-b9dc-b7a5ef187dea.jpg";
		document.execCommand("insertHtml", false, "<p><img src="+imgUrl+">");
	},false);
}

ZhuEditor.prototype.getValue = function(){
	return 	this.Ele.querySelector(".editor-body").innerHTML;
}

ZhuEditor.prototype.setValue = function(val){
 	this.Ele.querySelector(".editor-body").innerHTML = val;
}
