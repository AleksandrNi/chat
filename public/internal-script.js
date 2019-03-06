window.addEventListener('DOMContentLoaded', () => {
  //remove internal flash messages
  let alert = document.querySelector('.alert');  
  if (alert) {
    setTimeout (()=>{
      document.querySelector('div.alert-messages').innerHTML = '';
    }, 3000);
  }
  
  //logout
  document.addEventListener('click', (event) => {
    let target = event.target;
    let logout = target.closest('.logout');
    if(logout) {
      console.log('logout');
    }
  })  

});
