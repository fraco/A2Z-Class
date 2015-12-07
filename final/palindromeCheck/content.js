// A2Z F15
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F15

// This is the content script for the extension
// Note there is also a content.css file

// Grab the entire document body
// This gets an array even though it's likely just one thing
var everything = document.getElementsByTagName("body");

for (var i = 0; i < everything.length; i++) {
  // Look at the full content
  var txt = everything[i].innerHTML;
  //var s = "test the <img the> the";

  // This is a way of splitting up by tags.
  var tokens = txt.split(/(<.*?>)/);
  for (var j = 0; j < tokens.length; j++) {
    // Ignore anything that is a tag
    if (tokens[j].charAt(0) !== '<') {
      //see if its a palindrome
      if(isPalindrome(tokens[j])){
        console.log(tokens[j]);
      // Now replace the word "the" with "the" spanned with the class "redact"
      // tokens[j] = tokens[j].replace(/\w(?<!\d)[\w'-]*/gi,'<span class="redact">the</span>');
    }
    }
  }
  // Put everything back in
  everything[i].innerHTML = tokens.join('');
}

// check to see whether is palindrome
function isPalindrome(str){
  var i, len = str.length;
  for(i =0; i<len/2; i++){
    if (str[i]!== str[len -1 -i])
       return false;
  }
  return true;
}