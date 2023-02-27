module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      if (date){
        // return date.toLocaleDateString();
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      } else {
        return 'error'
      }
    }
  };
  