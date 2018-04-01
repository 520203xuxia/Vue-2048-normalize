import '../assets/styles/footer.css'

export default{
	data(){
		return {
			author:'xiaoxu',
			github:'https://github.com/520203xuxia'
		}
	},
	render(){
		return (<div id="footer"><span>Maked by {this.author},作者github:<a href="https://github.com/520203xuxia">{this.github}</a></span></div>)
	}
}