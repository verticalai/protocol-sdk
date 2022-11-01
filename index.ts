/*

*/

import { ethers } from 'ethers';

var key: String | undefined = undefined;

export function setAppListener(sessionKey: string, callback: (data: any) => any) {
  key = sessionKey;
  let eventCallBack = (event: MessageEvent<any>) => {
    let dataString = event.data as string;
    let data = JSON.parse(dataString);
    let sessionKey = data.key;

    if (sessionKey == key && key !== undefined) {
      callback(data);
    }
  };

  window.removeEventListener('message', eventCallBack);
  window.addEventListener('message', eventCallBack);
}

export function sendTransactionReceipt(transaction: ethers.Transaction) {
  window.postMessage({ transaction, key }, '*');
}

module.exports = { setAppListener, sendTransactionReceipt };
