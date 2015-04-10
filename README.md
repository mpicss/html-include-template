#html-include-template:创建索引页面

该插件可以快速生成索引页面，方便预览效果。

安装(需先安装grunt)：npm install html-include-template

###使用方法：在Gruntfile.js中添加配置

        grunt.loadNpmTasks('html-include-template');
        htmlindex:{
            dist:{
                expand: true,
                cwd: 'src/',
                
                src: ['pages/**/*'],
                dest: 'build/'
            }
        }

比如，我当前的目录结构为：

        pages:{
            html:{
                index.html,
                index2.html
            }
        }

test目录下有个html文件夹，html文件夹下有多个html文件。按照上面的配置。生成的html索引页面 "snippets_nav.html" 则在test目录下<br>
内容为：

        ...略
        
        <nav class="nav">
          <a href="**/*.html">demo</a>
        </nav>
       

a标签里的内容为html的title。链接则链往目标html
