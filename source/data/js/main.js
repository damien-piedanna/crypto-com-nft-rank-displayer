(function() {
  "use strict";
  const collections = ["PsychoKitty"];
  let dataCollection = [];

  /**
  * Convert a string to a Dom element
  */
  function strToDom(str) {
    return document.createRange().createContextualFragment(str).firstChild;
  }

  document.addEventListener("DOMNodeInserted", function (ev) {
    ev.target.querySelectorAll('.NftCard_nftName__1Eh4U, .NftSummaryContainer_titleContainer__jO9V6').forEach(elem => {
      let data = elem.innerHTML.split(' ');
      let collection = data[0];
      if (collections.includes(collection)) {
        let id = parseInt(data[1].substring(1));
        let rank = getRank(collection, id);
        elem.innerHTML = elem.innerHTML + ' (' + rank + '/10000)';
      }
    });
  });

  document.addEventListener("DOMContentLoaded", async function (event) {
    await fetchCollections();
  });

  async function fetchCollections() {
    for (const collection of collections) {
      dataCollection[collection] = await (await (fetch(chrome.extension.getURL('data/collections/' + collection + '.json')))).json();
    }
  }

  function getRank(collection, id) {
    return dataCollection[collection].findIndex(el => {return el.id === id});
  }
})();
