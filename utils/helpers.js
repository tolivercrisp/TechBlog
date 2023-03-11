module.exports = {

  // just a pretty basic date format function
    format_date: (date) => {
      if (date){
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      } else {
        return 'error'
      }
    }
  };
  