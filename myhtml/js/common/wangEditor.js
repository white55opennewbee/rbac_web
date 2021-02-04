var E = window.wangEditor
var editor = new E("#wangEditor")
editor.customConfig.debug = true;
// 关闭粘贴内容中的样式
editor.customConfig.pasteFilterStyle = false
// 忽略粘贴内容中的图片
editor.customConfig.pasteIgnoreImg = true
// 使用 base64 保存图片
//editor.customConfig.uploadImgShowBase64 = true

// 上传图片到服务器s
editor.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
editor.customConfig.uploadImgServer = 'http://localhost:8088/common/uploadImg'; //设置上传文件的服务器路径
editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024; // 将图片大小限制为 5M
editor.customConfig.uploadImgTimeout = 3000
editor.customConfig.onchange = function (html) {
    // 监控变化，同步更新到 textarea
    window.parent.postMessage({
        mes:'message',
        data:html
    },'*')
    // showEditResult.val(html);
};
//自定义上传图片事件
editor.customConfig.uploadImgHooks = {
    before : function(xhr, editor, files) {

    },
    success : function(xhr, editor, result) {
        console.log("上传成功");

    },
    fail : function(xhr, editor, result) {
        console.log("上传失败,原因是"+result);
    },
    error : function(xhr, editor) {
        console.log("上传出错");
    },
    timeout : function(xhr, editor) {
        console.log("上传超时");
    },
    customInsert: function (insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
            insertImg("/rbac_static_web/myhtml/img/"+result.data);
        // result 必须是一个 JSON 格式字符串！！！否则报错
    }
}
function createEditor(){
    editor.create()
    // showEditResult.val(editor.txt.html()+"sadddddddd")
}

// function setEditorHtml(html){
//     editor.txt.html(html)
// }