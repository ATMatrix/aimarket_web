(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('web3')) :
	typeof define === 'function' && define.amd ? define(['exports', 'web3'], factory) :
	(factory((global.microraiden = {}),global.Web3));
}(this, (function (exports,Web3) { 'use strict';

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function promisify(obj, method) {
    /* Convert a callback-based func to return a promise */
    return function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            return obj[method].apply(obj, params.concat([function (err, res) { return err ? reject(err) : resolve(res); }]));
        });
    };
}
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    return Deferred;
}());
var MicroRaiden = /** @class */ (function () {
    function MicroRaiden(web3, contractAddr, contractABI, tokenAddr, tokenABI) {
        this.decimals = 0;
        if (!web3) {
            web3 = 'http://localhost:8545';
        }
        if (typeof web3 === 'string') {
            this.web3 = new Web3(new Web3.providers.HttpProvider(web3));
        }
        else if (web3['currentProvider']) {
            this.web3 = new Web3(web3.currentProvider);
        }
        else {
            throw new Error('Invalid web3 provider');
        }
        this.contract = this.web3.eth.contract(contractABI).at(contractAddr);
        this.token = this.web3.eth.contract(tokenABI).at(tokenAddr);
    }
    // "static" methods/utils
    MicroRaiden.prototype.encodeHex = function (val, zPadLength) {
        /* Encode a string or number as hexadecimal, without '0x' prefix */
        if (typeof val === 'number') {
            val = val.toString(16);
        }
        else {
            val = Array.from(val).map(function (char) {
                return char.charCodeAt(0).toString(16).padStart(2, '0');
            })
                .join('');
        }
        return val.padStart(zPadLength || 0, '0');
    };
    MicroRaiden.prototype.num2tkn = function (value) {
        /* Convert number to BigNumber compatible with configured token,
         * taking in account the token decimals */
        return Math.floor(value * Math.pow(10, this.decimals));
    };
    MicroRaiden.prototype.tkn2num = function (bal) {
        /* Convert BigNumber to number compatible with configured token,
         * taking in account the token decimals */
        return bal && bal.div ?
            bal.div(Math.pow(10, this.decimals)) :
            bal / Math.pow(10, this.decimals);
    };
    MicroRaiden.prototype.waitTx = function (txHash, confirmations) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var blockCounter, defer, filter, firstBlockTimeout;
            return __generator(this, function (_a) {
                blockCounter = 30;
                confirmations = +confirmations || 0;
                defer = new Deferred();
                filter = this.web3.eth.filter('latest');
                firstBlockTimeout = setTimeout(function () {
                    if (filter) {
                        filter.stopWatching(null);
                        filter = null;
                    }
                    defer.reject(new Error('No blocks seen in 30s. ' +
                        'You may need to restart your browser or check ' +
                        'if your node is synced!'));
                }, 30e3);
                // Wait for tx to be finished
                filter.watch(function (err, blockHash) { return __awaiter(_this, void 0, void 0, function () {
                    var receipt;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (err) {
                                    return [2 /*return*/, defer.reject(err)];
                                }
                                // on first block, stop timeout
                                clearTimeout(firstBlockTimeout);
                                if (blockCounter <= 0) {
                                    if (filter) {
                                        filter.stopWatching(null);
                                        filter = null;
                                    }
                                    console.warn('!! Tx expired !!', txHash);
                                    return [2 /*return*/, defer.reject(new Error('Tx expired: ' + txHash))];
                                }
                                return [4 /*yield*/, promisify(this.web3.eth, 'getTransactionReceipt')(txHash)];
                            case 1:
                                receipt = _a.sent();
                                if (!receipt || !receipt.blockNumber) {
                                    console.log('Waiting tx..', blockCounter--);
                                    return [2 /*return*/];
                                }
                                else if (confirmations > 0) {
                                    console.log('Waiting confirmations...', confirmations--);
                                    return [2 /*return*/];
                                }
                                // Tx is finished
                                if (filter) {
                                    filter.stopWatching(null);
                                    filter = null;
                                }
                                return [2 /*return*/, defer.resolve(receipt)];
                        }
                    });
                }); });
                return [2 /*return*/, defer.promise];
            });
        });
    };
    // instance methods
    MicroRaiden.prototype.loadStoredChannel = function (account, receiver) {
        /* If localStorage is available, try to load a channel from it,
         * indexed by given account and receiver */
        if (!localStorage) {
            this.channel = undefined;
            return;
        }
        var key = [account, receiver].join('|');
        var value = localStorage.getItem(key);
        if (value) {
            this.channel = JSON.parse(value);
        }
        else {
            this.channel = undefined;
        }
    };
    MicroRaiden.prototype.forgetStoredChannel = function () {
        /* Forget current channel and remove it from localStorage, if available */
        if (!this.channel) {
            return;
        }
        if (localStorage) {
            var key = [this.channel.account, this.channel.receiver].join('|');
            localStorage.removeItem(key);
        }
        this.channel = undefined;
    };
    MicroRaiden.prototype.setChannel = function (channel) {
        /* Set channel info. Can be used to externally [re]store channel info */
        this.channel = channel;
        if (localStorage) {
            var key = [this.channel.account, this.channel.receiver].join('|');
            localStorage.setItem(key, JSON.stringify(this.channel));
        }
    };
    MicroRaiden.prototype.isChannelValid = function () {
        /* Health check for currently configured channel info */
        if (!this.channel || !this.channel.receiver || !this.channel.block
            || isNaN(this.channel.balance) || !this.channel.account) {
            return false;
        }
        return true;
    };
    MicroRaiden.prototype.getAccounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify(this.web3.eth, 'getAccounts')()];
                    case 1: 
                    /* Get available accounts from web3 providers.
                     * Returns promise to accounts addresses array */
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MicroRaiden.prototype.getTokenInfo = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, symbol, decimals, balance;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            promisify(this.token.name, 'call')(),
                            promisify(this.token.symbol, 'call')(),
                            promisify(this.token.decimals, 'call')().then(function (d) { return d.toNumber(); }),
                            account ? promisify(this.token.balanceOf, 'call')(account) : null
                        ])];
                    case 1:
                        _a = _b.sent(), name = _a[0], symbol = _a[1], decimals = _a[2], balance = _a[3];
                        this.decimals = decimals;
                        return [2 /*return*/, { name: name, symbol: symbol, decimals: decimals, balance: this.tkn2num(balance) }];
                }
            });
        });
    };
    MicroRaiden.prototype.getChannelInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var closeEvents, closed, settleEvents, settled, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /* Get channel details such as current state (one of opened, closed or
                         * settled), block in which it was set and current deposited amount
                         * Returns promise to MicroChannelInfo object */
                        if (!this.isChannelValid()) {
                            throw new Error('No valid channelInfo');
                        }
                        return [4 /*yield*/, promisify(this.contract.ChannelCloseRequested({
                                _sender: this.channel.account,
                                _receiver: this.channel.receiver,
                                _open_block_number: this.channel.block,
                            }, {
                                fromBlock: this.channel.block,
                                toBlock: 'latest'
                            }), 'get')()];
                    case 1:
                        closeEvents = _a.sent();
                        if (!closeEvents || closeEvents.length === 0) {
                            closed = 0;
                        }
                        else {
                            closed = closeEvents[0].blockNumber;
                        }
                        return [4 /*yield*/, promisify(this.contract.ChannelSettled({
                                _sender: this.channel.account,
                                _receiver: this.channel.receiver,
                                _open_block_number: this.channel.block,
                            }, {
                                fromBlock: closed || this.channel.block,
                                toBlock: 'latest'
                            }), 'get')()];
                    case 2:
                        settleEvents = _a.sent();
                        if (!settleEvents || settleEvents.length === 0) {
                            settled = 0;
                        }
                        else {
                            settled = settleEvents[0].blockNumber;
                        }
                        // for settled channel, getChannelInfo call will fail, so we return before
                        if (settled) {
                            return [2 /*return*/, { 'state': 'settled', 'block': settled, 'deposit': 0 }];
                        }
                        return [4 /*yield*/, promisify(this.contract.getChannelInfo, 'call')(this.channel.account, this.channel.receiver, this.channel.block, { from: this.channel.account })];
                    case 3:
                        info = _a.sent();
                        if (!(info[1] > 0)) {
                            throw new Error('Invalid channel deposit: ' + JSON.stringify(info));
                        }
                        return [2 /*return*/, {
                                'state': closed ? 'closed' : 'opened',
                                'block': closed || this.channel.block,
                                'deposit': this.tkn2num(info[1]),
                            }];
                }
            });
        });
    };
    MicroRaiden.prototype.openChannel = function (account, receiver, deposit) {
        return __awaiter(this, void 0, void 0, function () {
            var tkn_deposit, balance, transferTxHash, receipt, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /* Open a channel for account to receiver, depositing some tokens in it.
                         * Should work with both ERC20/ERC223 tokens.
                         * Returns promise to MicroChannel info object */
                        if (this.isChannelValid()) {
                            console.warn('Already valid channel will be forgotten:', this.channel);
                        }
                        tkn_deposit = this.num2tkn(deposit);
                        return [4 /*yield*/, promisify(this.token.balanceOf, 'call')(account, { from: account })];
                    case 1:
                        balance = _a.sent();
                        if (!(balance >= tkn_deposit)) {
                            throw new Error("Not enough tokens.\n        Token balance = " + this.tkn2num(balance) + ", required = " + deposit);
                        }
                        console.log('Token balance', this.token.address, this.tkn2num(balance));
                        if (!(typeof this.token.transfer['address,uint256,bytes'] === 'function')) return [3 /*break*/, 3];
                        return [4 /*yield*/, promisify(this.token.transfer['address,uint256,bytes'], 'sendTransaction')(this.contract.address, tkn_deposit, receiver, // bytes _data (3rd param) is the receiver
                            { from: account })];
                    case 2:
                        // ERC223
                        // transfer tokens directly to the channel manager contract
                        transferTxHash = _a.sent();
                        return [3 /*break*/, 6];
                    case 3: 
                    // ERC20
                    // send 'approve' transaction to token contract
                    return [4 /*yield*/, promisify(this.token.approve, 'sendTransaction')(this.contract.address, tkn_deposit, { from: account })];
                    case 4:
                        // ERC20
                        // send 'approve' transaction to token contract
                        _a.sent();
                        return [4 /*yield*/, promisify(this.contract.createChannelERC20, 'sendTransaction')(receiver, tkn_deposit, { from: account })];
                    case 5:
                        // send 'createChannel' transaction to channel manager contract
                        transferTxHash = _a.sent();
                        _a.label = 6;
                    case 6:
                        console.log('transferTxHash', transferTxHash);
                        return [4 /*yield*/, this.waitTx(transferTxHash, 1)];
                    case 7:
                        receipt = _a.sent();
                        return [4 /*yield*/, promisify(this.contract.getChannelInfo, 'call')(account, receiver, receipt.blockNumber, { from: account })];
                    case 8:
                        info = _a.sent();
                        if (!(info[1] > 0)) {
                            throw new Error('No deposit found!');
                        }
                        this.setChannel({ account: account, receiver: receiver, block: receipt.blockNumber, balance: 0 });
                        // return channel
                        return [2 /*return*/, this.channel];
                }
            });
        });
    };
    MicroRaiden.prototype.topUpChannel = function (deposit) {
        return __awaiter(this, void 0, void 0, function () {
            var account, tkn_deposit, balance, transferTxHash, receipt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /* Top up current channel, by depositing some tokens to it
                         * Should work with both ERC20/ERC223 tokens
                         * Returns promise to final channel deposited amount */
                        if (!this.isChannelValid()) {
                            throw new Error('No valid channelInfo');
                        }
                        account = this.channel.account;
                        tkn_deposit = this.num2tkn(deposit);
                        return [4 /*yield*/, promisify(this.token.balanceOf, 'call')(account, { from: account })];
                    case 1:
                        balance = _a.sent();
                        if (!(balance >= tkn_deposit)) {
                            throw new Error("Not enough tokens.\n        Token balance = " + this.tkn2num(balance) + ", required = " + deposit);
                        }
                        console.log('Token balance', this.token.address, this.tkn2num(balance));
                        if (!(typeof this.token.transfer['address,uint256,bytes'] === 'function')) return [3 /*break*/, 3];
                        return [4 /*yield*/, promisify(this.token.transfer['address,uint256,bytes'], 'sendTransaction')(this.contract.address, tkn_deposit, 
                            // receiver goes as 3rd param, 20 bytes, plus blocknumber, 4bytes
                            this.channel.receiver + this.encodeHex(this.channel.block, 8), { from: account })];
                    case 2:
                        // ERC223, just send token.transfer transaction
                        // transfer tokens directly to the channel manager contract
                        transferTxHash = _a.sent();
                        return [3 /*break*/, 6];
                    case 3: 
                    // ERC20, approve channel manager contract to handle our tokens, then topUp
                    // send 'approve' transaction to token contract
                    return [4 /*yield*/, promisify(this.token.approve, 'sendTransaction')(this.contract.address, tkn_deposit, { from: account })];
                    case 4:
                        // ERC20, approve channel manager contract to handle our tokens, then topUp
                        // send 'approve' transaction to token contract
                        _a.sent();
                        return [4 /*yield*/, promisify(this.contract.topUpERC20, 'sendTransaction')(this.channel.receiver, this.channel.block, tkn_deposit, { from: account })];
                    case 5:
                        // send 'topUp' transaction to channel manager contract
                        transferTxHash = _a.sent();
                        _a.label = 6;
                    case 6:
                        console.log('transferTxHash', transferTxHash);
                        return [4 /*yield*/, this.waitTx(transferTxHash, 1)];
                    case 7:
                        receipt = _a.sent();
                        return [4 /*yield*/, this.getChannelInfo()];
                    case 8: 
                    // return current deposit
                    return [2 /*return*/, (_a.sent()).deposit];
                }
            });
        });
    };
    MicroRaiden.prototype.closeChannel = function (receiverSig) {
        return __awaiter(this, void 0, void 0, function () {
            var info, sign, params, paramsTypes, txHash, receipt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /* Close current channel.
                         * Optional parameter is signed cooperative close from receiver.
                         * If cooperative close was successful, channel is already settled after.
                         * Else, it enters 'closed' state, and may be settled after settlement
                         * period configured in contract.
                         * Returns promise to block number in which channel was closed */
                        if (!this.isChannelValid()) {
                            throw new Error('No valid channelInfo');
                        }
                        return [4 /*yield*/, this.getChannelInfo()];
                    case 1:
                        info = _a.sent();
                        if (info.state !== 'opened') {
                            throw new Error('Tried closing already closed channel');
                        }
                        console.log("Closing channel. Cooperative = " + receiverSig);
                        if (!!this.channel.sign) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.signBalance(this.channel.balance)];
                    case 2:
                        sign = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        sign = this.channel.sign;
                        _a.label = 4;
                    case 4:
                        params = [
                            this.channel.receiver,
                            this.channel.block,
                            this.num2tkn(this.channel.balance),
                            sign
                        ];
                        paramsTypes = 'address,uint32,uint192,bytes';
                        if (receiverSig) {
                            params.push(receiverSig);
                            paramsTypes += ',bytes';
                        }
                        return [4 /*yield*/, promisify(this.contract.close[paramsTypes], 'sendTransaction').apply(void 0, params.concat([{ from: this.channel.account }]))];
                    case 5:
                        txHash = _a.sent();
                        console.log('closeTxHash', txHash);
                        return [4 /*yield*/, this.waitTx(txHash, 0)];
                    case 6:
                        receipt = _a.sent();
                        return [2 /*return*/, receipt.blockNumber];
                }
            });
        });
    };
    MicroRaiden.prototype.settleChannel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info, txHash, receipt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /* If channel was not cooperatively closed, and after settlement period,
                         * this function settles the channel, distributing the tokens to sender and
                         * receiver.
                         * Returns promise to blockNumber of settlement tx */
                        if (!this.isChannelValid()) {
                            throw new Error('No valid channelInfo');
                        }
                        return [4 /*yield*/, this.getChannelInfo()];
                    case 1:
                        info = _a.sent();
                        if (info.state !== 'closed') {
                            throw new Error('Tried settling opened or settled channel');
                        }
                        return [4 /*yield*/, promisify(this.contract.settle, 'sendTransaction')(this.channel.receiver, this.channel.block, { from: this.channel.account })];
                    case 2:
                        txHash = _a.sent();
                        console.log('settleTxHash', txHash);
                        return [4 /*yield*/, this.waitTx(txHash, 0)];
                    case 3:
                        receipt = _a.sent();
                        return [2 /*return*/, receipt.blockNumber];
                }
            });
        });
    };
    MicroRaiden.prototype.signMessage = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var hex, sign, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /* Ask user for signing a string.
                         * Returns a promise for signed data */
                        if (!this.isChannelValid()) {
                            throw new Error('No valid channelInfo');
                        }
                        hex = '0x' + this.encodeHex(msg);
                        console.log("Signing \"" + msg + "\" => " + hex + ", account: " + this.channel.account);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 7]);
                        return [4 /*yield*/, promisify(this.web3.personal, 'sign')(hex, this.channel.account)];
                    case 2:
                        sign = _a.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        err_1 = _a.sent();
                        if (!(err_1.message &&
                            (err_1.message.includes('Method not found') ||
                                err_1.message.includes('is not a function')))) return [3 /*break*/, 5];
                        return [4 /*yield*/, promisify(this.web3.eth, 'sign')(this.channel.account, hex)];
                    case 4:
                        sign = _a.sent();
                        return [3 /*break*/, 6];
                    case 5: throw err_1;
                    case 6: return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, sign];
                }
            });
        });
    };
    MicroRaiden.prototype.signBalance = function (newBalance) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, sign;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /* Ask user for signing a channel balance.
                         * Notice it's the final balance, not the increment, and that the new
                         * balance is set in channel data, despite "success" of any following
                         * sender/receiver request/call.
                         * Returns promise to signed data */
                        if (!this.isChannelValid()) {
                            throw new Error('No valid channelInfo');
                        }
                        console.log('signBalance', newBalance, this.channel);
                        if (newBalance === null) {
                            newBalance = this.channel.balance;
                        }
                        if (newBalance === this.channel.balance && this.channel.sign) {
                            return [2 /*return*/, this.channel.sign];
                        }
                        return [4 /*yield*/, promisify(this.contract.getBalanceMessage, 'call')(this.channel.receiver, this.channel.block, this.num2tkn(newBalance), { from: this.channel.account })];
                    case 1:
                        msg = _a.sent();
                        return [4 /*yield*/, this.signMessage(msg)];
                    case 2:
                        sign = _a.sent();
                        // return signed message
                        if (newBalance === this.channel.balance && !this.channel.sign) {
                            this.setChannel(Object.assign({}, this.channel, { sign: sign }));
                        }
                        return [2 /*return*/, sign];
                }
            });
        });
    };
    MicroRaiden.prototype.incrementBalanceAndSign = function (amount) {
        return __awaiter(this, void 0, void 0, function () {
            var newBalance, info, sign;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /* Ask user for signing a new balance, which is previous balance added
                         * of a given amount.
                         * Notice that, if sign is successful, balance is incremented regardless
                         * of "success" of any following sender/receiver request/call.
                         * Returns promise to signed data */
                        if (!this.isChannelValid()) {
                            throw new Error('No valid channelInfo');
                        }
                        newBalance = this.channel.balance + +amount;
                        return [4 /*yield*/, this.getChannelInfo()];
                    case 1:
                        info = _a.sent();
                        if (info.state !== 'opened') {
                            throw new Error('Tried signing on closed channel');
                        }
                        else if (newBalance > info.deposit) {
                            throw new Error("Insuficient funds: current = " + info.deposit + " , required = " + newBalance);
                        }
                        return [4 /*yield*/, this.signBalance(newBalance)];
                    case 2:
                        sign = _a.sent();
                        this.setChannel(Object.assign({}, this.channel, { balance: newBalance, sign: sign }));
                        return [2 /*return*/, sign];
                }
            });
        });
    };
    MicroRaiden.prototype.buyToken = function (account) {
        return __awaiter(this, void 0, void 0, function () {
            var txHash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify(this.token.mint, 'sendTransaction')({
                            from: account,
                            value: this.web3.toWei(0.1, 'ether')
                        })];
                    case 1:
                        txHash = _a.sent();
                        console.log('mintTxHash', txHash);
                        return [4 /*yield*/, this.waitTx(txHash, 1)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return MicroRaiden;
}());

exports.MicroRaiden = MicroRaiden;

Object.defineProperty(exports, '__esModule', { value: true });

})));
