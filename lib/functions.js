var Functions = {
  getMetaContent: function(name) {
    var metas = document.getElementsByTagName('meta');

    for (var i=0; i<metas.length; i++) {
      if (metas[i].getAttribute("name") == name) {
        return metas[i].getAttribute("content");
      }
    }

    return "";
  },

  convertErrors: function(err) {
    console.log(!!JSON.parse(err.responseText).errors, !!JSON.parse(err.responseText).error);
    if (JSON.parse(err.responseText).errors) {
      const errObj = JSON.parse(err.responseText).errors;
      return Object.keys(errObj).map((key) => {
        return <div key={`${key}Err`} role="alert" className="alert alert-warning">{`${key[0].toUpperCase() + key.substring(1, 99)}: ${errObj[key]}`}</div>;
      });
    } else if (JSON.parse(err.responseText).error) {
      const errValue = JSON.parse(err.responseText).error;
      return <div role="alert" className="alert alert-warning">{errValue}</div>;
    }
  },

  getAccount: function(user, callback) {
    $.get(`/users/${user.id}.json`, { user: user }, (account) => {
      var user_account = account;
      callback(user_account);
    });
  }

}

module.exports = Functions;
