/*
 * grunt-html-index
 * https://github.com/whxaxes/grunt-html-index
 *
 * Copyright (c) 2015 wanghx
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    'use strict';

    grunt.registerMultiTask('htmlindex', '', function () {
        var config = grunt.config.get('htmlindex')[this.nameArgs.split(":")[1]];

        var dex = __filename.split("/");
        var htmlStr = grunt.file.read(dex.slice(0 , dex.length-2).join("/")+"/index.html");

        var hidest = config.dest;
        var destFileName = "snippets_nav.html";

        if(hidest.match(/^((\.|\.\.|[\w-]+)\/)*[\w-]+\.html$/)){
            destFileName = (hidest = hidest.split("/")).pop();
            hidest = (hidest.join("/") || ".")+"/";
        }

        hidest = grunt.file.isDir(hidest) ? (hidest + (hidest.charAt(hidest.length - 1) === "/"?"":"/")) : "./";

        var html = '<div class="sidenav">\n';
        var ha = hidest.split("/");

        this.files.forEach(function(file){
            for (var i = 0; i < file.src.length; i++) {
                var filePath = file.src[i];
                var fileName = filePath.split("/")[filePath.split("/").length - 1];
								var linkName = filePath.split("/")[filePath.split("/").length - 2];

                //检查路径和文件合法性，同时忽略带下划线前缀文件
                if (!grunt.file.exists(filePath) || !grunt.file.isFile(filePath) || !fileName.match(/\.html/g) || fileName.match(/^_+/g) || fileName.indexOf(destFileName)>=0) continue;

                var str = grunt.file.read(filePath);

                var title = str.match(/<title>.*<\/title>/g);
                title = ((title && title[0]) || "<title></title>").replace(/<title>|<\/title>/g , '');


								//console.log(title);

                //获取索引html文件所在目录 与 该文件的相对路径
                var fa = filePath.split("/");
                var nfa = [];
                //console.log(ha);
                for(var i= 0,j=0;i<ha.length;i++){
                    if(ha[i] ===".")continue;

                    if(ha[i]){
                        if(!fa[i] || (ha[i] !== fa[i])){
                            nfa.push('');
                        }else {
                            j++;
                        }
                    }else break;
                }
                nfa = nfa.concat(fa.slice(j , fa.length));
                //html += '<a href="' + nfa.join("/") + '">' + linkName + '</a>\n';
                html += '<a href="' + nfa.join("/") + '">' + linkName + '</a>\n';
                console.log(fa);

            }
        });
        html += '</div>';

        grunt.file.write(hidest+destFileName , html)

        grunt.log.ok("Processed:"+hidest+destFileName);
        grunt.log.ok(html);
    });
};
