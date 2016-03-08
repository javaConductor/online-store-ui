/**
 * Created by lcollins on 2/21/2016.
 */
define("utils", [], function () {

  return {
    /**
     * @author Tom Raithel
     * @param arr
     * @param chunkSize
     * @returns {Array}
     */
    createGroupedArray: function (arr, chunkSize) {
      var groups = [], i;
      for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
      }
      return groups;
    }
  }
});
