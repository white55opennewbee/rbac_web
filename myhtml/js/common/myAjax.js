let host = "http://localhost:8088"

function myajax(url, method, contenttype, datatype, data) {
    let result;
    $.ajax({
        url: host + url,
        method: method,
        contentType: contenttype,
        dataType: datatype,
        data: data,
        credentials: true,
        async: false,
        beforeSend: function (XMLHttpRequest) {

            let tokenHeader = localStorage.getItem("rbac_sys_tokenHeader")
            if (null == tokenHeader || tokenHeader == ""){
                // window.parent.location.href = "login.html"
                window.top.location.href = "login.html"
            }
            let tokenHead = localStorage.getItem("rbac_sys_tokenHead")
            let token = localStorage.getItem("rbac_sys_token")

            XMLHttpRequest.setRequestHeader(tokenHeader, tokenHead + " " + token)
        },
        success: function (data) {
            console.log(data)
            if (data.code == 200) {
                result = data.data
            } else if (data.code == 402) {
                alert(data.message)
                window.top.location.href = "login.html"
            } else if (data.code == 201) {
                localStorage.setItem("rbac_sys_token", data.data.token)
                localStorage.setItem("rbac_sys_tokenHeader", data.data.tokenHeader)
                localStorage.setItem("rbac_sys_tokenHead", data.data.tokenHead)
                window.top.location.href = "index.html"

            } else {
                alert(data)
            }
        },
        error: function (xhr,err) {
            // console.log(xhr,err)
            alert("error")
        }
    })
    return result;
}

function MyloginAjax(url, method, contenttype, datatype, data) {
    $.ajax({
        url: host + url,
        method: method,
        contentType: contenttype,
        dataType: datatype,
        data: data,
        async: false,
        xhrFields:{
            withCredentials:true
        },
        crossDomain:true,
        success: function (data) {
            console.log(data)
            if (data.code == 201) {
                localStorage.setItem("rbac_sys_token", data.data.token)
                localStorage.setItem("rbac_sys_tokenHeader", data.data.tokenHeader)
                localStorage.setItem("rbac_sys_tokenHead", data.data.tokenHead)
                localStorage.setItem("rbac_sys_username",data.data.username)
                localStorage.setItem("rbac_sys_id",data.data.id)
                window.location.href = "index.html"

            }else if (data.code == 401) {
                alert(data.code + "," + data.message)
            }else if (data.code == 406) {
                alert(data.code + "," + data.message+",将于"+data.data+"秒后解冻")
            }
        },
        error: function (data) {
            alert("error")
            console.log(data)
        }
    })
}

function getLocalIp() {
    $.ajax({
        url: 'http://pv.sohu.com/cityjson?ie=utf-8',
        dataType: "script",
        success: function(){
            localStorage.setItem("localinfo",JSON.stringify(returnCitySN));
        },
        error:function () {
            alert("get ip false")
        }
    });
}

//  SUCCESS = new CodeMsg(200,"success");
//  SERVER_ERROR = new CodeMsg(500100,"服务端异常");
//  USER_PERMISSION_ERROR = new CodeMsg(403,"用户无权限");
//  USER_LOGIN_FAIL = new CodeMsg(402,"用户token认证失败");
// USER_LOGIN_USERNAME_OR_PASSWORD_ERROR = new CodeMsg(401,"账号或密码错误");
// USER_LOGIN_LOCK = new CodeMsg(404,"用户登录错误超过3次，账户锁定30分钟");