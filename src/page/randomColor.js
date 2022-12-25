function createColor() {
  var color = "#";
  for (var i=0; i<6; i++){
      var num = Math.round(Math.random() * 100 % 16);
      if (num < 10) {
          color += num.toString();
      }
      else {
          if (num == 10) {
              color += "A";
          }
          else if (num == 11) {
              color += "B";
          }
          else if (num == 12) {
              color += "C";
          }
          else if (num == 13) {
              color += "D";
          }
          else if (num == 14) {
              color += "E";
          }
          else if (num == 15) {
              color += "F";
          }
      }    
  }
  return color;
}

export default createColor();