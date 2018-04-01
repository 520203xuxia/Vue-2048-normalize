const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
	entry:__dirname+"/src/main.js",
	output:{
		filename:"bundle.js",
		path:__dirname+"/dist"
	},
	module: {       // 配置加载资源
        rules: [    // 规则
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, 
            {
                test:/\.jsx$/,
                loader:'babel-loader',
                exclude:path.resolve(__dirname,"node_modules")
            },     
            {
            	test:/\.css$/,
            	use:[
            		{
            			loader:"style-loader"
            		},{
            			loader:"css-loader"
            		}
            	]
            }
           
        ]
    },
    plugins:[
    	new HtmlWebpackPlugin({
    		filename:'2048-xiaoxu.html',
    		template:__dirname+'/src/index.tmpl.html',
    		indect:"body",
    		title:"2048-BY-xiaoxu",
    	})
    ]
}