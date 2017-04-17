export function isEmpty(object) {
  for(var key in object) {
    if(object.hasOwnProperty(key)){
      return false;
    }
  }
  return true;
}
export function some(object, test) {
  var i = 0
  for(var key in object) {
    if(object.hasOwnProperty(key)){
      if (test(object[key], i, object)) {
        return true 
      } else {
        i+=1
  }}}
  return false
}
export function checkFetchStatus(response, debug=false) {
    console.log('checking status of', response);
  if (response.status >= 200 && response.status < 300) {
    if (debug) {console.log('got response:',response);}
    return response.json()
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

