    var fs = require("fs");
    var fileName = ""; //文件名称
    var dirName = ""; //文件夹名称
    //判断文件是否存在
    fileName = "xiadan.txt";
    $('#xdate').focus(function(event) {
        var Today = new Date()
        var year = Today.getYear();
        year = year < 2000 ? year + 1900 : year
        year = year.toString().substr(2, 2);
        var month = Today.getMonth() + 1;
        var day = Today.getDate();
        $(this).val(year + '.' + month + '.' + day);
    });
    $('button').click(function() {
        var clipboard = nw.Clipboard.get();
        var id = $('#id').val();
        var dls = $('#dls').val();
        var company = $('#company').val();
        var domain = $('#domain').val();
        var type = $('#type').find('option:selected').text();
        var xdate = $('#xdate').val();
        var bumen = $('#bumen').val();
        var kefu = $('#kefu').val();
        var beizhu = $('#beizhu').val();
        fs.exists(fileName, function(exists) {
            if (exists) {
                var content = "\r\n" + "\r\n";
                content += "编号:" + id + "\r\n" + "代理商:" + dls + "\r\n" + "公司名称:" + company + "\r\n" + "域名:" + domain + "\r\n" + "类型:" + type + "\r\n" + "下单日期:" + xdate + "\r\n" + "部门:" + bumen + "\r\n" + "客服:" + kefu + "\r\n" + "备注:" + beizhu + "\r\n";
                clipboard.set(content, 'text');
                fs.appendFile(fileName, content, function(err) {
                    alert("添加成功");
					var qqnum = "";
					if(bumen.indexOf("1")>=0){
						qqnum = "2039832778";
					}else if(bumen.indexOf("2")>=0){
						qqnum = "2791881748";
					}else if(bumen.indexOf("3")>=0){
						qqnum = "2016984935";			
					}else {
						qqnum = "2791881748";
					}
					var qqSrc = "";
					if(/Android|webOS|iPhone|iPod|BlackBerry|Windows CE|Windows Phone/i.test(navigator.userAgent)) {
						if(window.location.href.indexOf("?pc") < 0) {
							try {
								qqSrc = "http://wpd.b.qq.com/cgi/get_m_sign.php?uin=" + qqnum;
							} catch(e) {}
						}
					} else {
						qqSrc = "tencent://message/?uin=" + qqnum + "&Site="+qqnum+"&Menu=yes";
					}
					document.getElementById("qqFrame").src = qqSrc;
                });
            } else {
                var content = "";
                fs.writeFile(fileName, content, function(err) {
                    alert("文本不存在，已创建新的文本文件");
                });

            }
        });
    })
