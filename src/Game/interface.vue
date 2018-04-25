<template>
	<div id="interface">
		<button class="btn btn-info" @click="newGame()">New Game</button>
		<table>
			<tr v-for="i in 4">
				<td v-for=" j in 4" v-bind:class="style[number.num[(i-1)*4+j-1]]" >
                    <span  v-if="number.num[(i-1)*4+j-1]!=0">{{number.num[(i-1)*4+j-1]}} </span>           
                </td>
			</tr>
		</table>
	</div>
</template>
<script>
	export default{
		data(){
			return {
				number:{
					num:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
				},
                state:false,
                style:{
                    '2':"num2",
                    '4':"num4",
                    '8':"num8",
                    '16':"num16",
                    '32':"num32",
                    '64':"num64",
                    '128':"num128",
                    '256':"num256",
                    '512':"num512",
                    '1024':"num1024",
                    '2048':"num2048"
                }
			}
		},
		mounted:function(){  
            var init1=parseInt(Math.random()*16);
            var init2=parseInt(Math.random()*16);
            while(init2==init1)
            {
                init2=parseInt(Math.random()*16);
            }          
                this.number.num.splice(init1,1,2);  //不能直接给num[init1]赋值，这不是响应式的，不能在view上显示出来
                this.number.num.splice(init2,1,2);        
                var that=this;
                document.onkeydown=function(e){
                    that.control(e);
                }
                //this.updated();
        },
		methods:
        {
            newGame:function()
            {
            	let i;
                var init1=parseInt(Math.random()*16);
                var init2=parseInt(Math.random()*16);
                for( i=0;i<16;i++)
                {
                    this.number.num.splice(i,1,0);               
                }      

                while(init2==init1)
                {
                    init2=parseInt(Math.random()*16);
                }
                this.number.num.splice(init1,1,2);  
                this.number.num.splice(init2,1,2);                           
                //this.updated();
            },
            control:function(event){
                if(event.keyCode==37)
                {
                    this.keyleft();
                }
                else if(event.keyCode==38)
                {
                    this.keyup();
                }
                else if(event.keyCode==39)
                {
                    this.keyright();
                }
                else if(event.keyCode==40)
                {
                    this.keydown();
                }

            },
            trim:function(arr)//去除空格
            {
            	let i;
                let flag=false;
                for(i=0;i<arr.length;i++)
                {
                    if(arr[i]==0)
                    {
                        arr.splice(i,1);
                        i--;
                        flag=true;
                    }
                    if(flag==true&&arr[i+1]!=0&&i+1<arr.length)
                        this.state=true;
                }
            },
            merge:function(arr)
            {
            	let i;
                for( i=0;i<arr.length-1;i++)
                {
                    if(arr[i+1]==arr[i])
                    {
                        this.state=true;
                        arr[i]+=arr[i+1];
                        arr[i+1]=0;
                        this.trim(arr);
                    }
                }
            },
            keyleft:function()
            {
            	let i;
            	let j;
                for(i=0;i<4;i++)
                {
                    var arr=[];
                    for(j=0;j<4;j++)
                    {
                        arr[j]=this.number.num[i*4+j];
                    }
                    this.trim(arr);
                    this.merge(arr); 
                    for(j=0;j<arr.length;j++)
                        this.number.num.splice(i*4+j,1,arr[j]);
                    for(;j<4;j++)
                        this.number.num.splice(i*4+j,1,0);
                }
                if(this.state)
                {
                    this.addone();   
                    this.state=false;  
                   // this.updated(); 
                }
                
            },
            keyup:function()
            {
            	let i,j;
                var temp=[];
                for(i=0;i<4;i++)
                {
                    temp[i]=[];
                    var arr=[];
                    for(j=0;j<4;j++)
                    {
                        arr[j]=this.number.num[j*4+i];
                    }
                    this.trim(arr);
                    this.merge(arr); 
                    for(j=0;j<arr.length;j++)
                        this.number.num.splice(j*4+i,1,arr[j]);
                    for(;j<4;j++)
                        this.number.num.splice(j*4+i,1,0);
                }
                if(this.state)
                {
                    this.addone();
                    this.state=false;
                   // this.updated();    
                }    
                    
            },
            keyright:function()
            {
            	let i,j;
                for(i=0;i<4;i++)                   
                {
                    var arr=[];
                    for(j=3;j>=0;j--)
                    {
                        arr[3-j]=this.number.num[i*4+j];
                        
                    }
                    this.trim(arr);
                    this.merge(arr); 
                    //temp[i]=arr;
                    for(j=0;j<arr.length;j++)
                        this.number.num.splice(i*4+3-j,1,arr[j]);
                    for(;j<4;j++)
                        this.number.num.splice(i*4+3-j,1,0);
                }
                if(this.state)
                {
                     this.addone();
                     this.state=false;
                     //this.updated();
                }
                
            },
            keydown:function()
            {
            	let i,j;
                for(i=0;i<4;i++)
                {
                    var arr=[];
                    for(j=3;j>=0;j--)
                    {
                        
                        arr[3-j]=this.number.num[j*4+i];
                        
                    }
                    this.trim(arr);
                    this.merge(arr); 
                    for(j=0;j<arr.length;j++)
                    {
                        this.number.num.splice((3-j)*4+i,1,arr[j]);
                    }
                    for(;j<4;j++)
                        this.number.num.splice((3-j)*4+i,1,0);
                }     
                if(this.state)
                {
                    this.addone();
                    this.state=false;  
                   // this.updated();                 
                }    
                       
            },
            addone:function()
            {
                let count=0;
                let i,j;
                for( i=0;i<16;i++)
                {
                    if(this.number.num[i]!=0)
                        count++;
                }
                if(count==16)
                {
                    var answer=confirm("Game over!Do you want to try again?");
                    if(answer)
                    {
                        this.newGame();
                        return;
                    }
                    else
                        return;
                }
                var addnum=parseInt(Math.random()*16);
                while(this.number.num[addnum]!=0)
                {
                    addnum=parseInt(Math.random()*16);
                }
                var choose=parseInt(Math.random()*10);
                if(choose%2==0)
                    this.number.num.splice(addnum,1,2);
                else
                    this.number.num.splice(addnum,1,4);
            },
           /* updated:function()
            {
            	let i;
                var td_dom=document.getElementsByTagName('td');
                for( i=0;i<td_dom.length;i++)
                {
                   // console.log(i+":"+td_dom[i].innerText);
                    if(this.number.num[i]!=0)
                    {
                        var num=this.number.num[i];
                        switch(num){
                            case 2:
                            td_dom[i].style.background="rgb(238, 228, 189)";
                            break;
                            case 4:
                            td_dom[i].style.background="rgb(210, 214, 218)";
                            break;
                            case 8:
                            td_dom[i].style.background="rgb(169, 200, 218)";
                            break;
                            case 16:
                            td_dom[i].style.background="rgb(131, 200, 213)";
                            break;
                            case 32:
                            td_dom[i].style.background="rgb(25, 166, 222)";
                            break;
                            case 64:
                            td_dom[i].style.background="rgb(92, 154, 222)";
                            case 128:
                            td_dom[i].style.background="rgb(142, 155, 255)";
                            case 256:
                            td_dom[i].style.background="rgb(92, 154, 222)";
                            case 512:
                            td_dom[i].style.background="rgb(92, 154, 222)";
                            case 1024:
                            td_dom[i].style.background="rgb(92, 154, 222)";
                            break;
                            case 2048:
                            td_dom[i].style.background="rgb(181, 54, 77)";       
                            break;
                            default:
                        }
                    }
                    else if(this.number.num[i]==0)
                    {
                        td_dom[i].style.background="rgb(205, 191, 179)";
                    }
                }
            }*/
        },
	};
</script>

<style>
	#interface{
		margin:0 auto;
		flex:1;
	}	
	#interface table{
            background: rgb(186, 173, 162);
            width: 400px;
            height: 400px;
            margin-top:15px;
        }
    #interface table tr td{
            width: 85px;
            height: 65px;
            text-align: center;
            font-size: 2rem;
            background: rgb(205, 191, 179);
            display: inline-block;
            margin: 5px;
            border-radius: 10px;
            padding-top: 20px;
        }
        .num2{
            background: rgb(238, 228, 189) !important ;
        }
        .num4{
            background: rgb(210, 214, 218)  !important;
        }
        .num8{
            background:rgb(169, 200, 218)  !important;
        }
        .num16{
            background:rgb(131, 200, 213)  !important;
        }
         .num32{
            background:rgb(25, 166, 222)  !important;
        }
         .num64{
            background:rgb(92, 154, 222)  !important;
        }
         .num128{
            background:rgb(142, 155, 255)  !important;
        }
        .num256{
            background:rgb(92, 154, 222)  !important;
        }
         .num512{
            background:rgb(92, 154, 222)  !important;
        }
         .num1024{
            background:rgb(92, 154, 222)  !important;
        }
         .num2048{
            background:rgb(181, 54, 77)  !important;
        }
</style>