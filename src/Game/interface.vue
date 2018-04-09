<template>
	<div id="interface">
		<button class="btn btn-info" @click="newGame()">New Game</button>
		<table>
			<tr v-for="i in 4">
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		</table>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				number:{
					num1:2,
					num2:4
				},
                state:false
			}
		},
		mounted:function(){
            var init1=parseInt(Math.random()*16);
            var init2=parseInt(Math.random()*16);
            var td_dom=document.getElementsByTagName('td');           
            while(init2==init1)
            {
                init2=parseInt(Math.random()*16);
            }          
                td_dom[init1].innerText=this.number.num1;
                td_dom[init1].style.background="rgb(238, 228, 189)";
                td_dom[init2].innerText=this.number.num1;
                td_dom[init2].style.background="rgb(238, 228, 189)";
                var that=this;
                document.onkeydown=function(e){
                that.control(e);
                }
        },
		methods:
        {
            newGame:function()
            {
            	let i;
                var init1=parseInt(Math.random()*16);
                var init2=parseInt(Math.random()*16);
                var td_dom=document.getElementsByTagName('td');
                for( i=0;i<td_dom.length;i++)
                    td_dom[i].innerText="";
                
                while(init2==init1)
                {
                    init2=parseInt(Math.random()*16);
                }          
                    td_dom[init1].innerText=this.number.num1;
                    
                    td_dom[init2].innerText=this.number.num1;
                    this.updated();
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
                var tr_dom=document.getElementsByTagName('tr');
                var td_dom=[];
                for(i=0;i<4;i++)
                {
                    td_dom[i]=tr_dom[i].getElementsByTagName('td');
                }
                var temp=[];
                for(i=0;i<4;i++)
                {
                    temp[i]=[];
                    var arr=[];
                    for(j=0;j<4;j++)
                    {
                        if(td_dom[i][j].innerText=="")
                            arr[j]=0;
                        else
                        {
                            arr[j]=parseInt(td_dom[i][j].innerText);
                        }
                        
                    }
                    this.trim(arr);
                    this.merge(arr); 
                    temp[i]=arr;
                }
                if(this.state)
                {
                    for(i=0;i<4;i++)
                    {
                        for(j=0;j<4;j++)
                            td_dom[i][j].innerText="";
                        for(j=0;j<temp[i].length;j++)
                            td_dom[i][j].innerText=temp[i][j];
                    }
                }
                else
                    return;
                this.updated();
                this.addone();   
                this.state=false;            
            },
            keyup:function()
            {
            	let i,j;
                var td_dom=document.getElementsByTagName('td');
                var temp=[];
                for(i=0;i<4;i++)
                {
                    temp[i]=[];
                    var arr=[];
                    for(j=0;j<4;j++)
                    {
                        if(td_dom[j*4+i].innerText=="")
                            arr[j]=0;
                        else
                        {
                            arr[j]=parseInt(td_dom[j*4+i].innerText);
                        }
                        
                    }
                    this.trim(arr);
                    this.merge(arr); 
                    temp[i]=arr;
                }
                if(this.state)
                {
                    for(i=0;i<4;i++)
                    {
                        for(j=0;j<4;j++)
                            td_dom[j*4+i].innerText="";
                        for(j=0;j<temp[i].length;j++)
                            td_dom[j*4+i].innerText=temp[i][j];
                    }
                }
                else
                    return;
                this.updated();
                this.addone();
                this.state=false;
            },
            keyright:function()
            {
            	let i,j;
                var tr_dom=document.getElementsByTagName('tr');
                var td_dom=[];
                for( i=0;i<4;i++)
                    td_dom[i]=tr_dom[i].getElementsByTagName('td');
                var temp=[];
                for(i=0;i<4;i++)                   
                {
                    temp[i]=[];
                    var arr=[];
                    for(j=3;j>=0;j--)
                    {
                        if(td_dom[i][j].innerText=="")
                            arr[3-j]=0;
                        else
                        {
                            arr[3-j]=parseInt(td_dom[i][j].innerText);
                        }
                        
                    }
                    this.trim(arr);
                    this.merge(arr); 
                    temp[i]=arr;
                }
                if(this.state)
                {
                    for(i=0;i<4;i++)
                    {
                        for(j=0;j<4;j++)
                            td_dom[i][j].innerText="";
                        for(j=0;j<temp[i].length;j++)
                            td_dom[i][3-j].innerText=temp[i][j];
                    }
                }
                else
                    return;
                this.updated();
                this.addone();
                this.state=false;
            },
            keydown:function()
            {
            	let i,j;
                var td_dom=document.getElementsByTagName('td');
                var temp=[];
                for(i=0;i<4;i++)
                {
                    temp[i]=[];
                    var arr=[];
                    for(j=3;j>=0;j--)
                    {
                        if(td_dom[j*4+i].innerText=="")
                            arr[3-j]=0;
                        else
                        {
                            arr[3-j]=parseInt(td_dom[j*4+i].innerText);
                        }
                        
                    }
                    this.trim(arr);
                    this.merge(arr); 
                    temp[i]=arr;
                }     
                if(this.state)
                {
                    for(i=0;i<4;i++)
                    {
                        for(j=0;j<4;j++)
                            td_dom[j*4+i].innerText="";
                        for(j=0;j<temp[i].length;j++)
                        {
                                td_dom[(3-j)*4+i].innerText=temp[i][j];   
                        }
                    }
                } 
                else
                    return;         
                this.updated();
                this.addone();
                this.state=false;
            },
            addone:function()
            {
                let count=0;
                let i,j;
                var td_dom=document.getElementsByTagName('td');
                for( i=0;i<16;i++)
                {
                    if(td_dom[i].innerText!='')
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
                while(document.getElementsByTagName('td')[addnum].innerText!="")
                {
                    addnum=parseInt(Math.random()*16);
                }
                var choose=parseInt(Math.random()*10);
                if(choose%2==0)
                    document.getElementsByTagName('td')[addnum].innerText=2;
                else
                     document.getElementsByTagName('td')[addnum].innerText=4;
                document.getElementsByTagName('td')[addnum].style.background="rgb(238, 228, 189)";
            },
            updated:function()
            {
            	let i;
                var td_dom=document.getElementsByTagName('td');
                for( i=0;i<td_dom.length;i++)
                {
                    if(td_dom[i].innerText!='')
                    {
                        var num=parseInt(td_dom[i].innerText);
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
                    else if(td_dom[i].innerText=='')
                    {
                        td_dom[i].style.background="rgb(205, 191, 179)";
                    }
                }
            }
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
</style>