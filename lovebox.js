'use strict';

var util = require('util');
var Bot = require('slackbots');

var LoveBoxBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'loveboxbot';

    this.user = null;
    this.db = null;
};

util.inherits(LoveBoxBot, Bot);

LoveBoxBot.prototype.run = function () {
    LoveBoxBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

LoveBoxBot.prototype._onStart = function () {
    this._loadBotUser();
};

LoveBoxBot.prototype._onMessage = function (message) {
    if (this._isChatMessage(message) &&
        this._isDM(message) &&
        !this._isFromBot(message)
    ) {
      this.postMessageToChannel('lovebox', '' + message.text,{as_user: true});
    }
};

LoveBoxBot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

LoveBoxBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

LoveBoxBot.prototype._isDM = function (message) {
    return typeof message.channel === 'string' && message.channel[0] === 'D';
};

LoveBoxBot.prototype._isFromBot = function (message) {
    return message.user === this.user.id;
};

LoveBoxBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

module.exports = LoveBoxBot;
