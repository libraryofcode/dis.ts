import Endpoints from './rest/Endpoints';
import RESTClient from './rest/RESTClient';
import { WIDGET_STYLE_OPTIONS } from './util/Constants';

export default class Client {
  readonly rest = new RESTClient(this);
  private _token: string;
  constructor(token: string) {
    this._token = token;
  }

  get token() {
    return this._token;
  }

  addGroupDMRecipient(channelID: string, userID: string, params: any = {}) {
    return this.rest.request('PUT', Endpoints.GROUP_DM_RECIPIENT(channelID, userID), false, {
      access_token: params.accessToken,
      nick: params.nick,
    });
  }

  addGuildMember(guildID: string, userID: string, params: any = {}) {
    return this.rest.request('PUT', Endpoints.GUILD_MEMBER(guildID, userID), true, {
      access_token: params.accessToken,
      nick: params.nick,
      roles: params.roles,
      mute: params.mute,
      deaf: params.deaf,
    });
  }

  addGuildMemberRole(guildID: string, userID: string, roleID: string) {
    return this.rest.request('PUT', Endpoints.GUILD_MEMBER_ROLE(guildID, userID, roleID), true);
  }

  addPinnedChannelMessage(channelID: string, messageID: string) {
    return this.rest.request('PUT', Endpoints.CHANNEL_PINNED_MESSAGE(channelID, messageID), true);
  }

  beginGuildPrune(guildID: string, params: any = {}) {
    return this.rest.request('POST', Endpoints.GUILD_PRUNE(guildID), true, {
      days: params.days,
      compute_prune_count: params.computePruneCount,
      include_roles: params.includeRoles,
    });
  }

  bulkDeleteMessages(channelID: string, messageIDs: string[]) {
    return this.rest.request('POST', Endpoints.CHANNEL_MESSAGES_BULK_DELETE(channelID), true, { messages: messageIDs });
  }

  createChannelInvite(channelID: string, params: any = {}) {
    return this.rest.request('POST', Endpoints.CHANNEL_INVITES(channelID), true, {
      max_age: params.maxAge,
      max_uses: params.maxUses,
      temporary: params.temporary,
      unique: params.unique,
      target_user: params.targetUser,
      target_user_type: params.targetUserType,
    });
  }

  createDM(recipientID: string) {
    return this.rest.request('POST', Endpoints.USER_CHANNELS(), true, { recipient_id: recipientID });
  }

  // TODO createGroupDM - Intended orginally for now-deprecated GameBridge SDK, DMs won't be shown in Client. OAuth only.

  createGuild(params: any = {}) {
    return this.rest.request('POST', Endpoints.GUILDS(), true, {
      name: params.name,
      region: params.region,
      icon: params.icon,
      verification_level: params.verificationLevel,
      default_message_notifications: params.defaultMessageNotifications,
      explicit_content_filter: params.explicitContentFilter,
      roles: params.roles,
      channels: params.channels,
      afk_channel_id: params.afkChannelID,
      afk_timeout: params.afkTimeout,
      system_channel_id: params.systemChannelID,
    });
  }

  createGuildBan(guildID: string, userID: string, params: any = {}) {
    return this.rest.request('PUT', Endpoints.GUILD_BAN(guildID, userID), true, {
      delete_message_days: params.deleteMessageDays,
      reason: params.reason,
    });
  }

  createGuildChannel(guildID: string, params: any = {}) {
    return this.rest.request('POST', Endpoints.GUILD_CHANNEL(guildID), true, {
      name: params.name,
      type: params.type,
      topic: params.topic,
      bitrate: params.bitrate,
      user_limit: params.userLimit,
      rate_limit_per_user: params.rateLimitPerUser,
      position: params.position,
      permission_overwrites: params.permissionOverwrites,
      parent_id: params.parentID,
      nsfw: params.nsfw,
    });
  }

  createGuildEmoji(guildID: string, params: any = {}) {
    return this.rest.request('POST', Endpoints.GUILD_EMOJIS(guildID), true, params);
  }

  createGuildFromTemplate(code: string, name: string, icon?: string) {
    return this.rest.request('POST', Endpoints.TEMPLATE(code), true, { name, icon });
  }

  createGuildIntegration(guildID: string, params: any = {}) {
    return this.rest.request('POST', Endpoints.GUILD_INTEGRATIONS(guildID), true, params);
  }

  createGuildRole(guildID: string, params: any = {}) {
    return this.rest.request('POST', Endpoints.GUILD_ROLES(guildID), true, params);
  }

  createGuildTemplate(guildID: string, name: string, description?: string) {
    return this.rest.request('POST', Endpoints.GUILD_TEMPLATES(guildID), true, { name, description });
  }

  createMessage(channelID: string, params: any = {}) { // TODO Sort out multipart form data
    return this.rest.request('POST', Endpoints.CHANNEL_MESSAGES(channelID), true, {
      content: params.content,
      nonce: params.nonce,
      tts: params.tts,
      file: params.files,
      embed: params.embed,
      allowed_mentions: params.allowedMentions,
      message_reference: params.messageReference,
    });
  }

  createReaction(channelID: string, messageID: string, emoji: string) {
    return this.rest.request('PUT', Endpoints.CHANNEL_MESSAGE_USER_REACTION(channelID, messageID, emoji, '@me'), true);
  }

  createWebhook(channelID: string, name: string, avatar: string | null = null) {
    return this.rest.request('POST', Endpoints.CHANNEL_WEBHOOK(channelID), true, { name, avatar });
  }

  crosspostMessage(channelID: string, messageID: string) {
    return this.rest.request('POST', Endpoints.CHANNEL_MESSAGE_CROSSPOST(channelID, messageID), true);
  }

  deleteAllReactions(channelID: string, messageID: string) {
    return this.rest.request('DELETE', Endpoints.CHANNEL_MESSAGE_REACTIONS(channelID, messageID), true);
  }

  deleteAllReactionsEmoji(channelID: string, messageID: string, emoji: string) {
    return this.rest.request('DELETE', Endpoints.CHANNEL_MESSAGE_REACTIONS_EMOJI(channelID, messageID, emoji), true);
  }

  deleteChannel(channelID: string) {
    return this.rest.request('DELETE', Endpoints.CHANNEL(channelID), true);
  }

  deleteChannelPermission(channelID: string, overwriteID: string) {
    return this.rest.request('DELETE', Endpoints.CHANNEL_OVERWRITE_PERMISSIONS(channelID, overwriteID), true);
  }

  deleteGuild(guildID: string) {
    return this.rest.request('DELETE', Endpoints.GUILD(guildID), true);
  }

  deleteGuildEmoji(guildID: string, emojiID: string) {
    return this.rest.request('DELETE', Endpoints.GUILD_EMOJI(guildID, emojiID), true);
  }

  deleteGuildIntegration(guildID: string, integrationID: string) {
    return this.rest.request('DELETE', Endpoints.GUILD_INTEGRATION(guildID, integrationID), true);
  }

  deleteGuildRole(guildID: string, roleID: string) {
    return this.rest.request('DELETE', Endpoints.GUILD_ROLE(guildID, roleID), true);
  }

  deleteGuildTemplate(guildID: string, code: string) {
    return this.rest.request('DELETE', Endpoints.GUILD_TEMPLATE(guildID, code), true);
  }

  deleteInvite(code: string) {
    return this.rest.request('DELETE', Endpoints.INVITE(code), true);
  }

  deleteMessage(channelID: string, messageID: string) {
    return this.rest.request('DELETE', Endpoints.CHANNEL_MESSAGE(channelID, messageID), true);
  }

  deletePinnedChannelMessage(channelID: string, messageID: string) {
    return this.rest.request('DELETE', Endpoints.CHANNEL_PINNED_MESSAGE(channelID, messageID), true);
  }

  deleteReaction(channelID: string, messageID: string, emoji: string, userID = '@me') {
    return this.rest.request('DELETE', Endpoints.CHANNEL_MESSAGE_USER_REACTION(channelID, messageID, emoji, userID), true);
  }

  deleteWebhook(webhookID: string, webhookToken?: string) {
    return webhookToken
      ? this.rest.request('DELETE', Endpoints.WEBHOOK_TOKEN(webhookID, webhookToken), false)
      : this.rest.request('DELETE', Endpoints.WEBHOOK(webhookID), true);
  }

  editChannel(channelID: string, params: any = {}) {
    return this.rest.request('PATCH', Endpoints.CHANNEL(channelID), true, {
      name: params.name,
      type: params.type,
      position: params.position,
      topic: params.topic,
      nsfw: params.nsfw,
      rate_limit_per_user: params.rateLimitPerUser,
      bitrate: params.bitrate,
      user_limit: params.userLimit,
      permission_overwrites: params.permissionOverwrites,
      parent_id: params.parentID,
    });
  }

  editChannelPermissions(channelID: string, overwriteID: string, params: any = {}) {
    return this.rest.request('PUT', Endpoints.CHANNEL_OVERWRITE_PERMISSIONS(channelID, overwriteID), true, params);
  }

  editGuild(guildID: string, params: any = {}) {
    return this.rest.request('PATCH', Endpoints.GUILD(guildID), true, {
      name: params.name,
      region: params.region,
      verification_level: params.verificationLevel,
      default_message_notifications: params.defaultMessageNotifications,
      explicit_content_filter: params.explicitContentFilter,
      afk_channel_id: params.afkChannelID,
      afk_timeout: params.afkTimeout,
      icon: params.icon,
      owner_id: params.ownerID,
      splash: params.splash,
      banner: params.banner,
      system_channel_id: params.systemChannelID,
      rules_channel_id: params.rulesChannelID,
      public_updates_channel_id: params.publicUpdatesChannelID,
      preferred_locale: params.preferredLocale,
    });
  }

  editGuildChannelPositions(guildID: string, params: any = []) {
    return this.rest.request('PATCH', Endpoints.GUILD_CHANNEL(guildID), true, params);
  }

  editGuildEmoji(guildID: string, emojiID: string, params: any = {}) {
    return this.rest.request('PATCH', Endpoints.GUILD_EMOJI(guildID, emojiID), true, params);
  }

  editGuildIntegration(guildID: string, integrationID: string, params: any = {}) {
    return this.rest.request('PATCH', Endpoints.GUILD_INTEGRATION(guildID, integrationID), true, {
      expire_behaviour: params.expireBehaviour,
      expire_grace_period: params.expireGracePeriod,
      enable_emoticons: params.enableEmoticons,
    });
  }

  editGuildMember(guildID: string, userID: string, params: any = {}) {
    return this.rest.request('PATCH', Endpoints.GUILD_MEMBER(guildID, userID), true, {
      nick: params.nick,
      roles: params.roles,
      mute: params.mute,
      deaf: params.deaf,
      channel_id: params.channelID,
    });
  }

  editGuildMemberNickSelf(guildID: string, nick?: string | null) {
    return this.rest.request('PATCH', Endpoints.GUILD_SELF_NICK(guildID), true, { nick });
  }

  editGuildRole(guildID: string, roleID: string, params: any = {}) {
    return this.rest.request('PATCH', Endpoints.GUILD_ROLE(guildID, roleID), true, params);
  }

  editGuildRolePositions(guildID: string, params: any = []) {
    return this.rest.request('PATCH', Endpoints.GUILD_ROLES(guildID), true, params);
  }

  editGuildTemplate(guildID: string, code: string, params: any = {}) {
    return this.rest.request('PATCH', Endpoints.GUILD_TEMPLATE(guildID, code), true, params);
  }

  editGuildWidget(guildID: string, params: any = {}) {
    return this.rest.request('PATCH', Endpoints.GUILD_WIDGET(guildID), true, {
      enabled: params.enabled,
      channel_id: params.channelID,
    });
  }

  editMessage(channelID: string, messageID: string, params: any = {}) {
    return this.rest.request('PATCH', Endpoints.CHANNEL_MESSAGE(channelID, messageID), true, params);
  }

  editSelf(params: any = {}) {
    return this.rest.request('PATCH', Endpoints.USER('@me'), true, params);
  }

  editWebhook(webhookID: string, params: any = {}, webhookToken?: string) {
    return webhookToken
      ? this.rest.request('GET', Endpoints.WEBHOOK_TOKEN(webhookID, webhookToken), false, params)
      : this.rest.request('GET', Endpoints.WEBHOOK(webhookID), true, {
        name: params.name,
        avatar: params.avatar,
        channel_id: params.channelID,
      });
  }

  executeGitHubWebhook(webhookID: string, webhookToken: string, params: any = {}, wait?: boolean) {
    return this.rest.request('POST', Endpoints.WEBHOOK_GITHUB(webhookID, webhookToken) + wait ? '?wait=true' : '', false, params);
  }

  executeSlackWebhook(webhookID: string, webhookToken: string, params: any = {}, wait?: boolean) {
    return this.rest.request('POST', Endpoints.WEBHOOK_SLACK(webhookID, webhookToken) + wait ? '?wait=true' : '', false, params);
  }

  executeWebhook(webhookID: string, webhookToken: string, params: any = {}, wait?: boolean) {
    return this.rest.request('POST', Endpoints.WEBHOOK_TOKEN(webhookID, webhookToken) + wait ? '?wait=true' : '', false, {
      content: params.content,
      username: params.username,
      avatar_url: params.avatarURL,
      tss: params.tts,
      file: params.files,
      embeds: params.embeds,
      allowed_mentions: params.allowedMentions,
    });
  }

  followNewsChannel(channelID: string, webhookChannelID: string) {
    return this.rest.request('POST', Endpoints.FOLLOW_NEWS_CHANNEL(channelID), true, { webhook_channel_id: webhookChannelID });
  }

  getChannel(channelID: string) {
    return this.rest.request('GET', Endpoints.CHANNEL(channelID), true);
  }

  getChannelInvites(channelID: string) {
    return this.rest.request('GET', Endpoints.CHANNEL_INVITES(channelID), true);
  }

  getChannelMessage(channelID: string, messageID: string) {
    return this.rest.request('GET', Endpoints.CHANNEL_MESSAGE(channelID, messageID), true);
  }

  getChannelMessages(channelID: string, params: any = {}) {
    return this.rest.request('GET', Endpoints.CHANNEL_MESSAGES(channelID), true, params);
  }

  getChannelWebhooks(channelID: string) {
    return this.rest.request('GET', Endpoints.CHANNEL_WEBHOOK(channelID), true);
  }

  getCurrentApplicationInfo() {
    return this.rest.request('GET', Endpoints.APPLICATION_INFORMATION(), true);
  }

  getGateway() {
    return this.rest.request('GET', Endpoints.GATEWAY(), false);
  }

  getGatewayBot() {
    return this.rest.request('GET', Endpoints.GATEWAY_BOT(), true);
  }

  getGuild(guildID: string, withCounts?: boolean) {
    return this.rest.request('GET', Endpoints.GUILD(guildID), true, { with_counts: withCounts });
  }

  getGuildAuditLog(guildID: string, params: any = {}) {
    return this.rest.request('GET', Endpoints.GUILD_AUDIT_LOG(guildID), true, {
      user_id: params.userID,
      action_type: params.actionType,
      before: params.before,
      limit: params.limit,
    });
  }

  getGuildBan(guildID: string, userID: string) {
    return this.rest.request('GET', Endpoints.GUILD_BAN(guildID, userID), true);
  }

  getGuildBans(guildID: string) {
    return this.rest.request('GET', Endpoints.GUILD_BANS(guildID), true);
  }

  getGuildChannels(guildID: string) {
    return this.rest.request('GET', Endpoints.GUILD_CHANNEL(guildID), true);
  }

  getGuildEmoji(guildID: string, emojiID: string) {
    return this.rest.request('GET', Endpoints.GUILD_EMOJI(guildID, emojiID), true);
  }

  getGuildEmojis(guildID: string) {
    return this.rest.request('GET', Endpoints.GUILD_EMOJIS(guildID), true);
  }

  getGuildIntegrations(guildID: string) {
    return this.rest.request('GET', Endpoints.GUILD_INTEGRATIONS(guildID), true);
  }

  getGuildInvites(guildID: string) {
    return this.rest.request('GET', Endpoints.GUILD_INVITES(guildID), true);
  }

  getGuildMember(guildID: string, userID: string) {
    return this.rest.request('GET', Endpoints.GUILD_MEMBER(guildID, userID), true);
  }

  getGuildMembers(guildID: string, params: any = {}) {
    return this.rest.request('GET', Endpoints.GUILD_MEMBERS(guildID), true, params);
  }

  getGuildPreview(guildID: string) {
    return this.rest.request('GET', Endpoints.GUILD_PREVIEW(guildID), true);
  }

  getGuildPruneCount(guildID: string, params: any = {}) {
    return this.rest.request('GET', Endpoints.GUILD_PRUNE(guildID), true, {
      days: params.days,
      include_roles: params.includeRoles,
    });
  }

  getGuildRoles(guildID: string) {
    return this.rest.request('GET', Endpoints.GUILD_ROLES(guildID), true);
  }

  getGuildTemplates(guildID: string) {
    return this.rest.request('GET', Endpoints.GUILD_TEMPLATES(guildID), true);
  }

  getGuildVanityURL(guildID: string) {
    return this.rest.request('GET', Endpoints.GUILD_VANITY_URL(guildID), true);
  }

  getGuildVoiceRegions(guildID: string) {
    return this.rest.request('GET', Endpoints.GUILD_VOICE_REGIONS(guildID), true);
  }

  getGuildWebhooks(guildID: string) {
    return this.rest.request('GET', Endpoints.GUILD_WEBHOOK(guildID), true);
  }

  getGuildWidget(guildID: string) {
    return this.rest.request('GET', Endpoints.GUILD_WIDGET_JSON(guildID), false);
  }

  getGuildWidgetImage(guildID: string, style?: WIDGET_STYLE_OPTIONS) {
    return this.rest.request('GET', Endpoints.GUILD_WIDGET_IMAGE(guildID), false, { style });
  }

  getGuildWidgetSettings(guildID: string) {
    return this.rest.request('GET', Endpoints.GUILD_WIDGET(guildID), true);
  }

  getInvite(code: string, withCounts?: boolean) {
    return this.rest.request('GET', Endpoints.INVITE(code), false, { with_counts: withCounts });
  }

  getPinnedMessages(channelID: string) {
    return this.rest.request('GET', Endpoints.CHANNEL_PINNED_MESSAGES(channelID), true);
  }

  getReactions(channelID: string, messageID: string, emoji: string) {
    return this.rest.request('GET', Endpoints.CHANNEL_MESSAGE_REACTIONS_EMOJI(channelID, messageID, emoji), true);
  }

  getSelfGuilds(params: any = {}) {
    return this.rest.request('GET', Endpoints.USER_GUILDS(), true, params);
  }

  getTemplate(code: string) {
    return this.rest.request('GET', Endpoints.TEMPLATE(code), true);
  }

  getUser(userID: string) {
    return this.rest.request('GET', Endpoints.USER(userID), true);
  }

  getUserConnections() {
    return this.rest.request('GET', Endpoints.USER_CONNECTIONS(), true);
  }

  getUserDMs() {
    return this.rest.request('GET', Endpoints.USER_CHANNELS(), true);
  }

  getWebhook(webhookID: string, webhookToken?: string) {
    return webhookToken
      ? this.rest.request('GET', Endpoints.WEBHOOK_TOKEN(webhookID, webhookToken), false)
      : this.rest.request('GET', Endpoints.WEBHOOK(webhookID), true);
  }

  leaveGuild(guildID: string) {
    return this.rest.request('DELETE', Endpoints.USER_GUILD(guildID), true);
  }

  listVoiceRegions() {
    return this.rest.request('GET', Endpoints.VOICE_REGIONS(), true);
  }

  removeGroupDMRecipient(channelID: string, userID: string, param: any = {}) {
    return this.rest.request('DELETE', Endpoints.GROUP_DM_RECIPIENT(channelID, userID), false, {
      access_token: param.accessToken,
      nick: param.nick,
    });
  }

  removeGuildBan(guildID: string, userID: string) {
    return this.rest.request('DELETE', Endpoints.GUILD_BAN(guildID, userID), true);
  }

  removeGuildMember(guildID: string, userID: string) {
    return this.rest.request('DELETE', Endpoints.GUILD_MEMBER(guildID, userID), true);
  }

  removeGuildMemberRole(guildID: string, userID: string, roleID: string) {
    return this.rest.request('DELETE', Endpoints.GUILD_MEMBER_ROLE(guildID, userID, roleID), true);
  }

  syncGuildIntegration(guildID: string, integrationID: string) {
    return this.rest.request('POST', Endpoints.GUILD_INTEGRATION_SYNC(guildID, integrationID), true);
  }

  syncGuildTemplate(guildID: string, code: string) {
    return this.rest.request('PUT', Endpoints.GUILD_TEMPLATE(guildID, code), true);
  }

  triggerTypingIndicator(channelID: string) {
    return this.rest.request('POST', Endpoints.CHANNEL_TYPING(channelID), true);
  }
}
