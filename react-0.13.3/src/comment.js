/*
| Context                       | Contextual Filtering  |
---------------------------------------------------------
| HTML                          | Yes                   |
| Comment                       | Compliation error	|
| Attr Name                     | Compliation error	|

| Double Quoted Attr Value      | Yes			|
| Single Quoted Attr Value      | Yes			|
| UnQuoted Attr Value           | Yes			| # https://facebook.github.io/react/docs/tags-and-attributes.html, restricted set of attributes

| Quoted Attr Value / CSS       | No			|
| Quoted Attr Value / URI       | No			| 

| <script> tag                  | No, not executable 	| # inject into the DOM dynamically
| <style> tag                   | No			|
*/

// untrusted input
var data = [
  {author: "Pete Hunt", text: "This is one comment",
    data1: ">< '\"&",
    data2: ">< '\"&",
    data3: "javascript:alert(0);",
    data4: ");alert(0);//",
    data5: ":;[]{}()",
    data6: "function a() { alert(0); }",
  },
];

var divStyle = {height: ":;[]{}()"}; 


var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author} data1={comment.data1} data2={comment.data2} data3={comment.data3} data4={comment.data4} data5={comment.data5} data6={comment.data6}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

/* NOTE:
the double/single quote within the JSX represent a string
*/
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">{this.props.author}</h2>
        <div>{this.props.data1}</div>

        <div className="{this.props.data2}">{this.props.data2}</div>
        <div className='{this.props.data2}'>{this.props.data2}</div>
        <div className={this.props.data2}>{this.props.data2}</div>

        <div><a href={this.props.data3}>{this.props.data3}</a></div>

        <div><a href="javascript:alert('{this.props.data4}');">{this.props.data4}</a></div>
        <div><a href="javascript:alert({this.props.data4});">{this.props.data4}</a></div>

	<style>{this.props.data5}</style>
	<script>{this.props.data6}</script>
	<div onclick="javascript:a();">div</div>

        <div><a style={divStyle}>{this.props.data5}</a></div>

      </div>
    );
  }
});

/* 
result: the attribute name within the JSX has its own defined name!
for example <div class="{this.props.data}"> does not take effect,
instead you need to use this <div className="{this.props.data}">.

result:
<div><a href=javascript:alert({this.props.data4});>{this.props.data4}</a></div>
Error: Parse Error: Line 78: JSX value should be either an expression or a quoted JSX text

result:
<div><a style={this.props.data5}>{this.props.data5}</a></div>
Invariant Violation: The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX
*/

React.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);
