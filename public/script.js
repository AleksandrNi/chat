window.addEventListener('DOMContentLoaded', function() {
  let reg = document.getElementsByClassName('register');
  const form = document.getElementsByClassName('login-form');

  if (!form) return;
  if (!reg) return;


  
  form.onsubmit = function(event) {
    event.preventDefault();

          fetch("/login", {
          method: "POST",
          credentials: "include", // "omit" by default, for cookies to work
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email.value,
            password: this.password.value,
          })
        })
        .then(response => response.text())
        .catch(function(err) {
          alert("Error: " + err.message);
        });

  };  

  
  reg.onsubmit = function(event) {
    event.preventDefault();

          fetch("/register", {
          method: "POST",
          credentials: "include", // "omit" by default, for cookies to work
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email.value,
            displayName: this.displayName.value,
            password: this.password.value,
          })
        })
        .then(response => response.text())
        .catch(function(err) {
          alert("Error: " + err.message);
        });

  }

});
