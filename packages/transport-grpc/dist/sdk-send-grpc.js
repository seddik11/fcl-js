var e=require("@onflow/util-invariant"),t=require("@onflow/protobuf"),r=require("@improbable-eng/grpc-web"),n=require("@improbable-eng/grpc-web-node-http-transport"),o=require("@onflow/util-address"),s=function(t,n,o,s){try{return e.invariant(s.config,"SDK GRPC Unary Error: context.config must be defined."),Promise.resolve(s.config().get("grpc.metadata",{})).then(function(e){return new Promise(function(s,i){r.grpc.unary(n,{request:o,host:t,metadata:new r.grpc.Metadata(e),onEnd:function(e){var t=e.statusMessage;e.status===r.grpc.Code.OK?s(e.message):i(new Error(t))}})})})}catch(e){return Promise.reject(e)}};r.grpc.setDefaultTransport(n.NodeHttpTransport());var i=function(t,r,n){void 0===r&&(r={}),void 0===n&&(n={});try{return e.invariant(n.node,"SDK Send Execute Script Error: opts.node must be defined."),e.invariant(r.response,"SDK Send Execute Script Error: context.response must be defined."),e.invariant(r.Buffer,"SDK Send Execute Script Error: context.Buffer must be defined."),Promise.resolve(t).then(function(e){return t=e,Promise.resolve(t.block.id?u(t,r,n):t.block.height?c(t,r,n):a(t,r,n))})}catch(e){return Promise.reject(e)}},a=function(e,r,n){try{var o=n.unary||s,i=new t.ExecuteScriptAtLatestBlockRequest,a=r.Buffer.from(e.message.cadence,"utf8");return e.message.arguments.forEach(function(t){return i.addArguments(d(e.arguments[t].asArgument,r))}),i.setScript(a),Promise.resolve(o(n.node,t.AccessAPI.ExecuteScriptAtLatestBlock,i,r)).then(function(t){return l(e,r,t)})}catch(e){return Promise.reject(e)}},c=function(e,r,n){try{var o=n.unary||s,i=new t.ExecuteScriptAtBlockHeightRequest;i.setBlockHeight(Number(e.block.height));var a=r.Buffer.from(e.message.cadence,"utf8");return e.message.arguments.forEach(function(t){return i.addArguments(d(e.arguments[t].asArgument,r))}),i.setScript(a),Promise.resolve(o(n.node,t.AccessAPI.ExecuteScriptAtBlockHeight,i,r)).then(function(t){return l(e,r,t)})}catch(e){return Promise.reject(e)}},u=function(e,r,n){try{var o=n.unary||s,i=new t.ExecuteScriptAtBlockIDRequest;i.setBlockId(f(e.block.id,r));var a=r.Buffer.from(e.message.cadence,"utf8");return e.message.arguments.forEach(function(t){return i.addArguments(d(e.arguments[t].asArgument,r))}),i.setScript(a),Promise.resolve(o(n.node,t.AccessAPI.ExecuteScriptAtBlockID,i,r)).then(function(t){return l(e,r,t)})}catch(e){return Promise.reject(e)}},d=function(e,t){return t.Buffer.from(JSON.stringify(e),"utf8")},f=function(e,t){return t.Buffer.from(e,"hex")};function l(e,t,r){var n=t.response();return n.tag=e.tag,n.encodedData=JSON.parse(t.Buffer.from(r.getValue_asU8()).toString("utf8")),n}function g(){return g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},g.apply(this,arguments)}var m=function(t,r,n){void 0===r&&(r={}),void 0===n&&(n={});try{return e.invariant(n.node,"SDK Send Get Account Error: opts.node must be defined."),e.invariant(r.response,"SDK Get Account Error: context.response must be defined."),e.invariant(r.Buffer,"SDK Get Account Error: context.Buffer must be defined."),Promise.resolve(t).then(function(e){return t=e,Promise.resolve(null!==t.block.height?v(t,r,n):p(t,r,n))})}catch(e){return Promise.reject(e)}},p=function(e,r,n){try{var i=n.unary||s,a=new t.GetAccountAtLatestBlockRequest;return a.setAddress(h(o.sansPrefix(e.account.addr),r)),Promise.resolve(i(n.node,t.AccessAPI.GetAccountAtLatestBlock,a,r)).then(function(t){return I(e,r,t)})}catch(e){return Promise.reject(e)}},v=function(e,r,n){try{var i=n.unary||s,a=new t.GetAccountAtBlockHeightRequest;return a.setBlockHeight(Number(e.block.height)),a.setAddress(h(o.sansPrefix(e.account.addr),r)),Promise.resolve(i(n.node,t.AccessAPI.GetAccountAtBlockHeight,a,r)).then(function(t){return I(e,r,t)})}catch(e){return Promise.reject(e)}},S=function(e,t){return t.Buffer.from(e).toString("hex")},h=function(e,t){return function(e,t,r){return r.Buffer.from(e.padStart(16,0),"hex")}(e,0,t)},B={1:"SHA2_256",2:"SHA2_384",3:"SHA3_256",4:"SHA3_384",5:"KMAC128_BLS_BLS12_381"},k={1:"ECDSA_P256",2:"ECDSA_secp256k1",3:"BLS_BLS12_381"};function I(e,t,r){var n=t.response();n.tag=e.tag;var s,i=r.getAccount(),a=(s=i.getContractsMap())?s.getEntryList().reduce(function(e,r){var n;return g({},e,((n={})[r[0]]=t.Buffer.from(r[1]||new UInt8Array).toString("utf8"),n))},{}):{};return n.account={address:o.withPrefix(S(i.getAddress_asU8(),t)),balance:i.getBalance(),code:t.Buffer.from(i.getCode_asU8()||new UInt8Array).toString("utf8"),contracts:a,keys:i.getKeysList().map(function(e){return{index:e.getIndex(),publicKey:S(e.getPublicKey_asU8(),t),signAlgo:e.getSignAlgo(),signAlgoString:k[e.getSignAlgo()],hashAlgo:e.getHashAlgo(),hashAlgoString:B[e.getHashAlgo()],weight:e.getWeight(),sequenceNumber:e.getSequenceNumber(),revoked:e.getRevoked()}})},n}var y=function(t,r,n){void 0===r&&(r={}),void 0===n&&(n={});try{return e.invariant(n.node,"SDK Send Get Block Header Error: opts.node must be defined."),e.invariant(r.response,"SDK Send Get Block Header Error: context.response must be defined."),e.invariant(r.Buffer,"SDK Send Get Block Header Error: context.Buffer must be defined."),Promise.resolve(t).then(function(e){var o=null!==(t=e).block.height;return Promise.resolve(null!==t.block.id?b(t,r,n):o?x(t,r,n):P(t,r,n))})}catch(e){return Promise.reject(e)}},P=function(e,r,n){try{var o,i=n.unary||s,a=new t.GetLatestBlockHeaderRequest;return null!=(o=e.block)&&o.isSealed&&a.setIsSealed(e.block.isSealed),Promise.resolve(i(n.node,t.AccessAPI.GetLatestBlockHeader,a,r)).then(function(t){return E(e,r,t)})}catch(e){return Promise.reject(e)}},x=function(e,r,n){try{var o=n.unary||s,i=new t.GetBlockHeaderByHeightRequest;return i.setHeight(Number(e.block.height)),Promise.resolve(o(n.node,t.AccessAPI.GetBlockHeaderByHeight,i,r)).then(function(t){return E(e,r,t)})}catch(e){return Promise.reject(e)}},b=function(e,r,n){try{var o=n.unary||s,i=new t.GetBlockHeaderByIDRequest;return i.setId(A(e.block.id,r)),Promise.resolve(o(n.node,t.AccessAPI.GetBlockHeaderByID,i,r)).then(function(t){return E(e,r,t)})}catch(e){return Promise.reject(e)}},G=function(e,t){return t.Buffer.from(e).toString("hex")},A=function(e,t){return t.Buffer.from(e,"hex")};function E(e,t,r){var n=r.getBlock(),o=t.response();return o.tag=e.tag,o.blockHeader={id:G(n.getId_asU8(),t),parentId:G(n.getParentId_asU8(),t),height:n.getHeight(),timestamp:n.getTimestamp().toDate().toISOString()},o}var D=function(t,r,n){void 0===r&&(r={}),void 0===n&&(n={});try{return e.invariant(n.node,"SDK Send Get Block Error: opts.node must be defined."),e.invariant(r.response,"SDK Send Get Block Error: context.response must be defined."),e.invariant(r.Buffer,"SDK Send Get Block Error: context.Buffer must be defined."),Promise.resolve(t).then(function(e){var o=null!==(t=e).block.height;return Promise.resolve(null!==t.block.id?K(t,r,n):o?T(t,r,n):L(t,r,n))})}catch(e){return Promise.reject(e)}},L=function(e,r,n){try{var o,i=n.unary||s,a=new t.GetLatestBlockRequest;return null!=(o=e.block)&&o.isSealed&&a.setIsSealed(e.block.isSealed),Promise.resolve(i(n.node,t.AccessAPI.GetLatestBlock,a,r)).then(function(t){return R(e,r,t)})}catch(e){return Promise.reject(e)}},T=function(e,r,n){try{var o=n.unary||s,i=new t.GetBlockByHeightRequest;return i.setHeight(Number(e.block.height)),Promise.resolve(o(n.node,t.AccessAPI.GetBlockByHeight,i,r)).then(function(t){return R(e,r,t)})}catch(e){return Promise.reject(e)}},K=function(e,r,n){try{var o=n.unary||s,i=new t.GetBlockByIDRequest;return i.setId(H(e.block.id,r)),Promise.resolve(o(n.node,t.AccessAPI.GetBlockByID,i,r)).then(function(t){return R(e,r,t)})}catch(e){return Promise.reject(e)}},w=function(e,t){return t.Buffer.from(e).toString("hex")},H=function(e,t){return t.Buffer.from(e,"hex")};function R(e,t,r){var n=r.getBlock(),o=n.getCollectionGuaranteesList(),s=n.getBlockSealsList(),i=n.getSignaturesList().map(function(e){return w(e,t)}),a=t.response();return a.tag=e.tag,a.block={id:w(n.getId_asU8(),t),parentId:w(n.getParentId_asU8(),t),height:n.getHeight(),timestamp:n.getTimestamp().toDate().toISOString(),collectionGuarantees:o.map(function(e){return{collectionId:w(e.getCollectionId_asU8(),t),signatures:e.getSignaturesList().map(function(e){return w(e,t)})}}),blockSeals:s.map(function(e){return{blockId:w(e.getBlockId_asU8(),t),executionReceiptId:w(e.getExecutionReceiptId_asU8(),t),executionReceiptSignatures:e.getExecutionReceiptSignaturesList().map(function(e){return w(e,t)}),resultApprovalSignatures:e.getResultApprovalSignaturesList().map(function(e){return w(e,t)})}}),signatures:i},a}var _=function(r,n,o){void 0===n&&(n={}),void 0===o&&(o={});try{e.invariant(o.node,"SDK Send Get Collection Error: opts.node must be defined."),e.invariant(n.response,"SDK Send Get Collection Error: context.response must be defined."),e.invariant(n.Buffer,"SDK Send Get Collection Error: context.Buffer must be defined.");var i=o.unary||s;return Promise.resolve(r).then(function(e){r=e;var s=new t.GetCollectionByIDRequest;return s.setId(j(r.collection.id,n)),Promise.resolve(i(o.node,t.AccessAPI.GetCollectionByID,s,n)).then(function(e){var t=e.getCollection(),o=n.response();return o.tag=r.tag,o.collection={id:U(t.getId_asU8(),n),transactionIds:t.getTransactionIdsList().map(function(e){return U(e,n)})},o})})}catch(e){return Promise.reject(e)}},U=function(e,t){return t.Buffer.from(e).toString("hex")},j=function(e,t){return t.Buffer.from(e,"hex")},q=function(t,r,n){void 0===r&&(r={}),void 0===n&&(n={});try{return e.invariant(n.node,"SDK Send Get Events Error: opts.node must be defined."),e.invariant(r.response,"SDK Send Get Events Error: context.response must be defined."),e.invariant(r.Buffer,"SDK Send Get Events Error: context.Buffer must be defined."),Promise.resolve(t).then(function(o){var s=null!==(t=o).events.start,i=Array.isArray(t.events.blockIds)&&t.events.blockIds.length>0;return e.invariant(s||i,"SendGetEventsError: Unable to determine which get events request to send. Either a block height range, or block IDs must be specified."),Promise.resolve(s?C(t,r,n):N(t,r,n))})}catch(e){return Promise.reject(e)}},N=function(e,r,n){try{var o=n.unary||s,i=new t.GetEventsForBlockIDsRequest;return i.setType(e.events.eventType),e.events.blockIds.forEach(function(e){return i.addBlockIds(F(e,r))}),Promise.resolve(o(n.node,t.AccessAPI.GetEventsForBlockIDs,i,r)).then(function(t){return J(e,r,t)})}catch(e){return Promise.reject(e)}},C=function(e,r,n){try{var o=n.unary||s,i=new t.GetEventsForHeightRangeRequest;return i.setType(e.events.eventType),i.setStartHeight(Number(e.events.start)),i.setEndHeight(Number(e.events.end)),Promise.resolve(o(n.node,t.AccessAPI.GetEventsForHeightRange,i,r)).then(function(t){return J(e,r,t)})}catch(e){return Promise.reject(e)}},O=function(e,t){return t.Buffer.from(e).toString("hex")},F=function(e,t){return t.Buffer.from(e,"hex")};function J(e,t,r){var n=t.response();n.tag=e.tag;var o=r.getResultsList();return n.events=o.reduce(function(e,r){var n=O(r.getBlockId_asU8(),t),o=r.getBlockHeight(),s=r.getBlockTimestamp().toDate().toISOString();return r.getEventsList().forEach(function(r){e.push({blockId:n,blockHeight:o,blockTimestamp:s,type:r.getType(),transactionId:O(r.getTransactionId_asU8(),t),transactionIndex:r.getTransactionIndex(),eventIndex:r.getEventIndex(),payload:JSON.parse(t.Buffer.from(r.getPayload_asU8()).toString("utf8"))})}),e},[]),n}var M=function(r,n,o){void 0===n&&(n={}),void 0===o&&(o={});try{return e.invariant(o.node,"SDK Send Get Latest Block Error: opts.node must be defined."),e.invariant(n.response,"SDK Send Get Latest Block Error: context.response must be defined."),e.invariant(n.Buffer,"SDK Send Get Latest Block Error: context.Buffer must be defined."),Promise.resolve(r).then(function(e){r=e;var i=new t.GetLatestBlockRequest;return r.latestBlock&&r.latestBlock.isSealed&&(i.setIsSealed(r.latestBlock.isSealed),W()),r.block&&r.block.isSealed&&i.setIsSealed(r.block.isSealed),Promise.resolve(s(o.node,t.AccessAPI.GetLatestBlock,i,n)).then(function(e){var t=e.getBlock(),o=t.getCollectionGuaranteesList(),s=t.getBlockSealsList(),i=t.getSignaturesList(),a=n.response();return a.tag=r.tag,a.block={id:z(t.getId_asU8(),n),parentId:z(t.getParentId_asU8(),n),height:t.getHeight(),timestamp:t.getTimestamp(),collectionGuarantees:o.map(function(e){return{collectionId:z(e.getCollectionId_asU8(),n),signatures:e.getSignaturesList()}}),blockSeals:s.map(function(e){return{blockId:z(e.getBlockId_asU8(),n),executionReceiptId:z(e.getExecutionReceiptId_asU8(),n),executionReceiptSignatures:e.getExecutionReceiptSignaturesList(),resultApprovalSignatures:e.getResultApprovalSignaturesList()}}),signatures:i},a})})}catch(e){return Promise.reject(e)}},z=function(e,t){return t.Buffer.from(e).toString("hex")},W=function(){console.error("\n          %c@onflow/send Deprecation Notice\n          ========================\n\n          Operating upon data of the latestBlock field of the interaction object is deprecated and will no longer be recognized in future releases of @onflow/send.\n          Find out more here: https://github.com/onflow/flow-js-sdk/blob/master/packages/send/WARNINGS.md#0001-Deprecating-latestBlock-field\n\n          =======================\n        ".replace(/\n\s+/g,"\n").trim(),"font-weight:bold;font-family:monospace;")},X=function(r,n,o){void 0===n&&(n={}),void 0===o&&(o={});try{e.invariant(o.node,"SDK Send Get Transaction Error: opts.node must be defined."),e.invariant(n.response,"SDK Send Get Transaction Error: context.response must be defined."),e.invariant(n.Buffer,"SDK Send Get Transaction Error: context.Buffer must be defined.");var i=o.unary||s;return Promise.resolve(r).then(function(e){r=e;var s=new t.GetTransactionRequest;return s.setId(Z(r.transaction.id,n)),Promise.resolve(i(o.node,t.AccessAPI.GetTransaction,s,n)).then(function(e){var t=n.response();t.tag=r.tag;var o,s=function(e){return{address:V(e.getAddress_asU8(),n),keyId:e.getKeyId(),signature:V(e.getSignature_asU8(),n)}},i=e.getTransaction();return t.transaction={script:n.Buffer.from(i.getScript_asU8()).toString("utf8"),args:i.getArgumentsList().map(function(e){return JSON.parse(n.Buffer.from(e).toString("utf8"))}),referenceBlockId:V(i.getReferenceBlockId_asU8(),n),gasLimit:i.getGasLimit(),proposalKey:(o=i.getProposalKey(),{address:V(o.getAddress_asU8(),n),keyId:o.getKeyId(),sequenceNumber:o.getSequenceNumber()}),payer:V(i.getPayer_asU8(),n),authorizers:i.getAuthorizersList().map(function(e){return V(e,n)}),payloadSignatures:i.getPayloadSignaturesList().map(s),envelopeSignatures:i.getEnvelopeSignaturesList().map(s)},t})})}catch(e){return Promise.reject(e)}},V=function(e,t){return t.Buffer.from(e).toString("hex")},Z=function(e,t){return t.Buffer.from(e,"hex")},Q=function(r,n,o){void 0===n&&(n={}),void 0===o&&(o={});try{e.invariant(o.node,"SDK Send Get Transaction Status Error: opts.node must be defined."),e.invariant(n.response,"SDK Send Get Transaction Status Error: context.response must be defined."),e.invariant(n.Buffer,"SDK Send Get Transaction Status Error: context.Buffer must be defined.");var i=o.unary||s;return Promise.resolve(r).then(function(e){r=e;var s=new t.GetTransactionRequest;return s.setId(ee(r.transaction.id,n)),Promise.resolve(i(o.node,t.AccessAPI.GetTransactionResult,s,n)).then(function(e){var t=e.getEventsList(),o=n.response();return o.tag=r.tag,o.transactionStatus={status:e.getStatus(),statusString:Y[e.getStatus()],statusCode:e.getStatusCode(),errorMessage:e.getErrorMessage(),events:t.map(function(e){return{type:e.getType(),transactionId:$(e.getTransactionId_asU8(),n),transactionIndex:e.getTransactionIndex(),eventIndex:e.getEventIndex(),payload:JSON.parse(n.Buffer.from(e.getPayload_asU8()).toString("utf8"))}})},o})})}catch(e){return Promise.reject(e)}},Y={0:"UNKNOWN",1:"PENDING",2:"FINALIZED",3:"EXECUTED",4:"SEALED",5:"EXPIRED"},$=function(e,t){return t.Buffer.from(e).toString("hex")},ee=function(e,t){return t.Buffer.from(e,"hex")},te=function(r,n,o){void 0===n&&(n={}),void 0===o&&(o={});try{e.invariant(o.node,"SDK Send Ping Error: opts.node must be defined."),e.invariant(n.response,"SDK Send Ping Error: context.response must be defined.");var i=o.unary||s;return Promise.resolve(r).then(function(e){r=e;var s=new t.PingRequest;return Promise.resolve(i(o.node,t.AccessAPI.Ping,s,n)).then(function(e){var t=n.response();return t.tag=r.tag,t})})}catch(e){return Promise.reject(e)}},re=function(r,n,i){void 0===n&&(n={}),void 0===i&&(i={});try{e.invariant(i.node,"SDK Send Transaction Error: opts.node must be defined."),e.invariant(n.response,"SDK Send Transaction Error: context.response must be defined."),e.invariant(n.Buffer,"SDK Send Transaction Error: context.Buffer must be defined.");var a=i.unary||s;return Promise.resolve(r).then(function(e){r=e;var s=new t.Transaction;s.setScript(oe(r.message.cadence,n)),s.setGasLimit(r.message.computeLimit),s.setReferenceBlockId(r.message.refBlock?se(r.message.refBlock,n):null),s.setPayer(ie(o.sansPrefix(r.accounts[r.payer].addr),n)),r.message.arguments.forEach(function(e){return s.addArguments(ae(r.arguments[e].asArgument,n))}),r.authorizations.map(function(e){return r.accounts[e].addr}).reduce(function(e,t){return e.find(function(e){return e===t})?e:[].concat(e,[t])},[]).forEach(function(e){return s.addAuthorizers(ie(o.sansPrefix(e),n))});var c=new t.Transaction.ProposalKey;c.setAddress(ie(o.sansPrefix(r.accounts[r.proposer].addr),n)),c.setKeyId(r.accounts[r.proposer].keyId),c.setSequenceNumber(r.accounts[r.proposer].sequenceNum),s.setProposalKey(c);for(var u=0,d=Object.values(r.accounts);u<d.length;u++){var f=d[u];try{if(!f.role.payer&&null!=f.signature){var l=new t.Transaction.Signature;l.setAddress(ie(o.sansPrefix(f.addr),n)),l.setKeyId(f.keyId),l.setSignature(se(f.signature,n)),s.addPayloadSignatures(l)}}catch(e){throw console.error("Trouble applying payload signature",{acct:f,ix:r}),e}}for(var g=0,m=Object.values(r.accounts);g<m.length;g++){var p=m[g];try{if(p.role.payer&&null!=p.signature){var v=new t.Transaction.Signature;v.setAddress(ie(o.sansPrefix(p.addr),n)),v.setKeyId(p.keyId),v.setSignature(se(p.signature,n)),s.addEnvelopeSignatures(v)}}catch(e){throw console.error("Trouble applying envelope signature",{acct:p,ix:r}),e}}var S=new t.SendTransactionRequest;S.setTransaction(s);var h=Date.now();return Promise.resolve(a(i.node,t.AccessAPI.SendTransaction,S,n)).then(function(e){var t=Date.now(),o=n.response();return o.tag=r.tag,o.transactionId=ne(e.getId_asU8(),n),"undefined"!=typeof window&&window.dispatchEvent(new CustomEvent("FLOW::TX",{detail:{txId:o.transactionId,delta:t-h}})),o})})}catch(e){return Promise.reject(e)}},ne=function(e,t){return t.Buffer.from(e).toString("hex")},oe=function(e,t){return t.Buffer.from(e,"utf8")},se=function(e,t){return t.Buffer.from(e,"hex")},ie=function(e,t){return function(e,t,r){return r.Buffer.from(e.padStart(16,0),"hex")}(e,0,t)},ae=function(e,t){return t.Buffer.from(JSON.stringify(e),"utf8")},ce=function(e,t){return t.Buffer.from(e).toString("hex")},ue=function(e,t){return t.Buffer.from(e).toString("hex")};exports.send=function(r,n,o){void 0===n&&(n={}),void 0===o&&(o={});try{return e.invariant(o.node,'SDK Send Error: Either opts.node or "accessNode.api" in config must be defined.'),e.invariant(n.ix,"SDK Send Error: context.ix must be defined."),Promise.resolve(r).then(function(a){switch(r=a,!0){case n.ix.isTransaction(r):return o.sendTransaction?o.sendTransaction(r,n,o):re(r,n,o);case n.ix.isGetTransactionStatus(r):return o.sendGetTransactionStatus?o.sendGetTransactionStatus(r,n,o):Q(r,n,o);case n.ix.isGetTransaction(r):return o.sendGetTransaction?o.sendGetTransaction(r,n,o):X(r,n,o);case n.ix.isScript(r):return o.sendExecuteScript?o.sendExecuteScript(r,n,o):i(r,n,o);case n.ix.isGetAccount(r):return o.sendGetAccount?o.sendGetAccount(r,n,o):m(r,n,o);case n.ix.isGetEvents(r):return o.sendGetEvents?o.sendGetEvents(r,n,o):q(r,n,o);case n.ix.isGetLatestBlock(r):return o.sendGetLatestBlock?o.sendGetLatestBlock(r,n,o):M(r,n,o);case n.ix.isGetBlock(r):return o.sendGetBlock?o.sendGetBlock(r,n,o):D(r,n,o);case n.ix.isGetBlockHeader(r):return o.sendGetBlockHeader?o.sendGetBlockHeader(r,n,o):y(r,n,o);case n.ix.isGetBlockById(r):return o.sendGetBlockById?o.sendGetBlockById(r,n,o):function(r,n,o){void 0===n&&(n={}),void 0===o&&(o={});try{return e.invariant(o.node,"SDK Send Get Block By ID Error: opts.node must be defined."),e.invariant(n.response,"SDK Send Get Block By ID Error: context.response must be defined."),e.invariant(n.Buffer,"SDK Send Get Block By ID Error: context.Buffer must be defined."),Promise.resolve(r).then(function(e){r=e;var i=new t.GetBlockByIDRequest;return i.setId(function(e,t){return t.Buffer.from(e,"hex")}(r.block.id,n)),Promise.resolve(s(o.node,t.AccessAPI.GetBlockByID,i,n)).then(function(e){var t=e.getBlock(),o=t.getCollectionGuaranteesList(),s=t.getBlockSealsList(),i=t.getSignaturesList(),a=n.response();return a.tag=r.tag,a.block={id:ce(t.getId_asU8(),n),parentId:ce(t.getParentId_asU8(),n),height:t.getHeight(),timestamp:t.getTimestamp(),collectionGuarantees:o.map(function(e){return{collectionId:ce(e.getCollectionId_asU8(),n),signatures:e.getSignaturesList()}}),blockSeals:s.map(function(e){return{blockId:ce(e.getBlockId_asU8(),n),executionReceiptId:ce(e.getExecutionReceiptId_asU8(),n),executionReceiptSignatures:e.getExecutionReceiptSignaturesList(),resultApprovalSignatures:e.getResultApprovalSignaturesList()}}),signatures:i},a})})}catch(e){return Promise.reject(e)}}(r,n,o);case n.ix.isGetBlockByHeight(r):return o.sendGetBlockByHeight?o.sendGetBlockByHeight(r,n,o):function(r,n,o){void 0===n&&(n={}),void 0===o&&(o={});try{return e.invariant(o.node,"SDK Send Get Block By Height Error: opts.node must be defined."),e.invariant(n.response,"SDK Send Get Block By Height Error: context.response must be defined."),e.invariant(n.Buffer,"SDK Send Get Block By Height Error: context.Buffer must be defined."),Promise.resolve(r).then(function(e){r=e;var i=new t.GetBlockByHeightRequest;return i.setHeight(Number(r.block.height)),Promise.resolve(s(o.node,t.AccessAPI.GetBlockByHeight,i,n)).then(function(e){var t=e.getBlock(),o=t.getCollectionGuaranteesList(),s=t.getBlockSealsList(),i=t.getSignaturesList(),a=n.response();return a.tag=r.tag,a.block={id:ue(t.getId_asU8(),n),parentId:ue(t.getParentId_asU8(),n),height:t.getHeight(),timestamp:t.getTimestamp(),collectionGuarantees:o.map(function(e){return{collectionId:ue(e.getCollectionId_asU8(),n),signatures:e.getSignaturesList()}}),blockSeals:s.map(function(e){return{blockId:ue(e.getBlockId_asU8(),n),executionReceiptId:ue(e.getExecutionReceiptId_asU8(),n),executionReceiptSignatures:e.getExecutionReceiptSignaturesList(),resultApprovalSignatures:e.getResultApprovalSignaturesList()}}),signatures:i},a})})}catch(e){return Promise.reject(e)}}(r,n,o);case n.ix.isGetCollection(r):return o.sendGetCollection?o.sendGetCollection(r,n,o):_(r,n,o);case n.ix.isPing(r):return o.sendPing?o.sendPing(r,n,o):te(r,n,o);default:return r}})}catch(e){return Promise.reject(e)}},exports.sendExecuteScript=i,exports.sendGetAccount=m,exports.sendGetBlock=D,exports.sendGetBlockHeader=y,exports.sendGetCollection=_,exports.sendGetEvents=q,exports.sendGetLatestBlock=M,exports.sendGetTransaction=X,exports.sendGetTransactionStatus=Q,exports.sendPing=te,exports.sendTransaction=re;
//# sourceMappingURL=sdk-send-grpc.js.map
