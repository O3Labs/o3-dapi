# Tutorials

## Calling dAPI methods

As a general rule, please keep in mind that all methods on the dAPI are asynchronous, and will return a Promise.

In cases where the method is clasified in the API documentation as a "read" method, the Promise will resolve with a result that was either successfully ready from the NEO blockchain or from the users wallet. In the case that it was rejected, it either means the request to the NEO blockchain failed, or the user rejected the request to provide the information from their wallet.

For "write" methods, these will require a signature from the user in the wallet, and will, in most cases, broadcast the signed transaction to the NEO blockchain on behalf of the user. In this case, a resolved Promise will return the transaction id that can be referenced by the dApp to later confirm that it was processes, and a rejected Promise indicates that either the user has denied the request to sign the transaction, or the transaction was rejected by the NEO blockchain.

For all rejected promises, an error object is returned that will describe the reason for which the rejection occured.
